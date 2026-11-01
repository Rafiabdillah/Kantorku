/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D7: Keuangan Pribadi & Wirausaha - Manifest
 */

import { SkillPackManifest } from '../../../types/skills';

export const D7_MANIFEST: SkillPackManifest = {
  domain: 'D7',
  name: 'Keuangan Pribadi & Wirausaha',
  version: '1.0.0',
  wave: 'S1',
  depth: 'penuh',
  status: 'aktif',
  requires: ['advanced-quiz-engine', 'simulation-engine'],
  description:
    'Anggaran pribadi 50/30/20, manajemen dana darurat, arus kas bulanan, Business Model Canvas (BMC), penetapan harga HPP, dan perizinan UMKM edukatif.',
  lastUpdated: '2026-10-26',
};
