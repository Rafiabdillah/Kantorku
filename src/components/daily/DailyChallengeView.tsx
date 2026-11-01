import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { PLACEMENT_QUESTIONS } from '../../content/placementQuestions';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Zap, Flame, Award, ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';

export const DailyChallengeView: React.FC = () => {
  const { profile, setView, addCoins, addXp, checkStreak, buyStreakFreeze } = useGameStore();

  const [question] = useState(
    () => PLACEMENT_QUESTIONS[Math.floor(Math.random() * PLACEMENT_QUESTIONS.length)]
  );
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  const handleSelectOption = (optId: string, correct: boolean) => {
    if (isAnswered) return;
    sound.playClick();
    setSelectedOption(optId);
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      sound.playSuccess();
      confetti({ particleCount: 70, spread: 60 });
      addCoins(100);
      addXp(150);
      checkStreak();
    } else {
      sound.playError();
    }
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
              Tantangan Harian
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Daily Office Sprint</h1>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center gap-2 p-2 px-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900">
          <Flame className="w-5 h-5 text-amber-500 fill-current" />
          <span className="font-extrabold text-sm">{profile.streakDays} Hari Streak</span>
        </div>
      </div>

      {/* Streak Freeze Management Box */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-3xl flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0" />
          <div>
            <span className="font-bold text-blue-900">Pembeku Streak: </span>
            <span className="text-blue-800">
              Kamu punya {profile.streakFreeze} streak freeze untuk mencegah streak putus saat sibuk.
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (buyStreakFreeze()) {
              sound.playSuccess();
            } else {
              sound.playError();
            }
          }}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition shrink-0 cursor-pointer text-xs"
        >
          Beli Freeze (150 Koin)
        </button>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-bold uppercase tracking-wider text-slate-400">Soal Hari Ini</span>
          <span className="font-semibold text-emerald-600">+100 Koin • +150 XP</span>
        </div>

        <h2 className="text-base font-extrabold text-slate-900 leading-snug">{question.question}</h2>

        <div className="space-y-2 pt-2">
          {question.options.map((opt) => (
            <button
              key={opt.id}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(opt.id, opt.isCorrect)}
              className={`w-full text-left p-3.5 rounded-2xl border text-xs font-medium transition cursor-pointer ${
                isAnswered
                  ? opt.isCorrect
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                    : selectedOption === opt.id
                    ? 'bg-rose-50 border-rose-500 text-rose-900'
                    : 'bg-slate-50 text-slate-400 border-slate-200'
                  : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800 hover:border-emerald-400'
              }`}
            >
              {opt.text}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div
            className={`p-4 rounded-2xl border text-xs leading-relaxed animate-in fade-in ${
              isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-950' : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <span className="font-bold">{isCorrect ? 'Benar Sekali!' : 'Belum Tepat.'} </span>
            {question.explanation}
          </div>
        )}
      </div>
    </div>
  );
};
