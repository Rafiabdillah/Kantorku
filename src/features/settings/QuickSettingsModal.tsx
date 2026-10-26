import React from 'react';
import { useSettings } from './useSettings';
import { SETTING_PRESETS } from './registry';
import { sound } from '../../services/sound';
import {
  X,
  Sliders,
  Sparkles,
  Volume2,
  VolumeX,
  Type,
  Code,
  Table,
  Clock,
  Eye,
  CheckCircle2,
} from 'lucide-react';

interface QuickSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSettingsModal: React.FC<QuickSettingsModalProps> = ({ isOpen, onClose }) => {
  const { get, set, applyPreset, isModified, resetKey } = useSettings();

  if (!isOpen) return null;

  const currentTheme = get<string>('appearance_theme', 'light');
  const currentSeparator = get<string>('excel_separator', 'semicolon');
  const currentCellFont = get<number>('excel_cell_font_size', 13);
  const currentTabSize = get<number>('code_tab_size', 2);
  const currentTimerMult = get<number>('learning_timer_multiplier', 1.0);
  const isHighContrast = get<boolean>('a11y_high_contrast', false);
  const sfxEnabled = get<boolean>('audio_sfx_enabled', true);
  const masterVolume = get<number>('audio_master_volume', 80);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 px-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-slate-900 dark:text-white">Pengaturan Cepat Misi</h2>
              <p className="text-[11px] text-slate-500">Sesuaikan alat kerja saat sedang bertugas.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 hover:text-slate-600 cursor-pointer transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700 dark:text-slate-300">
          {/* 1-Click Presets */}
          <div>
            <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Preset 1-Klik Cepat</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SETTING_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    sound.playClick();
                    applyPreset(p.id);
                  }}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-slate-50 dark:bg-slate-800 text-left transition cursor-pointer group"
                >
                  <div className="font-bold text-slate-900 dark:text-white text-xs group-hover:text-emerald-600 flex items-center justify-between">
                    <span>{p.title}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{p.description}</div>
                </button>
              ))}
            </div>
          </div>

          <hr className="border-slate-100 dark:border-slate-800" />

          {/* Excel Formula Separator */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <Table className="w-3.5 h-3.5 text-emerald-600" />
                <span>Pemisah Rumus Excel</span>
              </div>
              <div className="text-[11px] text-slate-500">Karakter pemisah argumen fungsi</div>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => set('excel_separator', 'semicolon')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentSeparator === 'semicolon'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                ; (Titik Koma)
              </button>
              <button
                type="button"
                onClick={() => set('excel_separator', 'comma')}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentSeparator === 'comma'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                , (Koma)
              </button>
            </div>
          </div>

          {/* Excel Cell Font Size */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between font-bold text-slate-900 dark:text-white">
              <div className="flex items-center gap-1.5">
                <Type className="w-3.5 h-3.5 text-blue-600" />
                <span>Ukuran Font Sel Spreadsheet</span>
              </div>
              <span className="font-mono text-emerald-600">{currentCellFont} pt</span>
            </div>
            <input
              type="range"
              min={11}
              max={18}
              step={1}
              value={currentCellFont}
              onChange={(e) => set('excel_cell_font_size', Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          {/* Code Editor Tab Size */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <Code className="w-3.5 h-3.5 text-purple-600" />
                <span>Ukuran Tab Indentasi Kode</span>
              </div>
              <div className="text-[11px] text-slate-500">Spasi indentasi script</div>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => set('code_tab_size', 2)}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentTabSize === 2
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                2 Spasi
              </button>
              <button
                type="button"
                onClick={() => set('code_tab_size', 4)}
                className={`px-3 py-1 rounded-lg font-bold transition cursor-pointer ${
                  currentTabSize === 4
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                4 Spasi
              </button>
            </div>
          </div>

          {/* Timer Multiplier */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>Batas Waktu Tantangan</span>
              </div>
              <div className="text-[11px] text-slate-500">Pengali jam pengerjaan</div>
            </div>
            <select
              value={currentTimerMult}
              onChange={(e) => set('learning_timer_multiplier', Number(e.target.value))}
              className="bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1.5 px-2.5 font-bold text-xs outline-none"
            >
              <option value={1.0}>1.0x Normal</option>
              <option value={1.5}>1.5x Santai</option>
              <option value={2.0}>2.0x Longgar</option>
              <option value={0.0}>Tanpa Waktu (Zen)</option>
            </select>
          </div>

          {/* Audio & Haptic */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Efek Suara Tombol (SFX)</span>
              </div>
              <div className="text-[11px] text-slate-500">Ketik keyboard & chime selesai</div>
            </div>
            <button
              type="button"
              onClick={() => {
                const next = !sfxEnabled;
                set('audio_sfx_enabled', next);
                if (next) sound.playClick();
              }}
              className={`p-2 rounded-xl border transition cursor-pointer ${
                sfxEnabled
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 text-emerald-700 dark:text-emerald-400'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
            >
              {sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Accessibility High Contrast */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-bold flex items-center gap-1.5 text-slate-900 dark:text-white">
                <Eye className="w-3.5 h-3.5 text-indigo-600" />
                <span>Kontras Tinggi (WCAG AAA)</span>
              </div>
              <div className="text-[11px] text-slate-500">Garis batas hitam pekat & tegas</div>
            </div>
            <button
              type="button"
              onClick={() => set('a11y_high_contrast', !isHighContrast)}
              className={`px-3 py-1.5 rounded-xl border font-bold text-xs transition cursor-pointer ${
                isHighContrast
                  ? 'bg-indigo-600 text-white border-indigo-700'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {isHighContrast ? 'Aktif' : 'Nonaktif'}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 px-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Perubahan tersimpan otomatis</span>
          </div>
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-xl text-xs transition cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
