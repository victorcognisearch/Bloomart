import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const IMAGES_DIR = path.resolve('public/images');

// Phase 1A: Convert JPGs to WebP and rename
const conversions = [
  ['dans-copii/DSC07332-scaled-down-website.jpg', 'dans-copii/dans-copii-01.webp'],
  ['dans-copii/DSC07369-scaled-4-x-5-website.jpg', 'dans-copii/dans-copii-02.webp'],
  ['dans-copii/DSC07435-reworked-website.jpg', 'dans-copii/dans-copii-03.webp'],
  ['dans-copii/DSC07468-scaled-down-1-x-1.jpg', 'dans-copii/dans-copii-04.webp'],
  ['dans-copii/DSC07520-scaled-down-website-1000px-x-1100px.jpg', 'dans-copii/dans-copii-05.webp'],
  ['dans-copii/DSC07532-scade-down-resized-4-x-5-website.jpg', 'dans-copii/dans-copii-06.webp'],
  ['grupa-adulti/duo-tango-scaled-down-4x5-1.jpg', 'grupa-adulti/grupa-adulti-tango.webp'],
  ['nunta/C.M.-2103-scaled-down-4x5-1.jpg', 'nunta/nunta-01.webp'],
  ['nunta/C.M.-2113-scaled-down-4x5-1.jpg', 'nunta/nunta-02.webp'],
  ['nunta/C.M.-2188-scaled-down-3x2-1.jpg', 'nunta/nunta-03.webp'],
];

// Phase 1B: Rename UUID/camera-code webp files
const renameGroups = [
  { dir: 'cantonament-6am', prefix: 'camp-6am' },
  { dir: 'cantonament-inviorare', prefix: 'camp-inviorare' },
  { dir: 'cantonament-team-mach', prefix: 'camp-team' },
];

async function convertJpgs() {
  console.log('=== Converting JPGs to WebP ===');
  for (const [src, dest] of conversions) {
    const srcPath = path.join(IMAGES_DIR, src);
    const destPath = path.join(IMAGES_DIR, dest);
    if (!fs.existsSync(srcPath)) {
      console.log(`  SKIP (not found): ${src}`);
      continue;
    }
    await sharp(srcPath).webp({ quality: 80 }).toFile(destPath);
    fs.unlinkSync(srcPath);
    console.log(`  ${src} -> ${dest}`);
  }
}

async function renameFiles() {
  console.log('\n=== Renaming UUID/camera-code files ===');
  for (const { dir, prefix } of renameGroups) {
    const dirPath = path.join(IMAGES_DIR, dir);
    if (!fs.existsSync(dirPath)) {
      console.log(`  SKIP dir: ${dir}`);
      continue;
    }
    const files = fs.readdirSync(dirPath)
      .filter(f => f.endsWith('.webp'))
      .sort();

    console.log(`  ${dir}/ (${files.length} files):`);
    for (let i = 0; i < files.length; i++) {
      const newName = `${prefix}-${String(i + 1).padStart(2, '0')}.webp`;
      if (files[i] === newName) {
        console.log(`    ${files[i]} (already named)`);
        continue;
      }
      fs.renameSync(
        path.join(dirPath, files[i]),
        path.join(dirPath, newName)
      );
      console.log(`    ${files[i]} -> ${newName}`);
    }
  }
}

await convertJpgs();
await renameFiles();
console.log('\nDone!');
