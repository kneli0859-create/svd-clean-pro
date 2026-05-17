#!/usr/bin/env node
// Mobile checklist audit — runs a few DOM probes in the headless browser.
import puppeteer from 'puppeteer-core';

const BASE = 'https://app.svd-clean.de';
const pages = ['/', '/kalkulator', '/booking', '/demo'];

const browser = await puppeteer.launch({
  executablePath: '/snap/bin/chromium',
  headless: 'new',
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
});

const results = [];

for (const path of pages) {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 45_000 });
  await new Promise((r) => setTimeout(r, 800));

  const audit = await page.evaluate(() => {
    const html = document.documentElement;
    const body = document.body;
    const horizontalOverflow = html.scrollWidth - html.clientWidth;
    const bodyOverflow = body.scrollWidth - body.clientWidth;

    // Touch targets — anything clickable should be >= 44x44
    const clickables = Array.from(
      document.querySelectorAll('a, button, [role="button"], input[type=button], input[type=submit]'),
    );
    const undersized = clickables
      .map((el) => {
        const r = el.getBoundingClientRect();
        const tag = el.tagName.toLowerCase();
        const txt = (el.textContent || '').trim().slice(0, 40);
        return { tag, w: Math.round(r.width), h: Math.round(r.height), txt };
      })
      .filter((it) => (it.w > 0 && it.h > 0) && (it.w < 36 || it.h < 36));

    return {
      pageWidth: html.clientWidth,
      docScrollWidth: html.scrollWidth,
      horizontalOverflow,
      bodyOverflow,
      clickableCount: clickables.length,
      undersizedCount: undersized.length,
      undersizedSample: undersized.slice(0, 8),
    };
  });

  results.push({ path, ...audit });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
