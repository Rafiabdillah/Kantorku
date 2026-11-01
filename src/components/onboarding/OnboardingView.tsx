import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { BrandLogoIcon } from '../brand/BrandLogo';
import { PLACEMENT_QUESTIONS } from '../../content/placementQuestions';
import { TierLevel, TIERS, CharacterId } from '../../types';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Briefcase, ArrowRight, CheckCircle2, Sparkles, Award, User, Check } from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const { completeOnboarding } = useGameStore();
  const [step, setStep] = useState<'profile' | 'test' | 'result'>('profile');
  const [name, setName] = useState<string>('Budi Santoso');
  const [avatar, setAvatar] = useState<string>('player');
  const [goal, setGoal] = useState<'all' | 'excel' | 'coding' | 'word'>('all');

  // Placement Test State
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [moduleScores, setModuleScores] = useState<Record<string, { correct: number; total: number }>>({
    excel: { correct: 0, total: 0 },
    coding: { correct: 0, total: 0 },
    word: { correct: 0, total: 0 },
  });
  const [determinedTier, setDeterminedTier] = useState<TierLevel>(1);

  const currentQ = PLACEMENT_QUESTIONS[currentQIndex];

  const avatarOptions: { id: string; label: string; characterId: CharacterId | 'player' }[] = [
    { id: 'player', label: 'Budi (Player)', characterId: 'player' },
    { id: 'dimas', label: 'Dimas (Admin)', characterId: 'dimas' },
    { id: 'maya', label: 'Maya (HR)', characterId: 'maya' },
    { id: 'intan', label: 'Intan (IT)', characterId: 'intan' },
    { id: 'reza', label: 'Reza (Finance)', characterId: 'reza' },
  ];

  const handleStartTest = () => {
    sound.playClick();
    if (!name.trim()) return;
    setStep('test');
  };

  const handleSkipToIntern = () => {
    sound.playSuccess();
    completeOnboarding(name.trim() || 'Karyawan Baru', avatar, 1);
  };

  const handleAnswerQuestion = (isCorrect: boolean) => {
    sound.playClick();
    const mod = currentQ.module;
    const currentModScore = moduleScores[mod] || { correct: 0, total: 0 };
    const updatedScores = {
      ...moduleScores,
      [mod]: {
        correct: currentModScore.correct + (isCorrect ? 1 : 0),
        total: currentModScore.total + 1,
      },
    };
    setModuleScores(updatedScores);

    if (currentQIndex + 1 < PLACEMENT_QUESTIONS.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // Calculate placement tier based on score
      const totalCorrect = Object.values(updatedScores).reduce((acc, s) => acc + s.correct, 0);
      const scoreRatio = totalCorrect / PLACEMENT_QUESTIONS.length;

      let tier: TierLevel = 1;
      if (scoreRatio >= 0.8) tier = 4; // Senior Staf
      else if (scoreRatio >= 0.5) tier = 3; // Staf
      else if (scoreRatio >= 0.3) tier = 2; // Staf Junior

      setDeterminedTier(tier);
      setStep('result');
      confetti({ particleCount: 80, spread: 60 });
    }
  };

  const handleFinishOnboarding = (chosenTier: TierLevel) => {
    sound.playSuccess();
    completeOnboarding(name.trim() || 'Karyawan Baru', avatar, chosenTier);
  };

  const totalCorrect = Object.values(moduleScores).reduce((acc, s) => acc + s.correct, 0);

  return (
    <div className="flex items-center justify-center min-h-[85vh] p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 md:p-8 shadow-xl border border-slate-200/90 flex flex-col gap-6">
        {step === 'profile' && (
          <>
            <div className="text-center space-y-1">
              <div className="inline-flex justify-center mb-2">
                <BrandLogoIcon className="w-16 h-16 rounded-2xl shadow-lg shadow-emerald-950/10 hover:scale-105 transition-transform" />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900">Orientasi PT Maju Sejahtera</h1>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Lengkapi profil karyawan pertamamu sebelum melapor ke meja kerja Direktur Bu Sari.
              </p>
            </div>

            <div className="space-y-4">
              {/* Nama Lengkap */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Nama Lengkap Karyawan</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Pilihan Avatar Karakter */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pilih Avatar Kantor</label>
                <div className="grid grid-cols-5 gap-2">
                  {avatarOptions.map((opt) => {
                    const isSelected = avatar === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => {
                          sound.playClick();
                          setAvatar(opt.id);
                        }}
                        className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500 ring-offset-1'
                            : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        <CharacterAvatar id={opt.characterId} size="sm" />
                        <span className="text-[10px] font-bold text-slate-700 truncate max-w-full">
                          {opt.label.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fokus Keahlian Utama */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Fokus Keahlian Utama</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setGoal('all')}
                    className={`p-3 rounded-xl border text-left font-medium transition cursor-pointer ${
                      goal === 'all'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    🚀 Semua Modul (Direktur Track)
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoal('excel')}
                    className={`p-3 rounded-xl border text-left font-medium transition cursor-pointer ${
                      goal === 'excel'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    📊 Master Spreadsheet & Finance
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoal('coding')}
                    className={`p-3 rounded-xl border text-left font-medium transition cursor-pointer ${
                      goal === 'coding'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    💻 Automasi Script & Coding
                  </button>
                  <button
                    type="button"
                    onClick={() => setGoal('word')}
                    className={`p-3 rounded-xl border text-left font-medium transition cursor-pointer ${
                      goal === 'word'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    📝 Dokumen Korporat & SOP
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={handleStartTest}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ikuti Tes Penempatan Adaptif</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleSkipToIntern}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Mulai Dari Nol (Magang)
              </button>
            </div>
          </>
        )}

        {step === 'test' && currentQ && (
          <div className="space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold text-slate-500">
                Soal Penempatan {currentQIndex + 1} dari {PLACEMENT_QUESTIONS.length}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase">
                {currentQ.module}
              </span>
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">{currentQ.question}</h2>
            </div>

            <div className="space-y-2">
              {currentQ.options.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleAnswerQuestion(opt.isCorrect)}
                  className="w-full text-left p-3 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800 text-xs font-medium transition cursor-pointer"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 'result' && (
          <div className="text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-700 mx-auto">
              <Award className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Hasil Tes Penempatan</span>
              <h2 className="text-2xl font-extrabold text-slate-900 mt-1">
                Rekomendasi Jabatan: {TIERS[determinedTier].badge} {TIERS[determinedTier].title}
              </h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                Kamu menjawab {totalCorrect} dari {PLACEMENT_QUESTIONS.length} soal dengan benar!
              </p>
            </div>

            {/* Skor Rincian per Modul */}
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                <span className="text-[10px] text-emerald-800 font-bold block">Excel</span>
                <span className="font-extrabold text-emerald-950 font-mono">
                  {moduleScores.excel?.correct ?? 0}/5 Benar
                </span>
              </div>
              <div className="p-2.5 bg-indigo-50 rounded-xl border border-indigo-200 text-center">
                <span className="text-[10px] text-indigo-800 font-bold block">JavaScript</span>
                <span className="font-extrabold text-indigo-950 font-mono">
                  {moduleScores.coding?.correct ?? 0}/3 Benar
                </span>
              </div>
              <div className="p-2.5 bg-rose-50 rounded-xl border border-rose-200 text-center">
                <span className="text-[10px] text-rose-800 font-bold block">Word</span>
                <span className="font-extrabold text-rose-950 font-mono">
                  {moduleScores.word?.correct ?? 0}/2 Benar
                </span>
              </div>
            </div>

            {/* Alasan Penempatan Terperinci */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed text-left space-y-1.5">
              <div className="font-bold text-slate-900">Alasan Penempatan:</div>
              <p>
                {determinedTier >= 4
                  ? 'Kamu menguasai rumus relasional, logika kondisi, serta sintaks kode modular dengan tingkat akurasi tinggi. Kamu siap langsung memegang proyek skala Senior Staf!'
                  : determinedTier >= 3
                  ? 'Kamu memahami dasar spreadsheet dan logika percabangan dengan baik. Posisi Staf cocok untuk mengasah keterampilan lanjutanmu.'
                  : determinedTier >= 2
                  ? 'Kamu menguasai dasar input dan struktur data. Posisi Staf Junior akan mempercepat transisimu menuju pemahaman rumus profesional.'
                  : 'Kamu direkomendasikan memulai dari Magang agar dapat belajar bertahap dari fondasi paling dasar tanpa tekanan.'}
              </p>
              <p className="text-[11px] text-slate-500 pt-1">
                {TIERS[determinedTier].description}. Kamu bisa langsung mulai di tier ini atau tetap memilih mulai dari Magang untuk memperkuat pondasi dari nol.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={() => handleFinishOnboarding(determinedTier)}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
              >
                Mulai Sebagai {TIERS[determinedTier].title}
              </button>
              <button
                type="button"
                onClick={() => handleFinishOnboarding(1)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs transition cursor-pointer"
              >
                Pilih Mulai Dari Magang
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
