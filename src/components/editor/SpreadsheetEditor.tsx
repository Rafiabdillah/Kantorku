import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { SheetGrid, CellData } from '../../types';
import { ExcelFormulaEngine, formatCellValue, parseCellAddress, colRowToAddress } from '../../engine/formula';
import { settingsRepo } from '../../features/settings/settingsRepository';
import { DollarSign, Percent, Hash, Undo2, Redo2, Maximize2 } from 'lucide-react';

interface SpreadsheetEditorProps {
  grid: SheetGrid;
  onCellChange: (address: string, data: Partial<CellData>) => void;
  readOnly?: boolean;
}

// 26 columns: A to Z
const ALL_COLS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const TOTAL_ROWS = 200;
const ROW_HEIGHT = 28;
const DEFAULT_COL_WIDTH = 100;

interface UndoHistoryEntry {
  grid: SheetGrid;
}

export const SpreadsheetEditor: React.FC<SpreadsheetEditorProps> = ({
  grid,
  onCellChange,
  readOnly = false,
}) => {
  // Navigation & Active Cell
  const [selectedCell, setSelectedCell] = useState<string>('B2');
  const [selectionEndCell, setSelectionEndCell] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editInput, setEditInput] = useState<string>('');

  // Column Widths with Resizing & Auto-fit
  const [colWidths, setColWidths] = useState<Record<string, number>>(() => {
    const widths: Record<string, number> = {};
    ALL_COLS.forEach((col) => {
      // Default widths: wider for B and C where amounts or names usually live
      widths[col] = col === 'A' ? 140 : col === 'B' || col === 'C' ? 120 : DEFAULT_COL_WIDTH;
    });
    return widths;
  });

  // Undo / Redo history
  const [undoStack, setUndoStack] = useState<UndoHistoryEntry[]>([]);
  const [redoStack, setRedoStack] = useState<UndoHistoryEntry[]>([]);

  // Drag-to-select range & fill-handle dragging states
  const [isSelectingRange, setIsSelectingRange] = useState<boolean>(false);
  const [isDraggingFill, setIsDraggingFill] = useState<boolean>(false);
  const [fillEndCell, setFillEndCell] = useState<string | null>(null);

  // Column resizing state
  const resizingColRef = useRef<{ col: string; startX: number; startWidth: number } | null>(null);

  // Virtualization Scroll State
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [containerHeight, setContainerHeight] = useState<number>(500);

  const engine = useMemo(() => new ExcelFormulaEngine(grid), [grid]);

  // Keep track of container size
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight || 500);
      }
    };
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  // Virtual rows calculations with 10 rows overscan
  const overscan = 10;
  const startRowIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - overscan);
  const visibleCount = Math.ceil(containerHeight / ROW_HEIGHT) + overscan * 2;
  const endRowIndex = Math.min(TOTAL_ROWS - 1, startRowIndex + visibleCount);

  // Range normalization
  const selectedRange = useMemo(() => {
    const start = parseCellAddress(selectedCell) || { col: 1, row: 1 };
    const end = selectionEndCell ? parseCellAddress(selectionEndCell) || start : start;

    const minCol = Math.min(start.col, end.col);
    const maxCol = Math.max(start.col, end.col);
    const minRow = Math.min(start.row, end.row);
    const maxRow = Math.max(start.row, end.row);

    return { minCol, maxCol, minRow, maxRow, isRange: selectionEndCell !== null && selectionEndCell !== selectedCell };
  }, [selectedCell, selectionEndCell]);

  const rangeLabel = useMemo(() => {
    if (!selectedRange.isRange) return selectedCell;
    const startAddr = colRowToAddress(selectedRange.minCol, selectedRange.minRow);
    const endAddr = colRowToAddress(selectedRange.maxCol, selectedRange.maxRow);
    return `${startAddr}:${endAddr}`;
  }, [selectedCell, selectedRange]);

  // Cell Selection Handlers
  const handleSelectCell = useCallback(
    (addr: string, isShift = false) => {
      if (isShift) {
        setSelectionEndCell(addr);
      } else {
        setSelectedCell(addr);
        setSelectionEndCell(null);
        setEditInput(grid[addr]?.raw ?? '');
      }
      setIsEditing(false);
    },
    [grid]
  );

  const handleCellClick = (addr: string, e: React.MouseEvent) => {
    handleSelectCell(addr, e.shiftKey);
  };

  const handleCellDoubleClick = (addr: string) => {
    if (readOnly) return;
    setSelectedCell(addr);
    setSelectionEndCell(null);
    setIsEditing(true);
    setEditInput(grid[addr]?.raw ?? '');
  };

  // Record undo before applying changes
  const applyChangeWithHistory = useCallback(
    (address: string, data: Partial<CellData>) => {
      setUndoStack((prev) => [...prev.slice(-30), { grid: { ...grid } }]);
      setRedoStack([]);
      onCellChange(address, data);
    },
    [grid, onCellChange]
  );

  const handleUndo = useCallback(() => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack((prev) => [...prev, { grid: { ...grid } }]);
    setUndoStack((prev) => prev.slice(0, -1));
    // Revert grid cells
    Object.keys(previous.grid).forEach((addr) => {
      onCellChange(addr, previous.grid[addr]);
    });
  }, [undoStack, grid, onCellChange]);

  const handleRedo = useCallback(() => {
    if (redoStack.length === 0) return;
    const next = redoStack[redoStack.length - 1];
    setUndoStack((prev) => [...prev, { grid: { ...grid } }]);
    setRedoStack((prev) => prev.slice(0, -1));
    Object.keys(next.grid).forEach((addr) => {
      onCellChange(addr, next.grid[addr]);
    });
  }, [redoStack, grid, onCellChange]);

  const commitEdit = () => {
    setIsEditing(false);
    applyChangeWithHistory(selectedCell, { raw: editInput });
  };

  const toggleFormat = (format: CellData['format']) => {
    const cur = grid[selectedCell]?.format;
    applyChangeWithHistory(selectedCell, { format: cur === format ? 'number' : format });
  };

  // Column Resize Handlers
  const handleStartResize = (col: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    resizingColRef.current = {
      col,
      startX: e.clientX,
      startWidth: colWidths[col] || DEFAULT_COL_WIDTH,
    };

    const handleMouseMove = (moveEv: MouseEvent) => {
      if (!resizingColRef.current) return;
      const delta = moveEv.clientX - resizingColRef.current.startX;
      const newWidth = Math.max(50, resizingColRef.current.startWidth + delta);
      setColWidths((prev) => ({ ...prev, [resizingColRef.current!.col]: newWidth }));
    };

    const handleMouseUp = () => {
      resizingColRef.current = null;
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Auto-fit Column on double click
  const handleAutoFitCol = (col: string) => {
    let maxCharLen = 4;
    for (let r = 1; r <= 50; r++) {
      const addr = `${col}${r}`;
      const cell = grid[addr];
      if (cell?.raw) {
        const text = String(cell.raw);
        if (text.length > maxCharLen) maxCharLen = text.length;
      }
    }
    const autoWidth = Math.min(300, Math.max(80, maxCharLen * 9 + 32));
    setColWidths((prev) => ({ ...prev, [col]: autoWidth }));
  };

  // Fill Handle Handlers
  const handleFillHandleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFill(true);
    setFillEndCell(selectedCell);

    const handleWindowMouseMove = (moveEvent: MouseEvent) => {
      const target = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
      const cellAttr = target?.getAttribute('data-cell') || target?.closest('[data-cell]')?.getAttribute('data-cell');
      if (cellAttr) {
        setFillEndCell(cellAttr);
      }
    };

    const handleWindowMouseUp = () => {
      setIsDraggingFill(false);
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);

      // Execute Fill Down Action
      if (fillEndCell && fillEndCell !== selectedCell) {
        const sourceParsed = parseCellAddress(selectedCell);
        const destParsed = parseCellAddress(fillEndCell);
        if (sourceParsed && destParsed) {
          const sourceCell = grid[selectedCell] || { raw: '' };
          const minR = Math.min(sourceParsed.row, destParsed.row);
          const maxR = Math.max(sourceParsed.row, destParsed.row);
          const colLetter = sourceParsed.colName;

          for (let r = minR; r <= maxR; r++) {
            const targetAddress = `${colLetter}${r + 1}`;
            if (targetAddress !== selectedCell) {
              let newRaw = sourceCell.raw;
              // Adjust relative row numbers if it's a formula
              if (String(newRaw).startsWith('=')) {
                const rowDelta = r - sourceParsed.row;
                newRaw = newRaw.replace(/([A-Z]+)(\d+)/g, (match, c, rowStr) => {
                  if (match.includes('$')) return match; // Keep absolute references locked!
                  const originalRowNum = parseInt(rowStr, 10);
                  return `${c}${originalRowNum + rowDelta}`;
                });
              }
              applyChangeWithHistory(targetAddress, {
                raw: newRaw,
                format: sourceCell.format,
              });
            }
          }
        }
      }
      setFillEndCell(null);
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    window.addEventListener('mouseup', handleWindowMouseUp);
  };

  // Double Click Fill Handle: Auto-fill down based on left column
  const handleFillHandleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const parsed = parseCellAddress(selectedCell);
    if (!parsed) return;

    // Find row count of left column if available
    const leftColIndex = parsed.col > 0 ? parsed.col - 1 : parsed.col + 1;
    const leftColLetter = String.fromCharCode(65 + leftColIndex);
    let targetEndRow = parsed.row;

    for (let r = parsed.row + 1; r < 50; r++) {
      const neighbor = grid[`${leftColLetter}${r + 1}`];
      if (neighbor && neighbor.raw) {
        targetEndRow = r;
      } else {
        break;
      }
    }

    if (targetEndRow > parsed.row) {
      const sourceCell = grid[selectedCell] || { raw: '' };
      for (let r = parsed.row + 1; r <= targetEndRow; r++) {
        const targetAddress = `${parsed.colName}${r + 1}`;
        let newRaw = sourceCell.raw;
        if (String(newRaw).startsWith('=')) {
          const rowDelta = r - parsed.row;
          newRaw = newRaw.replace(/([A-Z]+)(\d+)/g, (match, c, rowStr) => {
            if (match.includes('$')) return match;
            const originalRowNum = parseInt(rowStr, 10);
            return `${c}${originalRowNum + rowDelta}`;
          });
        }
        applyChangeWithHistory(targetAddress, {
          raw: newRaw,
          format: sourceCell.format,
        });
      }
    }
  };

  // Keyboard navigation & Shortcuts (Arrows, Tab, Enter, F2, Ctrl+C/V/Z)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in another input element outside our spreadsheet
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        if (!isEditing && e.target.getAttribute('data-formula-bar') !== 'true') return;
      }

      // Undo / Redo
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) handleRedo();
        else handleUndo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
        return;
      }

      // Copy
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'c' && !isEditing) {
        const val = grid[selectedCell]?.raw || '';
        navigator.clipboard?.writeText(val);
        return;
      }

      // Paste
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v' && !isEditing) {
        navigator.clipboard?.readText().then((text) => {
          if (text) {
            applyChangeWithHistory(selectedCell, { raw: text.trim() });
          }
        });
        return;
      }

      // F2 to start editing
      if (e.key === 'F2') {
        e.preventDefault();
        setIsEditing(true);
        setEditInput(grid[selectedCell]?.raw ?? '');
        return;
      }

      // Escape to cancel editing
      if (e.key === 'Escape') {
        if (isEditing) {
          e.preventDefault();
          setIsEditing(false);
        }
        return;
      }

      // Navigation when NOT inline editing
      if (!isEditing) {
        const parsed = parseCellAddress(selectedCell);
        if (!parsed) return;

        let newCol = parsed.col;
        let newRow = parsed.row;

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          newRow = Math.max(0, parsed.row - 1);
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          newRow = Math.min(TOTAL_ROWS - 1, parsed.row + 1);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          newCol = Math.max(0, parsed.col - 1);
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          newCol = Math.min(ALL_COLS.length - 1, parsed.col + 1);
        } else if (e.key === 'Tab') {
          e.preventDefault();
          newCol = e.shiftKey ? Math.max(0, parsed.col - 1) : Math.min(ALL_COLS.length - 1, parsed.col + 1);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          newRow = e.shiftKey ? Math.max(0, parsed.row - 1) : Math.min(TOTAL_ROWS - 1, parsed.row + 1);
        } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey && !readOnly) {
          // Direct typing into selected cell
          setIsEditing(true);
          setEditInput(e.key);
          return;
        }

        if (newCol !== parsed.col || newRow !== parsed.row) {
          const newAddr = colRowToAddress(newCol, newRow);
          handleSelectCell(newAddr, e.shiftKey);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedCell, isEditing, grid, handleSelectCell, handleUndo, handleRedo, applyChangeWithHistory, readOnly]);

  const currentCellData = grid[selectedCell] || { raw: '' };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden select-none">
      {/* Formula & Formatting Ribbon Bar */}
      <div className="flex flex-wrap items-center gap-2 p-2 px-3 bg-slate-50 border-b border-slate-200 text-xs">
        {/* Quick Format & Undo Tools */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
          <button
            type="button"
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            className="p-1.5 rounded-lg flex items-center justify-center transition disabled:opacity-30 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Urungkan (Undo Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className="p-1.5 rounded-lg flex items-center justify-center transition disabled:opacity-30 hover:bg-slate-200 text-slate-700 cursor-pointer"
            title="Ulangi (Redo Ctrl+Y)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
          <div className="w-px h-4 bg-slate-300 mx-0.5" />
          <button
            type="button"
            onClick={() => toggleFormat('rupiah')}
            className={`p-1.5 rounded-lg flex items-center gap-1 font-semibold transition cursor-pointer ${
              currentCellData.format === 'rupiah' ? 'bg-emerald-100 text-emerald-800' : 'hover:bg-slate-200 text-slate-700'
            }`}
            title="Format Rupiah (Rp)"
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Rp</span>
          </button>
          <button
            type="button"
            onClick={() => toggleFormat('percent')}
            className={`p-1.5 rounded-lg flex items-center gap-1 font-semibold transition cursor-pointer ${
              currentCellData.format === 'percent' ? 'bg-amber-100 text-amber-800' : 'hover:bg-slate-200 text-slate-700'
            }`}
            title="Format Persen (%)"
          >
            <Percent className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => toggleFormat('number')}
            className={`p-1.5 rounded-lg flex items-center gap-1 font-semibold transition cursor-pointer ${
              currentCellData.format === 'number' ? 'bg-blue-100 text-blue-800' : 'hover:bg-slate-200 text-slate-700'
            }`}
            title="Format Angka Ribuan"
          >
            <Hash className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Selected Coordinate Indicator (shows active cell or selected range, e.g. B2 or B2:C4) */}
        <div className="min-w-16 px-2.5 py-1 bg-white font-mono font-bold text-center border border-slate-300 rounded shadow-inner text-slate-800 text-[11px]">
          {rangeLabel}
        </div>

        {/* Formula Bar */}
        <div className="flex items-center gap-1.5 flex-1 bg-white px-2.5 py-1 border border-slate-300 rounded focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500">
          <span className="font-serif italic font-bold text-slate-400 select-none text-xs">fx</span>
          <input
            type="text"
            data-formula-bar="true"
            className="w-full text-xs font-mono outline-none text-slate-900 placeholder:text-slate-400"
            placeholder="Ketik rumus (misal: =SUM(B2:B4)) atau angka"
            value={grid[selectedCell]?.raw ?? ''}
            disabled={readOnly}
            onChange={(e) => {
              applyChangeWithHistory(selectedCell, { raw: e.target.value });
            }}
          />
        </div>
      </div>

      {/* Grid Virtualized Canvas */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-auto bg-slate-100 relative"
      >
        <table
          className="border-collapse table-fixed text-xs"
          style={{
            fontSize: 'var(--cell-font-size, 13pt)',
            width: ALL_COLS.reduce((sum, c) => sum + (colWidths[c] || DEFAULT_COL_WIDTH), 40),
          }}
        >
          {/* Header Row (A to Z) with Sticky Top */}
          <thead>
            <tr className="bg-slate-200 text-slate-700 font-bold sticky top-0 z-30 shadow-xs h-7">
              {/* Corner # Column */}
              <th className="w-10 h-7 border-r border-b border-slate-300 text-center bg-slate-200 sticky left-0 z-40 select-none">
                #
              </th>
              {ALL_COLS.map((col) => {
                const width = colWidths[col] || DEFAULT_COL_WIDTH;
                return (
                  <th
                    key={col}
                    style={{ width, minWidth: width, maxWidth: width }}
                    className="h-7 border-r border-b border-slate-300 text-center font-mono relative select-none bg-slate-200 group"
                  >
                    <span>{col}</span>
                    {/* Column Resizer Handle */}
                    <div
                      onMouseDown={(e) => handleStartResize(col, e)}
                      onDoubleClick={() => handleAutoFitCol(col)}
                      title="Geser untuk ubah lebar, klik 2x untuk auto-fit"
                      className="absolute right-0 top-0 bottom-0 w-1.5 cursor-col-resize hover:bg-emerald-500 z-10"
                    />
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {/* Top Virtual Spacer */}
            {startRowIndex > 0 && (
              <tr>
                <td colSpan={ALL_COLS.length + 1} style={{ height: startRowIndex * ROW_HEIGHT }} />
              </tr>
            )}

            {/* Visible Window of Virtualized Rows */}
            {Array.from({ length: endRowIndex - startRowIndex + 1 }).map((_, idx) => {
              const rowNum = startRowIndex + idx + 1;
              return (
                <tr key={rowNum} style={{ height: ROW_HEIGHT }}>
                  {/* Sticky Row Number Index */}
                  <td className="w-10 h-7 border-r border-b border-slate-300 text-center bg-slate-100 font-mono text-slate-500 font-semibold sticky left-0 z-20 select-none">
                    {rowNum}
                  </td>

                  {ALL_COLS.map((col, cIdx) => {
                    const addr = `${col}${rowNum}`;
                    const cell = grid[addr] || { raw: '' };
                    const isSelected = selectedCell === addr;
                    const isHeader = cell.isHeader;

                    // Range selection check
                    const inRange =
                      selectedRange.isRange &&
                      cIdx >= selectedRange.minCol &&
                      cIdx <= selectedRange.maxCol &&
                      rowNum - 1 >= selectedRange.minRow &&
                      rowNum - 1 <= selectedRange.maxRow;

                    // Evaluate cell display value
                    let displayVal: any = cell.raw ?? '';
                    let isError = false;
                    let friendlyError = '';

                    if (String(cell.raw ?? '').startsWith('=')) {
                      const evaluated = engine.evaluateFormula(String(cell.raw).substring(1));
                      displayVal = evaluated.value;
                      if (evaluated.error) {
                        isError = true;
                        friendlyError = evaluated.friendlyError || evaluated.error;
                      }
                    }

                    const formattedDisplay = formatCellValue(displayVal, cell.format);

                    // Truncation check ("####") if column is too narrow for large formatted numbers
                    const colW = colWidths[col] || DEFAULT_COL_WIDTH;
                    const isNumeric = typeof displayVal === 'number' || cell.format === 'rupiah';
                    const isTooNarrow = isNumeric && formattedDisplay.length * 8.5 > colW - 12;
                    const renderedText = isTooNarrow ? '####' : formattedDisplay;

                    const width = colWidths[col] || DEFAULT_COL_WIDTH;

                    return (
                      <td
                        key={addr}
                        data-cell={addr}
                        style={{ width, minWidth: width, maxWidth: width }}
                        onClick={(e) => handleCellClick(addr, e)}
                        onDoubleClick={() => handleCellDoubleClick(addr)}
                        title={friendlyError || formattedDisplay}
                        className={`h-7 px-2 border-r border-b border-slate-200 truncate cursor-pointer transition-colors relative ${
                          isHeader
                            ? 'bg-slate-100 font-bold text-slate-800'
                            : isSelected
                            ? 'bg-emerald-50 ring-2 ring-emerald-600 ring-inset z-20'
                            : inRange
                            ? 'bg-emerald-100/50 text-slate-900'
                            : 'bg-white hover:bg-slate-50 text-slate-800'
                        } ${isError ? 'text-rose-600 font-semibold bg-rose-50' : ''}`}
                      >
                        {isEditing && isSelected ? (
                          <input
                            type="text"
                            autoFocus
                            className="absolute inset-0 px-2 w-full h-full text-xs font-mono bg-white outline-none ring-2 ring-emerald-500 z-30"
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            onBlur={commitEdit}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') commitEdit();
                              if (e.key === 'Escape') setIsEditing(false);
                            }}
                          />
                        ) : (
                          <div
                            className={`truncate ${
                              typeof displayVal === 'number' ? 'text-right font-mono' : 'text-left'
                            }`}
                          >
                            {renderedText}
                          </div>
                        )}

                        {/* Fill Handle rendered at the bottom-right of the active selected cell */}
                        {isSelected && !isEditing && !readOnly && (
                          <div
                            onMouseDown={handleFillHandleMouseDown}
                            onDoubleClick={handleFillHandleDoubleClick}
                            title="Tarik untuk salin formula / isi deret, klik ganda untuk auto-fill"
                            className="absolute right-0 bottom-0 w-2 h-2 bg-emerald-600 border border-white cursor-crosshair z-30"
                          />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}

            {/* Bottom Virtual Spacer */}
            {endRowIndex < TOTAL_ROWS - 1 && (
              <tr>
                <td colSpan={ALL_COLS.length + 1} style={{ height: (TOTAL_ROWS - 1 - endRowIndex) * ROW_HEIGHT }} />
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Sheet Tab Bar Footer */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-100 border-t border-slate-200 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-white font-semibold text-emerald-700 border-t-2 border-emerald-600 rounded-t shadow-sm">
            Sheet1 (Aktif)
          </div>
          <span className="text-slate-400">|</span>
          <span className="text-[11px] text-slate-500 font-mono">
            Grid: 26 Kolom (A-Z) × 200 Baris
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
            Pemisah: {settingsRepo.get('excel_separator', 'semicolon') === 'semicolon' ? 'Titik Koma (;)' : 'Koma (,)'}
          </span>
        </div>
        <div className="text-[11px] text-slate-500 font-mono">
          {grid[selectedCell]?.raw ? `Sel ${selectedCell}: ${grid[selectedCell]?.raw}` : `${selectedCell}: (Kosong)`}
        </div>
      </div>
    </div>
  );
};
