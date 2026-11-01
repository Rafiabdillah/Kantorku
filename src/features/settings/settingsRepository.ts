import { z } from 'zod';
import { SETTINGS_REGISTRY, SETTING_PRESETS } from './registry';
import { SettingDef, UserProfileMeta, PresetId, ClassAssignment } from './types';
import { sound } from '../../services/sound';

export const UserProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  avatar: z.string(),
  learningGoal: z.string(),
  pinHash: z.string().optional(),
  createdAt: z.string(),
  lastActive: z.string(),
});

export const ClassAssignmentSchema = z.object({
  code: z.string().min(1),
  title: z.string().min(1),
  teacherName: z.string().min(1),
  deadline: z.string(),
  lockedHints: z.boolean(),
  allowedLevels: z.array(z.string()),
  minPassingScore: z.number(),
});

export const SettingsExportSchema = z.object({
  version: z.string(),
  exportedAt: z.string(),
  activeProfile: UserProfileSchema,
  profiles: z.array(UserProfileSchema),
  settings: z.record(z.string(), z.any()),
  activeAssignment: ClassAssignmentSchema.nullable().optional(),
});

export interface UndoEntry {
  key: string;
  previousValue: any;
  newValue: any;
  timestamp: number;
}

type SettingsListener = (settings: Record<string, any>) => void;
type UndoListener = (entry: UndoEntry | null) => void;

