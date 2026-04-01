#!/usr/bin/env node
/**
 * Asset Checker - 檢查圖片資源完成度
 * Usage: node scripts/check-assets.js
 */
const fs = require('fs');
const path = require('path');

const manifest = JSON.parse(
  fs.readFileSync(path.join(__dirname, '..', 'config', 'asset-manifest.json'), 'utf8')
);

let total = 0, found = 0, missing = [];

function checkFile(entry) {
  total++;
  const filePath = path.join(__dirname, '..', entry.file);
  if (fs.existsSync(filePath)) {
    found++;
  } else {
    missing.push({ id: entry.id, file: entry.file, description: entry.description || entry.outfit || '' });
  }
}

// Check routes
for (const [routeName, route] of Object.entries(manifest.routes)) {
  for (const [chKey, chapter] of Object.entries(route.chapters)) {
    for (const scene of chapter.scenes) {
      checkFile(scene);
    }
  }
}

// Check characters
checkFile(manifest.characters.protagonist);
for (const charGroup of ['kaoru', 'amy', 'yuki', 'rebecca']) {
  for (const portrait of manifest.characters[charGroup]) {
    checkFile(portrait);
  }
}

// Check UI
for (const ui of manifest.ui) {
  checkFile(ui);
}

console.log(`\n=== 小小4J長大了 - 資源檢查報告 ===\n`);
console.log(`完成: ${found}/${total} (${Math.round(found/total*100)}%)`);
console.log(`缺少: ${missing.length} 張\n`);

if (missing.length > 0) {
  console.log('--- 缺少的資源 ---');
  for (const m of missing) {
    console.log(`  [${m.id}] ${m.file} - ${m.description}`);
  }
}
console.log('');
