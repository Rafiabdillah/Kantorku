import { test } from 'node:test';
import assert from 'node:assert/strict';
import { D4_SKILLS } from '../content/skills/d4-data-sql/skills';
import { D4_LESSONS } from '../content/skills/d4-data-sql/lessons';
import { D4_LEVELS } from '../content/skills/d4-data-sql/levels';
import { D4_CASES } from '../content/skills/d4-data-sql/cases';
import { D4_QUIZZES, D4_SQL_ANSWERS, generateSeededD4Quizzes } from '../content/skills/d4-data-sql/quizzes';
import { executeSqlAnswer } from '../content/skills/d4-data-sql/sqlite';
import { D17_SKILLS } from '../content/skills/d17-hukum-kepatuhan/skills';
import { D17_LESSONS } from '../content/skills/d17-hukum-kepatuhan/lessons';
import { D17_LEVELS } from '../content/skills/d17-hukum-kepatuhan/levels';
import { D17_CASES } from '../content/skills/d17-hukum-kepatuhan/cases';
import { D17_QUIZZES } from '../content/skills/d17-hukum-kepatuhan/quizzes';
import { D17_LEGAL_DISCLAIMER } from '../content/skills/d17-hukum-kepatuhan/constants';
import { D4_SQL_CONSTANTS } from '../content/skills/d4-data-sql/constants';
import { DOMAIN_CATALOG } from '../types/skills';

test('S3a D4 has complete audited depth',()=>{
 assert.equal(D4_LESSONS.length,3); assert.equal(D4_LEVELS.length,4); assert.ok(D4_QUIZZES.length>=10); assert.equal(D4_CASES.length,1);
 for(const s of D4_SKILLS){assert.ok(s.sources.length>=2);assert.ok(s.linkedLevels.length>=4)}
 for(const l of D4_LEVELS){assert.ok(l.skillId?.startsWith('D4-SKILL-'));assert.equal(l.passThreshold,l.tier>=3?80:70)}
 assert.deepEqual(generateSeededD4Quizzes(4004).map(q=>q.id),D4_QUIZZES.map(q=>q.id));
 for(const q of D4_QUIZZES.filter((x):x is Extract<typeof x,{type:'urutan'}>=>x.type==='urutan')){assert.notDeepEqual(q.items.map(x=>x.id),q.correctOrder)}
});

test('S3a D4 answer keys execute on local SQLite and are recomputed',()=>{
 for(const sql of Object.values(D4_SQL_ANSWERS)){assert.doesNotThrow(()=>executeSqlAnswer(sql));assert.ok(Array.isArray(executeSqlAnswer(sql)))}
 assert.ok(D4_SQL_CONSTANTS.sales.length>=30);
 const january=executeSqlAnswer(D4_SQL_ANSWERS.januaryRows) as Array<{product:string}>;
 const januaryRecomputed=D4_SQL_CONSTANTS.sales.filter(s=>s.saleDate>= '2026-01-01' && s.saleDate<'2026-02-01');
 assert.equal(january.length,januaryRecomputed.length);
 const joined=executeSqlAnswer(D4_SQL_ANSWERS.joinedSales) as Array<{product:string;total_amount:number}>;
 assert.ok(joined.length>=3);assert.ok(joined.every(r=>typeof r.total_amount==='number'));
 const regionTotals=executeSqlAnswer(D4_SQL_ANSWERS.regionTotals) as Array<{region:string;total_amount:number}>;
 for(const row of regionTotals){
   const recomputed=D4_SQL_CONSTANTS.sales.filter(s=>s.region===row.region).reduce((sum,s)=>sum+s.amount,0);
   assert.equal(row.total_amount,recomputed);
 }
 const minimumRows=D4_SQL_CONSTANTS.sales.filter(s=>s.amount>=D4_SQL_CONSTANTS.minimumJanuaryAmount).length;
 const minimumResult=executeSqlAnswer(D4_SQL_ANSWERS.minimumAmount) as Array<{product:string;amount:number}>;
 assert.equal(minimumResult.length,minimumRows);
 const q07=D4_QUIZZES.find(q=>q.id==='D4-Q07');
 assert.ok(q07?.type==='urutan');
 assert.ok(q07.items.some(item=>item.text.includes("'2026-01-01'")));assert.ok(q07.items.some(item=>item.text.includes("'2026-02-01'")));
 const q05=D4_QUIZZES.find(q=>q.id==='D4-Q05');
 assert.equal(q05?.type,'temukan-kesalahan');
 if(q05?.type==='temukan-kesalahan') assert.equal(q05.contextSnippet.lines[0].isError,true);
});

test('S3a D17 has complete depth, sources, and disclaimer on every screen model',()=>{
 assert.equal(D17_LESSONS.length,3);assert.equal(D17_LEVELS.length,4);assert.ok(D17_QUIZZES.length>=10);assert.equal(D17_CASES.length,1);
 for(const s of D17_SKILLS){assert.ok(s.sources.length>=2);assert.ok(s.linkedLevels.length>=4)}
 for(const l of D17_LESSONS){assert.equal(l.disclaimer,D17_LEGAL_DISCLAIMER)}
 for(const l of D17_LEVELS){assert.equal(l.disclaimer,D17_LEGAL_DISCLAIMER);assert.equal(l.passThreshold,l.tier>=3?80:70)}
 assert.ok(D17_CASES[0].summary.includes(D17_LEGAL_DISCLAIMER));
 assert.ok(D17_LESSONS.every(l=>l.disclaimer===D17_LEGAL_DISCLAIMER));
});

test('S3b completes activation after S3a D4 and D17',()=>{
 assert.equal(DOMAIN_CATALOG.D4.status,'aktif');assert.equal(DOMAIN_CATALOG.D17.status,'aktif');assert.equal(DOMAIN_CATALOG.D13.status,'aktif');assert.equal(DOMAIN_CATALOG.D16.status,'aktif');
 assert.equal(Object.values(DOMAIN_CATALOG).filter(d=>d.status==='aktif').length,17);assert.equal(Object.values(DOMAIN_CATALOG).filter(d=>d.status==='segera-hadir').length,0);
});