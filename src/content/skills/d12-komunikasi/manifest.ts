/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D12: Komunikasi Profesional - Manifest (Wave S0 Pilot)
 */

import { SkillPackManifest } from '../../../types/skills';

export const D12_MANIFEST: SkillPackManifest = {
  domain: 'D12',
  name: 'Komunikasi Profesional & Etiket Kerja',
  version: '1.0.0',
  wave: 'S0',
  depth: 'menengah',
  status: 'aktif',
  requires: ['email-editor', 'simulation-engine', 'advanced-quiz-engine'],
  description:
    'Keterampilan korespondensi email formal 3C (Clear, Concise, Courteous), etiket pesan singkat instan, teknik de-eskalasi komplain pelanggan, dan diplomasi rapat kerja.',
  lastUpdated: '2026-10-26',
};
