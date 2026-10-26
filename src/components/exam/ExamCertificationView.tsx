import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TIERS, TierLevel } from '../../types';
import { PLACEMENT_QUESTIONS } from '../../content/placementQuestions';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Award, ArrowLeft, CheckCircle2, ShieldCheck, Printer, Download, Star } from 'lucide-react';

export const ExamCertificationView: React.FC = () => {
  const { profile, setView, addCoins, addXp } = useGameStore();
  const [selectedTier, setSelectedTier] = useState<TierLevel>(1);
  const [selectedTrack, setSelectedTrack] = useState<string>('excel');
  const [isExamActive, setIsExamActive] = useState<boolean>(false);
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userScore, setUserScore] = useState<number>(0);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [certificateId, setCertificateId] = useState<string>('');

  const tracks = [
    { id: 'excel', label: 'Excel Bisnis & Analisis Data', icon: '📊' },
    { id: 'web', label: 'Web Frontend (HTML & CSS)', icon: '🌐' },
    { id: 'coding', label: 'JavaScript Pemrograman Kantor', icon: '💻' },
    { id: 'word', label: 'Word Bisnis & Standar Akademik', icon: '📝' },
  ];

  const questions = PLACEMENT_QUESTIONS.slice(0, 5); // 5 exam questions
  const currentQ = questions[currentQIndex];

  const handleStartExam = (tier: TierLevel) => {
    sound.playClick();
    setSelectedTier(tier);
    setCurrentQIndex(0);
    setUserScore(0);
    setExamFinished(false);
    setIsExamActive(true);
  };

  const handleAnswer = (isCorrect: boolean) => {
    sound.playClick();
    const newScore = isCorrect ? userScore + 1 : userScore;
    setUserScore(newScore);

    if (currentQIndex + 1 < questions.length) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setExamFinished(true);
      const passed = newScore >= 4; // 80% pass
      if (passed) {
        sound.playSuccess();
        confetti({ particleCount: 90, spread: 70 });
        setCertificateId(`KTK-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`);
        addCoins(300);
        addXp(500);
      } else {
        sound.playError();
      }
    }
  };

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto pb-12">
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
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
              Ujian Sertifikasi Resmi
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Sertifikasi Kompetensi PT Maju Sejahtera</h1>
          </div>
        </div>
      </div>

      {!isExamActive && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
            <div className="text-xs font-bold text-slate-700 mb-2">Pilih Jalur Spesialisasi Sertifikasi:</div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {tracks.map((tr) => (
                <button
                  key={tr.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    setSelectedTrack(tr.id);
                  }}
                  className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 cursor-pointer ${
                    selectedTrack === tr.id
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold shadow-xs'
                      : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <span className="text-lg">{tr.icon}</span>
                  <div className="text-[11px] leading-tight">{tr.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {([1, 2, 3, 4, 5, 6, 7] as TierLevel[]).map((t) => {
            const tInfo = TIERS[t];
            const isEligible = profile.currentTier >= t;

            return (
              <div
                key={t}
                className={`p-5 rounded-3xl border transition flex flex-col justify-between min-h-[170px] ${
                  isEligible ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-50 border-slate-200/60 opacity-60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl">{tInfo.badge}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      Tier {t}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-base text-slate-900 mt-2">{tInfo.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{tInfo.description}</p>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100 mt-3">
                  <span className="text-[11px] text-slate-400">5 Soal Bebas Hint • Nilai Min 80%</span>
                  {isEligible ? (
                    <button
                      type="button"
                      onClick={() => handleStartExam(t)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition cursor-pointer"
                    >
                      Mulai Ujian
                    </button>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium">Belum Memenuhi Syarat</span>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      )}

      {/* Active Exam Questions Screen */}
      {isExamActive && !examFinished && currentQ && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md space-y-5 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500">
              Soal Ujian {currentQIndex + 1} dari {questions.length} (Tier {selectedTier})
            </span>
            <span className="text-xs text-rose-600 font-semibold bg-rose-50 px-2 py-0.5 rounded-md">
              Mode Ujian (Tanpa Bantuan)
            </span>
          </div>

          <h2 className="text-base font-bold text-slate-900 leading-relaxed">{currentQ.question}</h2>

          <div className="space-y-2 pt-2">
            {currentQ.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleAnswer(opt.isCorrect)}
                className="w-full text-left p-3.5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-800 text-xs font-medium transition cursor-pointer"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Exam Result & Certificate Generator */}
      {isExamActive && examFinished && (
        <div className="space-y-6 animate-in fade-in zoom-in-95">
          {userScore >= 4 ? (
            /* Printable Official Certificate Document */
            <div className="flex flex-col items-center gap-4">
              <div
                id="printable-certificate"
                className="w-full bg-[#FCFBF7] rounded-3xl p-8 md:p-12 border-8 border-double border-amber-600/60 shadow-2xl relative text-center text-slate-900 select-none overflow-hidden"
              >
                {/* Decorative corner embellishments */}
                <div className="absolute top-4 left-4 text-amber-700/40 text-2xl font-serif">❦</div>
                <div className="absolute top-4 right-4 text-amber-700/40 text-2xl font-serif">❦</div>
                <div className="absolute bottom-4 left-4 text-amber-700/40 text-2xl font-serif">❦</div>
                <div className="absolute bottom-4 right-4 text-amber-700/40 text-2xl font-serif">❦</div>

                <div className="text-xs tracking-widest uppercase font-bold text-amber-800">
                  PT MAJU SEJAHTERA INDONESIA
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-900 mt-2 tracking-wide">
                  SERTIFIKAT KELULUSAN KOMPETENSI
                </h2>
                <div className="text-[11px] font-mono text-slate-500 mt-1">Nomor Registrasi: {certificateId}</div>

                <div className="my-6">
                  <div className="text-xs text-slate-600">Diberikan secara resmi dan sah kepada:</div>
                  <div className="text-2xl md:text-3xl font-serif font-bold text-slate-950 mt-1 border-b-2 border-slate-300 pb-2 inline-block px-8">
                    {profile.name}
                  </div>
                </div>

                <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed">
                  Telah dinyatakan LULUS dalam Ujian Standardisasi Pengetahuan & Keterampilan Praktik Kerja Kantor pada bidang spesialisasi{' '}
                  <span className="font-bold text-emerald-800 underline decoration-emerald-500/50">
                    {tracks.find((t) => t.id === selectedTrack)?.label || 'Excel Bisnis & Analisis Data'}
                  </span>{' '}
                  Tingkat{' '}
                  <span className="font-bold text-slate-900">
                    {TIERS[selectedTier].title} (Tier {selectedTier})
                  </span>{' '}
                  dengan nilai keunggulan {userScore * 20}% pada tanggal {new Date().toLocaleDateString('id-ID')}.
                </p>

                {/* Signatures & Seal */}
                <div className="grid grid-cols-3 gap-4 items-end mt-10 pt-4 border-t border-slate-200">
                  <div className="text-center">
                    <div className="font-serif italic text-sm text-slate-800">Maya Indah, S.Psi.</div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">Head of People & HR</div>
                  </div>

                  {/* Gold Official Stamp */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full border-4 border-amber-600 bg-amber-100 flex items-center justify-center text-amber-800 shadow-inner">
                      <Award className="w-8 h-8" />
                    </div>
                    <span className="text-[9px] font-bold text-amber-800 mt-1 uppercase tracking-wider">
                      VERIFIED OFFICIAL
                    </span>
                  </div>

                  <div className="text-center">
                    <div className="font-serif italic text-sm text-slate-800">Sari Rahmawati, M.M.</div>
                    <div className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">
                      Operational Director
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Cetak / Simpan PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsExamActive(false)}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-xl transition cursor-pointer"
                >
                  Kembali ke Daftar Ujian
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto text-xl font-bold">
                ✕
              </div>
              <h2 className="text-xl font-extrabold text-slate-900">Belum Memenuhi Batas Kelulusan</h2>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Skor Anda {userScore * 20}% (syarat minimal 80%). Pelajari kembali materi lewat jalur karier lalu coba lagi.
              </p>
              <button
                type="button"
                onClick={() => setIsExamActive(false)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition cursor-pointer"
              >
                Latih Kemampuan Lagi
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
