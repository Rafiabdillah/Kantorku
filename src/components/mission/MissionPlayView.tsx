import React, { useState } from 'react';
import { useGameStore } from '../../store/useGameStore';
import { LEVELS } from '../../content/levels';
import { CharacterAvatar } from '../character/CharacterAvatar';
import { SpreadsheetEditor } from '../editor/SpreadsheetEditor';
import { CodeScriptEditor } from '../editor/CodeScriptEditor';
import { WordDocumentEditor } from '../editor/WordDocumentEditor';
import { WebPreviewEditor } from '../editor/WebPreviewEditor';
import { ExcelFormulaEngine } from '../../engine/formula';
import { validateWordDocument } from '../../engine/wordValidator';
import { validateWebContent } from '../../engine/webValidator';
import { runCodeWithTests } from '../../engine/codeSandbox';
import { sound } from '../../services/sound';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Circle,
  XCircle,
  HelpCircle,
  Sparkles,
  ArrowLeft,
  RotateCcw,
  Star,
  Award,
  AlertCircle,
  BookOpen,
  Lightbulb,
  History,
  MessageCircle,
  Sliders,
  GraduationCap,
} from 'lucide-react';
import { QuickSettingsModal } from '../../features/settings/QuickSettingsModal';
import { ALL_LESSONS } from '../../content/lessons';
import { ErrorBoundary } from '../common/ErrorBoundary';

