import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const out = 'promotion/2026-11-22/content';
await fs.mkdir(out, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1200, height: 1050 },
  deviceScaleFactor: 1,
  locale: 'zh-TW',
  colorScheme: 'light'
});

async function open(page, url) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 120000 });
  await page.waitForSelector('[data-action="mode"]', { timeout: 120000 });
}

async function startGame(page, mode) {
  await page.locator(`[data-action="mode"][data-value="${mode}"]`).click();
  await page.locator('[data-action="teams"][data-value="1"]').click();
  await page.locator('#count').selectOption('6');
  await page.locator('#seconds').selectOption('0');
  await page.locator('#manual').check();
  await page.locator('[data-action="start"]').click();
  await page.waitForSelector('.game-wrap', { timeout: 120000 });
  await page.waitForTimeout(800);
}

async function captureGame(url, mode, filename, interact) {
  const page = await context.newPage();
  await open(page, url);
  await startGame(page, mode);
  await interact(page);
  await page.locator('.game-wrap').screenshot({
    path: `${out}/${filename}`,
    type: 'jpeg',
    quality: 92
  });
  await page.close();
}

// 1. 字詞競技場：作答後顯示正解與解析
await captureGame(
  'https://jerryyang2.github.io/nani-grade-six-mondrian/?grade=1&semester=upper',
  'words',
  '01-word-game-explanation.jpg',
  async page => {
    await page.locator('.answer').first().click();
    await page.waitForSelector('.reveal-bar', { timeout: 30000 });
  }
);

// 2. 記憶配對：實際翻牌畫面
await captureGame(
  'https://jerryyang2.github.io/kangxuan-chinese-arena/?grade=1&semester=upper',
  'memory',
  '02-memory-game.jpg',
  async page => {
    await page.locator('.memory-card').first().click();
    await page.waitForTimeout(300);
  }
);

// 3. 閱讀理解：選項、正解與原因說明
await captureGame(
  'https://jerryyang2.github.io/hanlin-chinese-arena/?grade=1&semester=upper',
  'story',
  '03-reading-explanation.jpg',
  async page => {
    await page.locator('.answer').first().click();
    await page.waitForSelector('.reveal-bar', { timeout: 30000 });
  }
);

// 4. 教師題庫：可作為備課、學習單與答案解析素材
{
  const page = await context.newPage();
  await open(page, 'https://jerryyang2.github.io/nani-grade-six-mondrian/?grade=1&semester=upper');
  await page.locator('[data-action="bank"]').click();
  await page.waitForSelector('#modal[open]', { timeout: 30000 });
  await page.locator('#bank-type').selectOption('story');
  await page.waitForTimeout(500);
  await page.locator('#modal').screenshot({
    path: `${out}/04-teacher-bank-worksheet.jpg`,
    type: 'jpeg',
    quality: 92
  });
  await page.close();
}

await browser.close();
