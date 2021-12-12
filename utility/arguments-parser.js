/* eslint-disable array-callback-return */

const argsParser = () => {
  const processArgs = {};
  process.argv.slice(2).map((element) => {
    const matches = element.match('--([a-zA-Z0-9]+)=(.*)');
    if (matches) {
      processArgs[matches[1]] = matches[2]
        .replace(/^['"]/, '').replace(/['"]$/, '');
    }
  });
  return processArgs;
};

module.exports = argsParser;
