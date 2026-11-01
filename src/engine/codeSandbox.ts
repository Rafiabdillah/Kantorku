/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * KantorKu - Secure Code Sandbox Engine
 * Executes JavaScript in an isolated Worker (Web Worker in browser, worker_threads in Node)
 * Enforces 3s execution timeout, DOM / localStorage isolation, and console caps.
 */

export interface TestCase {
  description: string;
  input?: any[];
  expected: any;
  hidden?: boolean;
}

export interface TestResult {
  description: string;
  passed: boolean;
  actual: any;
  expected: any;
  hidden?: boolean;
  error?: string;
}

export interface CodeExecutionResult {
  success: boolean;
  output: string[];
  testResults: TestResult[];
  error?: string;
  friendlyError?: string;
  executionTimeMs: number;
}

const VALID_IDENTIFIER_REGEX = /^[A-Za-z_$][\w$]*$/;
const EXECUTION_TIMEOUT_MS = 3000;
const TIMEOUT_FRIENDLY_ERROR = 'Kodemu berjalan terlalu lama, cek apakah ada loop yang tidak berhenti';

export function translateJsError(err: Error | string): string {
  const msg = typeof err === 'string' ? err : err.message;

  if (msg.includes('is not defined')) {
    const varName = msg.split(' ')[0];
    return `Variabel atau fungsi "${varName}" belum dibuat atau salah ketik. Periksa deklarasi (let/const/function).`;
  }
  if (msg.includes('Cannot read properties of undefined') || msg.includes('Cannot read property')) {
    return 'Mencoba membaca properti dari data yang bernilai undefined/kosong. Pastikan objek sudah memiliki nilai.';
  }
  if (msg.includes('is not a function')) {
    return 'Mencoba memanggil sesuatu yang bukan fungsi. Pastikan nama fungsi dan method sudah benar (misal: array.map).';
  }
  if (msg.includes('Unexpected token') || msg.includes('SyntaxError')) {
    return 'Ada kesalahan penulisan sintaks (tanda kurung, titik koma, atau kurung kurawal yang kurang/berlebih).';
  }
  if (msg.includes('Maximum call stack') || msg.includes('timeout') || msg.includes('terlalu lama')) {
    return TIMEOUT_FRIENDLY_ERROR;
  }
  return `Error eksekusi: ${msg}`;
}

/**
 * Worker runner script executed inside an isolated thread/worker.
 * Sandboxes global scope by overriding window, document, localStorage to undefined.
 * Caps console logs to 200 items and 20 KB cumulative bytes.
 */
