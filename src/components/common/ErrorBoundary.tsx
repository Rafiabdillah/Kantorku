/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Error Boundary Component
 * Catches render errors, displays Indonesian friendly fallback UI,
 * logs to sessionStorage, and allows retry / return to office.
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ChevronDown } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
  onReset?: () => void;
  onReturnToOffice?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDetails: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDetails: false,
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[KantorKu ErrorBoundary caught error]:', error, errorInfo);
    try {
      const errRecord = {
        message: error.message || 'Unknown error',
        stack: error.stack || null,
        componentStack: errorInfo.componentStack || null,
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem('kantorku_last_error', JSON.stringify(errRecord));
    } catch (e) {
      // Ignore storage errors in private/restricted environments
    }
    this.setState({ errorInfo });
  }

  private handleRetry = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  private handleReturnToOffice = () => {
    if (this.props.onReturnToOffice) {
      this.props.onReturnToOffice();
      this.setState({ hasError: false, error: null, errorInfo: null });
    } else {
      // Fallback: reload or push state to clear broken view
      try {
        const rawStore = localStorage.getItem('kantorku_state') || localStorage.getItem('kantorku-game-storage');
        if (rawStore) {
          const parsed = JSON.parse(rawStore);
          if (parsed && parsed.state) {
            parsed.state.currentView = 'office';
            parsed.state.activeMission = null;
            parsed.state.activeLearningLessonId = null;
            localStorage.setItem('kantorku_state', JSON.stringify(parsed));
          }
        }
      } catch {
        // ignore
      }
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      const title = this.props.fallbackTitle || 'Ups, Terjadi Kendala Teknis';
      const message =
        this.props.fallbackMessage ||
        'Bagian ini mengalami kendala yang tidak terduga. Kemajuan karir dan data kantormu tetap aman tersimpan.';

      return (
        <div className="min-h-[320px] w-full flex items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-red-500/20 backdrop-blur-md">
          <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-100">{title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{message}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <button
                type="button"
                onClick={this.handleRetry}
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-900/30"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Coba Lagi</span>
              </button>
              <button
                type="button"
                onClick={this.handleReturnToOffice}
                className="flex-1 py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer border border-slate-700"
              >
                <Home className="w-4 h-4" />
                <span>Kembali ke Kantor</span>
              </button>
            </div>

            {this.state.error && (
              <div className="pt-2 text-left">
                <button
                  type="button"
                  onClick={() => this.setState({ showDetails: !this.state.showDetails })}
                  className="text-[11px] text-slate-500 hover:text-slate-400 flex items-center gap-1 mx-auto cursor-pointer"
                >
                  <span>Detail Teknis</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${this.state.showDetails ? 'rotate-180' : ''}`} />
                </button>
                {this.state.showDetails && (
                  <pre className="mt-2 p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-[10px] text-red-300/80 overflow-x-auto max-h-36 font-mono whitespace-pre-wrap">
                    {this.state.error.message}
                    {this.state.error.stack ? `\n\n${this.state.error.stack.split('\n').slice(0, 4).join('\n')}` : ''}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
