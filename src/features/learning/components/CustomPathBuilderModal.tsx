/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu v2.0 - Custom Path Builder Modal (Mode Kelas & Pelatihan Dosen)
 */

import React, { useState } from 'react';
import { ALL_LESSONS } from '../../../content/lessons';
import { LearningPath } from '../types';
import { learningRepo } from '../learningRepo';
import { X, Check, BookPlus, Sparkles } from 'lucide-react';

interface CustomPathBuilderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: (path: LearningPath) => void;
}

export const CustomPathBuilderModal: React.FC<CustomPathBuilderModalProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [author, setAuthor] = useState('Dosen Pengampu / Instruktur');
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>([]);
  const [mandatoryIds, setMandatoryIds] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const toggleLesson = (id: string) => {
    if (selectedLessonIds.includes(id)) {
      setSelectedLessonIds(selectedLessonIds.filter((x) => x !== id));
      setMandatoryIds(mandatoryIds.filter((x) => x !== id));
    } else {
      setSelectedLessonIds([...selectedLessonIds, id]);
    }
  };

  const toggleMandatory = (id: string) => {
    if (mandatoryIds.includes(id)) {
      setMandatoryIds(mandatoryIds.filter((x) => x !== id));
    } else {
      setMandatoryIds([...mandatoryIds, id]);
    }
  };

  const handleSave = () => {
    if (!title.trim() || selectedLessonIds.length === 0) {
      setErrorMsg('Harap isi judul jalur dan pilih minimal satu pelajaran.');
      return;
    }

    const newPath: LearningPath = {
      id: `custom-path-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Jalur pembelajaran kustom kurikulum kelas.',
      goal: goal.trim() || 'Menguasai kompetensi terarah sesuai silabus.',
      targetAudience: 'Mahasiswa / Karyawan Pelatihan Khusus',
      module: 'excel',
      lessonIds: selectedLessonIds,
      mandatoryLessonIds: mandatoryIds,
      estimatedHours: `${Math.ceil((selectedLessonIds.length * 8) / 60)} Jam`,
      badge: '🎓',
      isCustom: true,
      author: author.trim(),
    };

    learningRepo.addCustomClassroomPath(newPath);
    onCreated(newPath);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                Buat Jalur Belajar Kustom (Mode Kelas)
              </h2>
              <p className="text-xs text-slate-500">
                Susun silabus pelatihan dari katalog pelajaran yang ada & tetapkan bacaan wajib.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 text-slate-400 hover:text-slate-700 rounded-xl transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs pr-1">
          {errorMsg && (
            <div className="p-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="font-bold text-slate-700 block mb-1">Judul Jalur Belajar:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Modul Akuntansi Dasar 2026..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Target Capaian Pembelajaran:</label>
            <input
              type="text"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Setelah jalur ini peserta dapat..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Instruktur / Dosen:</label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-xs"
            />
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-2">
              Pilih Pelajaran & Tandai Bacaan Wajib ({selectedLessonIds.length} Terpilih):
            </label>
            <div className="space-y-1.5 max-h-56 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-200">
              {ALL_LESSONS.map((lesson) => {
                const isSelected = selectedLessonIds.includes(lesson.id);
                const isMandatory = mandatoryIds.includes(lesson.id);

                return (
                  <div
                    key={lesson.id}
                    className={`p-2 rounded-lg border transition flex items-center justify-between gap-2 ${
                      isSelected
                        ? 'bg-purple-50 border-purple-300 text-purple-950 font-semibold'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div
                      onClick={() => toggleLesson(lesson.id)}
                      className="flex items-center gap-2 flex-1 cursor-pointer select-none"
                    >
                      <div
                        className={`w-4 h-4 rounded border flex items-center justify-center ${
                          isSelected ? 'bg-purple-600 border-purple-600 text-white' : 'border-slate-300'
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                      <span className="text-[11px] uppercase font-bold text-slate-400">
                        [{lesson.track}]
                      </span>
                      <span className="text-xs">{lesson.title}</span>
                    </div>

                    {isSelected && (
                      <button
                        type="button"
                        onClick={() => toggleMandatory(lesson.id)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full transition cursor-pointer ${
                          isMandatory
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        {isMandatory ? '★ Wajib' : '+ Set Wajib'}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-md transition cursor-pointer"
          >
            Simpan Jalur Kelas
          </button>
        </div>
      </div>
    </div>
  );
};
