import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { MENTOR_CASES, MentorReviewCase } from '../../content/mentorCases';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import { Users, Award, CheckCircle2, ArrowLeft, MessageSquare, AlertTriangle } from 'lucide-react';

export const MentorView: React.FC = () => {
  const { setView, addCoins, addXp } = useGameStore();
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0);
  const [selectedIssues, setSelectedIssues] = useState<string[]>([]);
  const [isGraded, setIsGraded] = useState<boolean>(false);
  const [mentorScore, setMentorScore] = useState<number>(0);

  const currentCase = MENTOR_CASES[selectedCaseIdx];

  const toggleIssue = (issueId: string) => {
    sound.playClick();
    if (selectedIssues.includes(issueId)) {
      setSelectedIssues(selectedIssues.filter((id) => id !== issueId));
    } else {
      setSelectedIssues([...selectedIssues, issueId]);
    }
  };

  const handleGradeSubmission = () => {
    sound.playSuccess();
    // Calculate accuracy in detecting real issues
    const realIssues = currentCase.issuesList.filter((i) => i.isRealIssue).map((i) => i.id);
    const correctSelected = selectedIssues.filter((id) => realIssues.includes(id)).length;
    const falseAlarms = selectedIssues.filter((id) => !realIssues.includes(id)).length;

    const score = Math.max(0, Math.round(((correctSelected - falseAlarms * 0.5) / realIssues.length) * 100));
    setMentorScore(score);
    setIsGraded(true);

    if (score >= 70) {
      confetti({ particleCount: 70, spread: 60 });
      addCoins(currentCase.coinReward);
      addXp(currentCase.xpReward);
    }
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
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 uppercase">
              Mode Mentor (Peran Terbalik)
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Review Hasil Kerja Karyawan Magang</h1>
          </div>
        </div>

        {/* Case Switcher */}
        <div className="flex items-center gap-2">
          {MENTOR_CASES.map((c, i) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setSelectedCaseIdx(i);
                setSelectedIssues([]);
                setIsGraded(false);
              }}
              className={`w-8 h-8 rounded-xl font-bold text-xs transition cursor-pointer ${
                selectedCaseIdx === i ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Intern Submission Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
        <div className="flex items-start gap-3.5 pb-4 border-b border-slate-100">
          <CharacterAvatar id="dimas" size="md" />
          <div>
            <div className="font-extrabold text-slate-900 text-sm">{currentCase.internName}</div>
            <div className="text-xs text-slate-500">{currentCase.internRole}</div>
            <div className="text-xs text-blue-700 font-semibold mt-1">Tugas: {currentCase.taskTitle}</div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed italic">
          "{currentCase.internNote}"
        </div>

        <div>
          <div className="text-xs font-bold text-slate-900 mb-1.5 uppercase tracking-wide">
            Potongan Pekerjaan yang Diserahkan:
          </div>
          <pre className="p-3 bg-slate-900 text-emerald-400 rounded-2xl font-mono text-xs overflow-x-auto">
            {currentCase.submissionSnippet}
          </pre>
        </div>

        {/* Issue Identification Checklist */}
        <div className="space-y-2 pt-2">
          <div className="text-xs font-bold text-slate-900">
            Identifikasi Kesalahan (Centang kesalahan nyata yang ditemukan):
          </div>
          <div className="space-y-2">
            {currentCase.issuesList.map((iss) => (
              <label
                key={iss.id}
                onClick={() => toggleIssue(iss.id)}
                className={`p-3 rounded-2xl border text-xs flex items-center gap-3 cursor-pointer transition ${
                  selectedIssues.includes(iss.id)
                    ? 'bg-blue-50 border-blue-500 font-semibold text-blue-900'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIssues.includes(iss.id)}
                  onChange={() => {}}
                  className="rounded text-blue-600 focus:ring-0"
                />
                <span>{iss.description}</span>
              </label>
            ))}
          </div>
        </div>

        {!isGraded ? (
          <button
            type="button"
            onClick={handleGradeSubmission}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
          >
            Beri Evaluasi & Nilai Magang
          </button>
        ) : (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2 animate-in fade-in">
            <div className="flex items-center justify-between text-xs font-bold text-blue-900">
              <span>Ketajaman Review Mentor: {mentorScore}%</span>
              <span>{mentorScore >= 70 ? '✅ Lulus Evaluasi' : '⚠️ Perlu Perbaikan'}</span>
            </div>
            <p className="text-xs text-blue-800 leading-relaxed">
              <span className="font-bold">Nasihat Senior Rekomendasi: </span>
              {currentCase.seniorAdvice}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
