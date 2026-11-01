/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D14: Literasi Digital, Keamanan & AI - Manifest
 */

import { SkillPackManifest } from '../../../types/skills';

export const D14_MANIFEST: SkillPackManifest = {
  domain: 'D14',
  name: 'Literasi Digital, Keamanan & AI',
  version: '1.0.0',
  wave: 'S1',
  depth: 'penuh',
  status: 'aktif',
  requires: ['advanced-quiz-engine', 'simulation-engine'],
  description:
    'Keamanan akun & kata sandi 3-2-1, verifikasi dua langkah, deteksi phishing & rekayasa sosial, kepatuhan UU PDP, serta prompting terstruktur 5 elemen dan mitigasi halusinasi AI.',
  lastUpdated: '2026-10-26',
};
