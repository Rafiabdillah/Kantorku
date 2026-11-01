import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DOMAIN_CATALOG } from '../types/skills';
import { ALL_SKILLS, ALL_MANIFESTS } from '../content/skills';
import { D13_SKILLS } from '../content/skills/d13-bahasa-inggris/skills';
import { D13_LESSONS } from '../content/skills/d13-bahasa-inggris/lessons';
import { D13_LEVELS } from '../content/skills/d13-bahasa-inggris/levels';
import { generateSeededD13Quizzes, D13_QUIZZES } from '../content/skills/d13-bahasa-inggris/quizzes';
import { D13_CASES } from '../content/skills/d13-bahasa-inggris/cases';
import { D16_SKILLS } from '../content/skills/d16-desain-uiux/skills';
import { D16_LESSONS } from '../content/skills/d16-desain-uiux/lessons';
import { D16_LEVELS } from '../content/skills/d16-desain-uiux/levels';
import { generateSeededD16Quizzes, D16_QUIZZES } from '../content/skills/d16-desain-uiux/quizzes';
import { D16_CASES } from '../content/skills/d16-desain-uiux/cases';
import { contrastRatio, requiredContrast, wcagPass, relativeLuminance } from '../content/skills/d16-desain-uiux/wcag';

function validatePack(domain:'D13'|'D16', skills:any[], lessons:any[], levels:any[], quizzes:any[], cases:any[]) {
  assert.ok(skills.length>=3);
  assert.ok(lessons.length>=3);
  assert.ok(levels.length>=4);
  assert.ok(quizzes.length>=10);
  assert.ok(cases.length>=1);
  for(const skill of skills){
    assert.equal(skill.domain,domain);
    assert.ok(skill.sources.length>=2);
  }
  for(const level of levels){
    assert.ok(skills.some((skill:any)=>skill.id===level.skillId));
    assert.equal(level.passThreshold,level.tier<=2?70:80);
  }
}

test('Wave S3b activates D13 and D16 with 17 active and 0 upcoming domains',()=>{
  assert.equal(DOMAIN_CATALOG.D13.status,'aktif');
  assert.equal(DOMAIN_CATALOG.D16.status,'aktif');
  const active=Object.values(DOMAIN_CATALOG).filter((d:any)=>d.status==='aktif');
  const upcoming=Object.values(DOMAIN_CATALOG).filter((d:any)=>d.status==='segera-hadir');
  assert.equal(active.length,17);
  assert.equal(upcoming.length,0);
  assert.equal(ALL_MANIFESTS.D13.status,'aktif');
  assert.equal(ALL_MANIFESTS.D16.status,'aktif');
});

test('D13 pack is complete and quiz targets are unambiguous',()=>{
  validatePack('D13',D13_SKILLS,D13_LESSONS,D13_LEVELS,D13_QUIZZES,D13_CASES);
  assert.deepEqual(generateSeededD13Quizzes(13013),D13_QUIZZES);
  for(const question of D13_QUIZZES){
    if(question.type==='klik-area'){
      assert.equal(question.previewImageOrBox.zones.filter((zone:any)=>zone.isTarget).length,1);
    }
  }
});

test('D16 pack is complete and WCAG calculations use real functions',()=>{
  validatePack('D16',D16_SKILLS,D16_LESSONS,D16_LEVELS,D16_QUIZZES,D16_CASES);
  assert.deepEqual(generateSeededD16Quizzes(16016),D16_QUIZZES);
  assert.ok(contrastRatio('#1f2937','#ffffff')>=requiredContrast(16,false));
  assert.equal(wcagPass('#1f2937','#ffffff',16),true);
  assert.equal(wcagPass('#9ca3af','#ffffff',16),false);
  assert.equal(relativeLuminance('#000000'),0);
  assert.equal(relativeLuminance('#ffffff'),1);
});

test('D13 and D16 are included in the derived skill universe',()=>{
  assert.ok(ALL_SKILLS.filter((skill:any)=>skill.domain==='D13').length>=3);
  assert.ok(ALL_SKILLS.filter((skill:any)=>skill.domain==='D16').length>=3);
});

test('D13 and D16 sources contain only approved URLs and no unverifiable patterns',()=>{
  const approvedUrls=new Set([
    'https://learnenglish.britishcouncil.org/business/english-emails',
    'https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html',
    'https://www.w3.org/WAI/WCAG21/Techniques/general/G18.html',
    'https://www.w3.org/TR/WCAG22/',
    'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility',
    'https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html',
    'https://www.w3.org/WAI/WCAG21/Understanding/use-of-color.html',
  ]);
  const forbiddenUrlPatterns=[
    /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
    /britishcouncil\.org\/business-english\//i,
    /bokcenter\.harvard\.edu/i,
    /cambridgeenglish\.org\/learning-english\/free-resources/i,
  ];
  for(const skill of [...D13_SKILLS,...D16_SKILLS]){
    for(const source of skill.sources){
      const urls=source.match(/https?:\/\/[^\s]+/g)?.map((url)=>url.replace(/[.,;]+$/,'')) ?? [];
      for(const url of urls){
        assert.ok(approvedUrls.has(url),`${skill.id} has unapproved URL: ${url}`);
        for(const pattern of forbiddenUrlPatterns){
          assert.doesNotMatch(url,pattern,`${skill.id} has unverifiable URL pattern: ${url}`);
        }
      }
      assert.equal(urls.every((url)=>approvedUrls.has(url)),true);
    }
  }
});

test('D13 multiple-choice answers are unambiguous and grammatically sound',()=>{
  for(const question of D13_QUIZZES){
    if(question.type==='klik-area'){
      const targets=question.previewImageOrBox.zones.filter((zone:any)=>zone.isTarget);
      assert.equal(targets.length,1,`${question.id} must have exactly one correct answer`);
      for(const zone of question.previewImageOrBox.zones){
        assert.ok(zone.label.trim().length>0,`${question.id} has an empty answer`);
        assert.ok(!/^send it\.?$/i.test(zone.label.trim()) || zone.isTarget===false,`${question.id} has an abrupt answer marked correct`);
      }
      assert.ok(targets[0].label.trim().length>=4,`${question.id} has an unusable correct answer`);
    }
    if(question.type==='temukan-kesalahan'){
      const errors=question.contextSnippet.lines.filter((line:any)=>line.isError);
      assert.equal(question.requiredErrorCount,1,`${question.id} must have one intended error`);
      assert.equal(errors.length,1,`${question.id} has ambiguous error count`);
      for(const line of question.contextSnippet.lines){
        if(!line.isError){
          assert.ok(!/\b(having completed)\b/i.test(line.text),`${question.id} has an ungrammatical non-error answer`);
          assert.ok(!/\bi am write\b/i.test(line.text),`${question.id} has an ungrammatical non-error answer`);
          assert.ok(!/\bhe don't\b/i.test(line.text),`${question.id} has an ungrammatical non-error answer`);
        }
      }
    }
  }
});
