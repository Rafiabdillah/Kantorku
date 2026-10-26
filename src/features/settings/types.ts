import { z } from 'zod';

export type SettingSectionId =
  | 'profile'
  | 'appearance'
  | 'audio'
  | 'locale'
  | 'learning'
  | 'story'
  | 'excel'
  | 'word'
  | 'code'
  | 'notification'
  | 'accessibility'
  | 'performance'
  | 'data'
  | 'classroom'
  | 'shortcuts'
  | 'advanced';

export type SettingType = 'boolean' | 'select' | 'slider' | 'text' | 'keybind' | 'action';

export type SettingScope = 'device' | 'profile';

export interface SettingOption {
  value: string | number;
  label: string;
  description?: string;
}

export interface SettingDef<T = any> {
  key: string;
  section: SettingSectionId;
  label: string;
  description: string;
  type: SettingType;
  default: T;
  scope: SettingScope;
  options?: SettingOption[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  keywords?: string[];
  dependsOn?: { key: string; value: any };
  applies?: (value: T) => void;
}

export interface SettingSectionMeta {
  id: SettingSectionId;
  title: string;
  description: string;
  iconName: string;
}

export interface UserProfileMeta {
  id: string;
  name: string;
  avatar: string;
  learningGoal: string;
  pinHash?: string;
  createdAt: string;
  lastActive: string;
}

export interface ClassAssignment {
  code: string;
  title: string;
  teacherName: string;
  deadline: string;
  lockedHints: boolean;
  allowedLevels: string[];
  minPassingScore: number;
}

export type PresetId = 'pemula_santai' | 'fokus_belajar' | 'tantangan_penuh' | 'hemat_daya';

export interface SettingPreset {
  id: PresetId;
  title: string;
  description: string;
  icon: string;
  values: Record<string, any>;
}
