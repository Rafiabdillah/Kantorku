import { SheetGrid, CellData } from '../types';

export interface EvaluationResult {
  value: any;
  error?: string;
  friendlyError?: string;
  precedents: string[];
}

// Convert "A1" to { col: 0, row: 0 }
export function parseCellAddress(addr: string): { col: number; row: number; colName: string } | null {
  const clean = addr.toUpperCase().replace(/\$/g, '');
  const match = clean.match(/^([A-Z]+)([0-9]+)$/);
  if (!match) return null;
  const colLetters = match[1];
  const rowNum = parseInt(match[2], 10) - 1;

  let colIdx = 0;
  for (let i = 0; i < colLetters.length; i++) {
    colIdx = colIdx * 26 + (colLetters.charCodeAt(i) - 64);
  }
  return { col: colIdx - 1, row: rowNum, colName: colLetters };
}

// Convert { col: 0, row: 0 } to "A1"
export function colRowToAddress(col: number, row: number): string {
  let colName = '';
  let temp = col + 1;
  while (temp > 0) {
    const rem = (temp - 1) % 26;
    colName = String.fromCharCode(65 + rem) + colName;
    temp = Math.floor((temp - 1) / 26);
  }
  return `${colName}${row + 1}`;
}

// Expand "A1:A4" into ["A1", "A2", "A3", "A4"]
export function expandRange(rangeStr: string): string[] {
  const parts = rangeStr.split(':');
  if (parts.length === 1) return [parts[0].trim().toUpperCase().replace(/\$/g, '')];
  if (parts.length !== 2) return [];

  const start = parseCellAddress(parts[0].trim());
  const end = parseCellAddress(parts[1].trim());
  if (!start || !end) return [];

  const minCol = Math.min(start.col, end.col);
  const maxCol = Math.max(start.col, end.col);
  const minRow = Math.min(start.row, end.row);
  const maxRow = Math.max(start.row, end.row);

  const addresses: string[] = [];
  for (let r = minRow; r <= maxRow; r++) {
    for (let c = minCol; c <= maxCol; c++) {
      addresses.push(colRowToAddress(c, r));
    }
  }
  return addresses;
}

// Format numbers into Indonesian currency / percent
export function formatCellValue(value: any, format?: CellData['format']): string {
  if (value === undefined || value === null || value === '') return '';
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  if (typeof value === 'string' && value.startsWith('#')) return value;

  const text = typeof value === 'number' ? '' : String(value).trim();
  const groupedThousands = /^-?\d{1,3}(\.\d{3})+$/.test(text);
  const numericText = groupedThousands ? text.replace(/\./g, '') : text;
  const num =
    typeof value === 'number'
      ? value
      : /^-?\d+(?:\.\d+)?$/.test(numericText)
      ? Number(numericText)
      : NaN;

  if (!isNaN(num) && format) {
    if (format === 'rupiah') {
      return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num);
    }
    if (format === 'percent') {
      return `${(num * 100).toFixed(num % 1 === 0 ? 0 : 1)}%`;
    }
    if (format === 'number') {
      return new Intl.NumberFormat('id-ID').format(num);
    }
  }

  return String(value);
}

