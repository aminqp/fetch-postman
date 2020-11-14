const { SERVER_URL } = require('../constans');

const findRequests = (parentId, REQUESTS) => {
  const tmp = [];

  // collect all request for current directory
  const filteredRequestsById = REQUESTS.filter(
    (req) => req.folder === parentId
  );

  // create request object for current node and push to the stack
  // eslint-disable-next-line array-callback-return
  filteredRequestsById.map((req) => {
    tmp.push({
      absolute_url: req.url.replace(SERVER_URL, ''),
      method: req.method.toLowerCase(),
      name: req.name,
      path_variable: req.pathVariableData,
      request: req,
      url: req.url
    });
  });
  return tmp;
};

module.exports = findRequests;
