/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Save file (progres game) validation & builder.
 * Only imports pure type/constant modules, so the store can import this without cycles.
 */

import { TIERS } from '../types';

export const SAVE_FILE_KIND = 'save-game-progress';
export const GAME_STORAGE_VERSION = 2;

export interface SaveFileSummary {
  name: string;
  coins: number;
  tier: number;
  xp: number;
  exportedAt?: string;
}

export interface SaveFileParseResult {
  ok: boolean;
  message: string;
  profile?: Record<string, unknown>;
  summary?: SaveFileSummary;
}

function isFiniteNumber(v: unknown): v is number {
  return typeof v === 'number' && Number.isFinite(v);
}

function validateProfileLike(raw: unknown): { ok: boolean; message?: string } {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return { ok: false, message: 'Data profil di dalam berkas bukan objek yang valid.' };
  }
  const p = raw as Record<string, unknown>;
  if (typeof p.name !== 'string' || p.name.trim().length === 0) {
    return { ok: false, message: 'Berkas tidak memuat nama pemain yang valid.' };
  }
  if (!isFiniteNumber(p.coins) || p.coins < 0) {
    return { ok: false, message: 'Jumlah koin pada berkas tidak valid.' };
  }
  if (!isFiniteNumber(p.xp) || p.xp < 0) {
    return { ok: false, message: 'Nilai XP pada berkas tidak valid.' };
  }
  if (!(isFiniteNumber(p.currentTier) && p.currentTier in TIERS)) {
    return { ok: false, message: 'Tier karier pada berkas berada di luar jabatan yang dikenal (1-7).' };
  }
  for (const key of ['inventory', 'unlockedAchievements', 'completedLevelIds'] as const) {
    if (p[key] !== undefined && !Array.isArray(p[key])) {
      return { ok: false, message: `Kolom "${key}" harus berupa daftar.` };
    }
  }
  return { ok: true };
}

export function parseSaveFileJson(text: string): SaveFileParseResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    return { ok: false, message: 'Berkas bukan JSON yang valid.' };
  }

  let profileCandidate: unknown = parsed;
  let exportedAt: string | undefined;
  if (
    parsed &&
    typeof parsed === 'object' &&
    !Array.isArray(parsed) &&
    (parsed as Record<string, unknown>).kind === SAVE_FILE_KIND
  ) {
    const wrapper = parsed as Record<string, unknown>;
    profileCandidate = wrapper.profile;
    if (typeof wrapper.exportedAt === 'string') exportedAt = wrapper.exportedAt;
  }

  const check = validateProfileLike(profileCandidate);
  if (!check.ok) {
    return { ok: false, message: check.message ?? 'Berkas progres tidak valid.' };
  }

  const p = profileCandidate as Record<string, unknown>;
  // A save file always represents a game already in progress. Without this flag the autostart
  // boot path re-runs onboarding over the restored profile and wipes name, XP and tier.
  const restoredProfile = { ...p, hasCompletedOnboarding: true };
  return {
    ok: true,
    message: 'Berkas progres valid.',
    profile: restoredProfile,
    summary: {
      name: p.name as string,
      coins: p.coins as number,
      tier: p.currentTier as number,
      xp: p.xp as number,
      exportedAt,
    },
  };
}

export function buildSaveFileJson(
  profile: Record<string, unknown>,
  storageVersion: number = GAME_STORAGE_VERSION
): string {
  return JSON.stringify(
    {
      app: 'kantorku',
      kind: SAVE_FILE_KIND,
      storageVersion,
      exportedAt: new Date().toISOString(),
      profile,
    },
    null,
    2
  );
}

export function suggestSaveFileName(name: string, date: Date = new Date()): string {
  const safe = name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '') || 'pemain';
  const d = date.toISOString().split('T')[0];
  return `kantorku_progres_${safe}_${d}.json`;
}
