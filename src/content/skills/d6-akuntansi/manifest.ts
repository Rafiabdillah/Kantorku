/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D6: Akuntansi & Keuangan Usaha - Manifest
 */

import { SkillPackManifest } from '../../../types/skills';

export const D6_MANIFEST: SkillPackManifest = {
  domain: 'D6',
  name: 'Akuntansi & Keuangan Usaha',
  version: '1.0.0',
  wave: 'S2',
  depth: 'penuh',
  status: 'aktif',
  requires: ['advanced-quiz-engine', 'simulation-engine'],
  description:
    'Persamaan dasar akuntansi, pencatatan jurnal umum debit-kredit, posting buku besar, neraca saldo, rekonsiliasi bank perbankan, perhitungan Harga Pokok Penjualan (HPP), dan penyusunan laporan laba rugi standar SAK EMKM.',
  lastUpdated: '2026-10-29',
};
