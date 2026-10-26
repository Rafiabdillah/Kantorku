/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Simulation & Dialogue Branching Engine (Wave S0)
 * Multi-turn situational negotiation, complaint handling & sentence assembly.
 */

import React, { useState } from 'react';
import { CharacterId, CharacterExpression } from '../../types';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';
import {
  MessageSquare,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  Layers,
} from 'lucide-react';

export interface SentenceBlock {
  id: string;
  text: string;
  category: 'pembuka' | 'empati' | 'fakta' | 'solusi' | 'penutup';
}

export interface SimulationRubricScore {
  empathy: number; // 0-100
  clarity: number; // 0-100
  professionalFirmness: number; // 0-100
  ethicalSolution: number; // 0-100
  total: number; // 0-100
}

export interface SimulationNode {
  id: string;
  speaker: CharacterId | 'klien' | 'user';
  speakerName: string;
  role: string;
  text: string;
  expression?: CharacterExpression;
  mode: 'choice' | 'assembly';
  choices?: {
    id: string;
    text: string;
    nextNodeId?: string;
    rubric: Partial<SimulationRubricScore>;
    reputationImpact?: number;
    feedbackTip: string;
    tradeoffExplanation: string;
  }[];
  sentenceBlocks?: {
    available: SentenceBlock[];
    validOrderIds: string[][]; // list of acceptable sequence arrays
    rubricOnSuccess: SimulationRubricScore;
    explanation: string;
  };
}

export interface SimulationScenario {
  id: string;
  title: string;
  scenarioContext: string;
  targetCharacter: {
    id: CharacterId | 'klien';
    name: string;
    role: string;
    avatarBg?: string;
  };
  startNodeId: string;
  nodes: Record<string, SimulationNode>;
  debrief: {
    keyTakeaway: string;
    realWorldLesson: string;
  };
}

export interface SimulationEngineProps {
  scenario: SimulationScenario;
  onComplete?: (result: {
    passed: boolean;
    scores: SimulationRubricScore;
    feedback: string[];
  }) => void;
}

