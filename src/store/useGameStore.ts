import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerProfile, CharacterId, ModuleType, TierLevel, ErrorLogItem, SheetGrid, CellData } from '../types';
import { LEVELS } from '../content/levels';
import { sound } from '../services/sound';
import { ALL_SKILLS } from '../content/skills';

export type AppView =
  | 'onboarding'
  | 'office'
  | 'learning'
  | 'career-map'
  | 'skills-map'
  | 'mission'
  | 'case-file'
  | 'sandbox'
  | 'zen'
  | 'daily'
  | 'speed'
  | 'detective'
  | 'mentor'
  | 'exam'
  | 'creator'
  | 'shop'
  | 'achievements'
  | 'dictionary'
  | 'portfolio'
  | 'errors'
  | 'duel'
  | 'settings'
  | 'about';

interface GameState {
  // Navigation
  currentView: AppView;
  setView: (view: AppView) => void;

  // Active Lesson Context (Deep linking from mission or career map)
  activeLearningLessonId: string | null;
  openLessonView: (lessonId?: string) => void;

  // Semesta Keterampilan & Jalur Peran
  setTargetRoleId: (roleId: string) => void;
  updateSkillMastery: (skillId: string, score: number) => void;
  updateDomainMastery: (domainId: string, score: number) => void;

  // Profile
  profile: PlayerProfile;
  setProfileName: (name: string) => void;
  setProfileAvatar: (avatar: string) => void;
  addXp: (amount: number) => void;
  addCoins: (amount: number) => void;
  spendCoins: (amount: number) => boolean;
  completeOnboarding: (name: string, avatar: string, startTier: TierLevel) => void;
  updateReputation: (char: CharacterId, delta: number) => void;
  checkStreak: () => void;
  recordLessonStreak: () => void;
  buyStreakFreeze: () => boolean;

  // Active Mission
  activeLevelId: string | null;
  activeSheet: SheetGrid;
  activeCode: string;
  activeWord: string;
  activeHtml: string;
  activeCss: string;
  missionFailCount: number;
  unlockedHintLevel: number; // 0, 1, 2, 3
  startMission: (levelId: string) => void;
  setCell: (address: string, data: Partial<CellData>) => void;
  setCode: (code: string) => void;
  setWord: (content: string) => void;
  setHtml: (html: string) => void;
  setCss: (css: string) => void;
  unlockHint: () => boolean;
  recordMissionSuccess: (levelId: string, stars: number, xp: number, coins: number) => void;
  recordMissionFail: (mistakeText: string) => void;

  // Real Case File
  activeCaseId: string | null;
  startCaseFile: (caseId: string) => void;

  // Error Notebook
  errorNotebook: ErrorLogItem[];
  addErrorLog: (err: Omit<ErrorLogItem, 'id' | 'timestamp' | 'resolved'>) => void;
  resolveErrorLog: (id: string) => void;

  // Shop & Inventory
  buyCosmetic: (itemId: string, cost: number, category: 'avatar' | 'desk' | 'decor') => boolean;
  equipCosmetic: (category: 'avatar' | 'desk' | 'decor', itemId: string) => void;

  // Data persistence & export
  resetProgress: () => void;
  exportProgressJson: () => string;
  importProgressJson: (json: string) => boolean;
}

export const initialProfile: PlayerProfile = {
  name: 'Karyawan Baru',
  avatar: 'player',
  xp: 0,
  coins: 100,
  streakDays: 1,
  streakFreeze: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  currentTier: 1,
  moduleMastery: {
    excel: 10,
    word: 10,
    coding: 5,
    web: 5,
  },
  domainMastery: {
    D1: 10,
    D2: 10,
    D5: 5,
    D12: 0,
  },
  skillMastery: {},
  targetRoleId: 'admin-perkantoran',
  reputation: {
    sari: 50,
    dimas: 60,
    maya: 55,
    intan: 50,
    reza: 45,
    hendra: 40,
    nadia: 50,
    klien: 50,
  },
  completedLevelIds: [],
  levelStars: {},
  unlockedAchievements: ['ach-01'],
  inventory: ['desk-kayu', 'decor-kaktus', 'avatar-magang'],
  equipped: {
    avatar: 'player',
    desk: 'desk-kayu',
    decor: 'decor-kaktus',
  },
  soundEnabled: true,
  theme: 'office-warm',
  hasCompletedOnboarding: false,
};

export const DOMAIN_SKILL_MAP: Record<string, string[]> = Object.fromEntries(
  [...new Set(ALL_SKILLS.map((skill) => skill.domain))].map((domainId) => [
    domainId,
    ALL_SKILLS.filter((skill) => skill.domain === domainId).map((skill) => skill.id),
  ])
);

