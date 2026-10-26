import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CASE_FILES } from '../../content/caseFiles';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { SpreadsheetEditor } from '../editor/SpreadsheetEditor';
import { WebPreviewEditor } from '../editor/WebPreviewEditor';
import { SheetGrid } from '../../types';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import {
  Mail,
  MessageSquare,
  Clock,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Award,
  ArrowLeft,
  Volume2,
  FileText,
  Send,
  BookOpen,
} from 'lucide-react';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const CaseFileView: React.FC = () => {
  const { activeCaseId, setView, addCoins, addXp, updateReputation } = useGameStore();

  const caseItem = CASE_FILES.find((c) => c.id === activeCaseId) || CASE_FILES[0];

  const [sheetData, setSheetData] = useState<SheetGrid>(() =>
    caseItem.initialData.excel ? JSON.parse(JSON.stringify(caseItem.initialData.excel)) : {}
  );
  const [htmlData, setHtmlData] = useState<string>(caseItem.initialData.html || '');
  const [cssData, setCssData] = useState<string>(caseItem.initialData.css || '');
  const [selectedClarification, setSelectedClarification] = useState<string | null>(null);
  const [clarificationSubmitted, setClarificationSubmitted] = useState<boolean>(false);
  const [handoverNote, setHandoverNote] = useState<string>('Tugas telah selesai dirapikan sesuai instruksi.');
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [activeMobileTab, setActiveMobileTab] = useState<'brief' | 'editor' | 'handover'>('editor');

  const handleCellChange = (addr: string, data: any) => {
    setSheetData((prev) => ({
      ...prev,
      [addr.toUpperCase()]: {
        ...(prev[addr.toUpperCase()] || { raw: '' }),
        ...data,
      },
    }));
  };

  const submitClarification = (optId: string) => {
    sound.playClick();
    setSelectedClarification(optId);
    setClarificationSubmitted(true);
  };

  const handleFinishCase = () => {
    sound.playSuccess();
    confetti({ particleCount: 70, spread: 60 });
    addCoins(caseItem.coinsReward);
    addXp(caseItem.xpReward);
    updateReputation(caseItem.character, caseItem.reputationReward);
    setShowCompleteModal(true);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-7xl mx-auto pb-4 gap-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-5 py-2.5 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setView('office');
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 uppercase tracking-wide">
                Kasus Nyata v2.0 • {caseItem.industry}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-bold text-slate-800">{caseItem.title}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-mono bg-slate-100 px-2.5 py-1 rounded-lg">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>Tenggat: {caseItem.deadlineHours} Jam</span>
          </div>

          {/* Mobile Tab Switcher */}
          <div className="flex lg:hidden items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveMobileTab('brief')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeMobileTab === 'brief' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600'
              }`}
            >
              Briefing
            </button>
            <button
              type="button"
              onClick={() => setActiveMobileTab('editor')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeMobileTab === 'editor' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600'
              }`}
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveMobileTab('handover')}
              className={`px-2.5 py-1 rounded-lg transition cursor-pointer ${
                activeMobileTab === 'handover' ? 'bg-white shadow-xs text-slate-900 font-bold' : 'text-slate-600'
              }`}
            >
              Serah Terima
            </button>
          </div>

          <button
            type="button"
            onClick={handleFinishCase}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer shrink-0"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Kirim Serah Terima</span>
            <span className="sm:hidden">Kirim</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 flex-1 overflow-hidden">
        {/* Left Column: Brief Channels (WhatsApp/Email/VoiceNote), Clarifications & Handover Note (4 Cols) */}
        <div
          className={`lg:col-span-4 bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col gap-4 overflow-y-auto ${
            activeMobileTab === 'brief' || activeMobileTab === 'handover' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          {/* Email Channel */}
          {caseItem.emails && caseItem.emails.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700 flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>{caseItem.emails[0]?.from}</span>
                </span>
                <span>{caseItem.emails[0]?.timestamp}</span>
              </div>
              <div className="font-bold text-xs text-slate-900">{caseItem.emails[0]?.subject}</div>
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/50">
                "{caseItem.emails[0]?.body}"
              </p>
            </div>
          )}

          {/* Voice Note Transcript Channel */}
          {caseItem.voiceNotes && caseItem.voiceNotes.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-800">
                <span className="font-bold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-emerald-600 animate-pulse" />
                  <span>Voice Note: {caseItem.voiceNotes[0].speaker} ({caseItem.voiceNotes[0].duration})</span>
                </span>
              </div>
              <div className="p-2.5 bg-white rounded-xl border border-emerald-200/60 text-xs text-emerald-950 italic">
                "{caseItem.voiceNotes[0].transcript}"
              </div>
            </div>
          )}

          {/* Internal Team Chat (Multi-Party Interests) */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>Diskusi Tim Internal (Multi-Pihak)</span>
            </div>
            <div className="space-y-2">
              {caseItem.chats.map((chat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                    <span>{chat.sender} {chat.role ? `(${chat.role})` : ''}</span>
                    <span className="text-slate-400 font-normal">{chat.time}</span>
                  </div>
                  <div className="text-slate-600 mt-1">{chat.message}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Clarification Box */}
          {caseItem.clarifyingQuestions.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                <span>Pertanyaan Klarifikasi Ambigu</span>
              </div>
              <p className="text-xs text-amber-800">{caseItem.clarifyingQuestions[0].question}</p>

              <div className="space-y-1.5 mt-2">
                {caseItem.clarifyingQuestions[0].options.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => submitClarification(opt.id)}
                    className={`w-full text-left p-2.5 rounded-xl border text-xs transition cursor-pointer ${
                      selectedClarification === opt.id
                        ? 'bg-amber-600 text-white border-amber-600 font-semibold shadow-xs'
                        : 'bg-white hover:bg-amber-100/50 text-slate-700 border-amber-200/60'
                    }`}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>

              {clarificationSubmitted && selectedClarification && (
                <div className="p-2.5 rounded-xl bg-white border border-amber-300 text-xs text-amber-950 font-medium mt-2">
                  <span className="font-bold">Balasan Klien: </span>
                  {
                    caseItem.clarifyingQuestions[0].options.find((o) => o.id === selectedClarification)
                      ?.bossResponse
                  }
                </div>
              )}
            </div>
          )}

          {/* Handover Note Summary Box */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Send className="w-3.5 h-3.5 text-indigo-600" />
              <span>Pesan Ringkasan Serah Terima Pekerjaan:</span>
            </div>
            <textarea
              value={handoverNote}
              onChange={(e) => setHandoverNote(e.target.value)}
              className="w-full h-16 p-2 rounded-xl bg-white border border-slate-200 text-xs outline-none focus:ring-1 focus:ring-indigo-500"
              placeholder="Tulis ringkasan hasil pekerjaan untuk atasan..."
            />
          </div>
        </div>

        {/* Right Column: Workbook or Web Preview (8 Cols) */}
        <div
          className={`lg:col-span-8 flex flex-col h-full overflow-hidden ${
            activeMobileTab === 'editor' ? 'flex' : 'hidden lg:flex'
          }`}
        >
          <ErrorBoundary fallbackTitle="Editor Kasus Mengalami Kendala">
            {caseItem.module === 'web' ? (
              <WebPreviewEditor
                html={htmlData}
                css={cssData}
                onHtmlChange={(h) => setHtmlData(h)}
                onCssChange={(c) => setCssData(c)}
              />
            ) : (
              <SpreadsheetEditor grid={sheetData} onCellChange={handleCellChange} />
            )}
          </ErrorBoundary>
        </div>
      </div>

      {/* Completion & Debrief Modal */}
      {showCompleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="text-center">
              <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-600 mx-auto mb-2">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Serah Terima Kasus Disetujui!</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Solusimu dan pesan serah terima telah diterima baik oleh {caseItem.clientName}.
              </p>
            </div>

            {/* 5-Dimension Rubric Scoring */}
            <div className="grid grid-cols-5 gap-1.5 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Benar</span>
                <span className="font-bold text-slate-800 text-xs">95%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Efisien</span>
                <span className="font-bold text-slate-800 text-xs">90%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Rapi</span>
                <span className="font-bold text-slate-800 text-xs">95%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Dirawat</span>
                <span className="font-bold text-slate-800 text-xs">90%</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Komunikasi</span>
                <span className="font-bold text-emerald-600 text-xs">100%</span>
              </div>
            </div>

            {/* Debrief Catatan Mentor */}
            {caseItem.mentorDebrief && (
              <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                  <BookOpen className="w-4 h-4 text-emerald-700" />
                  <span>Debrief: Catatan Mentor Portofolio</span>
                </div>
                <p className="text-emerald-950 leading-relaxed">
                  <span className="font-semibold">Pelajaran Kunci: </span>
                  {caseItem.mentorDebrief.keyTakeaway}
                </p>
                <p className="text-emerald-900 leading-relaxed">
                  <span className="font-semibold">Konteks Industri: </span>
                  {caseItem.mentorDebrief.industryContext}
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setShowCompleteModal(false);
                setView('office');
              }}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition cursor-pointer mt-1"
            >
              Kembali ke Denah Kantor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
