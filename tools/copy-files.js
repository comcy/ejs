const fs = require('fs');

fs.mkdirSync('dist');

let resizable = fs.readFileSync('./package.json').toString();
fs.writeFileSync('./dist/package.json', resizable);

// let indexjs = fs.readFileSync('./src/index.js').toString();
// fs.writeFileSync('./dist/index.js', indexjs);

let readme = fs.readFileSync('./README.md').toString();
fs.writeFileSync('./dist/README.md', readme);
