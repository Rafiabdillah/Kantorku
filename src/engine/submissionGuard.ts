import { LevelItem, ModuleType, SheetGrid } from '../types';

const filledCells = (grid: SheetGrid): string[][] =>
  Object.entries(grid)
    .filter(([, cell]) => String(cell?.raw ?? '').trim() !== '')
    .map(([addr, cell]) => [addr.toUpperCase(), String(cell.raw).trim()])
    .sort((a, b) => a[0].localeCompare(b[0]));

const plainText = (markup: string) => markup.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

export interface WorkSnapshot {
  sheet: SheetGrid;
  code: string;
  word: string;
  html: string;
  css: string;
}

export const BLANK_SUBMISSION_MESSAGE =
  'Kamu belum mengubah apa pun. Kerjakan dulu sesuai target pekerjaan, lalu kirim kembali.';

export interface InitialWork {
  excel?: SheetGrid;
  code?: string;
  word?: string;
  html?: string;
  css?: string;
}

export function isBlankWork(module: ModuleType, initial: InitialWork, current: WorkSnapshot): boolean {
  switch (module) {
    case 'excel':
      return JSON.stringify(filledCells(current.sheet)) ===
        JSON.stringify(filledCells(initial.excel || {}));
    case 'web':
      return current.html.trim() === (initial.html || '').trim() &&
        current.css.trim() === (initial.css || '').trim();
    case 'coding':
      return current.code.trim() === (initial.code || '').trim();
    case 'word':
      return plainText(current.word) === plainText(initial.word || '');
    default:
      return false;
  }
}

export function isBlankWorkSubmission(level: LevelItem, current: WorkSnapshot): boolean {
  return isBlankWork(level.module, level.initialData, current);
}
