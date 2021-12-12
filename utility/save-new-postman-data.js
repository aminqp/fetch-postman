const fs = require('fs');

const saveNewPostmanData = async (newPostmanData) => {
  return await fs.writeFile(
    `./postman_local.json`,
    JSON.stringify(newPostmanData),
    (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(' #####------------> postman_local.json added ');
      }
    },
  );
};

module.exports = saveNewPostmanData;
