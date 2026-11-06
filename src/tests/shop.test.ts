import test from 'node:test';
import assert from 'node:assert/strict';
import { useGameStore, initialProfile } from '../store/useGameStore';

const reset = (coins: number) =>
  useGameStore.setState({
    profile: { ...initialProfile, hasCompletedOnboarding: true, coins, inventory: [], xpClaims: {} },
  });

test('buying an item spends coins once and equips it', () => {
  reset(500);
  assert.equal(useGameStore.getState().buyCosmetic('desk-wood', 200, 'desk'), true);
  const p = useGameStore.getState().profile;
  assert.equal(p.coins, 300);
  assert.deepEqual(p.inventory, ['desk-wood']);
  assert.equal(p.equipped.desk, 'desk-wood');
});

test('buying with too few coins fails and changes nothing', () => {
  reset(100);
  assert.equal(useGameStore.getState().buyCosmetic('desk-wood', 200, 'desk'), false);
  const p = useGameStore.getState().profile;
  assert.equal(p.coins, 100);
  assert.deepEqual(p.inventory, []);
});

test('an owned item is never charged twice', () => {
  reset(500);
  useGameStore.getState().buyCosmetic('desk-wood', 200, 'desk');
  assert.equal(useGameStore.getState().buyCosmetic('desk-wood', 200, 'desk'), true);
  const p = useGameStore.getState().profile;
  assert.equal(p.coins, 300);
  assert.equal(p.inventory.filter((i) => i === 'desk-wood').length, 1);
});

test('negative or invalid prices are rejected', () => {
  reset(500);
  assert.equal(useGameStore.getState().buyCosmetic('x', -100, 'decor'), false);
  assert.equal(useGameStore.getState().buyCosmetic('y', Number.NaN, 'decor'), false);
  assert.equal(useGameStore.getState().profile.coins, 500);
});
