import { LevelItem } from '../types';
import { EXCEL_LEVELS } from './levelsExcel';
import { WEB_LEVELS } from './levelsWeb';
import { CODING_LEVELS } from './levelsCoding';
import { WORD_LEVELS } from './levelsWord';

export const LEVELS: LevelItem[] = [
  ...EXCEL_LEVELS,
  ...WEB_LEVELS,
  ...CODING_LEVELS,
  ...WORD_LEVELS,
];
