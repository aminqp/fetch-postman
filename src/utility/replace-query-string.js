// replace query string with string inject
const replaceQueryStrings = (params = [], url) => {
  let newUrl = params.reduce((acc, nextParam) => acc.replace(`:${nextParam}`, `\${${nextParam}}`), url);

  if (newUrl.match(/\?/)) {
    // eslint-disable-next-line prefer-destructuring
    newUrl = newUrl.split('?')[0];
  }

  return newUrl;
};

module.exports = replaceQueryStrings;
