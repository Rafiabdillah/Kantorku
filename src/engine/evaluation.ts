export type RubricDimension =
  | 'correctness'
  | 'efficiency'
  | 'neatness'
  | 'maintainability'
  | 'communication';

/** null = dimensi ini tidak diukur engine. UI menampilkan strip, bukan angka cantik. */
export type MeasuredRubric = Record<RubricDimension, number | null>;

export const RUBRIC_LABELS: Record<RubricDimension, string> = {
  correctness: 'Benar',
  efficiency: 'Efisien',
  neatness: 'Rapi',
  maintainability: 'Dirawat',
  communication: 'Komunikasi',
};

export const RUBRIC_DIMENSIONS = Object.keys(RUBRIC_LABELS) as RubricDimension[];

export const UNMEASURED_RUBRIC: MeasuredRubric = {
  correctness: null,
  efficiency: null,
  neatness: null,
  maintainability: null,
  communication: null,
};

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(100, Math.max(0, Math.round(value)));
}

export function hasMeasuredScore(rubric: MeasuredRubric): boolean {
  return RUBRIC_DIMENSIONS.some((dimension) => rubric[dimension] !== null);
}

type ObjectiveState = { status: 'untested' | 'passed' | 'failed' };

/** Misi Excel/Code tidak punya validator per-dimensi, jadi hanya tujuan yang bisa dihitung. */
export function correctnessFromObjectives(states: Record<string, ObjectiveState>): number {
  const all = Object.values(states);
  if (all.length === 0) return 0;
  return clampScore((all.filter((state) => state.status === 'passed').length / all.length) * 100);
}

export interface CaseSignals {
  workChanged: boolean;
  clarificationAnswered: boolean;
  clarificationOptimal: boolean;
  handoverWritten: boolean;
  /** Hasil penilaian berkas kerja. Dihilangkan bila kasus tidak dinilai per berkas. */
  deliverable?: { checked: boolean; passed: boolean; messages: string[] };
}

export interface CaseEvaluation {
  blockers: string[];
  notes: string[];
  rubric: MeasuredRubric;
}

export const HANDOVER_MIN_CHARS = 15;

export function isHandoverWritten(note: string, defaultNote: string): boolean {
  const trimmed = note.trim();
  return trimmed.length >= HANDOVER_MIN_CHARS && trimmed !== defaultNote.trim();
}

export function evaluateCaseHandover(signals: CaseSignals): CaseEvaluation {
  const blockers: string[] = [];
  const notes: string[] = [];
  const deliverable = signals.deliverable;

  if (deliverable?.checked && !deliverable.passed) {
    blockers.push(
      `Hasil kerjamu belum memenuhi permintaan klien. ${deliverable.messages.join(' ')}`.trim()
    );
  }
  if (deliverable?.checked && !signals.workChanged) {
    blockers.push('Berkas kerja masih persis seperti kondisi awal. Kerjakan permintaan klien dulu.');
  }
  if (!signals.clarificationAnswered) {
    blockers.push('Kamu belum menjawab pertanyaan klarifikasi dari klien. Tanyakan atau pilih jawabannya dulu.');
  }
  if (!signals.handoverWritten) {
    blockers.push('Pesan serah terima masih kosong atau masih memakai contoh bawaan. Tulis ringkasan hasilmu sendiri.');
  }

  if (signals.clarificationAnswered) {
    notes.push(
      signals.clarificationOptimal
        ? 'Klarifikasi klien dijawab dengan opsi yang paling aman secara bisnis.'
        : 'Klarifikasi sudah dijawab, tapi opsinya bukan yang paling tepat. Pertanggungjawabkan di pesan serah terima.'
    );
  }
  if (deliverable?.checked) {
    notes.push('Hasil kerjamu sudah memenuhi semua syarat yang diminta klien.');
  } else {
    notes.push(
      signals.workChanged
        ? 'Berkas kerja kasus sudah diubah dari kondisi awal.'
        : 'Berkas kerja masih persis seperti kondisi awal, jadi penilaian hanya menimbang klarifikasi dan pesan serah terima.'
    );
  }
  if (signals.handoverWritten) {
    notes.push('Ringkasan serah terima cukup rinci untuk dibaca penggantimu.');
  }

  return {
    blockers,
    notes,
    rubric: {
      ...UNMEASURED_RUBRIC,
      correctness: deliverable
        ? deliverable.checked
          ? deliverable.passed
            ? 100
            : 0
          : null
        : signals.workChanged
        ? 100
        : 0,
      communication: clampScore((signals.handoverWritten ? 70 : 0) + (signals.clarificationOptimal ? 30 : 0)),
    },
  };
}
