const fs = require('fs');
const path = require('path');

const mainDir = path.join(__dirname, 'files');
const copyDir = path.join(__dirname, 'files-copy');

fs.readdir(mainDir, (error, files) => {
  if (error) {
    console.error(error);
  }

  fs.rm(
    path.join(__dirname, 'files-copy'),
    { recursive: true, force: true },
    (error) => {
      if (error) console.log('');

      files.forEach((file) => {
        fs.readFile(
          path.join(__dirname, 'files', file),
          'utf8',
          function (error, fileContent) {
            if (error) console.log(`Error: ${error.message}\n`);

            fs.mkdir(copyDir, { recursive: true }, (error) => {
              if (error) console.log(`Error: ${error.message}\n`);
            });

            fs.writeFile(
              path.join(__dirname, 'files-copy', file),
              fileContent,
              function (error) {
                if (error) console.log(`Error: ${error.message}\n`);
              },
            );
          },
        );
      });
    },
  );
});

console.log('Success!');
