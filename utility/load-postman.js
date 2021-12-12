const axios = require('axios');

// call postman api async
const loadPostman = (url) =>
  new Promise((resolve, reject) => {
    console.log('\n #####------------> calling postman ');
    axios
      .get(url)
      .then((res) => {
        console.log('\n #####------------> postman received -> ', res.status);
        resolve(res.data);
      })
      .catch((error) => {
        console.log('\n #####------------> postman call failed ');
        console.log('\n #####------------> status -> ', error.code);
        console.log('\n #####------------> going local ');
        reject();
      });
  });

module.exports = loadPostman;
