const fs = require('fs');
const path = require('path');
const {
  mkdir,
  readdir,
  copyFile,
  readFile,
  writeFile,
} = require('fs/promises');
const dirBild = path.join(__dirname, 'project-dist');
const dirAssets = path.join(__dirname, './project-dist/assets');
const assetsOut = path.resolve(__dirname, 'assets');
const assetsIn = path.resolve(__dirname, 'project-dist', 'assets');
const htmlDist = path.resolve(__dirname, 'project-dist', 'index.html');
const htmlTemplate = path.resolve(__dirname, 'template.html');
const componentsFolder = path.resolve(__dirname, 'components');
const style = path.join(__dirname, 'styles');

fs.readdir(style, (error, files) => {
  if (error) console.log(`Error: ${error.message}\n`);

  files.forEach((file) => {
    if (path.extname(file) == '.css') {
      fs.readFile(
        path.join(__dirname, 'styles', file),
        'utf8',
        function (error, fileContent) {
          if (error) console.log(`Error: ${error.message}\n`);

          fs.mkdir(dirBild, { recursive: true }, (error) => {
            if (error) console.log(`Error: ${error.message}\n`);
          });
          fs.mkdir(dirAssets, { recursive: true }, (error) => {
            if (error) console.log(`Error: ${error.message}\n`);
          });
          fs.appendFile(
            path.join(__dirname, './project-dist/style.css'),
            fileContent,
            function (error) {
              if (error) console.log(`Error: ${error.message}\n`);
            },
          );
        },
      );
    }
  });

  async function createHTML(src, dest, template) {
    let data = await readFile(template, 'utf-8');
    const tags = data.match(/{{\w*}}/g);
    const components = await Promise.all(
      tags.map((tag) =>
        readFile(path.join(src, `${tag.slice(2, -2)}.html`), 'utf-8'),
      ),
    );

    for (let i = 0; i < tags.length; i++) {
      if (
        path.extname(path.join(src, `${tags[i].slice(2, -2)}.html`)) === '.html'
      ) {
        data = data.replace(tags[i], components[i]);
      }
    }

    writeFile(dest, data);
  }

  createHTML(componentsFolder, htmlDist, htmlTemplate);
});

fs.readdir(__dirname, (error, files) => {
  if (error) console.log(`Error: ${error.message}\n`);

  files.forEach((file) => {
    if (path.extname(file) == '.html') {
      fs.readFile(
        path.join(__dirname, file),
        'utf8',
        function (error, fileContent) {
          if (error) console.log(`Error: ${error.message}\n`);

          fs.appendFile(
            path.join(__dirname, './project-dist/index.html'),
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

async function assetsCopy(src, dest) {
  const objects = await readdir(src, { withFileTypes: true });

  for (const obj of objects) {
    if (!obj.isFile()) {
      await mkdir(path.join(dest, obj.name), { recursive: true });

      const files = await readdir(path.join(src, obj.name), {
        withFileTypes: true,
      });

      for (const file of files) {
        copyFile(
          path.join(src, obj.name, `${file.name}`),
          path.join(dest, obj.name, `${file.name}`),
        );
      }
    } else {
      await copyFile(
        path.join(src, `${obj.name}`),
        path.join(dest, `${obj.name}`),
      );
    }
  }
}

assetsCopy(assetsOut, assetsIn);

console.log('Success!');