const WORKER_RUNNER_CORE = `
function translateJsErrorInternal(msg) {
  if (msg.includes('is not defined')) {
    var varName = msg.split(' ')[0];
    return 'Variabel atau fungsi "' + varName + '" belum dibuat atau salah ketik. Periksa deklarasi (let/const/function).';
  }
  if (msg.includes('Cannot read properties of undefined') || msg.includes('Cannot read property')) {
    return 'Mencoba membaca properti dari data yang bernilai undefined/kosong. Pastikan objek sudah memiliki nilai.';
  }
  if (msg.includes('is not a function')) {
    return 'Mencoba memanggil sesuatu yang bukan fungsi. Pastikan nama fungsi dan method sudah benar (misal: array.map).';
  }
  if (msg.includes('Unexpected token') || msg.includes('SyntaxError')) {
    return 'Ada kesalahan penulisan sintaks (tanda kurung, titik koma, atau kurung kurawal yang kurang/berlebih).';
  }
  if (msg.includes('Maximum call stack') || msg.includes('timeout') || msg.includes('terlalu lama')) {
    return '${TIMEOUT_FRIENDLY_ERROR}';
  }
  return 'Error eksekusi: ' + msg;
}

function runSandboxed(payload) {
  var userCode = payload.userCode;
  var testCases = payload.testCases || [];
  var functionName = payload.functionName || 'solution';

  var logs = [];
  var logBytes = 0;
  var MAX_LOGS = 200;
  var MAX_LOG_BYTES = 20 * 1024;

  function appendLog(prefix, args) {
    if (logs.length >= MAX_LOGS || logBytes >= MAX_LOG_BYTES) return;
    var str = prefix + args.map(function(a) {
      try {
        return typeof a === 'object' ? JSON.stringify(a) : String(a);
      } catch (e) {
        return String(a);
      }
    }).join(' ');

    if (logBytes + str.length > MAX_LOG_BYTES) {
      logs.push('[Keluaran log dipotong karena melebihi batas 20 KB]');
      logBytes = MAX_LOG_BYTES;
      return;
    }
    logBytes += str.length;
    logs.push(str);
  }

  var capturedConsole = {
    log: function() { appendLog('', Array.prototype.slice.call(arguments)); },
    warn: function() { appendLog('[WARN] ', Array.prototype.slice.call(arguments)); },
    error: function() { appendLog('[ERROR] ', Array.prototype.slice.call(arguments)); },
    info: function() { appendLog('[INFO] ', Array.prototype.slice.call(arguments)); }
  };

  try {
    // Explicitly shadow and undefine DOM/browser storage globals
    var wrappedCode = 
      '"use strict";\\n' +
      'return (function(console, window, document, localStorage, sessionStorage, XMLHttpRequest, fetch) {\\n' +
      userCode + '\\n' +
      '  return typeof ' + functionName + ' !== "undefined" ? ' + functionName + ' : null;\\n' +
      '});';

    var factory = new Function(wrappedCode)();
    var targetFn = factory(capturedConsole, undefined, undefined, undefined, undefined, undefined, undefined);

    if (testCases.length > 0) {
      if (typeof targetFn !== 'function') {
        return {
          success: false,
          output: logs,
          testResults: [],
          error: 'Fungsi "' + functionName + '" tidak ditemukan di kodemu.',
          friendlyError: 'Pastikan kamu membuat fungsi dengan nama "' + functionName + '" yang mengembalikan (return) nilai jawaban.'
        };
      }

      var testResults = [];
      for (var i = 0; i < testCases.length; i++) {
        var tc = testCases[i];
        try {
          var inputArgs = Array.isArray(tc.input) ? tc.input : (tc.input !== undefined ? [tc.input] : []);
          var clonedArgs = JSON.parse(JSON.stringify(inputArgs));
          var actual = targetFn.apply(null, clonedArgs);
          var isPassed = JSON.stringify(actual) === JSON.stringify(tc.expected);

          testResults.push({
            description: tc.description,
            passed: isPassed,
            actual: actual,
            expected: tc.expected,
            hidden: tc.hidden
          });
        } catch (testErr) {
          var testErrMsg = testErr && testErr.message ? testErr.message : String(testErr);
          testResults.push({
            description: tc.description,
            passed: false,
            actual: null,
            expected: tc.expected,
            hidden: tc.hidden,
            error: testErrMsg
          });
        }
      }

      var allPassed = testResults.every(function(t) { return t.passed; });
      var firstFailed = null;
      for (var j = 0; j < testResults.length; j++) {
        if (testResults[j].error) {
          firstFailed = testResults[j];
          break;
        }
      }

      return {
        success: allPassed,
        output: logs,
        testResults: testResults,
        friendlyError: firstFailed ? translateJsErrorInternal(firstFailed.error) : undefined
      };
    }

    return {
      success: true,
      output: logs,
      testResults: []
    };
  } catch (err) {
    var errMsg = err && err.message ? err.message : String(err);
    return {
      success: false,
      output: logs,
      testResults: [],
      error: errMsg,
      friendlyError: translateJsErrorInternal(errMsg)
    };
  }
}
`;

const BROWSER_WORKER_SCRIPT = `
${WORKER_RUNNER_CORE}
self.onmessage = function(e) {
  var result = runSandboxed(e.data);
  self.postMessage(result);
};
`;

const NODE_WORKER_SCRIPT = `
const { workerData, parentPort } = require('node:worker_threads');
${WORKER_RUNNER_CORE}
try {
  const result = runSandboxed(workerData);
  parentPort.postMessage(result);
} catch (e) {
  parentPort.postMessage({
    success: false,
    output: [],
    testResults: [],
    error: e.message || String(e),
    friendlyError: translateJsErrorInternal(e.message || String(e))
  });
}
`;

