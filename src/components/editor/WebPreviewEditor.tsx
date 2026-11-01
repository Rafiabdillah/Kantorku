import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Smartphone, Tablet, Monitor, Code2, RefreshCw } from 'lucide-react';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { html as langHtml } from '@codemirror/lang-html';
import { css as langCss } from '@codemirror/lang-css';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { sound } from '../../services/sound';
import { settingsRepo } from '../../features/settings/settingsRepository';

interface WebPreviewEditorProps {
  html: string;
  css: string;
  onHtmlChange: (html: string) => void;
  onCssChange: (css: string) => void;
  onValidate?: () => void;
}

export const WebPreviewEditor: React.FC<WebPreviewEditorProps> = ({
  html,
  css,
  onHtmlChange,
  onCssChange,
  onValidate,
}) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [previewKey, setPreviewKey] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Initialize or reconfigure CodeMirror 6 when tab switches
  useEffect(() => {
    if (!containerRef.current) return;

    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    const currentDoc = activeTab === 'html' ? html : css;
    const currentLang = activeTab === 'html' ? langHtml() : langCss();

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        sound.playTyping();
        const content = update.state.doc.toString();
        if (activeTab === 'html') {
          onHtmlChange(content);
        } else {
          onCssChange(content);
        }
      }
    });

    const tabSize = settingsRepo.get('code_tab_size', 2);

    const state = EditorState.create({
      doc: currentDoc,
      extensions: [
        basicSetup,
        currentLang,
        oneDark,
        EditorState.tabSize.of(tabSize),
        keymap.of([indentWithTab, ...defaultKeymap]),
        updateListener,
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '13px',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          },
          '.cm-scroller': {
            overflow: 'auto',
            fontFamily: 'inherit',
          },
          '.cm-gutters': {
            backgroundColor: '#090d16',
            color: '#64748b',
            borderRight: '1px solid #1e293b',
          },
          '.cm-content': {
            padding: '12px 8px',
          },
        }),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, [activeTab]);

  // Keep editor content in sync when external prop changes
  useEffect(() => {
    const view = viewRef.current;
    if (view && !view.hasFocus) {
      const targetDoc = activeTab === 'html' ? html : css;
      const currentDoc = view.state.doc.toString();
      if (currentDoc !== targetDoc) {
        view.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: targetDoc },
        });
      }
    }
  }, [html, css, activeTab]);

  const combinedSrcDoc = useMemo(() => {
    return `
      <!DOCTYPE html>
      <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { box-sizing: border-box; }
            body { margin: 0; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #fff; color: #1e293b; padding: 12px; }
            ${css}
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
  }, [html, css]);

  const viewportWidthMap = {
    mobile: 'max-w-[360px]',
    tablet: 'max-w-[768px]',
    desktop: 'w-full',
  };

  const handleRefreshPreview = () => {
    sound.playClick();
    setPreviewKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs text-slate-100">
      {/* Top Ribbon */}
      <div className="flex flex-wrap items-center justify-between px-3 py-2 bg-slate-950 border-b border-slate-800 gap-2">
        {/* Code Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('html');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] sm:min-h-[30px] rounded-lg text-xs font-bold transition cursor-pointer touch-manipulation ${
              activeTab === 'html' ? 'bg-orange-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>index.html</span>
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setActiveTab('css');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] sm:min-h-[30px] rounded-lg text-xs font-bold transition cursor-pointer touch-manipulation ${
              activeTab === 'css' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>style.css</span>
          </button>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setViewport('mobile');
            }}
            className={`p-2 min-h-[36px] min-w-[36px] sm:min-h-[30px] sm:min-w-[30px] flex items-center justify-center rounded-lg transition cursor-pointer touch-manipulation ${
              viewport === 'mobile' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tampilan Mobile (360px)"
          >
            <Smartphone className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setViewport('tablet');
            }}
            className={`p-2 min-h-[36px] min-w-[36px] sm:min-h-[30px] sm:min-w-[30px] flex items-center justify-center rounded-lg transition cursor-pointer touch-manipulation ${
              viewport === 'tablet' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tampilan Tablet (768px)"
          >
            <Tablet className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setViewport('desktop');
            }}
            className={`p-2 min-h-[36px] min-w-[36px] sm:min-h-[30px] sm:min-w-[30px] flex items-center justify-center rounded-lg transition cursor-pointer touch-manipulation ${
              viewport === 'desktop' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Tampilan Desktop (100%)"
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleRefreshPreview}
            className="p-2 min-h-[36px] min-w-[36px] sm:min-h-[30px] sm:min-w-[30px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition cursor-pointer ml-1 touch-manipulation"
            title="Muat Ulang Pratinjau"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Split: Code Area on Top/Left, Live Preview on Bottom/Right */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        {/* Code Editor Area with CodeMirror 6 */}
        <div className="flex-1 flex flex-col border-b md:border-b-0 md:border-r border-slate-800 bg-slate-900 overflow-hidden min-h-[220px]">
          <div className="flex-1 overflow-hidden relative bg-[#090d16]" ref={containerRef} />
          <div className="px-3 py-1 bg-slate-950 text-[10px] text-slate-500 border-t border-slate-800 flex justify-between">
            <span>CodeMirror 6 • {activeTab.toUpperCase()} Mode</span>
            <span>Live Sync Preview</span>
          </div>
        </div>

        {/* Live Sandboxed Preview Container */}
        <div className="flex-1 bg-slate-950 flex flex-col items-center justify-center p-3 overflow-auto min-h-[220px]">
          <div className={`w-full h-full ${viewportWidthMap[viewport]} bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-700 flex flex-col transition-all duration-300`}>
            {/* Browser Header Bar */}
            <div className="px-3 py-1.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between text-[10px] text-slate-500 select-none">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-white border border-slate-200 px-3 py-0.5 rounded-full text-[10px] text-slate-400 font-sans truncate max-w-[180px]">
                https://majustore.local/{viewport}
              </div>
              <span className="font-sans font-semibold text-[10px] text-slate-600 uppercase">
                {viewport}
              </span>
            </div>

            {/* Sandbox IFrame Preview (without allow-same-origin for maximum security) */}
            <iframe
              key={previewKey}
              sandbox="allow-scripts"
              srcDoc={combinedSrcDoc}
              title="Web Sandbox Preview"
              className="w-full flex-1 border-0 bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
