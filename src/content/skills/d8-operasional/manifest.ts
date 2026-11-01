/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D8: Operasional & Rantai Pasok - Skill Pack Manifest
 */

import { SkillPackManifest } from '../../../types/skills';

export const D8_MANIFEST: SkillPackManifest = {
  domain: 'D8',
  name: 'Operasional & Rantai Pasok',
  version: '1.0.0',
  wave: 'S2',
  depth: 'menengah',
  status: 'aktif',
  requires: ['advanced-quiz-engine'],
  description:
    'Pengendalian persediaan model EOQ, perhitungan ROP, buffer safety stock, evaluasi kinerja vendor SLA, dan SOP pergudangan K3.',
  lastUpdated: '2026-10-31',
};
