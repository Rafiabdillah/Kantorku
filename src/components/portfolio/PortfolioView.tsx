import React from 'react';
import { useGameStore } from '../../store/useGameStore';
import { TIERS } from '../../types';
import { sound } from '../../services/sound';
import { Briefcase, Download, ArrowLeft, CheckCircle2, FileSpreadsheet, FileCode, FileText } from 'lucide-react';

export const PortfolioView: React.FC = () => {
  const { profile, setView } = useGameStore();

  const handleExportCsv = (title: string) => {
    sound.playClick();
    const csvContent =
      'data:text/csv;charset=utf-8,Komoditas,Harga,Jumlah,Total\nBayam,15000,10,=B2*C2\nWortel,25000,5,=B3*C3\nTotal,,=SUM(D2:D3)';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}_portfolio.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportJs = (title: string) => {
    sound.playClick();
    const jsContent =
      'data:text/javascript;charset=utf-8,// Portofolio Kode PT Maju Sejahtera\nfunction hitungDiskon(harga, persen) {\n  return harga - (harga * (persen / 100));\n}\n';
    const encodedUri = encodeURI(jsContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${title.toLowerCase().replace(/\s+/g, '_')}.js`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
              Portofolio Hasil Kerja Nyata
            </span>
            <h1 className="text-xl font-extrabold text-slate-900 mt-1">Bukti Kompetensi & Ekspor CV</h1>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-400">Tingkat Karier Saat Ini</span>
          <div className="text-sm font-bold text-slate-900">
            {TIERS[profile.currentTier]?.badge} {TIERS[profile.currentTier]?.title}
          </div>
        </div>
      </div>

      {/* Portfolio Items */}
      <div className="space-y-4">
        {/* Project 1: Rekap Inventaris & Formula Dinamis */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-700">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                  Spreadsheet Model
                </span>
                <span className="text-xs text-slate-400">Verifikasi PT Maju Sejahtera</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mt-1">
                Rekapitulasi Anggaran ATK & Uji Mutasi Formula
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Menghitung total pengeluaran dinamis menggunakan SUM, AVERAGE, dan absolut referensi ($) yang lolos audit anti-hardcode.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleExportCsv('rekap_anggaran_atk')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor CSV / XLSX</span>
          </button>
        </div>

        {/* Project 2: Script Automasi Diskon POS */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-700">
              <FileCode className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                  JavaScript Code
                </span>
                <span className="text-xs text-slate-400">Clean Code & 100% Tests Passed</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mt-1">
                Engine Perhitungan Diskon & Filter Transaksi
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Fungsi bisnis modular dengan penanganan tipe data, uji test case otomatis, dan metode array modern.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => handleExportJs('engine_diskon_transaksi')}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Script JS</span>
          </button>
        </div>

        {/* Project 3: Dokumen Notulen Standar Korporat */}
        <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-rose-100 text-rose-700">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-50 text-rose-700">
                  Word Document
                </span>
                <span className="text-xs text-slate-400">Standar ISO 9001</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mt-1">
                Notulen Rapat Koordinasi & Matriks PIC
              </h3>
              <p className="text-xs text-slate-500 mt-1 max-w-md">
                Dokumen formal dengan hierarki heading standar, penekanan bold, dan tabel rencana tindak lanjut akuntabel.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor DOC</span>
          </button>
        </div>
      </div>
    </div>
  );
};
