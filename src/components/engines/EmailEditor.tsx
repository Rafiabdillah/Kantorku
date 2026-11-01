/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Email & Message Engine (Wave S0)
 * Objective rule-based checklist validator for professional communication.
 */

import React, { useState, useMemo } from 'react';
import { Mail, CheckCircle2, AlertCircle, Paperclip, Send, RotateCcw, HelpCircle } from 'lucide-react';
import { sound } from '../../services/sound';

export interface EmailEditorRequirement {
  id: string;
  label: string;
  description: string;
  validator: (data: {
    to: string;
    cc: string;
    subject: string;
    body: string;
    hasAttachment: boolean;
  }) => { passed: boolean; tip?: string };
}

export interface EmailEditorProps {
  initialTo?: string;
  initialSubject?: string;
  initialBody?: string;
  initialAttachment?: boolean;
  scenarioTitle?: string;
  scenarioBrief?: string;
  customRequirements?: EmailEditorRequirement[];
  onComplete?: (result: {
    passed: boolean;
    score: number;
    data: { to: string; cc: string; subject: string; body: string; hasAttachment: boolean };
  }) => void;
}

export const DEFAULT_EMAIL_REQUIREMENTS: EmailEditorRequirement[] = [
  {
    id: 'req-to',
    label: 'Alamat Penerima Jelas',
    description: 'Format penerima valid (contoh: nama@perusahaan.com)',
    validator: ({ to }) => {
      const trimmed = to.trim();
      const passed = trimmed.length > 3 && (trimmed.includes('@') || trimmed.length > 5);
      return {
        passed,
        tip: passed ? undefined : 'Tuliskan nama atau email penerima yang dituju.',
      };
    },
  },
  {
    id: 'req-subject',
    label: 'Subjek Spesifik & Kontekstual',
    description: 'Minimal 3 kata, mencakup konteks proyek atau tujuan',
    validator: ({ subject }) => {
      const words = subject.trim().split(/\s+/).filter(Boolean);
      const passed = words.length >= 3;
      return {
        passed,
        tip: passed ? undefined : 'Subjek minimal 3 kata agar penerima langsung tahu perihal email.',
      };
    },
  },
  {
    id: 'req-salutation',
    label: 'Salam Pembuka Profesional',
    description: 'Memuat salam sopan (Yth., Selamat pagi/siang, Halo Bapak/Ibu)',
    validator: ({ body }) => {
      const lower = body.toLowerCase();
      const hasSalutation =
        lower.includes('yth') ||
        lower.includes('selamat pagi') ||
        lower.includes('selamat siang') ||
        lower.includes('selamat sore') ||
        lower.includes('halo pak') ||
        lower.includes('halo bu') ||
        lower.includes('dear') ||
        lower.includes('kepada yth');
      return {
        passed: hasSalutation,
        tip: hasSalutation ? undefined : 'Awali email dengan salam pembuka formal (misal: "Yth. Bapak Rudi,").',
      };
    },
  },
  {
    id: 'req-purpose',
    label: 'Tujuan Jelas di Paragraf Awal',
    description: 'Menyebutkan maksud (menindaklanjuti, sehubungan, mengonfirmasi, klarifikasi)',
    validator: ({ body }) => {
      const lower = body.toLowerCase();
      const hasPurpose =
        lower.includes('sehubungan') ||
        lower.includes('menindaklanjuti') ||
        lower.includes('tujuan') ||
        lower.includes('konfirmasi') ||
        lower.includes('mengonfirmasi') ||
        lower.includes('menginformasikan') ||
        lower.includes('klarifikasi') ||
        lower.includes('terkait');
      return {
        passed: hasPurpose,
        tip: hasPurpose ? undefined : 'Sampaikan perihal atau latar belakang secara langsung di awal pesan.',
      };
    },
  },
  {
    id: 'req-cta',
    label: 'Ajakan Bertindak (Call to Action / CTA)',
    description: 'Ada instruksi tindak lanjut yang diharapkan (mohon arahan, konfirmasi, tanggapan)',
    validator: ({ body }) => {
      const lower = body.toLowerCase();
      const hasCta =
        lower.includes('mohon') ||
        lower.includes('silakan') ||
        lower.includes('kami tunggu') ||
        lower.includes('harap') ||
        lower.includes('bila ada pertanyaan') ||
        lower.includes('konfirmasi');
      return {
        passed: hasCta,
        tip: hasCta ? undefined : 'Tutup dengan harapan tindak lanjut yang jelas (misal: "Mohon konfirmasi ketersediaan jadwal...").',
      };
    },
  },
  {
    id: 'req-closing',
    label: 'Salam Penutup & Identitas Pengirim',
    description: 'Memuat salam penutup (Hormat kami, Terima kasih, Salam) dan nama pengirim',
    validator: ({ body }) => {
      const lower = body.toLowerCase();
      const hasClosing =
        lower.includes('hormat saya') ||
        lower.includes('hormat kami') ||
        lower.includes('terima kasih') ||
        lower.includes('salam hangat') ||
        lower.includes('salam,');
      return {
        passed: hasClosing,
        tip: hasClosing ? undefined : 'Cantumkan salam penutup (misal: "Hormat saya," atau "Terima kasih,").',
      };
    },
  },
  {
    id: 'req-length-tone',
    label: 'Panjang Proporsional & Bebas Caps Lock Berlebih',
    description: 'Minimal 25 kata, tanpa penggunaan HURUF BESAR membentak',
    validator: ({ body }) => {
      const words = body.trim().split(/\s+/).filter(Boolean);
      if (words.length < 25) {
        return { passed: false, tip: `Baru ${words.length} kata. Minimal 25 kata agar pesan lengkap.` };
      }
      // Check uppercase ratio
      const upperLetters = body.replace(/[^A-Z]/g, '').length;
      const totalLetters = body.replace(/[^a-zA-Z]/g, '').length;
      if (totalLetters > 20 && upperLetters / totalLetters > 0.3) {
        return { passed: false, tip: 'Terlalu banyak HURUF BESAR. Gunakan huruf kapital sesuai kaidah PUEBI.' };
      }
      return { passed: true };
    },
  },
  {
    id: 'req-attachment-match',
    label: 'Kesesuaian Lampiran',
    description: 'Jika teks menyebut lampiran/berkas terlampir, kotak centang lampiran wajib disertakan',
    validator: ({ body, hasAttachment }) => {
      const lower = body.toLowerCase();
      const mentionsAttachment =
        lower.includes('lampiran') ||
        lower.includes('terlampir') ||
        lower.includes('melampirkan') ||
        lower.includes('attachment');
      if (mentionsAttachment && !hasAttachment) {
        return {
          passed: false,
          tip: 'Anda menyebutkan berkas terlampir dalam isi email, namun belum mencentang "Sertakan Lampiran".',
        };
      }
      return { passed: true };
    },
  },
  {
    id: 'req-spelling-punctuation',
    label: 'Ejaan Dasar & Tanda Baca (Aturan Baku PUEBI)',
    description: 'Kalimat diawali huruf kapital, tanpa tanda baca ganda (!!, ??), tanpa spasi ganda, dan kata pasif "di-" benar',
    validator: ({ body }) => {
      // 1. Check double punctuation
      if (/(!{2,}|\?{2,}|\.{4,})/.test(body)) {
        return {
          passed: false,
          tip: 'Hindari tanda baca ganda berlebih ("!!" atau "??") dalam korespondensi formal.',
        };
      }

      // 2. Check double spaces (excluding newlines)
      if (/[^\S\r\n]{2,}/.test(body)) {
        return {
          passed: false,
          tip: 'Terdapat spasi ganda berturut-turut antarkata. Gunakan satu spasi.',
        };
      }

      // 3. Check common passive verb misspellings with space (di + kata kerja)
      const passiveChecks = [
        { regex: /\bdi\s+kirim\b/i, correct: 'dikirim', wrong: 'di kirim' },
        { regex: /\bdi\s+buat\b/i, correct: 'dibuat', wrong: 'di buat' },
        { regex: /\bdi\s+terima\b/i, correct: 'diterima', wrong: 'di terima' },
        { regex: /\bdi\s+lapor\b/i, correct: 'dilaporkan', wrong: 'di lapor' },
        { regex: /\bdi\s+hubungi\b/i, correct: 'dihubungi', wrong: 'di hubungi' },
        { regex: /\bdi\s+atur\b/i, correct: 'diatur', wrong: 'di atur' },
        { regex: /\bdi\s+tunggu\b/i, correct: 'ditunggu', wrong: 'di tunggu' },
        { regex: /\bdi\s+minta\b/i, correct: 'diminta', wrong: 'di minta' },
        { regex: /\bdi\s+laksana\b/i, correct: 'dilaksanakan', wrong: 'di laksana' },
        { regex: /\bdi\s+perbaiki\b/i, correct: 'diperbaiki', wrong: 'di perbaiki' },
      ];

      for (const check of passiveChecks) {
        if (check.regex.test(body)) {
          return {
            passed: false,
            tip: `Kata kerja pasif harus digabung: gunakan "${check.correct}" bukan "${check.wrong}".`,
          };
        }
      }

      // 4. Check sentence capitalization
      const lines = body.split('\n').map((l) => l.trim()).filter(Boolean);
      for (const line of lines) {
        // Skip lines that start with numbers, bullets or symbols
        const cleanLine = line.replace(/^[0-9•\-\*]+[.\)]\s*/, '').trim();
        if (/^[a-z]/.test(cleanLine)) {
          return {
            passed: false,
            tip: `Awali kalimat dengan huruf kapital (ditemukan: "${cleanLine.slice(0, 15)}...").`,
          };
        }
      }

      return { passed: true };
    },
  },
];

