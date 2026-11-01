/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D11: Manajemen Proyek & Produktivitas - Manifest
 */

import { SkillPackManifest } from '../../../types/skills';

export const D11_MANIFEST: SkillPackManifest = {
  domain: 'D11',
  name: 'Manajemen Proyek & Produktivitas',
  version: '1.0.0',
  wave: 'S2',
  depth: 'penuh',
  status: 'aktif',
  requires: ['advanced-quiz-engine', 'simulation-engine'],
  description:
    'Manajemen prioritas Matriks Eisenhower, pembagian tugas Work Breakdown Structure (WBS), visualisasi jadwal Gantt, papan Kanban, dan register mitigasi risiko proyek.',
  lastUpdated: '2026-10-29',
};