export async function runCodeWithTests(
  userCode: string,
  testCases: TestCase[],
  functionNameToTest?: string
): Promise<CodeExecutionResult> {
  const targetFunctionName = functionNameToTest ? functionNameToTest.trim() : 'solution';

  // 1. Strict function name validation to prevent code injection
  if (!VALID_IDENTIFIER_REGEX.test(targetFunctionName)) {
    return {
      success: false,
      output: [],
      testResults: [],
      error: 'Nama fungsi tidak valid.',
      friendlyError: 'Nama fungsi tidak valid. Hanya gunakan huruf, angka, underscore (_), atau dollar ($).',
      executionTimeMs: 0,
    };
  }

  const startTime = performance.now();
  const payload = {
    userCode,
    testCases,
    functionName: targetFunctionName,
  };

  // Determine environment: Browser Web Worker vs Node.js worker_threads
  const isBrowser = typeof window !== 'undefined' && typeof Worker !== 'undefined' && typeof Blob !== 'undefined';

  if (isBrowser) {
    return new Promise<CodeExecutionResult>((resolve) => {
      let blobUrl = '';
      let worker: Worker | null = null;
      let timer: any = null;

      const cleanup = () => {
        if (timer) clearTimeout(timer);
        if (worker) {
          try {
            worker.terminate();
          } catch {}
          worker = null;
        }
        if (blobUrl) {
          try {
            URL.revokeObjectURL(blobUrl);
          } catch {}
          blobUrl = '';
        }
      };

      try {
        const blob = new Blob([BROWSER_WORKER_SCRIPT], { type: 'application/javascript' });
        blobUrl = URL.createObjectURL(blob);
        worker = new Worker(blobUrl);

        timer = setTimeout(() => {
          cleanup();
          resolve({
            success: false,
            output: [],
            testResults: [],
            error: 'Execution timeout (exceeded 3s)',
            friendlyError: TIMEOUT_FRIENDLY_ERROR,
            executionTimeMs: EXECUTION_TIMEOUT_MS,
          });
        }, EXECUTION_TIMEOUT_MS);

        worker.onmessage = (event) => {
          const res = event.data;
          cleanup();
          resolve({
            ...res,
            executionTimeMs: Math.round(performance.now() - startTime),
          });
        };

        worker.onerror = (err) => {
          cleanup();
          resolve({
            success: false,
            output: [],
            testResults: [],
            error: err.message || 'Worker runtime error',
            friendlyError: translateJsError(err.message || 'Runtime error'),
            executionTimeMs: Math.round(performance.now() - startTime),
          });
        };

        worker.postMessage(payload);
      } catch (e: any) {
        cleanup();
        resolve({
          success: false,
          output: [],
          testResults: [],
          error: e?.message || String(e),
          friendlyError: translateJsError(e?.message || 'Inisialisasi worker gagal'),
          executionTimeMs: Math.round(performance.now() - startTime),
        });
      }
    });
  }

  // Node.js environment (e.g. tsx / node:test runner)
  return new Promise<CodeExecutionResult>(async (resolve) => {
    let worker: any = null;
    let timer: any = null;

    const cleanup = () => {
      if (timer) clearTimeout(timer);
      if (worker) {
        try {
          worker.terminate();
        } catch {}
        worker = null;
      }
    };

    try {
      // Dynamic import to prevent bundler errors in browser build
      const nodeWorkerModuleName = 'node:worker_threads';
      const { Worker } = await import(/* @vite-ignore */ nodeWorkerModuleName);

      worker = new Worker(NODE_WORKER_SCRIPT, {
        eval: true,
        workerData: payload,
      });

      timer = setTimeout(() => {
        cleanup();
        resolve({
          success: false,
          output: [],
          testResults: [],
          error: 'Execution timeout (exceeded 3s)',
          friendlyError: TIMEOUT_FRIENDLY_ERROR,
          executionTimeMs: EXECUTION_TIMEOUT_MS,
        });
      }, EXECUTION_TIMEOUT_MS);

      worker.on('message', (res: any) => {
        cleanup();
        resolve({
          ...res,
          executionTimeMs: Math.round(performance.now() - startTime),
        });
      });

      worker.on('error', (err: any) => {
        cleanup();
        resolve({
          success: false,
          output: [],
          testResults: [],
          error: err?.message || 'Worker thread error',
          friendlyError: translateJsError(err?.message || 'Thread error'),
          executionTimeMs: Math.round(performance.now() - startTime),
        });
      });
    } catch (e: any) {
      cleanup();
      resolve({
        success: false,
        output: [],
        testResults: [],
        error: e?.message || String(e),
        friendlyError: translateJsError(e?.message || 'Gagal menjalankan thread'),
        executionTimeMs: Math.round(performance.now() - startTime),
      });
    }
  });
}
