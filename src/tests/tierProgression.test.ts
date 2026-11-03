import test from 'node:test';
import assert from 'node:assert/strict';
import { getTierForXp, TIER_XP_THRESHOLDS } from '../store/useGameStore';
import { TIERS } from '../types';

test('Tier progression: thresholds are derived from TIERS minXp', () => {
  for (const t of [2, 3, 4, 5, 6, 7] as const) {
    assert.equal(TIER_XP_THRESHOLDS[t], TIERS[t].minXp, `Tier ${t} threshold must match TIERS.minXp`);
  }
  assert.equal(TIER_XP_THRESHOLDS[2], 500);
  assert.equal(TIER_XP_THRESHOLDS[7], 20000);
});

test('Tier progression: promotes exactly at each threshold boundary', () => {
  assert.equal(getTierForXp(0), 1);
  assert.equal(getTierForXp(499), 1);
  assert.equal(getTierForXp(500), 2);
  assert.equal(getTierForXp(1499), 2);
  assert.equal(getTierForXp(1500), 3);
  assert.equal(getTierForXp(3499), 3);
  assert.equal(getTierForXp(3500), 4);
  assert.equal(getTierForXp(6999), 4);
  assert.equal(getTierForXp(7000), 5);
  assert.equal(getTierForXp(11999), 5);
  assert.equal(getTierForXp(12000), 6);
  assert.equal(getTierForXp(19999), 6);
  assert.equal(getTierForXp(20000), 7);
  assert.equal(getTierForXp(999999), 7);
});

test('Tier progression: every level tier has a threshold for the lock hint', () => {
  // Levels used by the career map live in tiers 1-7; every tier above 1
  // must have a threshold so locked cards can display the XP requirement.
  for (const t of [2, 3, 4, 5, 6, 7] as const) {
    assert.ok(Number.isFinite(TIER_XP_THRESHOLDS[t]), `Tier ${t} must have a threshold`);
  }
});