class SettingsRepository {
  private settings: Record<string, any> = {};
  private profiles: UserProfileMeta[] = [];
  private activeProfileId: string = 'default-1';
  private activeAssignment: ClassAssignment | null = null;
  private undoEntry: UndoEntry | null = null;
  private undoTimer: any = null;
  private listeners: Set<SettingsListener> = new Set();
  private undoListeners: Set<UndoListener> = new Set();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    this.initDefaults();
    this.loadFromStorage();
    this.initBroadcastChannel();
    this.initBackgroundAudioListener();
    this.applyToDOM();
  }

  private initDefaults() {
    // Fill defaults from registry
    for (const def of SETTINGS_REGISTRY) {
      this.settings[def.key] = def.default;
    }

    // Default profile
    this.profiles = [
      {
        id: 'default-1',
        name: 'Karyawan Baru',
        avatar: 'player',
        learningGoal: 'magang_karir',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      },
    ];
    this.activeProfileId = 'default-1';
  }

  private loadFromStorage() {
    if (typeof window === 'undefined') return;

    try {
      const storedSettings = localStorage.getItem('kantorku_settings_v2');
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (typeof parsed === 'object' && parsed !== null) {
          // Merge with defaults in case new settings were registered
          this.settings = { ...this.settings, ...parsed };
        }
      }

      const storedProfiles = localStorage.getItem('kantorku_profiles_v2');
      if (storedProfiles) {
        const parsed = JSON.parse(storedProfiles);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.profiles = parsed;
        }
      }

      const storedActiveId = localStorage.getItem('kantorku_active_profile_id_v2');
      if (storedActiveId && this.profiles.some((p) => p.id === storedActiveId)) {
        this.activeProfileId = storedActiveId;
      }

      const storedAssignment = localStorage.getItem('kantorku_assignment_v2');
      if (storedAssignment) {
        this.activeAssignment = JSON.parse(storedAssignment);
      }
    } catch (e) {
      console.warn('Failed to load settings from localStorage, using defaults.', e);
    }
  }

  public saveToStorage() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('kantorku_settings_v2', JSON.stringify(this.settings));
      localStorage.setItem('kantorku_profiles_v2', JSON.stringify(this.profiles));
      localStorage.setItem('kantorku_active_profile_id_v2', this.activeProfileId);
      if (this.activeAssignment) {
        localStorage.setItem('kantorku_assignment_v2', JSON.stringify(this.activeAssignment));
      } else {
        localStorage.removeItem('kantorku_assignment_v2');
      }
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }
  }

  private initBroadcastChannel() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('kantorku_settings_channel');
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.type === 'SETTINGS_UPDATED') {
            this.settings = { ...this.settings, ...event.data.payload };
            this.applyToDOM();
            this.notifyListeners();
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not available:', err);
      }
    }
  }

  private initBackgroundAudioListener() {
    if (typeof document === 'undefined') return;
    document.addEventListener('visibilitychange', () => {
      const muteOnBg = this.get('audio_mute_on_background', true);
      if (muteOnBg) {
        if (document.hidden) {
          sound.setMuted(true);
        } else {
          // Restore user's explicit preference
          const sfx = this.get('audio_sfx_enabled', true);
          sound.setMuted(!sfx);
        }
      }
    });
  }

  // --- HASH & CRYPTO ---
  public async hashPin(pin: string): Promise<string> {
    if (typeof window === 'undefined' || !window.crypto || !window.crypto.subtle) {
      return btoa(`salt_${pin}`);
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(`kantorku_salt_${pin}`);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  }

  public async verifyPin(enteredPin: string, storedHash?: string): Promise<boolean> {
    if (!storedHash) return true;
    const computed = await this.hashPin(enteredPin);
    return computed === storedHash;
  }

  // --- GETTERS & SETTERS ---
  public getAll(): Record<string, any> {
    return { ...this.settings };
  }

  public get<T = any>(key: string, defaultValue?: T): T {
    if (this.settings[key] !== undefined) {
      return this.settings[key] as T;
    }
    const def = SETTINGS_REGISTRY.find((s) => s.key === key);
    return (def ? def.default : defaultValue) as T;
  }

  public isModifiedFromDefault(key: string): boolean {
    const def = SETTINGS_REGISTRY.find((s) => s.key === key);
    if (!def) return false;
    return JSON.stringify(this.settings[key]) !== JSON.stringify(def.default);
  }

  public set(key: string, value: any, recordUndo: boolean = true) {
    const prev = this.settings[key];
    if (prev === value) return;

    this.settings[key] = value;
    this.saveToStorage();
    this.applyToDOM();
    this.notifyListeners();

    // Broadcast to other tabs
    if (this.broadcastChannel) {
      this.broadcastChannel.postMessage({
        type: 'SETTINGS_UPDATED',
        payload: { [key]: value },
      });
    }

    if (recordUndo) {
      this.setUndoEntry({
        key,
        previousValue: prev,
        newValue: value,
        timestamp: Date.now(),
      });
    }
  }

  public resetKey(key: string) {
    const def = SETTINGS_REGISTRY.find((s) => s.key === key);
    if (def) {
      this.set(key, def.default, true);
    }
  }

  public resetSection(sectionId: string) {
    const sectionSettings = SETTINGS_REGISTRY.filter((s) => s.section === sectionId);
    for (const def of sectionSettings) {
      this.settings[def.key] = def.default;
    }
    this.saveToStorage();
    this.applyToDOM();
    this.notifyListeners();
  }

  public applyPreset(presetId: PresetId) {
    const preset = SETTING_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    for (const [k, v] of Object.entries(preset.values)) {
      this.settings[k] = v;
    }
    this.saveToStorage();
    this.applyToDOM();
    this.notifyListeners();
  }

  // --- UNDO BUFFER ---
  private setUndoEntry(entry: UndoEntry) {
    if (this.undoTimer) {
      clearTimeout(this.undoTimer);
    }
    this.undoEntry = entry;
    this.notifyUndoListeners();

    // 5 seconds window
    this.undoTimer = setTimeout(() => {
      this.undoEntry = null;
      this.notifyUndoListeners();
    }, 5000);
  }

  public undoLastChange(): boolean {
    if (!this.undoEntry) return false;
    const { key, previousValue } = this.undoEntry;
    this.set(key, previousValue, false);
    this.undoEntry = null;
    if (this.undoTimer) {
      clearTimeout(this.undoTimer);
    }
    this.notifyUndoListeners();
    return true;
  }

  public getUndoEntry(): UndoEntry | null {
    return this.undoEntry;
  }

  // --- MULTI-PROFILE (Max 5) ---
  public getProfiles(): UserProfileMeta[] {
    return [...this.profiles];
  }

  public getActiveProfile(): UserProfileMeta {
    return (
      this.profiles.find((p) => p.id === this.activeProfileId) ||
      this.profiles[0] || {
        id: 'default-1',
        name: 'Karyawan Baru',
        avatar: 'player',
        learningGoal: 'magang_karir',
        createdAt: new Date().toISOString(),
        lastActive: new Date().toISOString(),
      }
    );
  }

  public async switchProfile(
    profileId: string,
    enteredPin?: string
  ): Promise<{ success: boolean; error?: string }> {
    const target = this.profiles.find((p) => p.id === profileId);
    if (!target) {
      return { success: false, error: 'Profil tidak ditemukan.' };
    }

    if (target.pinHash) {
      if (!enteredPin) {
        return { success: false, error: 'Profil ini dilindungi PIN.' };
      }
      const valid = await this.verifyPin(enteredPin, target.pinHash);
      if (!valid) {
        return { success: false, error: 'PIN tidak sesuai. Akses ditolak.' };
      }
    }

    this.activeProfileId = profileId;
    target.lastActive = new Date().toISOString();
    this.settings['profile_name'] = target.name;
    this.settings['profile_goal'] = target.learningGoal;
    this.settings['profile_avatar'] = target.avatar;
    this.settings['profile_pin_enabled'] = !!target.pinHash;

    this.saveToStorage();
    this.notifyListeners();
    return { success: true };
  }

  public async createProfile(
    name: string,
    goal: string,
    avatar: string,
    pin?: string
  ): Promise<{ success: boolean; profile?: UserProfileMeta; error?: string }> {
    if (this.profiles.length >= 5) {
      return { success: false, error: 'Batas maksimal 5 profil lokal telah tercapai.' };
    }

    let pinHash: string | undefined = undefined;
    if (pin && pin.trim().length >= 4) {
      pinHash = await this.hashPin(pin.trim());
    }

    const newProfile: UserProfileMeta = {
      id: `profile-${Date.now()}`,
      name: name.trim() || 'Rekan Kantor Baru',
      avatar: avatar || 'player',
      learningGoal: goal || 'magang_karir',
      pinHash,
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    };

    this.profiles.push(newProfile);
    this.activeProfileId = newProfile.id;
    this.settings['profile_name'] = newProfile.name;
    this.settings['profile_goal'] = newProfile.learningGoal;
    this.settings['profile_avatar'] = newProfile.avatar;
    this.settings['profile_pin_enabled'] = !!pinHash;

    this.saveToStorage();
    this.notifyListeners();
    return { success: true, profile: newProfile };
  }

  public updateActiveProfile(data: Partial<UserProfileMeta>) {
    const active = this.getActiveProfile();
    Object.assign(active, data, { lastActive: new Date().toISOString() });
    if (data.name) this.settings['profile_name'] = data.name;
    if (data.avatar) this.settings['profile_avatar'] = data.avatar;
    if (data.learningGoal) this.settings['profile_goal'] = data.learningGoal;
    this.saveToStorage();
    this.notifyListeners();
  }

  public deleteProfile(profileId: string): boolean {
    if (this.profiles.length <= 1) return false;
    this.profiles = this.profiles.filter((p) => p.id !== profileId);
    if (this.activeProfileId === profileId) {
      this.activeProfileId = this.profiles[0].id;
    }
    this.saveToStorage();
    this.notifyListeners();
    return true;
  }

  // --- CLASSROOM MODE ---
  public getAssignment(): ClassAssignment | null {
    return this.activeAssignment;
  }

  public setAssignment(assignment: ClassAssignment | null) {
    this.activeAssignment = assignment;
    this.set('classroom_mode_enabled', !!assignment);
    this.saveToStorage();
    this.notifyListeners();
  }

  // --- TIERED RESET ---
  public resetSettingsOnly() {
    this.initDefaults();
    this.saveToStorage();
    this.applyToDOM();
    this.notifyListeners();
  }

  public resetModuleProgress() {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem('kantorku-game-storage');
      this.notifyListeners();
    } catch (e) {
      console.error(e);
    }
  }

  public fullWipe(confirmWord: string): boolean {
    if (confirmWord !== 'HAPUS') return false;
    if (typeof window === 'undefined') return false;
    try {
      localStorage.clear();
      window.location.reload();
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  // --- EXPORT & IMPORT ---
  public exportSettingsJson(): string {
    const payload = {
      version: '2.0.0',
      exportedAt: new Date().toISOString(),
      activeProfile: this.getActiveProfile(),
      profiles: this.profiles,
      settings: this.settings,
      activeAssignment: this.activeAssignment,
    };
    return JSON.stringify(payload, null, 2);
  }

  public importSettingsJson(jsonStr: string): { success: boolean; message: string } {
    try {
      const parsed = JSON.parse(jsonStr);
      const validated = SettingsExportSchema.safeParse(parsed);
      if (!validated.success) {
        return {
          success: false,
          message: 'Format data JSON tidak valid: ' + validated.error.issues.map((i) => i.message).join(', '),
        };
      }

      const data = validated.data;
      this.settings = { ...this.settings, ...data.settings };
      this.profiles = data.profiles;
      this.activeProfileId = data.activeProfile.id;
      if (data.activeAssignment) {
        this.activeAssignment = data.activeAssignment;
      }

      this.saveToStorage();
      this.applyToDOM();
      this.notifyListeners();
      return { success: true, message: 'Data pengaturan dan profil berhasil dipulihkan!' };
    } catch (err: any) {
      return { success: false, message: 'Gagal membaca berkas JSON: ' + (err.message || 'Format tidak valid') };
    }
  }

  // --- DOM & STYLE APPLIER ---
  public applyToDOM() {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;

    // Theme (Light / Dark / System)
    const theme = this.get<string>('appearance_theme', 'light');
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
      } else {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
      }
    }

    // Palette
    const palette = this.get('appearance_palette', 'emerald');
    root.setAttribute('data-palette', palette);

    // Density
    const density = this.get('appearance_density', 'comfortable');
    root.setAttribute('data-density', density);

    // Font size scaling
    const fontSize = this.get('appearance_font_size', 'medium');
    root.setAttribute('data-font-size', fontSize);

    // High contrast
    const highContrast = this.get('a11y_high_contrast', false);
    root.setAttribute('data-contrast', highContrast ? 'high' : 'normal');

    // Colorblind filter
    const colorblind = this.get('a11y_colorblind_filter', 'none');
    root.setAttribute('data-colorblind', colorblind);

    // Focus ring
    const focusRing = this.get('a11y_focus_ring', true);
    root.setAttribute('data-focus-ring', String(focusRing));

    // Cell font size variable
    const cellFontSize = this.get('excel_cell_font_size', 13);
    root.style.setProperty('--cell-font-size', `${cellFontSize}pt`);

    // Tab size variable
    const tabSize = this.get('code_tab_size', 2);
    root.style.setProperty('--code-tab-size', String(tabSize));

    // Sound service synchronization
    const sfx = this.get('audio_sfx_enabled', true);
    sound.setMuted(!sfx);
  }

  // --- REACT SUBSCRIPTION ---
  public subscribe(listener: SettingsListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  public subscribeUndo(listener: UndoListener): () => void {
    this.undoListeners.add(listener);
    return () => this.undoListeners.delete(listener);
  }

  private notifyListeners() {
    for (const l of this.listeners) {
      try {
        l(this.settings);
      } catch (e) {
        console.error(e);
      }
    }
  }

  private notifyUndoListeners() {
    for (const l of this.undoListeners) {
      try {
        l(this.undoEntry);
      } catch (e) {
        console.error(e);
      }
    }
  }
}

export const settingsRepo = new SettingsRepository();
