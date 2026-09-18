import fs from 'node:fs';
import path from 'node:path';

const files = {
  'frontend/public/images/brand/robofounders-logo-new.png': '1CDfFclrqpK9tUQ_hAAGN1bXwL0R6oarx',
  'frontend/public/images/products/robot-hand-new.jpg': '1mCCyt5GD0wwAkaNZnKyxfez6dQSw2zFY',
  'frontend/public/images/home/startups-jungle.jpg': '1CyY-DK7AZOeDWHtv5QvJvh8Fid-iB0Je',
  'frontend/public/images/events/news-event-new.jpg': '1fHaSRaftHMBuXmJiz4Z44cw8xBXF0Ss4',
  'frontend/public/images/home/contact-new.jpg': '1zDYbfRePNSpJIPOR7aKe4792mjPxyqMk'
};

async function downloadFile(destPath, fileId) {
  const url = `https://drive.usercontent.google.com/download?id=${fileId}&export=download`;
  console.log(`Downloading ${destPath} from ID ${fileId}...`);
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.writeFileSync(destPath, buffer);
  console.log(`Saved ${destPath} (${buffer.length} bytes)`);
}

async function main() {
  for (const [dest, id] of Object.entries(files)) {
    try {
      await downloadFile(dest, id);
    } catch (e) {
      console.error(`Error downloading ${dest}:`, e);
    }
  }
}

main();
