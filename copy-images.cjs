const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/new/.gemini/antigravity/brain/bbbc1618-ff06-43e2-a920-7d02f944b7bf';
const destDir = path.join(__dirname, 'public/assets/images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const fileMap = {
  // MEN
  'media__1773003679543.jpg': 'men-blue-shirt.jpg',
  'media__1773003679785.jpg': 'men-native.jpg',
  'media__1773003679880.jpg': 'men-car.jpg',
  'media__1773003821272.jpg': 'men-black.jpg',
  // KID
  'media__1773003679873.jpg': 'kid-striped.jpg',
  'media__1773003838823.jpg': 'kid-dress.jpg',
  'media__1773003838982.jpg': 'kid-backpack.jpg',
  'media__1773003839303.jpg': 'kid-hoodie.jpg',
  'media__1773003839506.jpg': 'kid-baby.jpg',
  'media__1773003878243.jpg': 'kid-fedora.jpg',
  'media__1773003878244.jpg': 'kid-cap.jpg',
  // WOMEN
  'media__1773003878381.jpg': 'women-hat.jpg',
  'media__1773003878394.jpg': 'women-shiny.jpg',
  'media__1773003910724.jpg': 'women-black.jpg',
  'media__1773003910740.jpg': 'women-shopping.jpg'
};

for (const [srcName, destName] of Object.entries(fileMap)) {
  const srcPath = path.join(srcDir, srcName);
  const destPath = path.join(destDir, destName);
  
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcName} to ${destName}`);
  } else {
    console.error(`File not found: ${srcPath}`);
  }
}
