const fs = require('fs');

const createDirectory = async (path) => {
  if (fs.existsSync(path)) {
    console.log(' ##--> directory exists -> ');
    console.log(path);
    console.log('\n\n');
    return true;
  }
  return fs.mkdir(path, (err) => {
    if (err) {
      console.log(' ##--> creating directory was error -> ');
      console.log(err);
      console.log(path);
      console.log('\n\n');
      return false;
    }
    console.log(' ##--> dir : ', path);
    return true;
  });
};

module.exports = createDirectory;
