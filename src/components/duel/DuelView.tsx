import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Trophy, Swords, ArrowLeft, CheckCircle2, UserCheck } from 'lucide-react';

export const DuelView: React.FC = () => {
  const { profile, setView, addCoins, addXp } = useGameStore();

  const [selectedOpponent, setSelectedOpponent] = useState<'dimas' | 'intan' | 'reza'>('dimas');
  const [duelState, setDuelState] = useState<'select' | 'battling' | 'result'>('select');
  const [playerSpeed, setPlayerSpeed] = useState<number>(0);
  const [winner, setWinner] = useState<'player' | 'opponent'>('player');

  const opponents = [
    { id: 'dimas' as const, name: 'Dimas (Operasional)', style: 'Cepat tapi kadang ceroboh', avgTimeSec: 18 },
    { id: 'intan' as const, name: 'Kak Intan (Lead IT)', style: 'Sangat teliti & presisi tinggi', avgTimeSec: 12 },
    { id: 'reza' as const, name: 'Pak Reza (Finance Lead)', style: 'Perfeksionis tanpa kompromi', avgTimeSec: 14 },
  ];

  const handleStartDuel = () => {
    sound.playClick();
    setDuelState('battling');
    // Simulate real-time competitive duel
    setTimeout(() => {
      const opp = opponents.find((o) => o.id === selectedOpponent)!;
      const simulatedPlayerTime = 10 + Math.floor(Math.random() * 8);
      setPlayerSpeed(simulatedPlayerTime);

      if (simulatedPlayerTime <= opp.avgTimeSec) {
        setWinner('player');
        sound.playSuccess();
        confetti({ particleCount: 70 });
        addCoins(200);
        addXp(300);
      } else {
        setWinner('opponent');
        sound.playError();
      }
      setDuelState('result');
    }, 2500);
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
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 uppercase">
              Duel Asinkron
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
                  <span className="text-slate-400">Target Waktu:</span>
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
            <span>Mulai Duel Asinkron (Seed Sama)</span>
          </button>
        </div>
      )}

      {duelState === 'battling' && (
        <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center space-y-4 animate-in fade-in">
          <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto animate-bounce">
            <Swords className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900">Duel Sedang Berlangsung...</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Kedua pihak mengerjakan soal spreadsheet yang sama persis dengan seed data acak.
          </p>
        </div>
      )}

      {duelState === 'result' && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 animate-in fade-in zoom-in-95">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto ${
              winner === 'player' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
            }`}
          >
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              {winner === 'player' ? 'Kamu Memenangkan Duel!' : 'Lawan Sedikit Lebih Cepat!'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Waktumu: <strong className="text-slate-800 font-mono">{playerSpeed} detik</strong> | Lawan:{' '}
              <strong className="text-slate-800 font-mono">
                {opponents.find((o) => o.id === selectedOpponent)?.avgTimeSec} detik
              </strong>
            </p>
          </div>

          {winner === 'player' && (
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
              Hadiah Kemenangan: +200 Koin & +300 XP
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
