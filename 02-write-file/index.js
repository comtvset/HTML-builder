const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const file = 'text.txt';
const filePath = path.join(__dirname, file);

let letter = '';

stdout.write('Write something: \n');
stdin.on('data', (data) => {
  if (data.toString().toLowerCase().trim() === 'exit') {
    stdout.write('See you...');
    exit();
  } else {
    letter = data.toString();
    stdout.write('Something else? \n');
    fs.appendFile(filePath, letter, (err) => {
      if (err) console.log(err);
    });
  }
});

process.on('SIGINT', () => {
  stdout.write('See you...');
  exit();
});
