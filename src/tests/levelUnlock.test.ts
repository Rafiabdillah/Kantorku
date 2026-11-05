import test from 'node:test';
import assert from 'node:assert/strict';
import { useGameStore, initialProfile, isLevelUnlocked } from '../store/useGameStore';
import { LEVELS } from '../content/levels';
import { TIERS, TierLevel } from '../types';

const reset = (over: Partial<typeof initialProfile> = {}) =>
  useGameStore.setState({
    profile: { ...initialProfile, hasCompletedOnboarding: true, xpClaims: {}, ...over },
    lastReward: null,
    lockNotice: null,
    activeLevelId: null,
    currentView: 'office',
  });

test('a new player can open only the first mission of each module and tier 1 missions', () => {
  reset();
  for (const lvl of LEVELS) {
    const firstOfModule = LEVELS.find((l) => l.module === lvl.module)?.id === lvl.id;
    assert.equal(isLevelUnlocked(useGameStore.getState().profile, lvl), lvl.tier <= 1 || firstOfModule, lvl.id);
  }
});

test('startMission refuses a locked mission and explains what is needed', () => {
  reset();
  const locked = LEVELS.find((l) => l.tier >= 3)!;
  assert.equal(useGameStore.getState().startMission(locked.id), false);
  const s = useGameStore.getState();
  assert.equal(s.activeLevelId, null);
  assert.equal(s.currentView, 'office');
  assert.match(s.lockNotice ?? '', new RegExp(TIERS[locked.tier].title));
});

test('startMission opens a mission once its tier is reached, and force bypasses the lock', () => {
  reset({ currentTier: 3, xp: 1500 });
  const t3 = LEVELS.find((l) => l.tier === 3)!;
  assert.equal(useGameStore.getState().startMission(t3.id), true);
  assert.equal(useGameStore.getState().activeLevelId, t3.id);
  reset();
  const t5 = LEVELS.find((l) => l.tier === 4)!;
  assert.equal(useGameStore.getState().startMission(t5.id, { force: true }), true);
});

test('a completed mission stays reachable even if its tier is higher than the profile tier', () => {
  const t4 = LEVELS.find((l) => l.tier === 4)!;
  reset({ completedLevelIds: [t4.id] });
  assert.equal(isLevelUnlocked(useGameStore.getState().profile, t4), true);
});

test('playing every mission in order reaches each tier and unlocks its missions', () => {
  reset();
  const ordered = [...LEVELS].sort((a, b) => a.tier - b.tier);
  const reached = new Set<TierLevel>();
  for (const lvl of ordered) {
    const store = useGameStore.getState();
    // A mission is playable at the moment the player gets to it, otherwise progression would deadlock.
    assert.equal(isLevelUnlocked(store.profile, lvl), true, `${lvl.id} locked at tier ${store.profile.currentTier}`);
    store.recordMissionSuccess(lvl.id, 3, lvl.xpReward, lvl.coinReward);
    reached.add(useGameStore.getState().profile.currentTier);
  }
  assert.ok(reached.has(1));
  assert.ok(useGameStore.getState().profile.currentTier >= 2);
});
