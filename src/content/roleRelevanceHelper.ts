/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Role Relevance Calculator
 * Strictly enforces Bagian B Rule 2:
 * 1. Key skills inherit full weight of their domain for that role.
 * 2. Non-key skills inherit half the domain weight (rounded up: Math.ceil(domainWeight / 2)).
 * 3. roleRelevance NEVER exceeds the domain weight for that role.
 * 4. Only roles requiring that domain have relevance entries.
 */

import { DomainId } from '../types/skills';
import { Role } from '../types/roles';

// Keywords or identifiers that qualify a skill as a "key skill" for a domain requirement
export const KEY_SKILL_KEYWORD_MAP: Record<string, string[]> = {
  // D12 Key Skills
  'D12-SKILL-01': ['email bisnis', 'email', 'korespondensi', 'copywriting', 'surat resmi'],
  'D12-SKILL-02': ['etiket chat', 'chat bisnis', 'chat', 'pesan instan', 'komunikasi cepat'],
  'D12-SKILL-03': ['komplain', 'empati', 'telepon', 'negosiasi', 'de-eskalasi'],

  // D1 Key Skills
  'D1-SKILL-01': ['rumus dasar-menengah', 'format', 'sort dan filter', 'vlookup', 'sumifs', 'pivot', 'lookup', 'persediaan'],

  // D2 Key Skills
  'D2-SKILL-01': ['surat resmi', 'notulen', 'template', 'penawaran', 'proposal', 'rundown'],

  // D5 Key Skills
  'D5-SKILL-01': ['javascript', 'coding', 'algoritma', 'logika'],
  'D5-SKILL-02': ['html', 'css', 'html/css', 'landing page', 'web'],

  // D14 Key Skills (Wave S1)
  'D14-SKILL-01': ['keamanan akun', 'keamanan data keuangan', 'keamanan web', 'sandi', '2fa'],
  'D14-SKILL-02': ['penipuan', 'phishing', 'privasi', 'privasi data karyawan', 'etika data', 'uu pdp'],
  'D14-SKILL-03': ['penggunaan ai', 'ai', 'prompt', 'integritas akademik'],

  // D15 Key Skills (Wave S1)
  'D15-SKILL-01': ['cv', 'portofolio', 'mengenali lowongan palsu', 'lowongan'],
  'D15-SKILL-02': ['wawancara', 'star', 'negosiasi gaji', 'gaji'],
  'D15-SKILL-03': ['skripsi', 'metodologi', 'sitasi', 'plagiarisme'],

  // D7 Key Skills (Wave S1)
  'D7-SKILL-01': ['anggaran', 'dana darurat', 'arus kas', 'keuangan pribadi'],
  'D7-SKILL-02': ['bmc', 'penetapan harga', 'wirausaha', 'umkm'],
  'D7-SKILL-03': ['arus kas', 'bep', 'titik impas', 'biaya', 'nib', 'legalitas', 'keuangan'],

  // D11 Key Skills (Wave S2a)
  'D11-SKILL-01': ['prioritas', 'matriks eisenhower', 'timeboxing', 'jadwal', 'tugas', 'file', 'email', 'produktivitas'],
  'D11-SKILL-02': ['wbs', 'jadwal', 'gantt', 'milestone', 'jalur kritis', 'manajemen proyek', 'jadwal proyek'],
  'D11-SKILL-03': ['kanban', 'git', 'risiko', 'agile', 'wip', 'standup', 'sprint'],

  // D3 Key Skills (Wave S2a)
  'D3-SKILL-01': ['storytelling', 'scqa', 'piramida', 'alur cerita', 'struktur presentasi', 'presentasi sidang'],
  'D3-SKILL-02': ['slide', 'visual', '16:9', 'tipografi', 'kontras', 'layout', 'desain slide'],
  'D3-SKILL-03': ['pitch', 'pitch deck', 'bagan', 'chart', 'visualisasi data', 'investor'],

  // D6 Key Skills (Wave S2a)
  'D6-SKILL-01': ['jurnal', 'persamaan akuntansi', 'debit kredit', 'coa', 'transaksi', 'pembukuan sederhana'],
  'D6-SKILL-02': ['buku besar', 'neraca saldo', 'rekonsiliasi', 'bank', 'persediaan', 'piutang'],
  'D6-SKILL-03': ['laporan keuangan', 'laba rugi', 'hpp', 'margin', 'neraca', 'rab', 'anggaran', 'anggaran proyek'],

  // D9 Key Skills (Wave S2b)
  'D9-SKILL-01': ['riset pasar', 'persona', 'buyer persona', 'bauran pemasaran', '4p', 'pemasaran', 'stp'],
  'D9-SKILL-02': ['copywriting', 'iklan', 'konten', 'kalender konten', 'media sosial', 'promosi', 'aida'],
  'D9-SKILL-03': ['metrik pemasaran', 'cac', 'roas', 'roi', 'ltv', 'konversi', 'kinerja pemasaran'],

  // D10 Key Skills (Wave S2b)
  'D10-SKILL-01': ['administrasi sdm', 'pkwt', 'kontrak kerja', 'pkwtt', 'ketenagakerjaan', 'sdm'],
  'D10-SKILL-02': ['payroll', 'gaji', 'lembur', 'thr', 'upah', 'penggajian', 'bpjs'],
  'D10-SKILL-03': ['manajemen kinerja', 'kpi', 'konseling', 'de-eskalasi', 'kepemimpinan', 'sbi', 'sp'],

  // D8 Key Skills (Wave S2b)
  'D8-SKILL-01': ['stok', 'persediaan', 'eoq', 'titik pesan ulang', 'rop', 'safety stock'],
  'D8-SKILL-02': ['pemasok', 'vendor', 'lead time', 'evaluasi pemasok', 'negosiasi vendor', 'sla'],
  'D8-SKILL-03': ['sop pergudangan', 'k3', 'logistik', 'pergudangan', 'keselamatan kerja', 'ongkir', 'fifo'],
};

/**
 * Computes deterministic role relevance map for a skill against all 16 roles.
 */
export function computeSkillRoleRelevance(
  skillId: string,
  domainId: DomainId,
  roles: Role[]
): Record<string, number> {
  const relevance: Record<string, number> = {};

  for (const role of roles) {
    const domainReq = role.domainRequirements.find((r) => r.domainId === domainId);
    if (!domainReq) {
      continue; // Role does not require this domain
    }

    const domainWeight = domainReq.weight;
    const reqKeySkills = (domainReq.keySkills || []).map((k) => k.toLowerCase().trim());
    const skillKeywords = (KEY_SKILL_KEYWORD_MAP[skillId] || []).map((k) => k.toLowerCase().trim());

    // Check if any keyword matches
    const isKey =
      reqKeySkills.length === 0 || // If no specific key skills listed, all skills in the domain share primary focus
      reqKeySkills.some((reqKey) =>
        skillKeywords.some((sKey) => reqKey.includes(sKey) || sKey.includes(reqKey))
      );

    const calculatedWeight = isKey ? domainWeight : Math.max(1, Math.ceil(domainWeight / 2));
    // Hard guarantee: cannot exceed domain weight
    relevance[role.id] = Math.min(domainWeight, calculatedWeight);
  }

  return relevance;
}
