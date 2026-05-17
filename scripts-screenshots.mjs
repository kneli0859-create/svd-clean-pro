#!/usr/bin/env node
// Mobile + desktop screenshots via puppeteer-core driving the snap chromium.
// Writes to a snap-accessible dir first, then copies to /root/screenshots/.

import puppeteer from 'puppeteer-core';
import { copyFileSync, mkdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const SNAP_DIR = join(homedir(), 'snap/chromium/common/screenshots');
const OUT_DIR = '/root/screenshots';
mkdirSync(SNAP_DIR, { recursive: true });
mkdirSync(OUT_DIR, { recursive: true });

const BASE = 'https://app.svd-clean.de';

const pages = [
  { name: 'home',      url: `${BASE}/` },
  { name: 'kalkulator',url: `${BASE}/kalkulator` },
  { name: 'booking',   url: `${BASE}/booking` },
  { name: 'demo',      url: `${BASE}/demo` },
];

async function shot(page, name, viewport, label) {
  await page.setViewport(viewport);
  await page.goto(`${BASE}/`, { waitUntil: 'domcontentloaded', timeout: 30_000 }); // warmup connection
}

const browser = await puppeteer.launch({
  executablePath: '/snap/bin/chromium',
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--no-zygote',
  ],
});

const viewports = {
  mobile: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
};

for (const variant of ['mobile', 'desktop']) {
  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport(viewports[variant]);
    try {
      await page.goto(p.url, { waitUntil: 'networkidle2', timeout: 45_000 });
      // Give animations a moment
      await new Promise((r) => setTimeout(r, 1200));
      const snapFile = join(SNAP_DIR, `${p.name}-${variant}.png`);
      await page.screenshot({ path: snapFile, fullPage: true });
      copyFileSync(snapFile, join(OUT_DIR, `${p.name}-${variant}.png`));
      console.log(`✓ ${p.name}-${variant}`);
    } catch (e) {
      console.error(`✗ ${p.name}-${variant}:`, e?.message ?? e);
    } finally {
      await page.close();
    }
  }
}

await browser.close();
console.log('Done.');
