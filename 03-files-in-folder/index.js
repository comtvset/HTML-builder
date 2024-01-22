const path = require('path');
const { readdir, stat } = require('fs/promises');

const folder = 'secret-folder';
const secretFolder = path.join(__dirname, folder);

async function readDir(pathDir) {
  const files = await readdir(pathDir, { withFileTypes: true });
  for (const file of files) {
    if (file.isFile()) {
      const stats = await stat(path.join(pathDir, file.name));
      process.stdout.write(
        `${path.parse(file.name).name} - ${path
          .extname(file.name)
          .slice(1)} - ${(stats.size / 1024).toFixed(3)} 'kb'\n`,
      );
    }
  }
}

readDir(secretFolder);
