import test from 'node:test';
import assert from 'node:assert/strict';
import { SETTING_SECTIONS, SETTINGS_REGISTRY, SETTING_PRESETS } from '../features/settings/registry';
import { settingsRepo, SettingsExportSchema, UserProfileSchema } from '../features/settings/settingsRepository';

test('Settings Registry: Exactly 16 standard categories are defined', () => {
  assert.equal(SETTING_SECTIONS.length, 16);
  const expectedSections = [
    'profile',
    'appearance',
    'audio',
    'locale',
    'learning',
    'story',
    'excel',
    'word',
    'code',
    'notification',
    'accessibility',
    'performance',
    'data',
    'classroom',
    'shortcuts',
    'advanced',
  ];

  for (const expected of expectedSections) {
    const found = SETTING_SECTIONS.find((s) => s.id === expected);
    assert.ok(found, `Section ${expected} must exist in SETTING_SECTIONS`);
    assert.ok(found.title.length > 0);
    assert.ok(found.description.length > 0);
  }
});

test('Settings Registry: Every section has at least one registered setting', () => {
  const registeredSections = new Set(SETTINGS_REGISTRY.map((s) => s.section));
  for (const sec of SETTING_SECTIONS) {
    assert.ok(
      registeredSections.has(sec.id),
      `Section "${sec.id}" must have at least one setting defined in SETTINGS_REGISTRY`
    );
  }
});

test('Settings Registry: All settings have valid definitions and unique keys', () => {
  const seenKeys = new Set<string>();

  for (const def of SETTINGS_REGISTRY) {
    assert.ok(!seenKeys.has(def.key), `Duplicate setting key: ${def.key}`);
    seenKeys.add(def.key);

    assert.ok(def.key.length > 0);
    assert.ok(def.label.length > 0);
    assert.ok(def.description.length > 0);
    assert.ok(['device', 'profile'].includes(def.scope));
    assert.ok(['boolean', 'select', 'slider', 'text', 'keybind', 'action'].includes(def.type));
    assert.notEqual(def.default, undefined);

    if (def.type === 'select') {
      assert.ok(Array.isArray(def.options) && def.options.length >= 2, `Select setting ${def.key} must have >= 2 options`);
    }
    if (def.type === 'slider') {
      assert.ok(typeof def.min === 'number' && typeof def.max === 'number' && def.min < def.max);
    }
  }
});

test('Settings Presets: All 4 presets contain valid registry keys', () => {
  assert.equal(SETTING_PRESETS.length, 4);
  const validKeys = new Set(SETTINGS_REGISTRY.map((s) => s.key));

  for (const preset of SETTING_PRESETS) {
    assert.ok(preset.title.length > 0);
    for (const [k, v] of Object.entries(preset.values)) {
      assert.ok(validKeys.has(k), `Preset "${preset.id}" refers to unknown key "${k}"`);
    }
  }
});

test('Settings Repository: Get, Set, and Default value retrieval', () => {
  const defaultTheme = settingsRepo.get('appearance_theme');
  assert.ok(['light', 'dark', 'system'].includes(defaultTheme));

  settingsRepo.set('appearance_theme', 'dark');
  assert.equal(settingsRepo.get('appearance_theme'), 'dark');

  settingsRepo.set('appearance_theme', 'light');
  assert.equal(settingsRepo.get('appearance_theme'), 'light');
});

test('Settings Repository: 1-Click Preset application', () => {
  settingsRepo.applyPreset('hemat_daya');
  assert.equal(settingsRepo.get('appearance_theme'), 'dark');
  assert.equal(settingsRepo.get('appearance_animations'), 'none');
  assert.equal(settingsRepo.get('perf_battery_saver'), true);

  settingsRepo.applyPreset('pemula_santai');
  assert.equal(settingsRepo.get('learning_timer_multiplier'), 2.0);
  assert.equal(settingsRepo.get('excel_autocomplete'), true);
});

test('Settings Repository: Undo last change within window', () => {
  const prevVal = settingsRepo.get('excel_separator');
  const targetVal = prevVal === 'semicolon' ? 'comma' : 'semicolon';

  settingsRepo.set('excel_separator', targetVal, true);
  assert.equal(settingsRepo.get('excel_separator'), targetVal);

  const undoSuccess = settingsRepo.undoLastChange();
  assert.equal(undoSuccess, true);
  assert.equal(settingsRepo.get('excel_separator'), prevVal);
});

test('Settings Repository: Export and Import schema validation', () => {
  const exported = settingsRepo.exportSettingsJson();
  assert.ok(typeof exported === 'string');

  const parsed = JSON.parse(exported);
  const validated = SettingsExportSchema.safeParse(parsed);
  assert.equal(validated.success, true);

  const importResult = settingsRepo.importSettingsJson(exported);
  assert.equal(importResult.success, true);
});

test('Settings Repository: PIN hashing and verification', async () => {
  const pin = '1234';
  const hash = await settingsRepo.hashPin(pin);
  assert.ok(typeof hash === 'string' && hash.length > 0);

  const valid = await settingsRepo.verifyPin('1234', hash);
  assert.equal(valid, true);

  const invalid = await settingsRepo.verifyPin('9999', hash);
  assert.equal(invalid, false);
});
