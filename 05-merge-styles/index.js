const fs = require('fs');
const path = require('path');
const style = path.join(__dirname, 'styles');

fs.readdir(style, (error, files) => {
  if (error) console.log(`Error: ${error.message}\n`);

  fs.writeFile(path.join(__dirname, './project-dist/bundle.css'), '', () => {});

  files.forEach((file) => {
    if (path.extname(file) == '.css') {
      fs.readFile(
        path.join(__dirname, 'styles', file),
        'utf8',
        function (error, fileContent) {
          if (error) console.log(`Error: ${error.message}\n`);

          fs.appendFile(
            path.join(__dirname, './project-dist/bundle.css'),
            fileContent,
            function (error) {
              if (error) console.log(`Error: ${error.message}\n`);
            },
          );
        },
      );
    }
  });
});

console.log('Success!');