export const SimulationEngine: React.FC<SimulationEngineProps> = ({ scenario, onComplete }) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>(scenario.startNodeId);
  const [history, setHistory] = useState<
    Array<{
      speaker: string;
      role: string;
      text: string;
      isUser?: boolean;
    }>
  >([]);
  const [accumulatedScores, setAccumulatedScores] = useState<SimulationRubricScore[]>([
    { empathy: 70, clarity: 70, professionalFirmness: 70, ethicalSolution: 70, total: 70 },
  ]);
  const [selectedBlocks, setSelectedBlocks] = useState<SentenceBlock[]>([]);
  const [assemblyFeedback, setAssemblyFeedback] = useState<string | null>(null);
  const [completed, setCompleted] = useState<boolean>(false);
  const [latestTradeoff, setLatestTradeoff] = useState<string | null>(null);

  const currentNode = scenario.nodes[currentNodeId];

  const averageScores = (): SimulationRubricScore => {
    if (accumulatedScores.length === 0) {
      return { empathy: 70, clarity: 70, professionalFirmness: 70, ethicalSolution: 70, total: 70 };
    }
    const sum = accumulatedScores.reduce(
      (acc, s) => ({
        empathy: acc.empathy + s.empathy,
        clarity: acc.clarity + s.clarity,
        professionalFirmness: acc.professionalFirmness + s.professionalFirmness,
        ethicalSolution: acc.ethicalSolution + s.ethicalSolution,
        total: acc.total + s.total,
      }),
      { empathy: 0, clarity: 0, professionalFirmness: 0, ethicalSolution: 0, total: 0 }
    );
    const n = accumulatedScores.length;
    return {
      empathy: Math.round(sum.empathy / n),
      clarity: Math.round(sum.clarity / n),
      professionalFirmness: Math.round(sum.professionalFirmness / n),
      ethicalSolution: Math.round(sum.ethicalSolution / n),
      total: Math.round(sum.total / n),
    };
  };

  const handleSelectChoice = (choice: NonNullable<SimulationNode['choices']>[number]) => {
    sound.playClick();
    const newHistory = [
      ...history,
      { speaker: currentNode.speakerName, role: currentNode.role, text: currentNode.text },
      { speaker: 'Anda', role: 'Praktisi', text: choice.text, isUser: true },
    ];
    setHistory(newHistory);
    setLatestTradeoff(choice.tradeoffExplanation);

    const rubric: SimulationRubricScore = {
      empathy: choice.rubric.empathy ?? 75,
      clarity: choice.rubric.clarity ?? 75,
      professionalFirmness: choice.rubric.professionalFirmness ?? 75,
      ethicalSolution: choice.rubric.ethicalSolution ?? 75,
      total: Math.round(
        ((choice.rubric.empathy ?? 75) +
          (choice.rubric.clarity ?? 75) +
          (choice.rubric.professionalFirmness ?? 75) +
          (choice.rubric.ethicalSolution ?? 75)) /
          4
      ),
    };
    const nextAccum = [...accumulatedScores, rubric];
    setAccumulatedScores(nextAccum);

    if (choice.nextNodeId && scenario.nodes[choice.nextNodeId]) {
      setCurrentNodeId(choice.nextNodeId);
    } else {
      finishSimulation(nextAccum);
    }
  };

  const handleAddBlock = (block: SentenceBlock) => {
    sound.playClick();
    setSelectedBlocks((prev) => [...prev, block]);
    setAssemblyFeedback(null);
  };

  const handleRemoveBlock = (index: number) => {
    sound.playClick();
    setSelectedBlocks((prev) => prev.filter((_, i) => i !== index));
    setAssemblyFeedback(null);
  };

  const handleVerifyAssembly = () => {
    if (!currentNode.sentenceBlocks) return;
    const currentOrder = selectedBlocks.map((b) => b.id);
    const isValid = currentNode.sentenceBlocks.validOrderIds.some(
      (valid) => valid.length === currentOrder.length && valid.every((id, idx) => id === currentOrder[idx])
    );

    if (isValid) {
      sound.playSuccess();
      const compiledText = selectedBlocks.map((b) => b.text).join(' ');
      const newHistory = [
        ...history,
        { speaker: currentNode.speakerName, role: currentNode.role, text: currentNode.text },
        { speaker: 'Anda (Respon Terangkai)', role: 'Praktisi', text: compiledText, isUser: true },
      ];
      setHistory(newHistory);
      const nextAccum = [...accumulatedScores, currentNode.sentenceBlocks.rubricOnSuccess];
      setAccumulatedScores(nextAccum);
      setLatestTradeoff(currentNode.sentenceBlocks.explanation);
      finishSimulation(nextAccum);
    } else {
      sound.playError();
      setAssemblyFeedback('Urutan kalimat belum tepat. Mulailah dengan salam/empati, lalu jelaskan situasi, solusi, dan penutup yang jelas.');
    }
  };

  const finishSimulation = (finalAccum: SimulationRubricScore[]) => {
    setCompleted(true);
    const sum = finalAccum.reduce(
      (acc, s) => ({
        empathy: acc.empathy + s.empathy,
        clarity: acc.clarity + s.clarity,
        professionalFirmness: acc.professionalFirmness + s.professionalFirmness,
        ethicalSolution: acc.ethicalSolution + s.ethicalSolution,
        total: acc.total + s.total,
      }),
      { empathy: 0, clarity: 0, professionalFirmness: 0, ethicalSolution: 0, total: 0 }
    );
    const n = finalAccum.length;
    const finalScore = {
      empathy: Math.round(sum.empathy / n),
      clarity: Math.round(sum.clarity / n),
      professionalFirmness: Math.round(sum.professionalFirmness / n),
      ethicalSolution: Math.round(sum.ethicalSolution / n),
      total: Math.round(sum.total / n),
    };
    if (onComplete) {
      onComplete({
        passed: finalScore.total >= 70,
        scores: finalScore,
        feedback: [scenario.debrief.keyTakeaway, scenario.debrief.realWorldLesson],
      });
    }
  };

  const handleRestart = () => {
    setCurrentNodeId(scenario.startNodeId);
    setHistory([]);
    setSelectedBlocks([]);
    setAssemblyFeedback(null);
    setCompleted(false);
    setLatestTradeoff(null);
    setAccumulatedScores([{ empathy: 70, clarity: 70, professionalFirmness: 70, ethicalSolution: 70, total: 70 }]);
  };

  const currentAvg = averageScores();

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Scenario Header */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-5">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold tracking-wide flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            Mesin Simulasi Komunikasi (Domain D12)
          </span>
        </div>
        <h2 className="text-xl font-bold">{scenario.title}</h2>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">{scenario.scenarioContext}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {/* Active Dialogue Space (8 cols) */}
        <div className="lg:col-span-8 p-5 flex flex-col gap-4">
          {/* Scrollable Conversation Stream */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {history.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-[85%] ${
                  item.isUser
                    ? 'ml-auto bg-emerald-600 text-white rounded-br-none'
                    : 'mr-auto bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
                }`}
              >
                <div className="text-[10px] font-bold opacity-75 mb-1 flex items-center justify-between gap-4">
                  <span>{item.speaker}</span>
                  <span>{item.role}</span>
                </div>
                <div>{item.text}</div>
              </div>
            ))}

            {/* Current Active Node if not completed */}
            {!completed && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200/90 text-amber-950 text-xs leading-relaxed animate-in fade-in">
                <div className="flex items-center gap-2 font-bold mb-1.5 text-amber-900">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span>{currentNode.speakerName} ({currentNode.role}):</span>
                </div>
                <p className="text-sm font-medium">{currentNode.text}</p>
              </div>
            )}
          </div>

          {/* Action Area: Choices or Sentence Block Assembly */}
          {!completed && currentNode.mode === 'choice' && (
            <div className="mt-auto pt-4 border-t border-slate-100 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Pilih Tanggapan Diplomatis Terbaik:
              </label>
              {currentNode.choices?.map((choice) => (
                <button
                  key={choice.id}
                  type="button"
                  onClick={() => handleSelectChoice(choice)}
                  className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/40 text-xs font-medium text-slate-800 transition-all group flex items-start justify-between gap-3"
                >
                  <span className="leading-relaxed">{choice.text}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>
          )}

          {!completed && currentNode.mode === 'assembly' && currentNode.sentenceBlocks && (
            <div className="mt-auto pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  Susun Jawaban dari Blok Kalimat
                </label>
                <span className="text-[11px] text-slate-400">Klik blok untuk memindahkan</span>
              </div>

              {/* Selected Blocks Area */}
              <div className="min-h-[70px] p-2.5 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex flex-wrap gap-2 items-center">
                {selectedBlocks.length === 0 ? (
                  <span className="text-xs text-slate-400 italic px-2">
                    Belum ada blok dipilih. Klik blok di bawah sesuai urutan logika.
                  </span>
                ) : (
                  selectedBlocks.map((block, idx) => (
                    <button
                      key={block.id + idx}
                      type="button"
                      onClick={() => handleRemoveBlock(idx)}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-medium shadow-sm hover:bg-rose-600 transition-colors flex items-center gap-1.5"
                      title="Klik untuk menghapus blok"
                    >
                      <span>{block.text}</span>
                      <span className="text-[10px] opacity-75">✕</span>
                    </button>
                  ))
                )}
              </div>

              {/* Available Blocks Pool */}
              <div className="flex flex-wrap gap-2">
                {currentNode.sentenceBlocks.available
                  .filter((b) => !selectedBlocks.some((sb) => sb.id === b.id))
                  .map((block) => (
                    <button
                      key={block.id}
                      type="button"
                      onClick={() => handleAddBlock(block)}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:border-emerald-500 hover:bg-emerald-50 text-xs font-medium text-slate-700 transition-colors shadow-2xs"
                    >
                      + {block.text}
                    </button>
                  ))}
              </div>

              {assemblyFeedback && (
                <div className="p-2.5 rounded-xl bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
                  💡 {assemblyFeedback}
                </div>
              )}

              <button
                type="button"
                onClick={handleVerifyAssembly}
                disabled={selectedBlocks.length === 0}
                className="w-full py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Kirim Rangkaian Pesan
              </button>
            </div>
          )}

          {/* Completed State & Mentor Debrief */}
          {completed && (
            <div className="mt-auto pt-4 border-t border-slate-100 space-y-3 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-sm mb-1 text-emerald-900">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Simulasi Selesai & Terevaluasi
                </div>
                <p className="text-xs text-emerald-800 leading-relaxed mb-3">
                  {scenario.debrief.keyTakeaway}
                </p>
                <div className="text-[11px] bg-white/80 p-2.5 rounded-xl border border-emerald-200 text-slate-700">
                  <strong>Pelajaran Nyata:</strong> {scenario.debrief.realWorldLesson}
                </div>
              </div>

              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Ulangi Skenario dengan Pilihan Lain
              </button>
            </div>
          )}
        </div>

        {/* Live Rubric Score Radar / Panel (4 cols) */}
        <div className="lg:col-span-4 p-5 bg-slate-50/70 flex flex-col gap-4">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Rubrik Evaluasi Sikap
            </h3>
            <p className="text-[11px] text-slate-500">
              Dinilai secara transparan berdasarkan prinsip diplomasi & etika bisnis.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Empati & Mendengarkan</span>
                <span className="font-mono">{currentAvg.empathy}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${currentAvg.empathy}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Kejelasan Fakta</span>
                <span className="font-mono">{currentAvg.clarity}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${currentAvg.clarity}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Ketegasan Profesional</span>
                <span className="font-mono">{currentAvg.professionalFirmness}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-indigo-500 transition-all duration-300"
                  style={{ width: `${currentAvg.professionalFirmness}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
                <span>Solusi & Integritas Etika</span>
                <span className="font-mono">{currentAvg.ethicalSolution}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className="h-full bg-purple-500 transition-all duration-300"
                  style={{ width: `${currentAvg.ethicalSolution}%` }}
                />
              </div>
            </div>
          </div>

          {/* Trade-off explanation box */}
          {latestTradeoff && (
            <div className="p-3 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 animate-in fade-in">
              <div className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-1 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
                Dampak Keputusan Terakhir:
              </div>
              <p className="text-[11px] leading-relaxed">{latestTradeoff}</p>
            </div>
          )}

          <div className="mt-auto bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
            💡 <strong>Prinsip:</strong> Tidak ada tanggapan tunggal yang mutlak. Setiap pilihan memiliki konsekuensi trade-off antara kecepatan, kepuasan emosional, dan batas wewenang.
          </div>
        </div>
      </div>
    </div>
  );
};
