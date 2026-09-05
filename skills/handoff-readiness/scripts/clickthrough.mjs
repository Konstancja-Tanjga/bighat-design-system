#!/usr/bin/env node
/**
 * Walks the running application and writes the evidence for gates 4, 7 and 8.
 *
 * Every route, in every theme, at every width from `.claude/handoff.json`: one
 * screenshot each, plus a blank-page check. It uses whatever Chrome is already
 * on the machine rather than installing a driver — the point is evidence a
 * person looks at, and a headless screenshot is exactly that.
 *
 * It deliberately does not start the dev server. A script that starts and
 * stops the application hides the two failures worth seeing: one that will not
 * start, and one that only fails on the second run.
 *
 *   node clickthrough.mjs [--config path] [--out dir]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { resolve, join } from 'node:path';
import zlib from 'node:zlib';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(name);
  return i === -1 ? fallback : args[i + 1];
};

const configPath = resolve(flag('--config', '.claude/handoff.json'));
if (!existsSync(configPath)) {
  console.error(`No config at ${configPath}. references/config.md has the shape.`);
  process.exit(2);
}
const config = JSON.parse(readFileSync(configPath, 'utf8'));

const CHROME = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].find((p) => existsSync(p));

if (!CHROME) {
  console.error('No Chrome or Chromium found. Gates 4, 7 and 8 are `not checked`.');
  process.exit(3);
}

const base = (config.commands?.devUrl ?? 'http://localhost:5173').replace(/\/$/, '');
const routes = config.routes ?? [{ name: 'Home', path: '/' }];
const themes = config.themes ?? [{ name: 'default', query: '' }];
const widths = config.widths ?? [1400];
const outDir = resolve(flag('--out', config.screenshots ?? '.handoff/shots'));
mkdirSync(outDir, { recursive: true });

/* The server has to be up: this script reports on a running application, and
   a connection refused is a finding rather than a crash. */
try {
  execFileSync('curl', ['-sfo', '/dev/null', base], { timeout: 10_000 });
} catch {
  console.error(`Nothing answering at ${base}. Start the dev server first (${config.commands?.dev ?? 'npm run dev'}).`);
  process.exit(4);
}

/**
 * Is the page effectively blank?
 *
 * Reads the PNG's own pixels rather than the DOM, because the failure this
 * catches is precisely the one the DOM denies: elements present, painted at
 * opacity 0, or painted in the background colour. Samples a grid and counts
 * pixels that differ from the corner colour; a page with type on it clears
 * this threshold by an order of magnitude.
 */
function inkFraction(file) {
  const data = readFileSync(file);
  let pos = 8;
  let width = 0;
  let height = 0;
  const parts = [];
  while (pos < data.length) {
    const length = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    if (type === 'IHDR') {
      width = data.readUInt32BE(pos + 8);
      height = data.readUInt32BE(pos + 12);
    }
    if (type === 'IDAT') parts.push(data.subarray(pos + 8, pos + 8 + length));
    pos += 12 + length;
  }
  const raw = zlib.inflateSync(Buffer.concat(parts));
  const stride = width * 4 + 1;
  const at = (x, y) => {
    const i = y * stride + 1 + x * 4;
    return [raw[i], raw[i + 1], raw[i + 2]];
  };
  const ground = at(2, 2);
  let sampled = 0;
  let inked = 0;
  for (let y = 4; y < height; y += 5) {
    for (let x = 4; x < width; x += 5) {
      const [r, g, b] = at(x, y);
      sampled += 1;
      const delta = Math.abs(r - ground[0]) + Math.abs(g - ground[1]) + Math.abs(b - ground[2]);
      if (delta > 24) inked += 1;
    }
  }
  return sampled ? inked / sampled : 0;
}

/**
 * How much content the route itself renders.
 *
 * The ink check reads the whole viewport, and on a site with a header and a
 * footer the whole viewport is never blank — which is how the first run of
 * this script called an empty route "ok". So the route is also measured where
 * its own content goes: inside `<main>` when there is one, and inside the body
 * with the chrome removed when there is not.
 */
function contentLength(url) {
  let dom = '';
  try {
    dom = execFileSync(
      CHROME,
      ['--headless=new', '--disable-gpu', '--virtual-time-budget=20000', '--dump-dom', url],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: 90_000 },
    );
  } catch {
    return null;
  }

  const main = dom.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  const body = dom.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  let region = main ? main[1] : (body ? body[1] : dom);
  if (!main) region = region.replace(/<(header|footer|nav)\b[\s\S]*?<\/\1>/gi, '');

  return region
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim().length;
}

const findings = [];
let shots = 0;

for (const route of routes) {
  /* Once per route: the content measure does not change with the width, and a
     DOM dump per width would triple the run for the same answer. */
  const content = contentLength(`${base}${route.path}${themes[0]?.query ?? ''}`);
  if (content === null) {
    findings.push(`${route.name}: the page could not be read at all — ${route.path}`);
  } else if (content < (config.minContentChars ?? 80)) {
    findings.push(
      `${route.name}: renders ${content} characters of its own content — the route is empty inside the page chrome (${route.path})`,
    );
  }

  for (const theme of themes) {
    for (const width of widths) {
      const url = `${base}${route.path}${theme.query ?? ''}`;
      const slug = `${route.name}-${theme.name}-${width}`.replace(/[^a-zA-Z0-9-]/g, '_');
      const file = join(outDir, `${slug}.png`);

      execFileSync(
        CHROME,
        [
          '--headless=new',
          '--disable-gpu',
          '--hide-scrollbars',
          `--window-size=${width},${config.shotHeight ?? 1400}`,
          '--virtual-time-budget=20000',
          `--screenshot=${file}`,
          url,
        ],
        { stdio: 'ignore', timeout: 90_000 },
      );

      if (!existsSync(file) || statSync(file).size === 0) {
        findings.push(`${slug}: no screenshot was produced — the page did not render`);
        continue;
      }

      shots += 1;
      const ink = inkFraction(file);
      const label = `${route.name} · ${theme.name} · ${width}px`;
      if (ink < 0.005) {
        findings.push(`${label}: rendered area is effectively blank (${(ink * 100).toFixed(2)}% ink) — ${file}`);
      }
      console.log(`${ink < 0.005 ? 'BLANK' : '  ok '}  ${label.padEnd(38)} ${file}`);
    }
  }
}

console.log(`\n${shots} screenshot${shots === 1 ? '' : 's'} in ${outDir}`);

if (findings.length) {
  console.error(`\n${findings.length} to look at:\n`);
  for (const finding of findings) console.error(`  ${finding}`);
  console.error('\nA blank page is invisible in the source and in the tests. Open the file.');
  process.exit(1);
}

console.log('No blank pages. The screenshots are the gate — read them.');
