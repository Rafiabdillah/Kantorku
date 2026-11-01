import { RubricScore, DocumentScale } from '../types';

export interface WordDocStructure {
  rawHtml: string;
  plainText: string;
  wordCount: number;
  paragraphCount: number;
  headings: { level: number; text: string }[];
  hasTable: boolean;
  tableRows: number;
  hasList: boolean;
  hasBold: boolean;
  hasItalic: boolean;
  hasFootnote: boolean;
  hasCoverOrTitle: boolean;
}

export function parseDocumentStructure(htmlContent: string): WordDocStructure {
  const plainText = htmlContent.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = plainText ? plainText.split(/\s+/).filter(Boolean) : [];

  const headings: { level: number; text: string }[] = [];
  const hMatches = htmlContent.matchAll(/<h([1-6])[^>]*>(.*?)<\/h\1>/gi);
  for (const m of hMatches) {
    headings.push({
      level: parseInt(m[1], 10),
      text: m[2].replace(/<[^>]+>/g, '').trim(),
    });
  }

  const pMatches = htmlContent.match(/<p[^>]*>/gi) || [];
  const hasTable = /<table[^>]*>/i.test(htmlContent);
  const tableRows = (htmlContent.match(/<tr[^>]*>/gi) || []).length;
  const hasList = /<(ul|ol)[^>]*>/i.test(htmlContent);
  const hasBold = /<(strong|b)[^>]*>/i.test(htmlContent);
  const hasItalic = /<(em|i)[^>]*>/i.test(htmlContent);
  const hasFootnote = /\[\d+\]|<sup/i.test(htmlContent);
  const hasCoverOrTitle = /<h1[^>]*>/i.test(htmlContent);

  return {
    rawHtml: htmlContent,
    plainText,
    wordCount: words.length,
    paragraphCount: Math.max(1, pMatches.length),
    headings,
    hasTable,
    tableRows,
    hasList,
    hasBold,
    hasItalic,
    hasFootnote,
    hasCoverOrTitle,
  };
}

export interface WordValidationRequirements {
  scale?: DocumentScale;
  minWords?: number;
  requiredKeywords?: string[];
  requireH1?: boolean;
  requireH2?: boolean;
  requireTable?: boolean;
  minTableRows?: number;
  requireList?: boolean;
  requireBold?: boolean;
  academicPreset?: boolean;
  requireFootnote?: boolean;
}

export function validateWordDocument(
  htmlContent: string,
  req: WordValidationRequirements
): { passed: boolean; score: RubricScore; feedback: string[] } {
  const doc = parseDocumentStructure(htmlContent);
  const feedback: string[] = [];

  let correctness = 100;
  let neatness = 90;
  let efficiency = 95;
  let maintainability = 90;
  let communication = 90;

  // 1. Min words
  if (req.minWords && doc.wordCount < req.minWords) {
    correctness -= 30;
    feedback.push(`Jumlah kata masih kurang (${doc.wordCount}/${req.minWords} kata). Lengkapi uraian dokumen.`);
  }

  // 2. Keywords
  if (req.requiredKeywords && req.requiredKeywords.length > 0) {
    const missing = req.requiredKeywords.filter((kw) => !doc.plainText.toLowerCase().includes(kw.toLowerCase()));
    if (missing.length > 0) {
      correctness -= 25 * (missing.length / req.requiredKeywords.length);
      feedback.push(`Kata kunci wajib belum tercakup: "${missing.join('", "')}".`);
    }
  }

  // 3. Headings
  if (req.requireH1 && !doc.headings.some((h) => h.level === 1)) {
    neatness -= 20;
    communication -= 15;
    feedback.push('Gunakan Judul Utama (Heading 1) agar hierarki dokumen rapi.');
  }

  if (req.requireH2 && !doc.headings.some((h) => h.level === 2)) {
    neatness -= 15;
    maintainability -= 15;
    feedback.push('Gunakan Sub-Judul (Heading 2) untuk membagi bagian dokumen.');
  }

  // 4. Table
  if (req.requireTable) {
    if (!doc.hasTable) {
      correctness -= 25;
      feedback.push('Dokumen wajib memiliki tabel ringkasan data.');
    } else if (req.minTableRows && doc.tableRows < req.minTableRows) {
      neatness -= 15;
      feedback.push(`Tabel memerlukan minimal ${req.minTableRows} baris data.`);
    }
  }

  // 5. Lists
  if (req.requireList && !doc.hasList) {
    neatness -= 15;
    feedback.push('Gunakan bullet list atau penomoran untuk poin-poin penting.');
  }

  // 6. Bold
  if (req.requireBold && !doc.hasBold) {
    neatness -= 10;
    feedback.push('Beri penekanan (Bold) pada kata kunci penting agar mudah dipindai.');
  }

  // 7. Academic Preset Requirements
  if (req.academicPreset) {
    communication += 5;
    if (doc.headings.length < 2) {
      maintainability -= 20;
      feedback.push('Standar akademik Indonesia mewajibkan struktur bab teratur (Bab 1, Rumusan Masalah, dsb).');
    }
  }

  // 8. Footnote for T5+
  if (req.requireFootnote && !doc.hasFootnote) {
    neatness -= 15;
    communication -= 15;
    feedback.push('Sertakan catatan kaki (footnote / sitasi) untuk rujukan dokumen formal.');
  }

  correctness = Math.max(0, Math.round(correctness));
  neatness = Math.max(0, Math.round(neatness));
  efficiency = Math.max(0, Math.round(efficiency));
  maintainability = Math.max(0, Math.round(maintainability));
  communication = Math.max(0, Math.round(communication));

  const total = Math.round(
    correctness * 0.35 + neatness * 0.2 + efficiency * 0.15 + maintainability * 0.15 + communication * 0.15
  );
  const passed = total >= 70 && correctness >= 60;

  if (passed && feedback.length === 0) {
    feedback.push('Struktur dokumen sangat profesional, rapi, dan memenuhi standar bisnis & akademik Indonesia.');
  }

  return {
    passed,
    score: {
      correctness,
      neatness,
      efficiency,
      maintainability,
      communication,
      total,
      feedback,
    },
    feedback,
  };
}
