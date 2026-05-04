const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDirs = [
  path.join(__dirname, 'static'),
  path.join(__dirname, 'docs')
];

async function processDirectory(directory) {
  if (!fs.existsSync(directory)) {
    console.log(`Directory ${directory} does not exist. Skipping.`);
    return;
  }
  
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else if (file.match(/\.(png|jpe?g)$/i)) {
      await optimizeImage(fullPath);
    }
  }
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const tempPath = `${filePath}.tmp`;
  
  try {
    const originalSize = fs.statSync(filePath).size;
    let sharpInstance = sharp(filePath);
    
    if (ext === '.png') {
      sharpInstance = sharpInstance.png({ quality: 75, effort: 8, compressionLevel: 9 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: 80, mozjpeg: true });
    }
    
    await sharpInstance.toFile(tempPath);
    const optimizedSize = fs.statSync(tempPath).size;
    
    if (optimizedSize < originalSize) {
      fs.renameSync(tempPath, filePath);
      console.log(`\u2705 Optimized: ${filePath} (${(originalSize / 1024).toFixed(2)} KB -> ${(optimizedSize / 1024).toFixed(2)} KB)`);
    } else {
      fs.unlinkSync(tempPath);
      console.log(`\u23E9 Skipped: ${filePath} (Already optimized)`);
    }
  } catch (error) {
    console.error(`\u274C Error optimizing ${filePath}:`, error);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

console.log('Starting image optimization...');
Promise.all(targetDirs.map(dir => processDirectory(dir))).then(() => {
  console.log('Image optimization complete.');
});
