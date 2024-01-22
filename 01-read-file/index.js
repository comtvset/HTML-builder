const fs = require('fs');
const path = require('path');

const file = 'text.txt';
const filePath = path.join(__dirname, file);
const readStream = fs.createReadStream(filePath, 'utf-8');

readStream.on('data', (chunk) => process.stdout.write(chunk));
