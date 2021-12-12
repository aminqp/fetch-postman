const fs = require('fs');
const path = require('path');

// define file reader
const openFile = async (target) => fs.readFileSync(path.join(fs.realpathSync(process.cwd()), target), 'utf8');

module.exports = openFile;