export const MissionPlayView: React.FC = () => {
  const {
    activeLevelId,
    activeSheet,
    activeCode,
    activeWord,
    activeHtml,
    activeCss,
    setCell,
    setCode,
    setWord,
    setHtml,
    setCss,
    setView,
    unlockedHintLevel,
    unlockHint,
    missionFailCount,
    recordMissionSuccess,
    recordMissionFail,
    updateReputation,
    openLessonView,
  } = useGameStore();

  const [activeMobileTab, setActiveMobileTab] = useState<'brief' | 'editor' | 'checklist'>('editor');
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [showHistoryModal, setShowHistoryModal] = useState<boolean>(false);
  const [showQuickSettings, setShowQuickSettings] = useState<boolean>(false);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [dialogueResponse, setDialogueResponse] = useState<string | null>(null);
  const [objectiveStates, setObjectiveStates] = useState<Record<string, { status: 'untested' | 'passed' | 'failed'; reason?: string }>>({});

  const [validationOutput, setValidationOutput] = useState<{
    passed: boolean;
    stars: number;
    feedback: string[];
    rubric: { correctness: number; efficiency: number; neatness: number; maintainability: number; communication: number };
  } | null>(null);

  const level = LEVELS.find((l) => l.id === activeLevelId) || LEVELS[0];
  const activeDialogNode = level.dialogue[0];

  React.useEffect(() => {
    setObjectiveStates({});
    setValidationOutput(null);
    setSelectedChoiceId(null);
    setDialogueResponse(null);
  }, [activeLevelId]);

  const handleSelectChoice = (choice: any) => {
    sound.playClick();
    setSelectedChoiceId(choice.id);
    setDialogueResponse(choice.response);
    if (choice.repGain) {
      updateReputation(level.character, choice.repGain);
    }
  };

  const handleValidate = async () => {
    sound.playClick();

    let passed = false;
    const feedbackList: string[] = [];
    let rubric = { correctness: 100, efficiency: 90, neatness: 90, maintainability: 90, communication: 90 };
    const newObjectiveStates: Record<string, { status: 'untested' | 'passed' | 'failed'; reason?: string }> = {};

    if (level.module === 'excel') {
      const engine = new ExcelFormulaEngine(activeSheet);

      if (level.id === 'excel-t1-01') {
        const b2 = Number(activeSheet['B2']?.raw);
        const b3 = Number(activeSheet['B3']?.raw);
        const b4 = Number(activeSheet['B4']?.raw);

        const b2Ok = b2 === 55000;
        const b3Ok = b3 === 12000;
        const b4Ok = b4 === 35000;

        newObjectiveStates['obj-1'] = {
          status: b2Ok ? 'passed' : 'failed',
          reason: b2Ok ? undefined : 'Nilai sel B2 harus 55000',
        };
        newObjectiveStates['obj-2'] = {
          status: b3Ok ? 'passed' : 'failed',
          reason: b3Ok ? undefined : 'Nilai sel B3 harus 12000',
        };
        newObjectiveStates['obj-3'] = {
          status: b4Ok ? 'passed' : 'failed',
          reason: b4Ok ? undefined : 'Nilai sel B4 harus 35000',
        };

        if (b2Ok && b3Ok && b4Ok) {
          passed = true;
          feedbackList.push('Pengisian harga dan format Rupiah telah sesuai standar pembukuan.');
        } else {
          feedbackList.push('Periksa kembali angka pada B2 (55000), B3 (12000), dan B4 (35000). Jangan ketik manual kata "Rp".');
        }
      } else if (level.id === 'excel-t1-02') {
        const rawB5 = String(activeSheet['B5']?.raw ?? '').toUpperCase().trim();
        const valB5 = engine.getCellValue('B5');
        const mut = rawB5.startsWith('=SUM')
          ? ExcelFormulaEngine.testDynamicMutation(activeSheet, 'B5', [{ cell: 'B2', delta: 5000 }])
          : { isDynamic: false };

        const sumOk = rawB5.startsWith('=SUM');
        const valOk = valB5 === 102000;
        const mutOk = mut.isDynamic;

        level.objectives.forEach((obj, idx) => {
          if (idx === 0) {
            newObjectiveStates[obj.id] = {
              status: sumOk ? 'passed' : 'failed',
              reason: sumOk ? undefined : 'Gunakan formula =SUM(B2:B4)',
            };
          } else if (idx === 1) {
            newObjectiveStates[obj.id] = {
              status: valOk ? 'passed' : 'failed',
              reason: valOk ? undefined : 'Hasil penjumlahan harus 102000',
            };
          } else {
            newObjectiveStates[obj.id] = {
              status: mutOk ? 'passed' : 'failed',
              reason: mutOk ? undefined : 'Formula harus dinamis dan merespons perubahan data',
            };
          }
        });

        if (valB5 === 102000 && rawB5.startsWith('=SUM') && mut.isDynamic) {
          passed = true;
          feedbackList.push('Hebat! Rumus =SUM(B2:B4) bekerja secara dinamis dan lolos uji mutasi!');
        } else if (valB5 === 102000 && !rawB5.startsWith('=')) {
          feedbackList.push('Anda mengetik angka 102000 secara manual! Gunakan fungsi rumus =SUM(B2:B4).');
        } else {
          feedbackList.push('Hasil penjumlahan di sel B5 belum sesuai. Gunakan rumus =SUM(B2:B4).');
        }
      } else if (level.id === 'excel-t1-03') {
        const valB6 = engine.getCellValue('B6');
        const rawB6 = String(activeSheet['B6']?.raw ?? '').toUpperCase();
        const avgOk = rawB6.startsWith('=AVERAGE') || rawB6.startsWith('=AVG');
        const valOk = valB6 === 2500000;

        passed = avgOk && valOk;
        if (passed) {
          feedbackList.push('Sempurna! Rumus =AVERAGE(B2:B5) menghitung rata-rata harian dengan akurat.');
        } else if (valOk && !rawB6.startsWith('=')) {
          feedbackList.push('Angka Rp 2.500.000 diketik manual! Gunakan fungsi =AVERAGE(B2:B5).');
        } else {
          feedbackList.push('Gunakan formula =AVERAGE(B2:B5) di sel B6.');
        }
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = {
            status: passed ? 'passed' : 'failed',
            reason: passed ? undefined : 'Gunakan formula =AVERAGE(B2:B5) di sel B6',
          };
        });
      } else if (level.id === 'excel-t1-04') {
        const valB7 = engine.getCellValue('B7');
        const rawB7 = String(activeSheet['B7']?.raw ?? '').toUpperCase();
        const valB8 = engine.getCellValue('B8');
        const rawB8 = String(activeSheet['B8']?.raw ?? '').toUpperCase();

        const maxOk = (valB7 === 8900000) && rawB7.startsWith('=MAX');
        const minOk = (valB8 === 2600000) && rawB8.startsWith('=MIN');

        passed = maxOk && minOk;
        if (passed) {
          feedbackList.push('Analisis tuntas! Formula =MAX dan =MIN berhasil mengidentifikasi omzet tertinggi & terendah.');
        } else {
          feedbackList.push('Gunakan =MAX(B2:B6) di sel B7 dan =MIN(B2:B6) di sel B8.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? maxOk : minOk;
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Gunakan formula =MAX(B2:B6)' : 'Gunakan formula =MIN(B2:B6)'),
          };
        });
      } else if (level.id === 'excel-t1-05') {
        const valB7 = engine.getCellValue('B7');
        const rawB7 = String(activeSheet['B7']?.raw ?? '').toUpperCase();
        const valB8 = engine.getCellValue('B8');
        const rawB8 = String(activeSheet['B8']?.raw ?? '').toUpperCase();

        const countaOk = (valB7 === 5) && rawB7.startsWith('=COUNTA');
        const countOk = (valB8 === 4) && rawB8.startsWith('=COUNT');

        passed = countaOk && countOk;
        if (passed) {
          feedbackList.push('Hebat! Anda memahami perbedaan krusial COUNTA (teks/angka) dan COUNT (hanya angka).');
        } else {
          feedbackList.push('Gunakan =COUNTA(A2:A6) di B7 dan =COUNT(B2:B6) di B8.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? countaOk : countOk;
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Gunakan formula =COUNTA(A2:A6)' : 'Gunakan formula =COUNT(B2:B6)'),
          };
        });
      } else if (level.id === 'excel-t1-boss') {
        const valB6 = engine.getCellValue('B6');
        const rawB6 = String(activeSheet['B6']?.raw ?? '').toUpperCase();
        const valC6 = engine.getCellValue('C6');
        const rawC6 = String(activeSheet['C6']?.raw ?? '').toUpperCase();
        const valD6 = engine.getCellValue('D6');
        const rawD6 = String(activeSheet['D6']?.raw ?? '').toUpperCase();

        const inOk = (valB6 === 8250000) && rawB6.startsWith('=SUM');
        const outOk = (valC6 === 2550000) && rawC6.startsWith('=SUM');
        const balanceOk = (valD6 === 5700000) && rawD6.startsWith('=');

        passed = inOk && outOk && balanceOk;
        if (passed) {
          feedbackList.push('Luar biasa! Buku kas toko sembako Bu Sari teraudit sempurna dengan saldo akhir Rp 5.700.000.');
        } else {
          feedbackList.push('Periksa rumus =SUM(B2:B5) di B6, =SUM(C2:C5) di C6, dan =B6-C6 di D6.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? inOk : (idx === 1 ? outOk : balanceOk);
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Hitung total masuk dengan =SUM(B2:B5)' : (idx === 1 ? 'Hitung total keluar dengan =SUM(C2:C5)' : 'Hitung saldo akhir dengan =B6-C6')),
          };
        });
      } else if (level.id === 'excel-t2-01') {
        const c2 = engine.getCellValue('C2');
        const rawC2 = String(activeSheet['C2']?.raw ?? '').toUpperCase();

        if (c2 === 220000 && (rawC2.includes('$E$1') || rawC2.includes('E$1') || rawC2.includes('$E1'))) {
          passed = true;
          feedbackList.push('Luar biasa! Referensi absolut ($E$1) menjaga integritas formula.');
        } else {
          feedbackList.push('Gunakan referensi absolut $E$1 di sel C2 (=B2*$E$1).');
        }
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = {
            status: passed ? 'passed' : 'failed',
            reason: passed ? undefined : 'Gunakan formula perkalian dengan referensi absolut $E$1',
          };
        });
      } else if (level.id === 'excel-t2-02') {
        const d2 = engine.getCellValue('D2');
        const d3 = engine.getCellValue('D3');
        const d4 = engine.getCellValue('D4');

        const ok2 = Math.round(Number(d2)) === 157250;
        const ok3 = Math.round(Number(d3)) === 205625;
        const ok4 = Math.round(Number(d4)) === 371250;

        passed = ok2 && ok3 && ok4;
        if (passed) {
          feedbackList.push('Hebat! Pembulatan ROUND sukses meniadakan uang pecahan kasir.');
        } else {
          feedbackList.push('Gunakan formula =ROUND(B2*(1-C2); 0) di kolom D.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? ok2 : (idx === 1 ? ok3 : ok4);
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : 'Gunakan formula pembulatan ROUND(..., 0)',
          };
        });
      } else if (level.id === 'excel-t2-03') {
        const c7 = engine.getCellValue('C7');
        const rawC7 = String(activeSheet['C7']?.raw ?? '').toUpperCase();
        passed = (c7 === 2500000) && rawC7.startsWith('=SUMIF');

        if (passed) {
          feedbackList.push('Sempurna! Formula =SUMIF(A2:A6; "Elektronik"; C2:C6) berhasil menjumlahkan omzet kategori.');
        } else {
          feedbackList.push('Gunakan rumus =SUMIF(A2:A6; "Elektronik"; C2:C6) di sel C7.');
        }
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = {
            status: passed ? 'passed' : 'failed',
            reason: passed ? undefined : 'Gunakan formula =SUMIF untuk kategori Elektronik',
          };
        });
      } else if (level.id === 'excel-t2-04') {
        const b7 = engine.getCellValue('B7');
        const rawB7 = String(activeSheet['B7']?.raw ?? '').toUpperCase();
        passed = (b7 === 3) && rawB7.startsWith('=COUNTIF');

        if (passed) {
          feedbackList.push('Target teridentifikasi! Ada 3 transaksi yang mencapai target >= 1.000.000.');
        } else {
          feedbackList.push('Gunakan formula =COUNTIF(B2:B6; ">=1000000") di sel B7.');
        }
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = {
            status: passed ? 'passed' : 'failed',
            reason: passed ? undefined : 'Gunakan formula =COUNTIF dengan kriteria ">=1000000"',
          };
        });
      } else if (level.id === 'excel-t2-05') {
        const b7 = engine.getCellValue('B7');
        const rawB7 = String(activeSheet['B7']?.raw ?? '').toUpperCase();
        passed = (b7 === 1800000) && rawB7.startsWith('=AVERAGEIF');

        if (passed) {
          feedbackList.push('Mantap! Formula AVERAGEIF berhasil menghitung rerata transaksi metode Transfer.');
        } else {
          feedbackList.push('Gunakan formula =AVERAGEIF(A2:A6; "Transfer"; B2:B6) di sel B7.');
        }
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = {
            status: passed ? 'passed' : 'failed',
            reason: passed ? undefined : 'Gunakan formula =AVERAGEIF untuk kriteria Transfer',
          };
        });
      } else if (level.id === 'excel-t2-boss') {
        const d2 = engine.getCellValue('D2');
        const rawD2 = String(activeSheet['D2']?.raw ?? '').toUpperCase();
        const c7 = engine.getCellValue('C7');
        const c8 = engine.getCellValue('C8');

        const commOk = (d2 === 150000) && (rawD2.includes('$E$1') || rawD2.includes('E$1') || rawD2.includes('$E1'));
        const sumifOk = (c7 === 9500000);
        const countifOk = (c8 === 3);

        passed = commOk && sumifOk && countifOk;
        if (passed) {
          feedbackList.push('Lulus kualifikasi Boss Level 2! Pak Reza sangat puas dengan konsolidasi laporan cabang.');
        } else {
          feedbackList.push('Periksa komisi absolut di D2 (=C2*$E$1), total Surabaya di C7, dan transaksi >= 2 juta di C8.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? commOk : (idx === 1 ? sumifOk : countifOk);
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Gunakan formula =C2*$E$1' : (idx === 1 ? 'Gunakan =SUMIF untuk cabang Surabaya' : 'Gunakan =COUNTIF untuk transaksi >= 2000000')),
          };
        });
      } else if (level.id === 'excel-t3-01') {
        const c2 = engine.getCellValue('C2');
        const c3 = engine.getCellValue('C3');
        const c4 = engine.getCellValue('C4');

        if (String(c2).toUpperCase() === 'LULUS' && String(c3).toUpperCase() === 'REMEDIAL' && String(c4).toUpperCase() === 'LULUS') {
          passed = true;
          feedbackList.push('Logika kondisional IF berhasil mengevaluasi status kelulusan dengan tepat.');
        } else {
          feedbackList.push('Periksa rumus =IF(B2>=75, "LULUS", "REMEDIAL").');
        }
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = {
            status: passed ? 'passed' : 'failed',
            reason: passed ? undefined : 'Cek kondisi evaluasi logika IF pada kolom C',
          };
        });
      } else if (level.id === 'excel-t3-02') {
        const d2 = engine.getCellValue('D2');
        const d3 = engine.getCellValue('D3');
        const d4 = engine.getCellValue('D4');

        const ok2 = Number(d2) === 1500000;
        const ok3 = Number(d3) === 0;
        const ok4 = Number(d4) === 0;

        passed = ok2 && ok3 && ok4;
        if (passed) {
          feedbackList.push('Hebat! Evaluasi logika majemuk IF+AND berhasil menyaring penerima bonus insentif.');
        } else {
          feedbackList.push('Gunakan formula =IF(AND(B2>=90; C2>=10000000); 1500000; 0) di kolom D.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? ok2 : (idx === 1 ? ok3 : ok4);
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : 'Formula IF+AND belum mengevaluasi kriteria ganda dengan tepat',
          };
        });
      } else if (level.id === 'excel-t3-03') {
        const b2 = String(engine.getCellValue('B2') ?? '').toUpperCase();
        const c2 = String(engine.getCellValue('C2') ?? '').toUpperCase();

        const okLeft = b2 === 'GUD';
        const okRight = c2 === 'EXP';

        passed = okLeft && okRight;
        if (passed) {
          feedbackList.push('Tuntas! Fungsi LEFT dan RIGHT sukses mengekstrak kode fasilitas dan status batch.');
        } else {
          feedbackList.push('Gunakan =LEFT(A2; 3) di B2 dan =RIGHT(A2; 3) di C2.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? okLeft : okRight;
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Gunakan formula =LEFT(A2; 3)' : 'Gunakan formula =RIGHT(A2; 3)'),
          };
        });
      } else if (level.id === 'excel-t3-04') {
        const b2 = String(engine.getCellValue('B2') ?? '');
        const c2 = Number(engine.getCellValue('C2'));

        const okMid = b2 === '8821';
        const okLen = c2 === 12;

        passed = okMid && okLen;
        if (passed) {
          feedbackList.push('Presisi! Nomor seri terekstrak dengan MID dan panjang string terverifikasi dengan LEN.');
        } else {
          feedbackList.push('Gunakan =MID(A2; 5; 4) di B2 dan =LEN(A2) di C2.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? okMid : okLen;
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Gunakan formula =MID(A2; 5; 4)' : 'Gunakan formula =LEN(A2)'),
          };
        });
      } else if (level.id === 'excel-t3-05') {
        const b2 = String(engine.getCellValue('B2') ?? '').trim();
        const d2 = String(engine.getCellValue('D2') ?? '').trim();

        const okClean = b2 === 'BUDI SANTOSO';
        const okConcat = d2.includes('BUDI SANTOSO') && d2.includes('FINANCE');

        passed = okClean && okConcat;
        if (passed) {
          feedbackList.push('Data bersih dan rapi! TRIM, UPPER, dan CONCATENATE sukses menstandarkan kartu akses.');
        } else {
          feedbackList.push('Gunakan =UPPER(TRIM(A2)) di B2 dan =CONCATENATE(B2; " - "; C2) di D2.');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? okClean : okConcat;
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Gunakan formula =UPPER(TRIM(A2))' : 'Gunakan formula =CONCATENATE'),
          };
        });
      } else if (level.id === 'excel-t3-boss') {
        const b2 = String(engine.getCellValue('B2') ?? '').trim();
        const e2 = Number(engine.getCellValue('E2'));
        const f2 = Number(engine.getCellValue('F2'));
        const f5 = Number(engine.getCellValue('F5'));

        const nameOk = b2 === 'AHMAD FAUZI';
        const bonusOk = e2 === 1000000;
        const netOk = f2 === 6000000;
        const totalOk = f5 === 18500000;

        passed = nameOk && bonusOk && netOk && totalOk;
        if (passed) {
          feedbackList.push('PROMOSI DITERIMA! Audit payroll Boss Level 3 tuntas tanpa cela. Bu Sari dan Maya salut atas kompetensimu!');
        } else {
          feedbackList.push('Periksa nama bersih di B2, bonus di E2 (=IF(D2>=80; 1000000; 0)), gaji bersih di F2, dan total di F5 (=SUM(F2:F4)).');
        }
        level.objectives.forEach((obj, idx) => {
          const isOk = idx === 0 ? nameOk : (idx === 1 ? bonusOk : (idx === 2 ? netOk : totalOk));
          newObjectiveStates[obj.id] = {
            status: isOk ? 'passed' : 'failed',
            reason: isOk ? undefined : (idx === 0 ? 'Gunakan =UPPER(TRIM(A2))' : (idx === 1 ? 'Gunakan formula IF bonus' : (idx === 2 ? 'Hitung gaji pokok + bonus' : 'Hitung total transfer di F5'))),
          };
        });
      } else if (level.id === 'excel-t4-01') {
        const b2 = engine.getCellValue('B2');
        const b3 = engine.getCellValue('B3');

        if (String(b2).toLowerCase() === 'marketing' && String(b3).toLowerCase() === 'finance') {
          passed = true;
          feedbackList.push('VLOOKUP relasional berhasil menghubungkan master divisi!');
        } else {
          feedbackList.push('Formula lookup di B2 belum menghasilkan Divisi yang tepat.');
        }
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = {
            status: passed ? 'passed' : 'failed',
            reason: passed ? undefined : 'Formula VLOOKUP belum merujuk rentang tabel yang benar',
          };
        });
      } else {
        passed = true;
        feedbackList.push('Seluruh kriteria level terpenuhi.');
        level.objectives.forEach((obj) => {
          newObjectiveStates[obj.id] = { status: 'passed' };
        });
      }
    } else if (level.module === 'web') {
      const webResult = validateWebContent(activeHtml, activeCss, level.webRequirements || {});
      passed = webResult.passed;
      rubric = webResult.score;
      feedbackList.push(...webResult.feedback);

      level.objectives.forEach((obj, idx) => {
        newObjectiveStates[obj.id] = {
          status: passed ? 'passed' : 'failed',
          reason: passed ? undefined : (webResult.feedback[idx] || webResult.feedback[0] || 'Kriteria elemen web belum lengkap'),
        };
      });
    } else if (level.module === 'coding') {
      const execResult = await runCodeWithTests(activeCode, level.testCases || []);
      passed = execResult.success;
      if (passed) {
        feedbackList.push('Semua unit test (visible & hidden) berhasil dieksekusi dengan bersih!');
      } else {
        feedbackList.push(execResult.friendlyError || 'Ada test case yang gagal atau fungsi tidak menghasilkan nilai yang diharapkan.');
      }

      level.objectives.forEach((obj, idx) => {
        const testRes = execResult.testResults && execResult.testResults[idx];
        const isObjPassed = testRes ? testRes.passed : passed;
        newObjectiveStates[obj.id] = {
          status: isObjPassed ? 'passed' : 'failed',
          reason: isObjPassed ? undefined : (testRes?.error ? testRes.error : execResult.friendlyError || 'Kasus uji belum terpenuhi'),
        };
      });
    } else if (level.module === 'word') {
      const docResult = validateWordDocument(activeWord, level.wordRequirements || { minWords: 15 });
      passed = docResult.passed;
      rubric = docResult.score;
      feedbackList.push(...docResult.feedback);

      level.objectives.forEach((obj, idx) => {
        newObjectiveStates[obj.id] = {
          status: passed ? 'passed' : 'failed',
          reason: passed ? undefined : (docResult.feedback[idx] || docResult.feedback[0] || 'Pedoman format belum dipenuhi'),
        };
      });
    }

    setObjectiveStates(newObjectiveStates);

    let stars = 3;
    if (unlockedHintLevel >= 2 || missionFailCount >= 2) stars = 2;
    if (unlockedHintLevel >= 3 || missionFailCount >= 3) stars = 1;

    setValidationOutput({
      passed,
      stars,
      feedback: feedbackList,
      rubric,
    });
    setShowResultModal(true);

    if (passed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      recordMissionSuccess(level.id, stars, level.xpReward, level.coinReward);
    } else {
      recordMissionFail(feedbackList[0] || 'Hasil belum memenuhi rubrik.');
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] w-full max-w-7xl mx-auto pb-4 gap-3">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setView('career-map');
            }}
            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 cursor-pointer transition"
            title="Kembali ke Peta Karier"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                Tier {level.tier} • {level.module.toUpperCase()} {level.track ? `(${level.track.toUpperCase()})` : ''}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-semibold text-slate-700">{level.title}</span>
            </div>
          </div>
        </div>

        {/* Action icons & Mobile View Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHistoryModal(true)}
            className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Riwayat Dialog"
          >
            <History className="w-4 h-4" />
            <span className="hidden sm:inline">Riwayat Dialog</span>
          </button>

          <button
            type="button"
            onClick={() => setShowQuickSettings(true)}
            className="p-1.5 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer"
            title="Pengaturan Cepat Misi"
          >
            <Sliders className="w-4 h-4 text-emerald-600" />
            <span className="hidden sm:inline">Pengaturan</span>
          </button>

          <div className="flex md:hidden items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveMobileTab('brief')}
              className={`px-2.5 py-1 rounded-lg ${activeMobileTab === 'brief' ? 'bg-white shadow-xs' : ''}`}
            >
              Brief
            </button>
            <button
              type="button"
              onClick={() => setActiveMobileTab('editor')}
              className={`px-2.5 py-1 rounded-lg ${activeMobileTab === 'editor' ? 'bg-white shadow-xs' : ''}`}
            >
              Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveMobileTab('checklist')}
              className={`px-2.5 py-1 rounded-lg ${activeMobileTab === 'checklist' ? 'bg-white shadow-xs' : ''}`}
            >
              Cek
            </button>
          </div>
        </div>
      </div>

      {/* Main 3-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 overflow-hidden">
        {/* Left Column: Story, Character Dialogue with 7 Expressions & Choices (3 Cols) */}
        <div
          className={`md:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col gap-3.5 overflow-y-auto ${
            activeMobileTab === 'brief' ? 'block' : 'hidden md:flex'
          }`}
        >
          {/* Character Dialog Card with SVG Expression */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-3">
            <div className="flex items-start gap-3">
              <CharacterAvatar
                id={level.character}
                size="md"
                expression={activeDialogNode?.expression || 'normal'}
              />
              <div>
                <div className="font-bold text-xs text-slate-800 capitalize">
                  {level.character === 'sari' ? 'Bu Sari' : level.character === 'reza' ? 'Pak Reza' : level.character === 'intan' ? 'Kak Intan' : level.character === 'maya' ? 'Maya (HR)' : level.character}
                </div>
                <div className="text-[10px] text-slate-400 font-medium">PT Maju Sejahtera</div>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed italic bg-white p-2.5 rounded-xl border border-slate-200/60">
              "{activeDialogNode?.text}"
            </p>

            {/* Branching Dialogue Choices (Komunikasi, Prioritas, Etika) */}
            {activeDialogNode?.choices && activeDialogNode.choices.length > 0 && !dialogueResponse && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pilih Responsmu:</span>
                {activeDialogNode.choices.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => handleSelectChoice(c)}
                    className="w-full text-left p-2 rounded-xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 text-[11px] text-slate-700 font-medium transition cursor-pointer"
                  >
                    {c.text}
                  </button>
                ))}
              </div>
            )}

            {dialogueResponse && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 animate-in fade-in">
                <span className="font-bold">Balasan: </span>
                {dialogueResponse}
              </div>
            )}
          </div>

          {/* Konsep Singkat */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <BookOpen className="w-3.5 h-3.5 text-emerald-600" />
              <span>Konsep Inti</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-200/50">
              {level.conceptBrief}
            </p>
          </div>

          {/* Contoh Dikerjakan */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              <span>Contoh Dikerjakan</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs font-mono text-amber-900 break-all">
              {level.workedExample}
            </div>
          </div>

          {/* Tautan Pelajaran Pusat Belajar */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => {
                const relatedLesson = ALL_LESSONS.find(
                  (l) => l.relatedLevels.includes(level.id) || l.track === level.module
                );
                openLessonView(relatedLesson?.id);
              }}
              className="w-full py-2.5 px-3 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center justify-center gap-1.5 transition cursor-pointer"
            >
              <GraduationCap className="w-4 h-4 text-emerald-600" />
              <span>Belum paham? Buka Pelajarannya</span>
            </button>
          </div>
        </div>

        {/* Center Column: The Primary Tool Editor (6 Cols) */}
        <div
          className={`md:col-span-6 flex flex-col h-full overflow-hidden ${
            activeMobileTab === 'editor' ? 'block' : 'hidden md:flex'
          }`}
        >
          <ErrorBoundary fallbackTitle="Editor Mengalami Kendala" fallbackMessage="Terjadi kendala teknis saat memuat editor. Anda dapat mencoba memuat ulang editor atau kembali ke kantor.">
            {level.module === 'excel' && (
              <SpreadsheetEditor grid={activeSheet} onCellChange={(addr, data) => setCell(addr, data)} />
            )}
            {level.module === 'web' && (
              <WebPreviewEditor
                html={activeHtml}
                css={activeCss}
                onHtmlChange={(h) => setHtml(h)}
                onCssChange={(c) => setCss(c)}
              />
            )}
            {level.module === 'coding' && (
              <CodeScriptEditor
                code={activeCode}
                onChange={(c) => setCode(c)}
                testCases={level.testCases}
              />
            )}
            {level.module === 'word' && (
              <WordDocumentEditor content={activeWord} onChange={(w) => setWord(w)} />
            )}
          </ErrorBoundary>
        </div>

        {/* Right Column: Objectives Checklist, Hints, Boss Help & Check Button (3 Cols) */}
        <div
          className={`md:col-span-3 bg-white rounded-2xl border border-slate-200/80 p-4 flex flex-col justify-between overflow-y-auto ${
            activeMobileTab === 'checklist' ? 'block' : 'hidden md:flex'
          }`}
        >
          <div className="space-y-4">
            {/* Objectives List */}
            <div>
              <div className="text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide flex items-center justify-between">
                <span>Target Pekerjaan</span>
                <span className="text-[10px] font-normal text-slate-500">
                  {Object.values(objectiveStates).filter(s => s.status === 'passed').length}/{level.objectives.length} Selesai
                </span>
              </div>
              <div className="space-y-2">
                {level.objectives.map((obj) => {
                  const state = objectiveStates[obj.id] || { status: 'untested' };
                  return (
                    <div
                      key={obj.id}
                      className={`p-2.5 rounded-xl border text-xs flex flex-col gap-1 transition-colors ${
                        state.status === 'passed'
                          ? 'bg-emerald-50/70 border-emerald-200/80 text-emerald-900'
                          : state.status === 'failed'
                          ? 'bg-rose-50/70 border-rose-200/80 text-rose-900'
                          : 'bg-slate-50 border-slate-200/70 text-slate-700'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {state.status === 'passed' ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        ) : state.status === 'failed' ? (
                          <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        )}
                        <span className="leading-tight font-medium">{obj.text}</span>
                      </div>
                      {state.status === 'failed' && state.reason && (
                        <p className="text-[11px] text-rose-600 pl-6 leading-tight font-sans">
                          {state.reason}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hint Tiered System */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Bantuan (Hint)</span>
                <span className="text-[10px] text-slate-500 font-normal">Level {unlockedHintLevel}/3</span>
              </div>

              {unlockedHintLevel > 0 && (
                <div className="space-y-1.5">
                  {level.hints.slice(0, unlockedHintLevel).map((h, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-blue-50 border border-blue-200/60 text-xs text-blue-900"
                    >
                      <span className="font-bold">Hint {idx + 1}:</span> {h}
                    </div>
                  ))}
                </div>
              )}

              {unlockedHintLevel < 3 && (
                <button
                  type="button"
                  onClick={() => unlockHint()}
                  className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Buka Hint {unlockedHintLevel + 1} ({(unlockedHintLevel + 1) * 20} Koin)</span>
                </button>
              )}

              {/* Free Boss Help triggered after 3 fails */}
              {missionFailCount >= 3 && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Bantuan Bos Bu Sari (Gratis)</span>
                  </div>
                  <p className="text-xs text-rose-900 leading-relaxed">{level.bossHelp}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Primary Action Button */}
          <div className="pt-4 border-t border-slate-100 mt-4">
            <button
              type="button"
              onClick={handleValidate}
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Kirim & Periksa Jawaban</span>
            </button>
          </div>
        </div>
      </div>

      {/* Dialog History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Log Riwayat Dialog Adegan</span>
              </div>
              <button
                type="button"
                onClick={() => setShowHistoryModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {level.dialogue.map((d, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 text-xs">
                  <span className="font-bold text-slate-800 capitalize">{d.speaker}: </span>
                  <span className="text-slate-600 italic">"{d.text}"</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5-Dimension Rubric Result Modal */}
      {showResultModal && validationOutput && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 flex flex-col gap-4 animate-in fade-in zoom-in-95">
            <div className="text-center">
              {validationOutput.passed ? (
                <div className="inline-flex p-3 bg-emerald-100 rounded-full text-emerald-600 mb-2">
                  <Award className="w-8 h-8" />
                </div>
              ) : (
                <div className="inline-flex p-3 bg-rose-100 rounded-full text-rose-600 mb-2">
                  <AlertCircle className="w-8 h-8" />
                </div>
              )}
              <h3 className="text-xl font-extrabold text-slate-900">
                {validationOutput.passed ? 'Tugas Berhasil Diselesaikan!' : 'Masih Ada Kesalahan'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {validationOutput.passed
                  ? 'Pekerjaanmu memenuhi standar mutu PT Maju Sejahtera.'
                  : 'Cek catatan evaluasi di bawah dan coba lagi tanpa panik!'}
              </p>
            </div>

            {/* Stars */}
            {validationOutput.passed && (
              <div className="flex justify-center gap-2">
                {[1, 2, 3].map((s) => (
                  <Star
                    key={s}
                    className={`w-6 h-6 ${
                      s <= validationOutput.stars ? 'text-amber-400 fill-amber-400' : 'text-slate-300'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* 5-Dimension Rubric Scoring */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Benar</span>
                <div className="font-bold text-slate-800 text-xs">{validationOutput.rubric.correctness}%</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Efisien</span>
                <div className="font-bold text-slate-800 text-xs">{validationOutput.rubric.efficiency}%</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Rapi</span>
                <div className="font-bold text-slate-800 text-xs">{validationOutput.rubric.neatness}%</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Dirawat</span>
                <div className="font-bold text-slate-800 text-xs">{validationOutput.rubric.maintainability}%</div>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60">
                <span className="text-slate-400 text-[9px] block">Komunikasi</span>
                <div className="font-bold text-slate-800 text-xs">{validationOutput.rubric.communication}%</div>
              </div>
            </div>

            {/* Feedback messages */}
            <div className="space-y-1.5 text-xs">
              {validationOutput.feedback.map((fb, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border leading-relaxed ${
                    validationOutput.passed
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}
                >
                  {fb}
                </div>
              ))}
            </div>

            {/* Modal Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {validationOutput.passed ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowResultModal(false);
                    setView('career-map');
                  }}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  Lanjut ke Peta Karier
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setShowResultModal(false);
                      const relatedLesson = ALL_LESSONS.find(
                        (l) => l.relatedLevels.includes(level.id) || l.track === level.module
                      );
                      openLessonView(relatedLesson?.id);
                    }}
                    className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <GraduationCap className="w-4 h-4" />
                    <span>Pelajari Bagian Ini</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowResultModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                  >
                    Coba Perbaiki Lagi
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Settings Modal */}
      <QuickSettingsModal
        isOpen={showQuickSettings}
        onClose={() => setShowQuickSettings(false)}
      />
    </div>
  );
};
