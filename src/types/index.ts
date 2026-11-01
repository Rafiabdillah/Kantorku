export type ModuleType = 'excel' | 'word' | 'coding' | 'web';

export type TierLevel = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type DocumentScale = 'mikro' | 'kecil' | 'menengah' | 'korporat' | 'akademik';

export interface TierInfo {
  tier: TierLevel;
  title: string;
  badge: string;
  minXp: number;
  description: string;
}

export const TIERS: Record<TierLevel, TierInfo> = {
  1: { tier: 1, title: 'Magang', badge: '🌱', minXp: 0, description: 'Pemula Total - Tutorial interaktif terpandu' },
  2: { tier: 2, title: 'Staf Junior', badge: '📎', minXp: 500, description: 'Dasar - Tugas 1 konsep dengan petunjuk lengkap' },
  3: { tier: 3, title: 'Staf', badge: '💼', minXp: 1500, description: 'Menengah - Gabungan 2-3 konsep, hint bertingkat' },
  4: { tier: 4, title: 'Senior Staf', badge: '⭐', minXp: 3500, description: 'Mahir - Tugas multi-langkah dan scope change' },
  5: { tier: 5, title: 'Supervisor', badge: '🎯', minXp: 7000, description: 'Profesional - Brief ambigu, klarifikasi mandiri' },
  6: { tier: 6, title: 'Manajer', badge: '🏆', minXp: 12000, description: 'Expert - Solusi terbuka, efisiensi & kemudahan dirawat' },
  7: { tier: 7, title: 'Direktur', badge: '👑', minXp: 20000, description: 'Master - Proyek lintas modul, audit & arsitektur sistem' },
};

export type CharacterId = 'sari' | 'dimas' | 'maya' | 'intan' | 'reza' | 'hendra' | 'nadia' | 'klien';

export type CharacterExpression = 'normal' | 'happy' | 'thinking' | 'surprised' | 'stern' | 'proud' | 'confused';

export interface Character {
  id: CharacterId;
  name: string;
  role: string;
  department: string;
  avatarBg: string;
  personality: string;
  greeting: string;
}

export interface CellData {
  raw: string; // user input e.g. "=SUM(A1:A5)" or "50000"
  formatted?: string; // "Rp 50.000"
  computed?: string | number | boolean | null;
  format?: 'text' | 'rupiah' | 'percent' | 'number' | 'date';
  isHeader?: boolean;
  highlight?: boolean;
}

export type SheetGrid = Record<string, CellData>; // key e.g. "A1", "B2"

export interface LevelObjective {
  id: string;
  text: string;
  completed: boolean;
  hint?: string;
}

export interface RubricScore {
  correctness: number; // 0-100 (Benar)
  efficiency: number; // 0-100 (Efisien)
  neatness: number; // 0-100 (Rapi)
  maintainability: number; // 0-100 (Mudah Dirawat)
  communication: number; // 0-100 (Komunikasi / Konvensi Standar)
  total: number; // 0-100
  feedback: string[];
}

export interface ValidationResult {
  passed: boolean;
  score: RubricScore;
  details: {
    rule: string;
    passed: boolean;
    message: string;
  }[];
  bossRemark: string;
}

export interface DialogueChoice {
  id: string;
  text: string;
  type: 'communication' | 'priority' | 'ethics';
  response: string;
  repGain?: number;
  ethicsRating?: 'high' | 'neutral' | 'low';
  nextLineId?: string;
}

export interface DialogueNode {
  id?: string;
  speaker: CharacterId | 'player';
  text: string;
  expression?: CharacterExpression;
  choices?: DialogueChoice[];
}

export interface LevelItem {
  id: string;
  module: ModuleType;
  track?: 'js' | 'web';
  scale?: DocumentScale;
  docType?: string;
  tier: TierLevel;
  chapter: number;
  order: number;
  title: string;
  subtitle: string;
  isBoss?: boolean;
  story: string;
  character: CharacterId;
  dialogue: DialogueNode[];
  conceptBrief: string;
  workedExample: string;
  objectives: LevelObjective[];
  initialData: {
    excel?: SheetGrid;
    code?: string;
    word?: string; // HTML string
    html?: string;
    css?: string;
  };
  hints: [string, string, string, ...string[]] | string[]; // Hint 1, 2, 3+
  bossHelp: string; // Free after 3 fails
  referenceSolution: string;
  solutionExplanation: string;
  commonMistakes: string[];
  xpReward: number;
  coinReward: number;
  estimatedMinutes: number;
  skillsTaught: string[];
  prerequisiteSkills?: string[];
  testCases?: {
    input?: any;
    expected: any;
    description: string;
    hidden?: boolean;
  }[];
  webRequirements?: {
    requiredTags?: string[];
    requiredClasses?: string[];
    minMediaQueries?: number;
    requireFlexbox?: boolean;
    requireGrid?: boolean;
    requireSemantic?: boolean;
    requireImgAlt?: boolean;
    responsiveCheck?: boolean;
  };
  wordRequirements?: {
    scale?: DocumentScale;
    minWords?: number;
    requiredKeywords?: string[];
    requireH1?: boolean;
    requireH2?: boolean;
    requireTable?: boolean;
    minTableRows?: number;
    requireList?: boolean;
    requireBold?: boolean;
    academicPreset?: boolean;
    requireFootnote?: boolean;
  };
}

