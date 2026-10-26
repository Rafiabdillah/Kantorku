import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

function createCrcTable() {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      if (c & 1) {
        c = 0xedb88320 ^ (c >>> 1);
      } else {
        c = c >>> 1;
      }
    }
    table[n] = c;
  }
  return table;
}

const crcTable = createCrcTable();

function crc32(buf: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type: string, data: Buffer): Buffer {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const typeAndData = Buffer.concat([typeBuf, data]);

  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(typeAndData), 0);

  return Buffer.concat([len, typeAndData, crc]);
}

/**
 * Generates an RGBA PNG with given dimensions and brand graphics:
 * A rich deep slate navy background (#0f172a), an emerald rounded briefcase/badge (#10b981),
 * a golden tie/accent (#f59e0b), and letter "K".
 */
export function generateBrandPng(width: number, height: number, maskable: boolean = false): Buffer {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0; // Deflate
  ihdrData[11] = 0; // Filter method 0
  ihdrData[12] = 0; // Non-interlaced
  const ihdrChunk = makeChunk('IHDR', ihdrData);

  // Raw image data with 1 byte filter (0 = None) before each scanline
  const scanlineLength = 1 + width * 4;
  const rawData = Buffer.alloc(scanlineLength * height);

  const centerX = width / 2;
  const centerY = height / 2;
  const safeRadius = (width / 2) * (maskable ? 0.72 : 0.88);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * scanlineLength;
    rawData[rowOffset] = 0; // filter None

    for (let x = 0; x < width; x++) {
      const pixelOffset = rowOffset + 1 + x * 4;
      const dx = x - centerX;
      const dy = y - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Default deep slate background: #0f172a (15, 23, 42)
      let r = 15;
      let g = 23;
      let b = 42;
      let a = 255;

      if (!maskable && dist > (width / 2) - 2) {
        // Rounded icon corners for non-maskable
        const cornerDist = Math.max(Math.abs(dx), Math.abs(dy));
        if (cornerDist > (width / 2) - 8) {
          a = 0;
        }
      }

      // Circular badge inner glow: emerald #10b981 (16, 185, 129)
      if (dist < safeRadius) {
        const t = dist / safeRadius;
        // Gradient from bright emerald center (#059669) to deeper teal
        r = Math.round(16 * (1 - t * 0.4) + 15 * (t * 0.4));
        g = Math.round(185 * (1 - t * 0.3) + 140 * (t * 0.3));
        b = Math.round(129 * (1 - t * 0.2) + 110 * (t * 0.2));

        // Center briefcase symbol (rectangle + handle)
        const boxW = safeRadius * 0.9;
        const boxH = safeRadius * 0.65;
        const inBox = Math.abs(dx) <= boxW && Math.abs(dy - safeRadius * 0.1) <= boxH;

        if (inBox) {
          // Briefcase dark slate body
          r = 30;
          g = 41;
          b = 59;

          // Briefcase gold buckle / clasp
          if (Math.abs(dx) <= safeRadius * 0.22 && Math.abs(dy - safeRadius * 0.05) <= safeRadius * 0.15) {
            r = 245;
            g = 158;
            b = 11;
          }
        }

        // Briefcase handle
        const handleW = safeRadius * 0.38;
        const handleH = safeRadius * 0.22;
        const inHandleOuter = Math.abs(dx) <= handleW && dy >= -safeRadius * 0.75 && dy <= -safeRadius * 0.45;
        const inHandleInner = Math.abs(dx) <= handleW * 0.65 && dy >= -safeRadius * 0.68 && dy <= -safeRadius * 0.45;
        if (inHandleOuter && !inHandleInner) {
          r = 245;
          g = 158;
          b = 11;
        }
      }

      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressedData = zlib.deflateSync(rawData, { level: 9 });
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Write PWA PNG files
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generateBrandPng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generateBrandPng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generateBrandPng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generateBrandPng(180, 180, false));

// Write Brand SVG icon
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="110" fill="#0f172a" />
  <circle cx="256" cy="256" r="210" fill="#059669" />
  <!-- Briefcase Handle -->
  <path d="M 200 140 C 200 115 312 115 312 140" fill="none" stroke="#f59e0b" stroke-width="20" stroke-linecap="round" />
  <!-- Briefcase Body -->
  <rect x="110" y="180" width="292" height="200" rx="24" fill="#1e293b" stroke="#334155" stroke-width="8" />
  <!-- Golden Clasp -->
  <rect x="232" y="220" width="48" height="56" rx="8" fill="#f59e0b" />
  <circle cx="256" cy="248" r="6" fill="#78350f" />
  <!-- Letter K Accent -->
  <path d="M 230 200 L 230 360 M 285 200 L 235 280 L 288 360" fill="none" stroke="#ffffff" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity="0.15" />
</svg>`;
fs.writeFileSync(path.join(publicDir, 'icon.svg'), svgContent, 'utf-8');

console.log('✅ Generated PWA PNG and SVG assets in /public successfully:');
console.log(' - public/pwa-192x192.png');
console.log(' - public/pwa-512x512.png');
console.log(' - public/pwa-maskable-512x512.png');
console.log(' - public/apple-touch-icon.png');
console.log(' - public/icon.svg');
