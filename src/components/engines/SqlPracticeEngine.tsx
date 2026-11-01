import React, { useEffect, useState } from 'react';
import initSqlJs, { Database } from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import { D4_SQL_CONSTANTS } from '../../content/skills/d4-data-sql/constants';
import { D4_SQL_PRACTICE_EXERCISES } from '../../content/skills/d4-data-sql/quizzes';

interface SqlPracticeEngineProps {
  onComplete: (result: { score: number }) => void;
}

const PRACTICE_QUERIES = D4_SQL_PRACTICE_EXERCISES;

function normalizeResult(database: Database, sql: string) {
  const statement = database.prepare(sql);
  const columns = statement.getColumnNames();
  const values: unknown[][] = [];
  while (statement.step()) values.push(statement.get());
  statement.free();
  return { columns, values: values.map((row) => [...row]) };
}

export const SqlPracticeEngine: React.FC<SqlPracticeEngineProps> = ({ onComplete }) => {
  const [database, setDatabase] = useState<Database | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [sql, setSql] = useState<string>('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [scores, setScores] = useState<boolean[]>([false, false, false]);

  useEffect(() => {
    let active = true;
    initSqlJs({ locateFile: () => wasmUrl })
      .then((SQL) => {
        if (!active) return;
        const db = new SQL.Database();
        db.run('CREATE TABLE sales (sale_id INTEGER PRIMARY KEY, sale_date TEXT NOT NULL, product TEXT NOT NULL, amount INTEGER NOT NULL, region TEXT NOT NULL);');
        db.run('CREATE TABLE products (product_id INTEGER PRIMARY KEY, name TEXT NOT NULL UNIQUE);');
        D4_SQL_CONSTANTS.sales.forEach((sale) => {
          db.run('INSERT INTO sales (sale_date, product, amount, region) VALUES (?, ?, ?, ?)', [sale.saleDate, sale.product, sale.amount, sale.region]);
        });
        D4_SQL_CONSTANTS.products.forEach((product) => db.run('INSERT INTO products (name) VALUES (?)', [product]));
        setDatabase(db);
        setLoading(false);
      })
      .catch((reason) => {
        if (active) {
          setError(reason instanceof Error ? reason.message : 'Mesin SQLite tidak dapat dimuat.');
          setLoading(false);
        }
      });
    return () => { active = false; };
  }, []);

  const exercise = PRACTICE_QUERIES[exerciseIndex];

  const runCheck = () => {
    if (!database) return;
    setError(null);
    setFeedback(null);
    if (!sql.trim()) {
      setFeedback('Tulis kueri dulu');
      return;
    }
    try {
      const key = normalizeResult(database, exercise.answer);
      const student = normalizeResult(database, sql);
      const sameColumns = JSON.stringify(key.columns) === JSON.stringify(student.columns);
      const sameValues = JSON.stringify(key.values) === JSON.stringify(student.values);
      if (sameColumns && sameValues) {
        const nextScores = [...scores];
        nextScores[exerciseIndex] = true;
        setScores(nextScores);
        const passed = nextScores.filter(Boolean).length;
        setFeedback(`Benar. Hasil kueri sama dengan kunci, dengan ${key.values.length} baris dan ${key.columns.length} kolom.`);
        if (passed === PRACTICE_QUERIES.length) onComplete({ score: 100 });
      } else {
        setFeedback('Belum sama. Bandingkan kolom, urutan baris, dan agregasi hasil kueri dengan instruksi latihan.');
      }
    } catch (reason) {
      setFeedback(reason instanceof Error ? `Kueri gagal dijalankan: ${reason.message}` : 'Kueri gagal dijalankan.');
    }
  };

  if (loading) return <div className="p-4 text-xs font-bold text-slate-600">Memuat mesin SQLite lokal dan data latihan...</div>;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs font-black text-slate-900">Latihan SQL Ketik</div>
          <div className="text-[11px] text-slate-500">{D4_SQL_CONSTANTS.sales.length} baris lokal, tanpa jaringan</div>
        </div>
        <div className="text-[11px] font-bold text-slate-700">{scores.filter(Boolean).length}/{PRACTICE_QUERIES.length} lulus</div>
      </div>
      {error && <div className="p-3 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-800">{error}</div>}
      <div className="grid grid-cols-3 gap-2">
        {PRACTICE_QUERIES.map((item, index) => (
          <button key={item.title} type="button" onClick={() => { setExerciseIndex(index); setSql(''); setFeedback(null); }} className={`p-2 rounded-xl text-left text-[11px] border ${exerciseIndex === index ? 'border-emerald-500 bg-emerald-50' : 'border-slate-200 bg-white'}`}>
            {index + 1}. {item.title} {scores[index] ? '✓' : ''}
          </button>
        ))}
      </div>
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div className="text-xs font-bold text-slate-900">{exercise.title}</div>
        <p className="text-xs text-slate-600 mt-1">{exercise.prompt}</p>
      </div>
      <label className="block text-xs font-bold text-slate-700" htmlFor="sql-query-editor">Kueri SQL</label>
      <textarea id="sql-query-editor" value={sql} onChange={(event) => setSql(event.target.value)} rows={7} className="w-full rounded-xl border border-slate-300 bg-slate-950 text-slate-100 p-3 font-mono text-xs" spellCheck={false} />
      <button type="button" onClick={runCheck} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black">Jalankan dan Bandingkan</button>
      {!feedback && <div className="text-[11px] text-slate-500">Belum ada hasil kueri.</div>}
      {feedback && <div className="p-3 rounded-xl border border-slate-200 bg-white text-xs text-slate-700">{feedback}</div>}
    </div>
  );
};
