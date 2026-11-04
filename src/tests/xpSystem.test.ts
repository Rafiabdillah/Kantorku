import test from 'node:test';
import assert from 'node:assert/strict';
import {
  useGameStore,
  initialProfile,
  grantXp,
  dayDiff,
  localDateKey,
} from '../store/useGameStore';
import { LEVELS } from '../content/levels';

const reset = (over: Partial<typeof initialProfile> = {}) =>
  useGameStore.setState({
    profile: { ...initialProfile, hasCompletedOnboarding: true, xpClaims: {}, ...over },
    lastReward: null,
  });

test('grantXp: promotes tier at the threshold and never demotes', () => {
  assert.equal(grantXp({ ...initialProfile, xp: 490 }, 10).currentTier, 2);
  assert.equal(grantXp({ ...initialProfile, xp: 0, currentTier: 4 }, 5).currentTier, 4);
  assert.equal(grantXp({ ...initialProfile }, -50).xp, 0);
  assert.equal(grantXp({ ...initialProfile }, Number.NaN).xp, 0);
});

test('dayDiff and localDateKey use calendar days', () => {
  assert.equal(dayDiff('2026-11-03', '2026-11-04'), 1);
  assert.equal(dayDiff('2026-02-28', '2026-03-01'), 1);
  assert.equal(dayDiff('2026-11-04', '2026-11-04'), 0);
  assert.match(localDateKey(new Date(2026, 0, 5)), /^2026-01-05$/);
});

test('recordMissionSuccess: first clear gives full reward and promotes tier', () => {
  const lvl = LEVELS[0];
  reset({ xp: 500 - lvl.xpReward + 1 > 0 ? 500 - lvl.xpReward : 0 });
  const r = useGameStore.getState().recordMissionSuccess(lvl.id, 3, lvl.xpReward, lvl.coinReward);
  assert.equal(r.firstClear, true);
  assert.equal(r.xp, lvl.xpReward);
  assert.equal(useGameStore.getState().profile.xp, Math.max(0, 500 - lvl.xpReward) + lvl.xpReward);
  assert.ok(useGameStore.getState().profile.completedLevelIds.includes(lvl.id));
});

test('recordMissionSuccess: tier rises when mission XP crosses the threshold', () => {
  const lvl = LEVELS[0];
  reset({ xp: 499 });
  const r = useGameStore.getState().recordMissionSuccess(lvl.id, 3, Math.max(1, lvl.xpReward), 0);
  assert.equal(r.tierUp, 2);
  assert.equal(useGameStore.getState().profile.currentTier, 2);
});

test('recordMissionSuccess: resubmitting cannot farm XP; only extra stars give a bonus', () => {
  const lvl = LEVELS[0];
  reset();
  const st = useGameStore.getState();
  st.recordMissionSuccess(lvl.id, 1, 100, 40);
  const afterFirst = useGameStore.getState().profile;
  const again = useGameStore.getState().recordMissionSuccess(lvl.id, 1, 100, 40);
  assert.equal(again.xp, 0);
  assert.equal(again.coins, 0);
  assert.equal(useGameStore.getState().profile.xp, afterFirst.xp);
  const better = useGameStore.getState().recordMissionSuccess(lvl.id, 3, 100, 40);
  assert.equal(better.xp, 50); // 25% x 2 bintang baru
  assert.equal(useGameStore.getState().profile.levelStars[lvl.id], 3);
});

test('awardOnce: grants a key only once', () => {
  reset();
  const a = useGameStore.getState().awardOnce('case:x', 100, 20);
  const b = useGameStore.getState().awardOnce('case:x', 100, 20);
  assert.equal(a.granted, true);
  assert.equal(b.granted, false);
  assert.equal(useGameStore.getState().profile.xp, 100);
  assert.equal(useGameStore.getState().profile.coins, initialProfile.coins + 20);
});

test('addXp: lesson bonus promotes tier too', () => {
  reset({ xp: 480 });
  useGameStore.getState().recordLessonStreak();
  assert.equal(useGameStore.getState().profile.currentTier, 2);
});

test('checkStreak: freezes cover missed days, otherwise streak restarts', () => {
  const today = localDateKey();
  const daysAgo = (n: number) => localDateKey(new Date(Date.now() - n * 86400000));
  reset({ streakDays: 5, streakFreeze: 1, lastActiveDate: daysAgo(1) });
  useGameStore.getState().checkStreak();
  assert.equal(useGameStore.getState().profile.streakDays, 6);
  reset({ streakDays: 5, streakFreeze: 1, lastActiveDate: daysAgo(2) });
  useGameStore.getState().checkStreak();
  assert.equal(useGameStore.getState().profile.streakDays, 6);
  assert.equal(useGameStore.getState().profile.streakFreeze, 0);
  reset({ streakDays: 5, streakFreeze: 1, lastActiveDate: daysAgo(4) });
  useGameStore.getState().checkStreak();
  assert.equal(useGameStore.getState().profile.streakDays, 1);
  reset({ streakDays: 5, lastActiveDate: today });
  useGameStore.getState().checkStreak();
  assert.equal(useGameStore.getState().profile.streakDays, 5);
});

test('updateReputation: a score of 0 is not reset to 50', () => {
  reset({ reputation: { ...initialProfile.reputation, sari: 0 } });
  useGameStore.getState().updateReputation('sari', 5);
  assert.equal(useGameStore.getState().profile.reputation.sari, 5);
});

test('syncTierFromXp: catches up a legacy profile and never demotes', () => {
  reset({ xp: 1570, currentTier: 1 });
  useGameStore.getState().syncTierFromXp();
  assert.equal(useGameStore.getState().profile.currentTier, 3);

  reset({ xp: 100, currentTier: 5 });
  useGameStore.getState().syncTierFromXp();
  assert.equal(useGameStore.getState().profile.currentTier, 5);
  assert.equal(useGameStore.getState().profile.xp, 100);
});
