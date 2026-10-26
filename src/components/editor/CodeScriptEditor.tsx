import React, { useState, useEffect, useRef } from 'react';
import { Play, CheckCircle2, XCircle, Terminal, AlertTriangle, Code2 } from 'lucide-react';
import { basicSetup } from 'codemirror';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { runCodeWithTests, TestCase, CodeExecutionResult } from '../../engine/codeSandbox';
import { sound } from '../../services/sound';
import { settingsRepo } from '../../features/settings/settingsRepository';

interface CodeScriptEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  testCases?: TestCase[];
  onTestCompletion?: (passed: boolean) => void;
}

export const CodeScriptEditor: React.FC<CodeScriptEditorProps> = ({
  code,
  onChange,
  testCases = [],
  onTestCompletion,
}) => {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [result, setResult] = useState<CodeExecutionResult | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Initialize CodeMirror 6 editor
  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        sound.playTyping();
        const newCode = update.state.doc.toString();
        onChange(newCode);
      }
    });

    const tabSize = settingsRepo.get('code_tab_size', 2);

    const state = EditorState.create({
      doc: code,
      extensions: [
        basicSetup,
        javascript(),
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
  }, []);

  // Update external changes if CodeMirror doc differs
  useEffect(() => {
    const view = viewRef.current;
    if (view && !view.hasFocus) {
      const currentDoc = view.state.doc.toString();
      if (currentDoc !== code) {
        view.dispatch({
          changes: { from: 0, to: currentDoc.length, insert: code },
        });
      }
    }
  }, [code]);

  const handleRun = async () => {
    setIsRunning(true);
    sound.playClick();

    // Extract function name from first test or default
    const currentCode = viewRef.current ? viewRef.current.state.doc.toString() : code;
    const fnMatch = currentCode.match(/function\s+([a-zA-Z0-9_$]+)\s*\(/);
    const fnName = fnMatch ? fnMatch[1] : undefined;

    const res = await runCodeWithTests(currentCode, testCases, fnName);
    setResult(res);
    setIsRunning(false);

    if (res.success) {
      sound.playSuccess();
      onTestCompletion?.(true);
    } else {
      sound.playError();
      onTestCompletion?.(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-900 rounded-2xl border border-slate-800 shadow-xl overflow-hidden font-mono text-xs text-slate-100">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-300">script.js</span>
          <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-sans hidden sm:inline">
            CodeMirror 6 • Web Worker Sandbox
          </span>
        </div>
        <button
          type="button"
          onClick={handleRun}
          disabled={isRunning}
          className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-sans font-semibold text-xs shadow-md transition active:scale-95 disabled:opacity-50 cursor-pointer touch-manipulation"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>{isRunning ? 'Mengeksekusi...' : 'Jalankan & Tes'}</span>
        </button>
      </div>

      {/* CodeMirror 6 Editor Container */}
      <div className="flex-1 overflow-hidden bg-[#090d16] min-h-[180px] relative" ref={containerRef} />

      {/* Test Case & Console Panel */}
      <div className="border-t border-slate-800 bg-slate-950 p-3 max-h-56 overflow-y-auto">
        {result && (
          <div className="space-y-3">
            {/* Friendly Error Diagnostic */}
            {result.friendlyError && (
              <div className="p-2.5 bg-rose-950/80 border border-rose-700/60 rounded-xl flex items-start gap-2.5 text-rose-200">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold font-sans text-rose-300 text-xs">Petunjuk Perbaikan:</div>
                  <div className="text-[11px] mt-0.5 font-sans leading-relaxed">{result.friendlyError}</div>
                </div>
              </div>
            )}

            {/* Test Cases Results */}
            {result.testResults.length > 0 && (
              <div>
                <div className="text-[11px] text-slate-400 font-semibold mb-1.5 uppercase tracking-wide">
                  Hasil Uji Coba ({result.testResults.filter((t) => t.passed).length}/{result.testResults.length} Lolos):
                </div>
                <div className="space-y-1.5">
                  {result.testResults.map((tc, idx) => (
                    <div
                      key={idx}
                      className={`p-2 rounded-lg border text-[11px] flex items-center justify-between ${
                        tc.passed
                          ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {tc.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                        <span>{tc.description}</span>
                        {tc.hidden && <span className="text-[9px] bg-slate-800 px-1 rounded text-slate-400">Hidden</span>}
                      </div>
                      {!tc.passed && !tc.hidden && (
                        <div className="text-[10px] text-slate-400 font-mono">
                          Harapan: {JSON.stringify(tc.expected)} | Hasil: {JSON.stringify(tc.actual)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Console Output */}
            {result.output.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Output Console:</span>
                </div>
                <div className="bg-black/60 p-2 rounded-lg font-mono text-[11px] text-slate-300 space-y-0.5 border border-slate-800">
                  {result.output.map((out, i) => (
                    <div key={i}>{out}</div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!result && (
          <div className="text-slate-500 text-[11px] italic flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" />
            <span>Klik "Jalankan & Tes" untuk mengevaluasi kode terhadap test cases.</span>
          </div>
        )}
      </div>
    </div>
  );
};
