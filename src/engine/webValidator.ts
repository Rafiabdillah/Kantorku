import { RubricScore } from '../types';

export interface WebValidationRequirements {
  requiredTags?: string[];
  requiredClasses?: string[];
  requireSemantic?: boolean;
  requireImgAlt?: boolean;
  requireFlexbox?: boolean;
  requireGrid?: boolean;
  minMediaQueries?: number;
  responsiveCheck?: boolean;
}

export function validateWebContent(
  html: string,
  css: string,
  req: WebValidationRequirements
): { passed: boolean; score: RubricScore; feedback: string[] } {
  const feedback: string[] = [];
  const unmet: string[] = [];

  let correctness = 100;
  let neatness = 90;
  let efficiency = 95;
  let maintainability = 90;
  let communication = 90;

  const lowerHtml = html.toLowerCase();
  const lowerCss = css.toLowerCase();

  const hasMarkup = /<[a-z][^>]*>/i.test(html.replace(/<!--[\s\S]*?-->/g, ''));
  if (!hasMarkup) {
    const emptyScore = {
      correctness: 0,
      neatness: 0,
      efficiency: 0,
      maintainability: 0,
      communication: 0,
      total: 0,
      feedback: ['Panel HTML masih kosong. Bangun struktur halamanmu lebih dulu sebelum mengirim.'],
    };
    return { passed: false, score: emptyScore, feedback: emptyScore.feedback };
  }

  // 1. Required tags
  if (req.requiredTags) {
    for (const tag of req.requiredTags) {
      const regex = new RegExp(`<${tag}[\\s>]`, 'i');
      if (!regex.test(html)) {
        correctness -= 25;
        unmet.push(`Tag wajib <${tag}> belum ditemukan di dalam HTML.`);
      }
    }
  }

  // 2. Img with alt attribute
  if (req.requireImgAlt && lowerHtml.includes('<img')) {
    if (!/<img[^>]+alt=["'][^"']+["']/i.test(html)) {
      neatness -= 20;
      communication -= 20;
      unmet.push('Tag <img> wajib memiliki atribut "alt" untuk aksesibilitas dan SEO.');
    }
  }

  // 3. Semantic tags
  if (req.requireSemantic) {
    const hasHeader = /<header[\s>]/i.test(html);
    const hasMain = /<main[\s>]/i.test(html);
    const hasFooter = /<footer[\s>]/i.test(html);

    if (!hasHeader || !hasMain || !hasFooter) {
      correctness -= 15;
      neatness -= 20;
      maintainability -= 20;
      unmet.push('Gunakan elemen semantik HTML5 modern (<header>, <main>, <footer>) untuk struktur yang rapi.');
    }
  }

  // 4. Flexbox check
  if (req.requireFlexbox && !lowerCss.includes('display: flex') && !lowerCss.includes('display:flex')) {
    correctness -= 30;
    unmet.push('Gunakan CSS Flexbox ("display: flex") untuk tata letak elemen.');
  }

  // 5. CSS Grid check
  if (req.requireGrid && !lowerCss.includes('display: grid') && !lowerCss.includes('display:grid')) {
    correctness -= 30;
    unmet.push('Gunakan CSS Grid ("display: grid") untuk menyusun kolom layout.');
  }

  // 6. Media queries (Responsive)
  if (req.minMediaQueries) {
    const mqMatches = lowerCss.match(/@media[^{]+\{/gi) || [];
    if (mqMatches.length < req.minMediaQueries) {
      maintainability -= 25;
      efficiency -= 15;
      unmet.push(`Wajib menyertakan minimal ${req.minMediaQueries} breakpoint responsif (@media query).`);
    }
  }

  // 7. Required class names (must appear in markup or stylesheet)
  if (req.requiredClasses) {
    for (const cls of req.requiredClasses) {
      const token = cls.toLowerCase();
      if (!lowerHtml.includes(token) && !lowerCss.includes(`.${token}`)) {
        correctness -= 25;
        unmet.push(`Class wajib ".${cls}" belum dipakai di HTML maupun CSS.`);
      }
    }
  }

  correctness = Math.max(0, Math.round(correctness));
  neatness = Math.max(0, Math.round(neatness));
  efficiency = Math.max(0, Math.round(efficiency));
  maintainability = Math.max(0, Math.round(maintainability));
  communication = Math.max(0, Math.round(communication));

  const total = Math.round(
    correctness * 0.35 + neatness * 0.2 + efficiency * 0.15 + maintainability * 0.15 + communication * 0.15
  );

  const passed = unmet.length === 0 && total >= 70 && correctness >= 60;

  feedback.push(...unmet);

  if (passed && feedback.length === 0) {
    feedback.push('Kode web HTML & CSS sangat bersih, semantik, responsif, dan siap dideploy!');
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
