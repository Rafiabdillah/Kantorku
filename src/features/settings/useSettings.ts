import { useState, useEffect } from 'react';
import { settingsRepo, UndoEntry } from './settingsRepository';
import { UserProfileMeta, ClassAssignment } from './types';

export function useSettings() {
  const [settings, setSettings] = useState<Record<string, any>>(() => settingsRepo.getAll());
  const [undoEntry, setUndoEntry] = useState<UndoEntry | null>(() => settingsRepo.getUndoEntry());
  const [profiles, setProfiles] = useState<UserProfileMeta[]>(() => settingsRepo.getProfiles());
  const [activeProfile, setActiveProfile] = useState<UserProfileMeta>(() => settingsRepo.getActiveProfile());
  const [assignment, setAssignment] = useState<ClassAssignment | null>(() => settingsRepo.getAssignment());

  useEffect(() => {
    const unsubSettings = settingsRepo.subscribe((newSettings) => {
      setSettings({ ...newSettings });
      setProfiles(settingsRepo.getProfiles());
      setActiveProfile(settingsRepo.getActiveProfile());
      setAssignment(settingsRepo.getAssignment());
    });

    const unsubUndo = settingsRepo.subscribeUndo((entry) => {
      setUndoEntry(entry);
    });

    return () => {
      unsubSettings();
      unsubUndo();
    };
  }, []);

  return {
    settings,
    undoEntry,
    profiles,
    activeProfile,
    assignment,
    get: <T = any>(key: string, defaultValue?: T): T => settingsRepo.get<T>(key, defaultValue),
    set: (key: string, value: any, recordUndo: boolean = true) => settingsRepo.set(key, value, recordUndo),
    isModified: (key: string) => settingsRepo.isModifiedFromDefault(key),
    resetKey: (key: string) => settingsRepo.resetKey(key),
    resetSection: (sectionId: string) => settingsRepo.resetSection(sectionId),
    applyPreset: (presetId: any) => settingsRepo.applyPreset(presetId),
    undo: () => settingsRepo.undoLastChange(),
    createProfile: (name: string, goal: string, avatar: string, pin?: string) =>
      settingsRepo.createProfile(name, goal, avatar, pin),
    switchProfile: (profileId: string, pin?: string) => settingsRepo.switchProfile(profileId, pin),
    deleteProfile: (profileId: string) => settingsRepo.deleteProfile(profileId),
    updateActiveProfile: (data: Partial<UserProfileMeta>) => settingsRepo.updateActiveProfile(data),
    setAssignment: (a: ClassAssignment | null) => settingsRepo.setAssignment(a),
    resetSettingsOnly: () => settingsRepo.resetSettingsOnly(),
    resetModuleProgress: () => settingsRepo.resetModuleProgress(),
    fullWipe: (confirmWord: string) => settingsRepo.fullWipe(confirmWord),
    exportSettings: () => settingsRepo.exportSettingsJson(),
    importSettings: (json: string) => settingsRepo.importSettingsJson(json),
  };
}
