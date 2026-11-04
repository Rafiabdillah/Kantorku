import test from 'node:test';
import assert from 'node:assert/strict';
import {
  parseSaveFileJson,
  buildSaveFileJson,
  suggestSaveFileName,
  SAVE_FILE_KIND,
} from '../services/saveFile';
import { initialProfile } from '../store/useGameStore';

const validProfile = {
  ...initialProfile,
  name: 'Toni Uji',
  coins: 777,
  xp: 4321,
  currentTier: 4,
  hasCompletedOnboarding: true,
};

test('Save file: new-format payload parses with summary', () => {
  const json = buildSaveFileJson(validProfile as unknown as Record<string, unknown>);
  const res = parseSaveFileJson(json);
  assert.equal(res.ok, true);
  assert.equal(res.summary?.name, 'Toni Uji');
  assert.equal(res.summary?.coins, 777);
  assert.equal(res.summary?.tier, 4);
  assert.equal(res.summary?.xp, 4321);
  assert.equal(typeof res.summary?.exportedAt, 'string');
  assert.equal((res.profile as any).name, 'Toni Uji');
});

test('Save file: exported payload round-trips through import', () => {
  const json = buildSaveFileJson(validProfile as unknown as Record<string, unknown>);
  const res = parseSaveFileJson(json);
  assert.equal(res.ok, true);
  assert.deepEqual((res.profile as any).unlockedAchievements, validProfile.unlockedAchievements);
  assert.deepEqual((res.profile as any).inventory, validProfile.inventory);
});

test('Save file: legacy raw profile shape is accepted', () => {
  const res = parseSaveFileJson(JSON.stringify({ name: 'Budi', coins: 50, xp: 10, currentTier: 1 }));
  assert.equal(res.ok, true);
  assert.equal(res.summary?.name, 'Budi');
});

test('Save file: invalid JSON is rejected with friendly message', () => {
  const res = parseSaveFileJson('bukan json');
  assert.equal(res.ok, false);
  assert.match(res.message, /bukan JSON/);
});

test('Save file: missing name is rejected', () => {
  const res = parseSaveFileJson(JSON.stringify({ coins: 100, xp: 0, currentTier: 1 }));
  assert.equal(res.ok, false);
  assert.match(res.message, /nama/);
});

test('Save file: non-numeric coins is rejected', () => {
  const res = parseSaveFileJson(JSON.stringify({ name: 'X', coins: 'banyak', xp: 0, currentTier: 1 }));
  assert.equal(res.ok, false);
  assert.match(res.message, /koin/);
});

test('Save file: negative xp is rejected', () => {
  const res = parseSaveFileJson(JSON.stringify({ name: 'X', coins: 1, xp: -5, currentTier: 1 }));
  assert.equal(res.ok, false);
  assert.match(res.message, /XP/);
});

test('Save file: tier below 1 is rejected', () => {
  const res = parseSaveFileJson(JSON.stringify({ name: 'X', coins: 1, xp: 0, currentTier: 0 }));
  assert.equal(res.ok, false);
  assert.match(res.message, /Tier/);
});

test('Save file: tier above the highest known job is rejected', () => {
  const res = parseSaveFileJson(JSON.stringify({ name: 'X', coins: 1, xp: 0, currentTier: 99 }));
  assert.equal(res.ok, false);
  assert.match(res.message, /Tier/);
});

test('Save file: restored profile is flagged as onboarding-complete so boot cannot wipe it', () => {
  const res = parseSaveFileJson(JSON.stringify({ name: 'Budi', coins: 50, xp: 10, currentTier: 1 }));
  assert.equal(res.ok, true);
  assert.equal((res.profile as any).hasCompletedOnboarding, true);
});

test('Save file: non-array inventory is rejected', () => {
  const res = parseSaveFileJson(
    JSON.stringify({ name: 'X', coins: 1, xp: 0, currentTier: 1, inventory: 'desk-kayu' })
  );
  assert.equal(res.ok, false);
  assert.match(res.message, /inventory/);
});

test('Save file: wrapper with unknown kind is rejected', () => {
  const payload = JSON.stringify({ app: 'kantorku', kind: 'bukan-save', profile: validProfile });
  const res = parseSaveFileJson(payload);
  assert.equal(res.ok, false);
  assert.match(res.message, /nama/);
});

test('Save file: suggested filename is sanitized and dated', () => {
  const name = suggestSaveFileName('Budi Pratama!', new Date('2026-11-03T00:00:00Z'));
  assert.equal(name, 'kantorku_progres_budi_pratama_2026-11-03.json');
});

test('Save file: kind constant is stable', () => {
  assert.equal(SAVE_FILE_KIND, 'save-game-progress');
});
