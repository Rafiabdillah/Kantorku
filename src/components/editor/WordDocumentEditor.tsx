import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Table as TableIcon,
  FileText,
  Download,
  Bookmark,
  AlignLeft,
  AlignCenter,
  AlignJustify,
} from 'lucide-react';
import { parseDocumentStructure } from '../../engine/wordValidator';
import { sound } from '../../services/sound';

interface WordDocumentEditorProps {
  content: string;
  onChange: (html: string) => void;
  readOnly?: boolean;
}

export const WordDocumentEditor: React.FC<WordDocumentEditorProps> = ({
  content,
  onChange,
  readOnly = false,
}) => {
  const [fontFamily, setFontFamily] = useState<'Times New Roman' | 'Arial' | 'Calibri'>('Times New Roman');
  const [lineSpacing, setLineSpacing] = useState<'1.0' | '1.15' | '1.5' | '2.0'>('1.5');
  const [marginPreset, setMarginPreset] = useState<'akademik' | 'normal'>('akademik');
  const [watermark, setWatermark] = useState<string>('');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'justify'>('left');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        underline: {},
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content,
    editable: !readOnly,
    onUpdate: ({ editor }) => {
      sound.playTyping();
      const html = editor.getHTML();
      onChange(html);
    },
  });

  // Keep editor content in sync when external content prop changes meaningfully
  useEffect(() => {
    if (editor && content !== editor.getHTML() && !editor.isFocused) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  const docMeta = parseDocumentStructure(content);

  const handleExportDoc = () => {
    sound.playClick();
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Dokumen PT Maju Sejahtera</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + content + footer;
    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement('a');
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'dokumen_pt_maju_sejahtera.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  const insertSampleTable = () => {
    sound.playClick();
    if (!editor) return;
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
  };

  const insertFootnote = () => {
    sound.playClick();
    if (!editor) return;
    editor.chain().focus().insertContent('<sup>[1]</sup> ').run();
  };

  return (
    <div className="flex flex-col h-full bg-slate-100 rounded-2xl border border-slate-200 shadow-sm overflow-hidden select-none">
      {/* Word Ribbon Toolbar */}
      <div className="flex flex-wrap items-center gap-1.5 p-2 px-3 bg-white border-b border-slate-200 text-xs overflow-x-auto">
        {/* Style Dropdown / Heading Buttons */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().toggleHeading({ level: 1 }).run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer touch-manipulation transition ${
              editor?.isActive('heading', { level: 1 })
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Heading 1 (Judul Utama)"
          >
            <Heading1 className="w-4 h-4" />
            <span className="text-[11px]">H1</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().toggleHeading({ level: 2 }).run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg font-bold flex items-center justify-center gap-1 cursor-pointer touch-manipulation transition ${
              editor?.isActive('heading', { level: 2 })
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Heading 2 (Sub-Judul)"
          >
            <Heading2 className="w-4 h-4" />
            <span className="text-[11px]">H2</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().setParagraph().run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg text-xs font-semibold flex items-center justify-center cursor-pointer touch-manipulation transition ${
              editor?.isActive('paragraph') && !editor?.isActive('heading')
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Normal Paragraf"
          >
            P
          </button>
        </div>

        {/* Font Family Selector */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
          <select
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value as any)}
            className="text-xs min-h-[36px] sm:min-h-[32px] bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-slate-700 font-medium outline-none cursor-pointer"
          >
            <option value="Times New Roman">Times New Roman (Akademik)</option>
            <option value="Calibri">Calibri (Bisnis)</option>
            <option value="Arial">Arial (Modern)</option>
          </select>
        </div>

        {/* Text Formats & Line Spacing */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().toggleBold().run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg font-bold flex items-center justify-center cursor-pointer touch-manipulation transition ${
              editor?.isActive('bold')
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Tebal (Bold Ctrl+B)"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().toggleItalic().run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg italic flex items-center justify-center cursor-pointer touch-manipulation transition ${
              editor?.isActive('italic')
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Miring (Italic Ctrl+I)"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().toggleUnderline().run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg flex items-center justify-center cursor-pointer touch-manipulation transition ${
              editor?.isActive('underline')
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Garis Bawah (Underline Ctrl+U)"
          >
            <UnderlineIcon className="w-4 h-4" />
          </button>
          <select
            value={lineSpacing}
            onChange={(e) => setLineSpacing(e.target.value as any)}
            className="text-[11px] min-h-[36px] sm:min-h-[32px] bg-slate-50 border border-slate-200 rounded px-1.5 py-1 text-slate-700 font-medium cursor-pointer"
            title="Spasi Baris"
          >
            <option value="1.0">1.0</option>
            <option value="1.15">1.15</option>
            <option value="1.5">1.5 (Skripsi/Makalah)</option>
            <option value="2.0">2.0</option>
          </select>
        </div>

        {/* Alignment & Lists */}
        <div className="flex items-center gap-1 border-r border-slate-200 pr-2">
          <button
            type="button"
            onClick={() => setTextAlign('left')}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg flex items-center justify-center cursor-pointer touch-manipulation transition ${
              textAlign === 'left' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Rata Kiri"
          >
            <AlignLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTextAlign('center')}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg flex items-center justify-center cursor-pointer touch-manipulation transition ${
              textAlign === 'center' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Rata Tengah"
          >
            <AlignCenter className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setTextAlign('justify')}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg flex items-center justify-center cursor-pointer touch-manipulation transition ${
              textAlign === 'justify' ? 'bg-blue-100 text-blue-700' : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Rata Kanan Kiri (Justify)"
          >
            <AlignJustify className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().toggleBulletList().run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg flex items-center justify-center cursor-pointer touch-manipulation transition ${
              editor?.isActive('bulletList')
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              editor?.chain().focus().toggleOrderedList().run();
            }}
            className={`p-1.5 min-h-[36px] min-w-[36px] sm:min-h-[32px] sm:min-w-[32px] rounded-lg flex items-center justify-center cursor-pointer touch-manipulation transition ${
              editor?.isActive('orderedList')
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-slate-100 text-slate-700'
            }`}
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
        </div>

        {/* Margin Preset & Table */}
        <div className="flex items-center gap-1.5 border-r border-slate-200 pr-2">
          <select
            value={marginPreset}
            onChange={(e) => setMarginPreset(e.target.value as any)}
            className="text-[11px] min-h-[36px] sm:min-h-[32px] bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 font-medium cursor-pointer"
            title="Preset Margin Kertas A4"
          >
            <option value="akademik">Margin 4-3-3-3 cm (Akademik ID)</option>
            <option value="normal">Margin 2.5 cm (Normal Bisnis)</option>
          </select>

          <button
            type="button"
            onClick={insertSampleTable}
            className="p-1.5 px-2 min-h-[36px] sm:min-h-[32px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium flex items-center gap-1 text-xs cursor-pointer touch-manipulation transition active:scale-95"
            title="Sisipkan Tabel Matriks Tindak Lanjut"
          >
            <TableIcon className="w-3.5 h-3.5 text-blue-600" />
            <span>Tabel</span>
          </button>
          <button
            type="button"
            onClick={insertFootnote}
            className="p-1.5 px-2 min-h-[36px] sm:min-h-[32px] rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium flex items-center gap-1 text-xs cursor-pointer touch-manipulation transition active:scale-95"
            title="Sisipkan Catatan Kaki / Sitasi [1]"
          >
            <Bookmark className="w-3.5 h-3.5 text-purple-600" />
            <span>Sitasi</span>
          </button>
        </div>

        {/* Watermark Selector & Export */}
        <div className="flex items-center gap-1.5">
          <select
            value={watermark}
            onChange={(e) => setWatermark(e.target.value)}
            className="text-[11px] min-h-[36px] sm:min-h-[32px] bg-slate-50 border border-slate-200 rounded px-2 py-1 text-slate-700 font-medium cursor-pointer"
            title="Watermark Dokumen"
          >
            <option value="">Tanpa Watermark</option>
            <option value="DRAFT">Watermark DRAFT</option>
            <option value="RAHASIA">Watermark RAHASIA</option>
            <option value="PT MAJU SEJAHTERA">Watermark PT Maju Sejahtera</option>
          </select>

          <button
            type="button"
            onClick={handleExportDoc}
            className="flex items-center gap-1 px-2.5 py-1 min-h-[36px] sm:min-h-[32px] bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition active:scale-95 cursor-pointer touch-manipulation"
            title="Ekspor ke file Word (.doc)"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Ekspor DOC</span>
          </button>
        </div>
      </div>

      {/* Document Workspace (A4 Paper Layout) */}
      <div className="flex-1 overflow-auto p-3 sm:p-6 md:p-8 flex justify-center bg-slate-200/80 relative">
        <div
          className={`w-full max-w-2xl bg-white rounded-lg shadow-xl border border-slate-300 relative text-slate-900 leading-relaxed outline-none focus-within:ring-2 focus-within:ring-blue-500/50 prose prose-slate max-w-none text-sm transition-all ${
            marginPreset === 'akademik'
              ? 'p-6 sm:pl-16 sm:pr-12 sm:pt-16 sm:pb-12'
              : 'p-6 sm:p-10 md:p-14'
          }`}
          style={{
            fontFamily,
            lineHeight:
              lineSpacing === '1.0'
                ? 1.2
                : lineSpacing === '1.15'
                ? 1.4
                : lineSpacing === '1.5'
                ? 1.8
                : 2.2,
            textAlign,
            minHeight: '620px',
          }}
        >
          {/* Watermark Diagonal Overlay */}
          {watermark && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden">
              <span className="text-slate-200 text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-widest -rotate-45 opacity-60">
                {watermark}
              </span>
            </div>
          )}

          {/* TipTap Editable Document Surface */}
          <div className="tiptap-doc-wrapper outline-none min-h-[500px]">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>

      {/* Word Document Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-2 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-700">{docMeta.wordCount} Kata</span>
          </div>
          <span>•</span>
          <span>{docMeta.paragraphCount} Paragraf</span>
          <span>•</span>
          <span>{docMeta.headings.length} Judul (H1/H2)</span>
          {docMeta.hasTable && (
            <>
              <span>•</span>
              <span className="text-emerald-700 font-semibold">
                Tabel ({docMeta.tableRows} Baris)
              </span>
            </>
          )}
          {docMeta.hasFootnote && (
            <>
              <span>•</span>
              <span className="text-purple-700 font-semibold">Sitasi / Footnote</span>
            </>
          )}
        </div>
        <div className="text-[11px] text-slate-500 font-medium">
          Format: Kertas A4 • {marginPreset === 'akademik' ? 'Margin Akademik 4-3-3-3 cm' : 'Margin Normal'} • Spasi {lineSpacing}
        </div>
      </div>
    </div>
  );
};