// Split argument string by top-level commas OR semicolons
export function splitArguments(argString: string): string[] {
  const args: string[] = [];
  let current = '';
  let depth = 0;
  let inQuote = false;

  for (let i = 0; i < argString.length; i++) {
    const char = argString[i];
    if (char === '"' && argString[i - 1] !== '\\') {
      inQuote = !inQuote;
      current += char;
    } else if (!inQuote && (char === '(' || char === '[')) {
      depth++;
      current += char;
    } else if (!inQuote && (char === ')' || char === ']')) {
      depth--;
      current += char;
    } else if (!inQuote && depth === 0 && (char === ',' || char === ';')) {
      args.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  if (current.trim().length > 0 || args.length > 0) {
    args.push(current.trim());
  }
  return args;
}

export class ExcelFormulaEngine {
  private grid: SheetGrid;

  constructor(grid: SheetGrid) {
    this.grid = grid;
  }

  public updateGrid(grid: SheetGrid) {
    this.grid = grid;
  }

  // Get raw or computed value of a cell
  public getCellValue(address: string, visited: Set<string> = new Set()): any {
    const cleanAddr = address.toUpperCase().replace(/\$/g, '');
    const cell = this.grid[cleanAddr];
    if (!cell) return 0;
    const raw = String(cell.raw ?? '').trim();
    if (!raw.startsWith('=')) {
      if (raw === '') return 0;
      if (raw.toLowerCase() === 'true') return true;
      if (raw.toLowerCase() === 'false') return false;
      const num = Number(raw);
      return !isNaN(num) ? num : raw;
    }

    if (visited.has(cleanAddr)) {
      return '#CIRCULAR!';
    }
    const newVisited = new Set(visited);
    newVisited.add(cleanAddr);

    const res = this.evaluateFormula(raw.substring(1), newVisited);
    return res.value;
  }

  // Evaluate an expression like "SUM(A1:A5) + 10" or "IF(B2>10; 100; 50)"
  public evaluateFormula(expr: string, visited: Set<string> = new Set()): EvaluationResult {
    const trimmed = expr.trim();
    const precedents: string[] = [];

    if (!trimmed) {
      return { value: 0, precedents };
    }

    try {
      const val = this.evalExpression(trimmed, visited, precedents);
      return { value: val, precedents };
    } catch (err: any) {
      const errStr = String(err?.message || err);
      let friendly = 'Terjadi kesalahan pada rumus Anda.';
      if (errStr.includes('#DIV/0!')) friendly = '#DIV/0! artinya ada pembagian dengan angka nol. Cek sel pembaginya.';
      if (errStr.includes('#N/A')) friendly = '#N/A artinya data yang dicari tidak ditemukan di rentang referensi.';
      if (errStr.includes('#VALUE!')) friendly = '#VALUE! artinya tipe data tidak sesuai (misal menjumlahkan teks).';
      if (errStr.includes('#NAME?')) friendly = '#NAME? artinya nama rumus atau referensi tidak dikenali.';
      if (errStr.includes('#REF!')) friendly = '#REF! artinya referensi alamat sel tidak sah.';

      return {
        value: errStr.startsWith('#') ? errStr : '#ERROR!',
        error: errStr,
        friendlyError: friendly,
        precedents,
      };
    }
  }

  private evalExpression(expr: string, visited: Set<string>, precedents: string[]): any {
    let clean = expr.trim();

    // Check for string literal "text"
    if (clean.startsWith('"') && clean.endsWith('"') && clean.length >= 2) {
      return clean.slice(1, -1);
    }

    // Check for comparison operators at top level
    const compMatch = this.findTopLevelOperator(clean, ['<=', '>=', '<>', '=', '<', '>']);
    if (compMatch) {
      const left = this.evalExpression(compMatch.left, visited, precedents);
      const right = this.evalExpression(compMatch.right, visited, precedents);
      switch (compMatch.op) {
        case '=':
          return left === right;
        case '<>':
          return left !== right;
        case '<':
          return Number(left) < Number(right);
        case '<=':
          return Number(left) <= Number(right);
        case '>':
          return Number(left) > Number(right);
        case '>=':
          return Number(left) >= Number(right);
      }
    }

    // Urutan prioritas Excel: perbandingan, &, + -, * /, ^. Operator terendah dipisah lebih dulu.
    // Check for string concat &
    const concatMatch = this.findTopLevelOperator(clean, ['&']);
    if (concatMatch) {
      const left = this.evalExpression(concatMatch.left, visited, precedents);
      const right = this.evalExpression(concatMatch.right, visited, precedents);
      return `${left}${right}`;
    }

    // Check for addition and subtraction at top level
    const addSubMatch = this.findTopLevelOperator(clean, ['+', '-']);
    if (addSubMatch) {
      const left = this.evalExpression(addSubMatch.left, visited, precedents);
      const right = this.evalExpression(addSubMatch.right, visited, precedents);
      return addSubMatch.op === '+' ? Number(left) + Number(right) : Number(left) - Number(right);
    }

    // Check for multiplication and division
    const mulDivMatch = this.findTopLevelOperator(clean, ['*', '/']);
    if (mulDivMatch) {
      const left = this.evalExpression(mulDivMatch.left, visited, precedents);
      const right = this.evalExpression(mulDivMatch.right, visited, precedents);
      if (mulDivMatch.op === '/') {
        if (Number(right) === 0) throw new Error('#DIV/0!');
        return Number(left) / Number(right);
      }
      return Number(left) * Number(right);
    }

    // Pangkat (^), rata kiri seperti Excel
    const powMatch = this.findTopLevelOperator(clean, ['^']);
    if (powMatch) {
      const left = Number(this.evalExpression(powMatch.left, visited, precedents));
      const right = Number(this.evalExpression(powMatch.right, visited, precedents));
      return Math.pow(left, right);
    }

    // Tanda minus/plus di depan, mis. =-B1
    if (clean.startsWith('-')) {
      return -Number(this.evalExpression(clean.slice(1), visited, precedents));
    }
    if (clean.startsWith('+')) {
      return this.evalExpression(clean.slice(1), visited, precedents);
    }

    // Persen di belakang angka, mis. =B1*10%
    if (clean.endsWith('%') && clean.length > 1) {
      return Number(this.evalExpression(clean.slice(0, -1), visited, precedents)) / 100;
    }

    // Kurung pengelompok, mis. =B1*(1-C1)
    if (clean.startsWith('(') && clean.endsWith(')')) {
      let depth = 0;
      let inQuote = false;
      let wraps = true;
      for (let i = 0; i < clean.length; i++) {
        const ch = clean[i];
        if (ch === '"') inQuote = !inQuote;
        if (inQuote) continue;
        if (ch === '(') depth++;
        else if (ch === ')') {
          depth--;
          if (depth === 0 && i < clean.length - 1) {
            wraps = false;
            break;
          }
        }
      }
      if (wraps && depth === 0) return this.evalExpression(clean.slice(1, -1), visited, precedents);
    }

    // Check for function calls like FUNCTION_NAME(...)
    const funcMatch = clean.match(/^([A-Z0-9_]+)\((.*)\)$/i);
    if (funcMatch) {
      const fnName = funcMatch[1].toUpperCase();
      const rawArgs = funcMatch[2];
      const argList = splitArguments(rawArgs);
      return this.executeFunction(fnName, argList, visited, precedents);
    }

    // Check if it's a cell reference like A1 or $A$1
    const addr = parseCellAddress(clean);
    if (addr) {
      const canonical = colRowToAddress(addr.col, addr.row);
      precedents.push(canonical);
      return this.getCellValue(canonical, visited);
    }

    // Check if it's a number
    const num = Number(clean);
    if (!isNaN(num)) return num;

    // Boolean
    if (clean.toUpperCase() === 'TRUE') return true;
    if (clean.toUpperCase() === 'FALSE') return false;

    throw new Error('#NAME?');
  }

  private findTopLevelOperator(expr: string, ops: string[]): { left: string; right: string; op: string } | null {
    let depth = 0;
    let inQuote = false;

    // Scan from right to left for left-associative operators
    for (let i = expr.length - 1; i >= 0; i--) {
      const char = expr[i];
      if (char === '"' && expr[i - 1] !== '\\') inQuote = !inQuote;
      if (inQuote) continue;

      if (char === ')' || char === ']') depth++;
      else if (char === '(' || char === '[') depth--;
      else if (depth === 0) {
        for (const op of ops) {
          if (expr.substring(i - op.length + 1, i + 1) === op) {
            const left = expr.substring(0, i - op.length + 1).trim();
            const right = expr.substring(i + 1).trim();
            if (left.length > 0 && right.length > 0) {
              return { left, right, op };
            }
          }
        }
      }
    }
    return null;
  }

  /** Cocokkan nilai sel dengan kriteria COUNTIF/SUMIF: angka, teks, operator (>=, <>, dll.), dan wildcard * ?. */
  private matchesCriteria(value: any, criteria: any): boolean {
    if (typeof criteria === 'number') return Number(value) === criteria && String(value).trim() !== '';
    if (typeof criteria === 'boolean') return value === criteria;
    const text = String(criteria);
    const m = text.match(/^(<=|>=|<>|<|>|=)([\s\S]*)$/);
    const op = m ? m[1] : '=';
    const operandText = m ? m[2].trim() : text.trim();
    const operandNum = Number(operandText);
    const numeric = operandText !== '' && !isNaN(operandNum);
    const cellText = String(value ?? '').trim();
    if (numeric && cellText !== '' && !isNaN(Number(cellText))) {
      const cellNum = Number(cellText);
      switch (op) {
        case '>': return cellNum > operandNum;
        case '<': return cellNum < operandNum;
        case '>=': return cellNum >= operandNum;
        case '<=': return cellNum <= operandNum;
        case '<>': return cellNum !== operandNum;
        default: return cellNum === operandNum;
      }
    }
    if (numeric && op !== '<>') {
      // Sel teks tidak pernah cocok dengan kriteria angka
      return false;
    }
    const a = cellText.toLowerCase();
    const b = operandText.toLowerCase();
    if (op === '=' || op === '<>') {
      const hasWildcard = /[*?]/.test(b);
      let hit: boolean;
      if (hasWildcard) {
        const re = new RegExp('^' + b.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.') + '$');
        hit = re.test(a);
      } else {
        hit = a === b;
      }
      return op === '=' ? hit : !hit;
    }
    switch (op) {
      case '>': return a > b;
      case '<': return a < b;
      case '>=': return a >= b;
      default: return a <= b;
    }
  }

  private executeFunction(name: string, rawArgs: string[], visited: Set<string>, precedents: string[]): any {
    // Collect cell values from an argument (handles range A1:B10 or single expr)
    const resolveArgValues = (argStr: string): any[] => {
      const trimmed = argStr.trim();
      if (trimmed.includes(':') && !trimmed.startsWith('"')) {
        const cells = expandRange(trimmed);
        precedents.push(...cells);
        return cells.map((c) => this.getCellValue(c, visited));
      }
      return [this.evalExpression(trimmed, visited, precedents)];
    };

    // Isi sel apa adanya: sel kosong ditandai blank agar COUNT/COUNTA/COUNTBLANK tidak menghitungnya sebagai 0.
    const resolveCells = (argStr: string): { blank: boolean; value: any }[] => {
      const trimmed = argStr.trim();
      if (trimmed.includes(':') && !trimmed.startsWith('"')) {
        const cells = expandRange(trimmed);
        precedents.push(...cells);
        return cells.map((c) => {
          const cell = this.grid[c.toUpperCase().replace(/\$/g, '')];
          const raw = String(cell?.raw ?? '').trim();
          const value = this.getCellValue(c, visited);
          return { blank: raw === '' || (raw.startsWith('=') && value === ''), value: raw === '' ? '' : value };
        });
      }
      const value = this.evalExpression(trimmed, visited, precedents);
      return [{ blank: value === '' || value === null || value === undefined, value }];
    };

    switch (name) {
      case 'SUM': {
        const nums = rawArgs.flatMap(resolveArgValues).map(Number).filter((n) => !isNaN(n));
        return nums.reduce((acc, curr) => acc + curr, 0);
      }
      case 'AVERAGE': {
        const nums = rawArgs.flatMap(resolveArgValues).map(Number).filter((n) => !isNaN(n));
        if (nums.length === 0) return 0;
        return nums.reduce((acc, curr) => acc + curr, 0) / nums.length;
      }
      case 'MIN': {
        const nums = rawArgs.flatMap(resolveArgValues).map(Number).filter((n) => !isNaN(n));
        return nums.length ? Math.min(...nums) : 0;
      }
      case 'MAX': {
        const nums = rawArgs.flatMap(resolveArgValues).map(Number).filter((n) => !isNaN(n));
        return nums.length ? Math.max(...nums) : 0;
      }
      case 'COUNT': {
        const cells = rawArgs.flatMap(resolveCells);
        return cells.filter((c) => !c.blank && (typeof c.value === 'number' || (typeof c.value === 'string' && c.value.trim() !== '' && !isNaN(Number(c.value))))).length;
      }
      case 'COUNTA': {
        return rawArgs.flatMap(resolveCells).filter((c) => !c.blank).length;
      }
      case 'ROUND': {
        const val = Number(this.evalExpression(rawArgs[0], visited, precedents));
        const digits = rawArgs[1] ? Number(this.evalExpression(rawArgs[1], visited, precedents)) : 0;
        const factor = Math.pow(10, digits);
        return Math.round(val * factor) / factor;
      }
      case 'IF': {
        if (rawArgs.length < 2) throw new Error('#VALUE!');
        const condition = Boolean(this.evalExpression(rawArgs[0], visited, precedents));
        if (condition) {
          return this.evalExpression(rawArgs[1], visited, precedents);
        } else {
          return rawArgs[2] !== undefined ? this.evalExpression(rawArgs[2], visited, precedents) : false;
        }
      }
      case 'AND': {
        for (const arg of rawArgs) {
          const vals = resolveArgValues(arg);
          if (vals.some((v) => !Boolean(v))) return false;
        }
        return true;
      }
      case 'OR': {
        for (const arg of rawArgs) {
          const vals = resolveArgValues(arg);
          if (vals.some((v) => Boolean(v))) return true;
        }
        return false;
      }
      case 'IFERROR': {
        try {
          const val = this.evalExpression(rawArgs[0], visited, precedents);
          if (typeof val === 'string' && val.startsWith('#')) {
            return this.evalExpression(rawArgs[1], visited, precedents);
          }
          return val;
        } catch {
          return this.evalExpression(rawArgs[1], visited, precedents);
        }
      }
      case 'COUNTIF': {
        if (rawArgs.length !== 2) throw new Error('#VALUE!');
        const rangeCells = expandRange(rawArgs[0]);
        precedents.push(...rangeCells);
        const criteria = this.evalExpression(rawArgs[1], visited, precedents);
        let count = 0;
        for (const cell of rangeCells) {
          if (this.matchesCriteria(this.getCellValue(cell, visited), criteria)) count++;
        }
        return count;
      }
      case 'SUMIF':
      case 'AVERAGEIF': {
        if (rawArgs.length < 2) throw new Error('#VALUE!');
        const rangeCells = expandRange(rawArgs[0]);
        precedents.push(...rangeCells);
        const criteria = this.evalExpression(rawArgs[1], visited, precedents);
        const sumRange = rawArgs[2] ? expandRange(rawArgs[2]) : rangeCells;
        precedents.push(...sumRange);

        let total = 0;
        let hits = 0;
        for (let i = 0; i < rangeCells.length; i++) {
          if (!this.matchesCriteria(this.getCellValue(rangeCells[i], visited), criteria)) continue;
          const addVal = Number(this.getCellValue(sumRange[i] || rangeCells[i], visited));
          if (!isNaN(addVal)) {
            total += addVal;
            hits++;
          }
        }
        if (name === 'AVERAGEIF') {
          if (hits === 0) throw new Error('#DIV/0!');
          return total / hits;
        }
        return total;
      }
      case 'SUMIFS':
      case 'COUNTIFS': {
        // SUMIFS(rentang_jumlah; rentang1; kriteria1; ...) dan COUNTIFS(rentang1; kriteria1; ...)
        const isSum = name === 'SUMIFS';
        const pairsStart = isSum ? 1 : 0;
        if (rawArgs.length < pairsStart + 2 || (rawArgs.length - pairsStart) % 2 !== 0) throw new Error('#VALUE!');
        const sumCells = isSum ? expandRange(rawArgs[0]) : [];
        if (isSum) precedents.push(...sumCells);
        const conditions: { cells: string[]; criteria: any }[] = [];
        for (let i = pairsStart; i < rawArgs.length; i += 2) {
          const cells = expandRange(rawArgs[i]);
          precedents.push(...cells);
          conditions.push({ cells, criteria: this.evalExpression(rawArgs[i + 1], visited, precedents) });
        }
        const size = conditions[0].cells.length;
        let total = 0;
        let count = 0;
        for (let i = 0; i < size; i++) {
          const ok = conditions.every((c) => this.matchesCriteria(this.getCellValue(c.cells[i], visited), c.criteria));
          if (!ok) continue;
          count++;
          if (isSum) {
            const v = Number(this.getCellValue(sumCells[i], visited));
            if (!isNaN(v)) total += v;
          }
        }
        return isSum ? total : count;
      }
      case 'COUNTBLANK': {
        return rawArgs.flatMap(resolveCells).filter((c) => c.blank).length;
      }
      case 'VALUE': {
        const n = Number(String(this.evalExpression(rawArgs[0], visited, precedents)).trim());
        if (isNaN(n)) throw new Error('#VALUE!');
        return n;
      }
      case 'PROPER': {
        return String(this.evalExpression(rawArgs[0], visited, precedents))
          .toLowerCase()
          .replace(/(^|[^\p{L}])(\p{L})/gu, (_m, pre, ch) => pre + ch.toUpperCase());
      }
      case 'VLOOKUP': {
        if (rawArgs.length < 3) throw new Error('#VALUE!');
        const lookupVal = this.evalExpression(rawArgs[0], visited, precedents);
        const tableRange = rawArgs[1].trim();
        const colIdx = Number(this.evalExpression(rawArgs[2], visited, precedents)) - 1; // 1-based index in Excel

        const parts = tableRange.split(':');
        const start = parseCellAddress(parts[0]);
        const end = parseCellAddress(parts[1]);
        if (!start || !end) throw new Error('#REF!');

        const minRow = Math.min(start.row, end.row);
        const maxRow = Math.max(start.row, end.row);
        const targetCol = start.col + colIdx;

        for (let r = minRow; r <= maxRow; r++) {
          const firstColAddr = colRowToAddress(start.col, r);
          precedents.push(firstColAddr);
          const cellVal = this.getCellValue(firstColAddr, visited);
          if (String(cellVal).trim().toLowerCase() === String(lookupVal).trim().toLowerCase()) {
            const targetAddr = colRowToAddress(targetCol, r);
            precedents.push(targetAddr);
            return this.getCellValue(targetAddr, visited);
          }
        }
        throw new Error('#N/A');
      }
      case 'XLOOKUP': {
        if (rawArgs.length < 3) throw new Error('#VALUE!');
        const lookupVal = this.evalExpression(rawArgs[0], visited, precedents);
        const lookupRange = expandRange(rawArgs[1]);
        const returnRange = expandRange(rawArgs[2]);
        precedents.push(...lookupRange, ...returnRange);

        for (let i = 0; i < lookupRange.length; i++) {
          const val = this.getCellValue(lookupRange[i], visited);
          if (String(val).trim().toLowerCase() === String(lookupVal).trim().toLowerCase()) {
            return this.getCellValue(returnRange[i], visited);
          }
        }
        if (rawArgs[3]) return this.evalExpression(rawArgs[3], visited, precedents);
        throw new Error('#N/A');
      }
      case 'CONCAT':
      case 'CONCATENATE': {
        return rawArgs.flatMap(resolveArgValues).join('');
      }
      case 'LEFT': {
        const str = String(this.evalExpression(rawArgs[0], visited, precedents));
        const len = rawArgs[1] ? Number(this.evalExpression(rawArgs[1], visited, precedents)) : 1;
        return str.substring(0, len);
      }
      case 'RIGHT': {
        const str = String(this.evalExpression(rawArgs[0], visited, precedents));
        const len = rawArgs[1] ? Number(this.evalExpression(rawArgs[1], visited, precedents)) : 1;
        return str.substring(str.length - len);
      }
      case 'MID': {
        const str = String(this.evalExpression(rawArgs[0], visited, precedents));
        const start = Number(this.evalExpression(rawArgs[1], visited, precedents)) - 1;
        const len = Number(this.evalExpression(rawArgs[2], visited, precedents));
        return str.substring(start, start + len);
      }
      case 'LEN': {
        const str = String(this.evalExpression(rawArgs[0], visited, precedents));
        return str.length;
      }
      case 'UPPER': {
        return String(this.evalExpression(rawArgs[0], visited, precedents)).toUpperCase();
      }
      case 'LOWER': {
        return String(this.evalExpression(rawArgs[0], visited, precedents)).toLowerCase();
      }
      case 'TRIM': {
        return String(this.evalExpression(rawArgs[0], visited, precedents)).trim();
      }
      case 'PMT': {
        // PMT(rate, nper, pv)
        const rate = Number(this.evalExpression(rawArgs[0], visited, precedents));
        const nper = Number(this.evalExpression(rawArgs[1], visited, precedents));
        const pv = Number(this.evalExpression(rawArgs[2], visited, precedents));
        if (rate === 0) return -pv / nper;
        const pvif = Math.pow(1 + rate, nper);
        return (-rate * (pv * pvif)) / (pvif - 1);
      }
      default:
        throw new Error(`#NAME? (${name})`);
    }
  }

  // Mutation testing to ensure solution is dynamic and not hardcoded static number
  public static testDynamicMutation(
    initialGrid: SheetGrid,
    targetCell: string,
    inputsToMutate: { cell: string; delta: number }[]
  ): { isDynamic: boolean; originalVal: any; mutatedVal: any } {
    const engine1 = new ExcelFormulaEngine(initialGrid);
    const orig = engine1.getCellValue(targetCell);

    const mutatedGrid: SheetGrid = JSON.parse(JSON.stringify(initialGrid));
    for (const item of inputsToMutate) {
      if (mutatedGrid[item.cell]) {
        const cur = Number(mutatedGrid[item.cell].raw || 0);
        mutatedGrid[item.cell].raw = String(cur + item.delta);
      }
    }

    const engine2 = new ExcelFormulaEngine(mutatedGrid);
    const mutated = engine2.getCellValue(targetCell);

    return {
      isDynamic: orig !== mutated,
      originalVal: orig,
      mutatedVal: mutated,
    };
  }
}
