import React, { useMemo, useRef, useState } from 'react';
import { useGameStore, localDateKey } from '../../store/useGameStore';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Trophy, Swords, ArrowLeft, CheckCircle2, UserCheck } from 'lucide-react';

interface DuelQuestion {
  prompt: string;
  options: string[];
  answer: number;
}

const QUESTION_POOL: DuelQuestion[] = [
  { prompt: 'A1=10, A2=20, A3=30. Hasil =SUM(A1:A3)?', options: ['30', '60', '600'], answer: 1 },
  { prompt: 'A1=4, A2=8, A3=12. Hasil =AVERAGE(A1:A3)?', options: ['8', '12', '24'], answer: 0 },
  { prompt: 'Rumus untuk mencari nilai terbesar di B1:B10?', options: ['=MIN(B1:B10)', '=MAX(B1:B10)', '=COUNT(B1:B10)'], answer: 1 },
  { prompt: 'Hasil =IF(5>3,"Lulus","Gagal")?', options: ['Lulus', 'Gagal', 'TRUE'], answer: 0 },
  { prompt: 'A1=7. Hasil =A1*2+1?', options: ['16', '15', '21'], answer: 1 },
  { prompt: 'Rumus menghitung sel berisi angka di A1:A9?', options: ['=COUNT(A1:A9)', '=SUM(A1:A9)', '=LEN(A1:A9)'], answer: 0 },
  { prompt: 'Hasil =COUNTIF(A1:A3,">5") jika A1=3, A2=8, A3=9?', options: ['1', '2', '3'], answer: 1 },
  { prompt: 'Hasil =10/4?', options: ['2', '2,5', '4'], answer: 1 },
  { prompt: 'Kunci sel agar tidak bergeser saat disalin memakai?', options: ['A1', '$A$1', '#A#1'], answer: 1 },
  { prompt: 'Hasil =LEN("Kantor")?', options: ['5', '6', '7'], answer: 1 },
];

/** Memilih 3 soal berbeda secara deterministik dari kunci (lawan + tanggal), jadi soal sama sepanjang hari. */
function pickQuestions(seedKey: string): DuelQuestion[] {
  let h = 0;
  for (const ch of seedKey) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  const pool = [...QUESTION_POOL];
  const out: DuelQuestion[] = [];
  while (out.length < 3) {
    h = (h * 1103515245 + 12345) >>> 0;
    out.push(pool.splice(h % pool.length, 1)[0]);
  }
  return out;
}