export const EmailEditor: React.FC<EmailEditorProps> = ({
  initialTo = '',
  initialSubject = '',
  initialBody = '',
  initialAttachment = false,
  scenarioTitle,
  scenarioBrief,
  customRequirements,
  onComplete,
}) => {
  const [to, setTo] = useState<string>(initialTo);
  const [cc, setCc] = useState<string>('');
  const [showCc, setShowCc] = useState<boolean>(false);
  const [subject, setSubject] = useState<string>(initialSubject);
  const [body, setBody] = useState<string>(initialBody);
  const [hasAttachment, setHasAttachment] = useState<boolean>(initialAttachment);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const requirements = customRequirements || DEFAULT_EMAIL_REQUIREMENTS;

  const validationResults = useMemo(() => {
    return requirements.map((req) => {
      const res = req.validator({ to, cc, subject, body, hasAttachment });
      return {
        id: req.id,
        label: req.label,
        description: req.description,
        passed: res.passed,
        tip: res.tip,
      };
    });
  }, [requirements, to, cc, subject, body, hasAttachment]);

  const isDraftUnchanged =
    Boolean(initialBody && initialBody.trim().length > 0) &&
    to.trim() === initialTo.trim() &&
    subject.trim() === initialSubject.trim() &&
    body.trim() === initialBody.trim() &&
    hasAttachment === initialAttachment;

  const passedCount = isDraftUnchanged ? 0 : validationResults.filter((r) => r.passed).length;
  const totalCount = validationResults.length;
  const allPassed = !isDraftUnchanged && passedCount === totalCount;
  const scorePercent = isDraftUnchanged ? 0 : Math.round((passedCount / totalCount) * 100);

  const handleSend = () => {
    setSubmitted(true);
    if (isDraftUnchanged) {
      sound.playError();
      if (onComplete) {
        onComplete({
          passed: false,
          score: 0,
          data: { to, cc, subject, body, hasAttachment },
        });
      }
      return;
    }

    if (allPassed) {
      sound.playSuccess();
    } else {
      sound.playError();
    }
    if (onComplete) {
      onComplete({
        passed: allPassed,
        score: scorePercent,
        data: { to, cc, subject, body, hasAttachment },
      });
    }
  };

  const handleReset = () => {
    setTo(initialTo);
    setSubject(initialSubject);
    setBody(initialBody);
    setHasAttachment(initialAttachment);
    setSubmitted(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
      {/* Scenario Brief Header */}
      {scenarioTitle && (
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
              Mesin Email Profesional (Domain D12)
            </span>
          </div>
          <h2 className="text-xl font-bold">{scenarioTitle}</h2>
          {scenarioBrief && <p className="text-xs text-slate-300 mt-1 leading-relaxed">{scenarioBrief}</p>}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        {/* Editor Main Canvas (8 cols) */}
        <div className="lg:col-span-8 p-5 flex flex-col gap-3">
          {/* Top meta fields */}
          <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
            <label className="text-xs font-bold text-slate-500 w-16">Kepada:</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="nama@klien.com / Rekan Kerja"
              className="flex-1 text-sm text-slate-800 bg-transparent focus:outline-none"
            />
            {!showCc && (
              <button
                type="button"
                onClick={() => setShowCc(true)}
                className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
              >
                + Cc
              </button>
            )}
          </div>

          {showCc && (
            <div className="flex items-center gap-3 border-b border-slate-100 pb-2 animate-in fade-in">
              <label className="text-xs font-bold text-slate-500 w-16">Cc:</label>
              <input
                type="text"
                value={cc}
                onChange={(e) => setCc(e.target.value)}
                placeholder="rekan@perusahaan.com (opsional)"
                className="flex-1 text-sm text-slate-800 bg-transparent focus:outline-none"
              />
            </div>
          )}

          <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
            <label className="text-xs font-bold text-slate-500 w-16">Subjek:</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Contoh: Klarifikasi Perubahan Jadwal Pertemuan Proyek Alpha"
              className="flex-1 text-sm font-medium text-slate-800 bg-transparent focus:outline-none"
            />
          </div>

          {/* Attachment bar */}
          <div className="flex items-center justify-between bg-slate-50/80 px-3 py-1.5 rounded-xl border border-slate-100">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hasAttachment}
                onChange={(e) => setHasAttachment(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-xs font-medium text-slate-700 flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                Sertakan Lampiran Dokumen (Nota / Laporan / File)
              </span>
            </label>
            <span className="text-[11px] text-slate-400 font-mono">
              {body.trim().split(/\s+/).filter(Boolean).length} kata
            </span>
          </div>

          {/* Email Body */}
          <div className="flex-1 min-h-[260px] flex flex-col">
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder={`Tuliskan email profesional di sini...\n\nContoh pembuka:\nYth. Ibu Maya,\n\nSehubungan dengan koordinasi pengiriman pesanan nomor #8821...`}
              className="w-full h-full min-h-[260px] p-3 text-sm text-slate-800 rounded-2xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none resize-y leading-relaxed font-sans"
            />
          </div>

          {/* Action buttons */}
          {submitted && isDraftUnchanged && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Ubah draf dulu — ada yang perlu diperbaiki.</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Draft
            </button>
            <button
              type="button"
              onClick={handleSend}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl font-bold text-sm shadow-sm transition-all ${
                allPassed
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/25 hover:scale-[1.02]'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              <Send className="w-4 h-4" />
              Kirim & Evaluasi Email
            </button>
          </div>
        </div>

        {/* Live Objective Rubric / Checklist Sidebar (4 cols) */}
        <div className="lg:col-span-4 p-5 bg-slate-50/60 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-emerald-600" />
              Checklist Aturan 3C
            </h3>
            <span
              className={`text-xs font-black px-2.5 py-1 rounded-full ${
                allPassed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
              }`}
            >
              {passedCount} / {totalCount} Lolos
            </span>
          </div>

          <div className="space-y-2.5">
            {validationResults.map((item) => (
              <div
                key={item.id}
                className={`p-3 rounded-2xl border transition-all ${
                  item.passed
                    ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-950'
                    : 'bg-white border-slate-200/80 text-slate-700'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {item.passed ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <div className="text-xs font-bold leading-tight flex items-center justify-between">
                      <span>{item.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                    {submitted && !item.passed && item.tip && (
                      <p className="text-[11px] text-amber-700 font-semibold bg-amber-50 rounded-lg p-1.5 mt-1.5 border border-amber-200">
                        💡 {item.tip}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Educational Tip */}
          <div className="mt-auto bg-white p-3.5 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-1">
              <HelpCircle className="w-3.5 h-3.5 text-blue-500" />
              Prinsip Komunikasi 3C
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              <strong>Clear:</strong> Tujuan di awal.{' '}
              <strong>Concise:</strong> Padat & tanpa basa-basi berlebih.{' '}
              <strong>Courteous:</strong> Sopan & berempati.
            </p>
            <div className="mt-2 text-[10px] text-slate-400 border-t border-slate-100 pt-2 leading-relaxed">
              ℹ️ <strong>Catatan Edukasi:</strong> Pemeriksaan ejaan di atas berbasis aturan objektif (rule-based PUEBI) tanpa AI/jaringan eksternal, bukan klaim penilaian gaya bahasa menyeluruh.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
