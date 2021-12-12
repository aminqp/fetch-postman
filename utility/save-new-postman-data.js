const fs = require('fs');

const {
  POSTMAN_LOCAL_PATH
} = require('../constans');

const saveNewPostmanData = async (newPostmanData) => fs.writeFile(
  POSTMAN_LOCAL_PATH,
  JSON.stringify(newPostmanData),
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(` #####------------> ${POSTMAN_LOCAL_PATH} added `);
    }
  }
);

module.exports = saveNewPostmanData;