/**
 * Formula F2.4:
 * masteryDomain = rata-rata skor-terbaik skill di domain tersebut (skill yang belum dicoba = 0).
 */
export function calculateDomainMasteryFromSkills(
  domainId: string,
  skillMastery: Record<string, number> = {}
): number {
  const skills = DOMAIN_SKILL_MAP[domainId];
  if (!skills || skills.length === 0) return 0;
  const total = skills.reduce((sum, sId) => sum + (skillMastery[sId] || 0), 0);
  return Math.round(total / skills.length);
}

/**
 * Migration function to upgrade legacy storage profiles safely
 * Preserves all existing player progress, achievements, and items
 */
export function migrateLegacyProfile(raw: any): PlayerProfile {
  if (!raw || typeof raw !== 'object') {
    return { ...initialProfile };
  }
  const legacyMastery = raw.moduleMastery || { excel: 10, word: 10, coding: 5, web: 5 };
  const existingDomainMastery = raw.domainMastery || {};
  const existingSkillMastery = raw.skillMastery || {};

  const migratedDomainMastery: Record<string, number> = {
    D1: existingDomainMastery.D1 ?? (legacyMastery.excel || 0),
    D2: existingDomainMastery.D2 ?? (legacyMastery.word || 0),
    D5: existingDomainMastery.D5 ?? Math.round(((legacyMastery.coding || 0) + (legacyMastery.web || 0)) / 2),
    D12: existingDomainMastery.D12 ?? 0,
    ...existingDomainMastery,
  };

  return {
    ...initialProfile,
    ...raw,
    moduleMastery: {
      ...initialProfile.moduleMastery,
      ...raw.moduleMastery,
    },
    domainMastery: migratedDomainMastery,
    skillMastery: existingSkillMastery,
    targetRoleId: raw.targetRoleId || 'admin-perkantoran',
    reputation: {
      ...initialProfile.reputation,
      ...raw.reputation,
    },
    equipped: {
      ...initialProfile.equipped,
      ...raw.equipped,
    },
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      currentView: 'office',
      setView: (view) => {
        sound.playClick();
        set({ currentView: view });
      },

      setTargetRoleId: (roleId: string) => {
        sound.playClick();
        set((state) => ({
          profile: {
            ...state.profile,
            targetRoleId: roleId,
          },
        }));
      },

      updateSkillMastery: (skillId: string, score: number) => {
        set((state) => {
          const currentSkills = state.profile.skillMastery || {};
          const prev = currentSkills[skillId] || 0;
          const next = Math.max(prev, Math.min(100, Math.round(score)));
          const updatedSkills = {
            ...currentSkills,
            [skillId]: next,
          };

          // Hitung domain dari awalan skillId (mis. D12-SKILL-01 -> D12)
          const domainId = skillId.split('-')[0];
          const newDomainMastery = calculateDomainMasteryFromSkills(domainId, updatedSkills);

          return {
            profile: {
              ...state.profile,
              skillMastery: updatedSkills,
              domainMastery: {
                ...state.profile.domainMastery,
                [domainId]: newDomainMastery,
              },
            },
          };
        });
      },

      updateDomainMastery: (domainId: string, score: number) => {
        set((state) => {
          const current = state.profile.domainMastery || {};
          const prev = current[domainId] || 0;
          const next = Math.max(prev, Math.min(100, Math.round(score)));
          return {
            profile: {
              ...state.profile,
              domainMastery: {
                ...current,
                [domainId]: next,
              },
            },
          };
        });
      },

      activeLearningLessonId: null,
      openLessonView: (lessonId) => {
        sound.playClick();
        set({
          currentView: 'learning',
          activeLearningLessonId: lessonId || null,
        });
      },

      profile: initialProfile,

      setProfileName: (name) =>
        set((state) => ({ profile: { ...state.profile, name } })),

      setProfileAvatar: (avatar) =>
        set((state) => ({ profile: { ...state.profile, avatar } })),

      addXp: (amount) =>
        set((state) => {
          const newXp = state.profile.xp + amount;
          // Check tier advancement
          let newTier = state.profile.currentTier;
          if (newXp >= 20000) newTier = 7;
          else if (newXp >= 12000) newTier = 6;
          else if (newXp >= 7000) newTier = 5;
          else if (newXp >= 3500) newTier = 4;
          else if (newXp >= 1500) newTier = 3;
          else if (newXp >= 500) newTier = 2;

          if (newTier > state.profile.currentTier) {
            sound.playLevelUp();
          }

          return {
            profile: {
              ...state.profile,
              xp: newXp,
              currentTier: newTier,
            },
          };
        }),

      addCoins: (amount) => {
        sound.playCoin();
        set((state) => ({
          profile: {
            ...state.profile,
            coins: state.profile.coins + amount,
          },
        }));
      },

      spendCoins: (amount) => {
        const current = get().profile.coins;
        if (current < amount) return false;
        sound.playCoin();
        set((state) => ({
          profile: {
            ...state.profile,
            coins: state.profile.coins - amount,
          },
        }));
        return true;
      },

      completeOnboarding: (name, avatar, startTier) => {
        set((state) => ({
          currentView: 'office',
          profile: {
            ...state.profile,
            name,
            avatar,
            currentTier: startTier,
            hasCompletedOnboarding: true,
            xp: (startTier - 1) * 600,
          },
        }));
      },

      updateReputation: (char, delta) => {
        set((state) => {
          const current = state.profile.reputation[char] || 50;
          const updated = Math.min(100, Math.max(0, current + delta));
          return {
            profile: {
              ...state.profile,
              reputation: {
                ...state.profile.reputation,
                [char]: updated,
              },
            },
          };
        });
      },

      checkStreak: () => {
        const today = new Date().toISOString().split('T')[0];
        const last = get().profile.lastActiveDate;
        if (today === last) return;

        const lastDate = new Date(last);
        const currDate = new Date(today);
        const diffDays = Math.round((currDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        set((state) => {
          let newStreak = state.profile.streakDays;
          let newFreeze = state.profile.streakFreeze;

          if (diffDays === 1) {
            newStreak += 1;
          } else if (diffDays > 1) {
            if (newFreeze > 0) {
              newFreeze -= 1; // used freeze
            } else {
              newStreak = 1; // broken
            }
          }

          return {
            profile: {
              ...state.profile,
              streakDays: newStreak,
              streakFreeze: newFreeze,
              lastActiveDate: today,
            },
          };
        });
      },

      recordLessonStreak: () => {
        get().checkStreak();
        // Award learning bonus XP and coins
        set((state) => ({
          profile: {
            ...state.profile,
            xp: state.profile.xp + 25,
            coins: state.profile.coins + 10,
          },
        }));
      },

      buyStreakFreeze: () => {
        const success = get().spendCoins(150);
        if (success) {
          set((state) => ({
            profile: {
              ...state.profile,
              streakFreeze: state.profile.streakFreeze + 1,
            },
          }));
        }
        return success;
      },

      // Active Mission
      activeLevelId: null,
      activeSheet: {},
      activeCode: '',
      activeWord: '',
      activeHtml: '',
      activeCss: '',
      missionFailCount: 0,
      unlockedHintLevel: 0,

      startMission: (levelId) => {
        const lvl = LEVELS.find((l) => l.id === levelId);
        if (!lvl) return;
        sound.playClick();
        set({
          activeLevelId: levelId,
          activeSheet: lvl.initialData.excel ? JSON.parse(JSON.stringify(lvl.initialData.excel)) : {},
          activeCode: lvl.initialData.code || '',
          activeWord: lvl.initialData.word || '',
          activeHtml: lvl.initialData.html || '',
          activeCss: lvl.initialData.css || '',
          missionFailCount: 0,
          unlockedHintLevel: 0,
          currentView: 'mission',
        });
      },

      setCell: (address, data) => {
        sound.playTyping();
        set((state) => {
          const upper = address.toUpperCase();
          const current = state.activeSheet[upper] || { raw: '' };
          return {
            activeSheet: {
              ...state.activeSheet,
              [upper]: {
                ...current,
                ...data,
              },
            },
          };
        });
      },

      setCode: (code) => {
        set({ activeCode: code });
      },

      setWord: (content) => {
        set({ activeWord: content });
      },

      setHtml: (html) => {
        set({ activeHtml: html });
      },

      setCss: (css) => {
        set({ activeCss: css });
      },

      unlockHint: () => {
        const current = get().unlockedHintLevel;
        if (current >= 3) return false;
        const cost = (current + 1) * 20;
        if (get().spendCoins(cost)) {
          set({ unlockedHintLevel: current + 1 });
          return true;
        }
        return false;
      },

      recordMissionSuccess: (levelId, stars, xp, coins) => {
        sound.playSuccess();
        const lvl = LEVELS.find((l) => l.id === levelId);
        const moduleName = lvl?.module || 'excel';

        set((state) => {
          const completed = new Set(state.profile.completedLevelIds);
          completed.add(levelId);

          const curStars = state.profile.levelStars[levelId] || 0;
          const bestStars = Math.max(curStars, stars);

          // Boost mastery (legacy)
          const curMastery = state.profile.moduleMastery[moduleName] || 0;
          const newMastery = Math.min(100, curMastery + 12);

          // Jembatan level lama ke Semesta Keterampilan (F3):
          // Map level legacy ke skill D1, D2, atau D5
          const currentSkills = { ...(state.profile.skillMastery || {}) };
          const legacySkillScore = Math.round((stars / 3) * 100);
          let targetDomain = 'D1';

          if (moduleName === 'excel') {
            targetDomain = 'D1';
            currentSkills['D1-SKILL-01'] = Math.max(currentSkills['D1-SKILL-01'] || 0, legacySkillScore);
          } else if (moduleName === 'word') {
            targetDomain = 'D2';
            currentSkills['D2-SKILL-01'] = Math.max(currentSkills['D2-SKILL-01'] || 0, legacySkillScore);
          } else if (moduleName === 'coding') {
            targetDomain = 'D5';
            currentSkills['D5-SKILL-01'] = Math.max(currentSkills['D5-SKILL-01'] || 0, legacySkillScore);
          } else if (moduleName === 'web') {
            targetDomain = 'D5';
            currentSkills['D5-SKILL-02'] = Math.max(currentSkills['D5-SKILL-02'] || 0, legacySkillScore);
          }

          const newDomainMastery = {
            ...(state.profile.domainMastery || {}),
            [targetDomain]: calculateDomainMasteryFromSkills(targetDomain, currentSkills),
          };

          return {
            profile: {
              ...state.profile,
              xp: state.profile.xp + xp,
              coins: state.profile.coins + coins,
              completedLevelIds: Array.from(completed),
              levelStars: {
                ...state.profile.levelStars,
                [levelId]: bestStars,
              },
              moduleMastery: {
                ...state.profile.moduleMastery,
                [moduleName]: newMastery,
              },
              skillMastery: currentSkills,
              domainMastery: newDomainMastery,
            },
          };
        });
      },

      recordMissionFail: (mistakeText) => {
        sound.playError();
        const levelId = get().activeLevelId;
        const lvl = LEVELS.find((l) => l.id === levelId);
        set((state) => ({ missionFailCount: state.missionFailCount + 1 }));

        if (lvl) {
          get().addErrorLog({
            levelId: lvl.id,
            levelTitle: lvl.title,
            module: lvl.module,
            tier: lvl.tier,
            userAttempt: mistakeText,
            mistakeDescription: lvl.commonMistakes[0] || 'Kesalahan pengerjaan formula atau sintaks',
            explanation: lvl.solutionExplanation,
          });
        }
      },

      // Real Case File
      activeCaseId: null,
      startCaseFile: (caseId) => {
        sound.playClick();
        set({
          activeCaseId: caseId,
          currentView: 'case-file',
        });
      },

      // Error Notebook
      errorNotebook: [],
      addErrorLog: (err) => {
        set((state) => {
          const item: ErrorLogItem = {
            ...err,
            id: 'err-' + Date.now(),
            timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            resolved: false,
          };
          const currentList = Array.isArray(state.errorNotebook) ? state.errorNotebook : [];
          return { errorNotebook: [item, ...currentList.slice(0, 30)] };
        });
      },

      resolveErrorLog: (id) => {
        set((state) => {
          const currentList = Array.isArray(state.errorNotebook) ? state.errorNotebook : [];
          return {
            errorNotebook: currentList.map((e) => (e.id === id ? { ...e, resolved: true } : e)),
          };
        });
      },

      // Shop
      buyCosmetic: (itemId, cost, category) => {
        if (!get().spendCoins(cost)) return false;
        set((state) => ({
          profile: {
            ...state.profile,
            inventory: [...state.profile.inventory, itemId],
            equipped: {
              ...state.profile.equipped,
              [category]: itemId,
            },
          },
        }));
        return true;
      },

      equipCosmetic: (category, itemId) => {
        sound.playClick();
        set((state) => ({
          profile: {
            ...state.profile,
            equipped: {
              ...state.profile.equipped,
              [category]: itemId,
            },
          },
        }));
      },

      resetProgress: () => {
        set({ profile: initialProfile, currentView: 'office', errorNotebook: [] });
      },

      exportProgressJson: () => {
        return JSON.stringify(get().profile, null, 2);
      },

      importProgressJson: (json) => {
        try {
          const parsed = JSON.parse(json);
          if (parsed && typeof parsed.name === 'string') {
            set({ profile: parsed });
            sound.playSuccess();
            return true;
          }
        } catch {
          // ignore
        }
        return false;
      },
    }),
    {
      name: 'kantorku_game_storage_v1',
      version: 2,
      migrate: (persistedState: any, version: number) => {
        if (!persistedState) return persistedState;
        const safeErrorNotebook = Array.isArray(persistedState.errorNotebook) ? persistedState.errorNotebook : [];
        if (version < 2 && persistedState.profile) {
          return {
            ...persistedState,
            errorNotebook: safeErrorNotebook,
            profile: migrateLegacyProfile(persistedState.profile),
          };
        }
        return {
          ...persistedState,
          errorNotebook: safeErrorNotebook,
        };
      },
    }
  )
);
