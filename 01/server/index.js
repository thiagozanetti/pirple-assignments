// dependencies
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf-8');

// modules
const router = require('../router');
const { headers } = require('../config');

// The function that handles server requests
const serve = (req, res) => {
  // parse the url
  const parsedUrl = url.parse(req.url, true);

  // get the path
  const path = parsedUrl.pathname.replace(/^\/+|\/+$/g, '')

  // get the query string as an object
  const queryParams = parsedUrl.query;
  
  // get the method
  const method = req.method.toUpperCase();

  let body = '';

  req.on('data', data => {
    body += decoder.write(data);
  });

  req.on('end', () =>{
    body += decoder.end();

    const reqData = {
      path,
      method,
      queryParams,
      body
    };
  
    router(reqData, (code, payload) => {
      // setting response code
      res.writeHead(code, headers);

      // setting response payload
      res.end(JSON.stringify(payload));
    });
  });
};

module.exports = {
  serve
}