import { execSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

const inputVideo = path.join(process.cwd(), 'public', 'first.mp4');
const outputDir = path.join(process.cwd(), 'public', 'frames');

// Ensure output dir is clean
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
} else {
  const existingFiles = fs.readdirSync(outputDir);
  for (const file of existingFiles) {
    fs.unlinkSync(path.join(outputDir, file));
  }
}

console.log('Starting WebP frame extraction from first.mp4...');
console.log('Using FFmpeg at:', ffmpegPath);

// Extract WebP frames at 24fps with 1280px width (quality 80 for crisp fidelity & fast loading)
const cmd = `"${ffmpegPath}" -y -i "${inputVideo}" -vf "scale=1280:-1,fps=24" -c:v libwebp -quality 80 "${outputDir}/frame_%03d.webp"`;

try {
  execSync(cmd, { stdio: 'inherit' });
  const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.webp'));
  console.log(`SUCCESS! Extracted ${files.length} WebP frames from first.mp4 into ${outputDir}`);
} catch (err) {
  console.error('Extraction failed:', err);
}