export interface CaseFile {
  id: string;
  code?: string;
  title: string;
  industry: string;
  tier: TierLevel;
  scale?: 'mikro' | 'kecil' | 'menengah' | 'besar' | 'akademik';
  businessFunction?: string;
  module: ModuleType;
  modules?: ('excel' | 'word' | 'web' | 'js')[];
  requires?: string[];
  estimatedMinutes?: number;
  tags?: string[];
  stakeholders?: {
    nama: string;
    peran: string;
    kepentingan: string;
    gayaBicara: string;
  }[];
  timeline?: {
    hour: number;
    event: string;
  }[];
  attachments?: {
    type: 'csv' | 'lembar-excel' | 'foto-nota' | 'ekspor-chat' | 'teks-pdf' | 'email-berantai';
    name: string;
    description: string;
  }[];
  dataPack?: {
    generatorRef: string;
    variantsCount: number;
    anomalies: string[];
  };
  deliverables?: {
    name: string;
    module: ModuleType;
    specification: string;
    requiredElements: string[];
  }[];
  decisionPoints?: {
    title: string;
    scenario: string;
    options: {
      label: string;
      impact: string;
      isOptimal: boolean;
    }[];
  }[];
  scopeChanges?: {
    hour: number;
    description: string;
    impact: string;
  }[];
  handover?: {
    summary: string;
    assumptions: string[];
    precautions: string[];
    nextSteps: string[];
  };
  pitfalls?: string[];
  linkedLessons?: string[];
  templatesUnlocked?: string[];
  modifiers?: string[];
  channel: 'email' | 'whatsapp' | 'voicenote' | 'nota';
  deadlineHours: number;
  clientName: string;
  character: CharacterId;
  summary: string;
  emails: {
    from: string;
    subject: string;
    timestamp: string;
    body: string;
    attachments?: string[];
  }[];
  chats: {
    sender: string;
    role?: string;
    time: string;
    message: string;
    channel?: 'whatsapp' | 'slack';
  }[];
  voiceNotes?: {
    speaker: string;
    duration: string;
    transcript: string;
  }[];
  clarifyingQuestions: {
    id: string;
    question: string;
    options: {
      id: string;
      text: string;
      isOptimal: boolean;
      bossResponse: string;
    }[];
  }[];
  scopeChange?: {
    triggerAfterMinutes: number;
    sender: string;
    message: string;
    newObjective: string;
  };
  initialData: {
    excel?: SheetGrid;
    code?: string;
    word?: string;
    html?: string;
    css?: string;
  };
  referenceSolutions: string[];
  reputationReward: number;
  xpReward: number;
  coinsReward: number;
  mentorDebrief: {
    keyTakeaway: string;
    pitfallAvoided: string;
    industryContext: string;
  };
}

export interface ErrorLogItem {
  id: string;
  levelId: string;
  levelTitle: string;
  module: ModuleType;
  tier: TierLevel;
  userAttempt: string;
  mistakeDescription: string;
  explanation: string;
  timestamp: string;
  resolved: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'career' | 'excel' | 'coding' | 'web' | 'word' | 'speed' | 'audit';
  unlockedAt?: string;
  targetCount: number;
  currentCount: number;
}

export interface CosmeticItem {
  id: string;
  name: string;
  category: 'avatar' | 'desk' | 'decor' | 'badge';
  cost: number;
  icon: string;
  unlocked: boolean;
}

export interface PlayerProfile {
  name: string;
  avatar: string;
  xp: number;
  coins: number;
  streakDays: number;
  streakFreeze: number;
  lastActiveDate: string;
  currentTier: TierLevel;
  moduleMastery: {
    excel: number; // 0 - 100
    word: number;
    coding: number;
    web: number;
  };
  reputation: Record<CharacterId, number>; // 0 - 100
  completedLevelIds: string[];
  levelStars: Record<string, number>; // levelId -> 1, 2, or 3
  unlockedAchievements: string[];
  inventory: string[];
  equipped: {
    avatar: string;
    desk: string;
    decor: string;
  };
  soundEnabled: boolean;
  theme: 'light' | 'dark' | 'office-warm';
  hasCompletedOnboarding: boolean;
  // PATCH v9 Semesta Keterampilan additions
  domainMastery?: Record<string, number>; // DomainId -> 0-100
  skillMastery?: Record<string, number>; // skillId -> 0-100
  targetRoleId?: string;
}