export const DuelView: React.FC = () => {
  const { profile, setView, awardOnce } = useGameStore();

  const [selectedOpponent, setSelectedOpponent] = useState<'dimas' | 'intan' | 'reza'>('dimas');
  const [duelState, setDuelState] = useState<'select' | 'battling' | 'result'>('select');
  const [playerSpeed, setPlayerSpeed] = useState<number>(0);
  const [winner, setWinner] = useState<'player' | 'opponent'>('player');
  const [picked, setPicked] = useState<number[]>([]);
  const [qIndex, setQIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [granted, setGranted] = useState(false);
  const startRef = useRef(0);
  const questions = useMemo(
    () => pickQuestions(`${selectedOpponent}:${localDateKey()}`),
    [selectedOpponent],
  );

  const opponents = [
    { id: 'dimas' as const, name: 'Dimas (Operasional)', style: 'Cepat tapi kadang ceroboh', avgTimeSec: 18 },
    { id: 'intan' as const, name: 'Kak Intan (Lead IT)', style: 'Sangat teliti & presisi tinggi', avgTimeSec: 12 },
    { id: 'reza' as const, name: 'Pak Reza (Finance Lead)', style: 'Perfeksionis tanpa kompromi', avgTimeSec: 14 },
  ];

  const handleStartDuel = () => {
    sound.playClick();
    setPicked([]);
    setQIndex(0);
    startRef.current = Date.now();
    setDuelState('battling');
  };

  const handleAnswer = (optionIndex: number) => {
    sound.playClick();
    const next = [...picked, optionIndex];
    setPicked(next);
    if (qIndex + 1 < questions.length) {
      setQIndex(qIndex + 1);
      return;
    }
    const seconds = Math.max(1, Math.round((Date.now() - startRef.current) / 1000));
    const correct = next.filter((o, i) => o === questions[i].answer).length;
    const opp = opponents.find((o) => o.id === selectedOpponent)!;
    setPlayerSpeed(seconds);
    setCorrectCount(correct);
    if (correct === questions.length && seconds <= opp.avgTimeSec) {
      setWinner('player');
      sound.playSuccess();
      confetti({ particleCount: 70 });
      setGranted(awardOnce(`duel:${selectedOpponent}:${localDateKey()}`, 300, 200).granted);
    } else {
      setWinner('opponent');
      sound.playError();
    }
    setDuelState('result');
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
            aria-label="Kembali ke kantor"
            className="inline-flex items-center justify-center min-w-11 min-h-11 p-2 hover:bg-slate-100 rounded-xl text-slate-500 cursor-pointer transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase">
              Duel Kilat
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Adu Kecepatan dengan Rekan Kantor</h1>
          </div>
        </div>
      </div>

      {duelState === 'select' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Pilih Rekan Kantor Penantang:</h2>
          <div className="space-y-2.5">
            {opponents.map((opp) => (
              <div
                key={opp.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedOpponent(opp.id);
                }}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  selectedOpponent === opp.id
                    ? 'border-rose-500 bg-rose-50/50 shadow-xs'
                    : 'border-slate-200 hover:bg-slate-50 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <CharacterAvatar id={opp.id} size="md" />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{opp.name}</h3>
                    <p className="text-xs text-slate-500">{opp.style}</p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <span className="text-slate-500">Target Waktu:</span>
                  <div className="font-mono font-bold text-slate-800">~{opp.avgTimeSec}s</div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleStartDuel}
            className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <Swords className="w-4 h-4" />
            <span>Mulai Duel (3 Soal Rumus)</span>
          </button>
        </div>
      )}

      {duelState === 'battling' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
            <span>Soal {qIndex + 1} dari {questions.length}</span>
            <span>Lawan: {opponents.find((o) => o.id === selectedOpponent)?.name}</span>
          </div>
          <h2 className="text-lg font-extrabold text-slate-900">{questions[qIndex].prompt}</h2>
          <div className="grid gap-2">
            {questions[qIndex].options.map((opt, i) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleAnswer(i)}
                className="min-h-11 px-4 py-2.5 text-left text-sm font-semibold font-mono rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-800 cursor-pointer transition"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {duelState === 'result' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 animate-in fade-in zoom-in-95">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
              winner === 'player' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-600'
            }`}
          >
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {winner === 'player' ? 'Kamu Memenangkan Duel!' : 'Belum Menang Kali Ini'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Benar {correctCount}/{questions.length}. Waktumu: <strong className="text-slate-800 font-mono">{playerSpeed} detik</strong> | Lawan:{' '}
              <strong className="text-slate-800 font-mono">
                {opponents.find((o) => o.id === selectedOpponent)?.avgTimeSec} detik
              </strong>
            </p>
          </div>

          {winner === 'opponent' && (
            <p className="text-xs text-slate-600">Menang butuh semua jawaban benar dan waktu tidak melebihi lawan.</p>
          )}

          {winner === 'player' && (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
              {granted ? 'Hadiah Kemenangan: +200 Koin & +300 XP' : 'Hadiah lawan ini sudah kamu ambil hari ini. Coba lawan lain atau besok.'}
            </div>
          )}

          <div className="flex gap-2 justify-center pt-2">
            <button
              type="button"
              onClick={() => setDuelState('select')}
              className="px-6 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Tantang Rekan Lain
            </button>
            <button
              type="button"
              onClick={() => setView('office')}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition cursor-pointer"
            >
              Kembali
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
