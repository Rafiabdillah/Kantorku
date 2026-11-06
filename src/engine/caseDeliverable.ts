import { CaseFile, SheetGrid } from '../types';
import { ExcelFormulaEngine } from './formula';
import { validateWebContent } from './webValidator';
import { validateWordDocument } from './wordValidator';

export interface CaseWork {
  sheet: SheetGrid;
  html: string;
  css: string;
  word: string;
}

export interface CaseDeliverableResult {
  /** false bila kasus tidak punya syarat terukur, jadi hasil kerja tidak dinilai mesin. */
  checked: boolean;
  passed: boolean;
  messages: string[];
}

export function hasMeasurableDeliverable(caseItem: CaseFile): boolean {
  return Boolean(caseItem.excelChecks?.length || caseItem.webRequirements || caseItem.wordRequirements);
}

export function evaluateCaseDeliverable(caseItem: CaseFile, work: CaseWork): CaseDeliverableResult {
  if (caseItem.excelChecks?.length) {
    const engine = new ExcelFormulaEngine(work.sheet);
    const messages: string[] = [];
    for (const check of caseItem.excelChecks) {
      const raw = String(work.sheet[check.cell]?.raw ?? '').toUpperCase();
      const actual = engine.getCellValue(check.cell);
      const valueOk =
        typeof check.expected === 'number'
          ? typeof actual === 'number' && Math.abs(actual - check.expected) < 0.005
          : String(actual).trim().toLowerCase() === check.expected.toLowerCase();
      const formulaOk = (check.formulaIncludes ?? []).every((part) => raw.includes(part.toUpperCase()));
      if (!valueOk || !formulaOk) messages.push(check.message);
    }
    return { checked: true, passed: messages.length === 0, messages };
  }
  if (caseItem.webRequirements) {
    const result = validateWebContent(work.html, work.css, caseItem.webRequirements);
    return { checked: true, passed: result.passed, messages: result.passed ? [] : result.feedback };
  }
  if (caseItem.wordRequirements) {
    const result = validateWordDocument(work.word, caseItem.wordRequirements);
    return { checked: true, passed: result.passed, messages: result.passed ? [] : result.feedback };
  }
  return { checked: false, passed: true, messages: [] };
}
