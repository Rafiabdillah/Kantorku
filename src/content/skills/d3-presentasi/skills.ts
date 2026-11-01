/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Domain D3: Presentasi & Storytelling Visual - Skills Definitions
 */

import { Skill } from '../../../types/skills';
import { ROLES } from '../../roles';
import { computeSkillRoleRelevance } from '../../roleRelevanceHelper';

export const D3_SKILLS: Skill[] = [
  {
    id: 'D3-SKILL-01',
    domain: 'D3',
    name: 'Struktur Cerita Bisnis & Alur Logika Piramida (SCQA)',
    description:
      'Penyusunan alur presentasi persuasif dengan kerangka SCQA (Situation, Complication, Question, Answer), Minto Pyramid Principle, dan kesimpulan di awal (Bottom Line Up Front / BLUF).',
    prerequisites: [],
    canDo: {
      1: 'Mengidentifikasi konteks pembuka presentasi (Situation) dan pemicu masalah (Complication).',
      2: 'Menyusun pertanyaan kunci bisnis (Question) yang langsung dijawab dengan solusi rekomendasi (Answer).',
      3: 'Menerapkan struktur Bottom Line Up Front (BLUF) agar eksekutif memahami pesan inti dalam 60 detik pertama.',
      4: 'Mengelompokkan argumen pendukung secara logis berprinsip MECE (Mutually Exclusive, Collectively Exhaustive).',
      5: 'Menyusun alur naskah presentasi sidang/evaluasi kerja dengan transisi slide yang kohesif.',
      6: 'Merancang arsitektur narasi presentasi tender bernilai tinggi untuk meyakinkan dewan direksi.',
      7: 'Mengembangkan standar panduan komunikasi eksekutif korporasi lintas direktorat.',
    },
    practiceModes: ['K'],
    linkedLessons: ['D3-LES-01'],
    linkedLevels: ['D3-LEVEL-01'],
    linkedCases: ['case-d3-01'],
    roleRelevance: computeSkillRoleRelevance('D3-SKILL-01', 'D3', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'Minto, B. (2010). The Minto Pyramid Principle: Logic in Writing and Thinking (Minto International, Inc.)',
      'Duarte, N. (2010). Resonate: Present Visual Stories that Transform Audiences (John Wiley & Sons)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine'],
  },
  {
    id: 'D3-SKILL-02',
    domain: 'D3',
    name: 'Desain Slide 16:9, Tipografi & Kontras Visual',
    description:
      'Tata letak slide modern rasio 16:9, hierarki judul aksi (Action Titles), kepatuhan rasio kontras warna WCAG, eliminasi teks bertumpuk, dan pemanfaatan ruang kosong (whitespace).',
    prerequisites: ['D3-SKILL-01'],
    canDo: {
      1: 'Mengatur kanvas presentasi ke format layar lebar 16:9 standar proyektor dan layar laptop modern.',
      2: 'Menuliskan Action Title (judul berupa kesimpulan kalimat) alih-alih judul topik satu kata yang pasif.',
      3: 'Menerapkan hierarki ukuran font terbaca (minimal 28-32pt untuk judul, 18-20pt untuk badan teks).',
      4: 'Memeriksa rasio kontras warna teks terhadap latar belakang sesuai standar aksesibilitas WCAG AA (minimal 4.5:1).',
      5: 'Memangkas teks paragraf padat menjadi 1 ide pokok per slide dengan elemen visual pendukung.',
      6: 'Merancang sistem template master slide (slide master design system) beridentitas visual konsisten.',
      7: 'Mengaudit presentasi tahunan korporasi agar bebas dari clutter visual dan mematuhi brand guideline.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D3-LES-02'],
    linkedLevels: ['D3-LEVEL-02', 'D3-LEVEL-04'],
    linkedCases: ['case-d3-01'],
    roleRelevance: computeSkillRoleRelevance('D3-SKILL-02', 'D3', ROLES),
    depth: 'menengah',
    estimatedHours: 8,
    sources: [
      'Reynolds, G. (2019). Presentation Zen: Simple Ideas on Presentation Design and Delivery (New Riders, 3rd ed.)',
      'W3C Web Content Accessibility Guidelines (WCAG) 2.2: Color Contrast (Minimum) (W3C, 2023)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine', 'simulation-engine'],
  },
  {
    id: 'D3-SKILL-03',
    domain: 'D3',
    name: 'Visualisasi Data Bagan & Eksekusi Pitch Deck',
    description:
      'Pemilihan grafik tepat (batang vs garis vs diagram sebar), peningkatan rasio data-ink, penyorotan insight dengan warna aksen, dan pembawaan pitch deck di hadapan investor/manajemen.',
    prerequisites: ['D3-SKILL-01'],
    canDo: {
      1: 'Memilih jenis bagan yang tepat untuk perbandingan kategori (batang horizontal/vertikal) dan tren waktu (garis).',
      2: 'Menghindari bagan lingkaran 3D (3D pie chart) yang mendistorsi proporsi sudut dan sulit dibaca mata.',
      3: 'Menghapus elemen dekoratif yang tidak perlu (gridline tebal, bingkai berlebih, legenda dobel) berprinsip Data-Ink Ratio.',
      4: 'Menyorot data kunci terpenting menggunakan warna aksen mencolok sementara data lain bernada abu-abu netral.',
      5: 'Menyusun struktur pitch deck 10 slide esensial (Masalah, Solusi, Pasar, Traksi, Model Bisnis, Tim, Permintaan).',
      6: 'Menuliskan catatan pembicara (speaker notes) padat untuk mengendalikan durasi presentasi maksimal 10-15 menit.',
      7: 'Mempresentasikan pitch deck secara meyakinkan dan menjawab sesi tanya jawab kritis dewan juri.',
    },
    practiceModes: ['K', 'S'],
    linkedLessons: ['D3-LES-03'],
    linkedLevels: ['D3-LEVEL-03'],
    linkedCases: ['case-d3-01'],
    roleRelevance: computeSkillRoleRelevance('D3-SKILL-03', 'D3', ROLES),
    depth: 'menengah',
    estimatedHours: 10,
    sources: [
      'Schwabish, J. (2016). Better Presentations: A Guide for Scholars, Researchers, and Wonks (Columbia University Press)',
      'Duarte, N. (2008). slide:ology: The Art and Science of Creating Great Presentations (O’Reilly Media)',
    ],
    lastReviewed: '2026-10-29',
    requires: ['advanced-quiz-engine', 'simulation-engine'],
  },
];
