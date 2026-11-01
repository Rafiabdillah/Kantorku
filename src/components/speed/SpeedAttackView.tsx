import React, { useState, useEffect } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { PLACEMENT_QUESTIONS } from '../../content/placementQuestions';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Zap, Clock, Trophy, RotateCcw, ArrowLeft, Flame } from 'lucide-react';

export const SpeedAttackView: React.FC = () => {
  const { setView, addCoins, addXp } = useGameStore();

  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover'>('idle');
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [score, setScore] = useState<number>(0);
  const [combo, setCombo] = useState<number>(0);
  const [highestCombo, setHighestCombo] = useState<number>(0);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);

  const questions = PLACEMENT_QUESTIONS;
  const currentQ = questions[currentQIndex % questions.length];

  useEffect(() => {
    let timer: any = null;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (gameState === 'playing' && timeLeft === 0) {
      setGameState('gameover');
      sound.playSuccess();
      confetti({ particleCount: 80, spread: 60 });
      addCoins(Math.round(score / 5));
      addXp(Math.round(score / 2));
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, score]);

  const handleStart = () => {
    sound.playClick();
    setTimeLeft(45);
    setScore(0);
    setCombo(0);
    setHighestCombo(0);
    setCurrentQIndex(0);
    setGameState('playing');
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      sound.playSuccess();
      const newCombo = combo + 1;
      setCombo(newCombo);
      if (newCombo > highestCombo) setHighestCombo(newCombo);
      const points = 100 * Math.min(newCombo, 5);
      setScore((prev) => prev + points);
    } else {
      sound.playError();
      setCombo(0);
    }
    setCurrentQIndex((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setView('office');
            }}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 uppercase">
              Mode Kilat (Time Attack)
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Uji Kecepatan & Ketangkasan</h1>
          </div>
        </div>

        {gameState === 'playing' && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 font-mono font-bold rounded-xl border border-rose-200 text-sm">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}s</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-50 text-amber-900 font-bold rounded-xl border border-amber-200 text-sm">
              <Flame className="w-4 h-4 text-amber-500 fill-current" />
              <span>{combo}x Combo</span>
            </div>
          </div>
        )}
      </div>

      {gameState === 'idle' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 shadow-sm">
          <div className="inline-flex p-4 rounded-3xl bg-amber-100 text-amber-700">
            <Zap className="w-10 h-10 fill-current" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">45 Detik Melawan Waktu!</h2>
          <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
            Jawab soal kantor secepat dan setepat mungkin. Setiap jawaban beruntun akan memicu Combo Multiplier hingga 5x lipat skor!
          </p>
          <button
            type="button"
            onClick={handleStart}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm rounded-2xl shadow-lg transition cursor-pointer"
          >
            Mulai Time Attack
          </button>
        </div>
      )}

      {gameState === 'playing' && currentQ && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Skor: <strong className="text-slate-800 font-mono">{score}</strong></span>
            <span>Soal #{currentQIndex + 1}</span>
          </div>

          <h2 className="text-base font-bold text-slate-900 leading-snug">{currentQ.question}</h2>

          <div className="space-y-2 pt-2">
            {currentQ.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleAnswer(opt.isCorrect)}
                className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-amber-500 hover:bg-amber-50/50 text-slate-800 text-xs font-semibold transition cursor-pointer"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-5 shadow-sm animate-in fade-in zoom-in-95">
          <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700 mx-auto">
            <Trophy className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Waktu Habis!</span>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-1">Skor Akhir: {score} Poin</h2>
            <div className="text-xs text-amber-700 font-bold mt-1">Kombo Tertinggi: {highestCombo}x</div>
          </div>

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600">
            Hadiah Diperoleh: +{Math.round(score / 5)} Koin & +{Math.round(score / 2)} XP
          </div>

          <div className="flex gap-3 justify-center">
            <button
              type="button"
              onClick={handleStart}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Main Lagi</span>
            </button>
            <button
              type="button"
              onClick={() => setView('office')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Kembali ke Kantor
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
