import test from 'node:test';
import assert from 'node:assert/strict';
import { validateWebContent } from '../engine/webValidator';

test('CSS and HTML comments do not satisfy requirements', () => {
  const html = '<h1>Halo</h1><!-- <header></header> -->';
  const commentedCss = '/* .wrap { display: flex; } @media (max-width: 600px) { } */';
  const res = validateWebContent(html, commentedCss, {
    requiredTags: ['header'],
    requireFlexbox: true,
    minMediaQueries: 1,
  });
  assert.equal(res.passed, false);
  assert.equal(res.feedback.length, 3);
});

test('real declarations still pass', () => {
  const html = '<header></header><h1>Halo</h1>';
  const css = '.wrap { display: flex; }\n@media (max-width: 600px) { .wrap { display: block; } }';
  const res = validateWebContent(html, css, { requiredTags: ['header'], requireFlexbox: true, minMediaQueries: 1 });
  assert.equal(res.passed, true);
});
