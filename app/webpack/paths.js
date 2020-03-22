const path = require('path');

module.exports = {
  root: path.resolve(__dirname, '../'),
  outputPath: path.resolve(__dirname, '../', 'build'),
  clientEntryPath: path.resolve(__dirname, '../', 'src/client.js'),
  templatePath: path.resolve(__dirname, '../', 'src/template.html'),
  imagesFolder: 'images',
  fontsFolder: 'fonts',
};
