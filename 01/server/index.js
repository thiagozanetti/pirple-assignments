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

  // default body response if none passed
  let body = '';

  req.on('data', data => {
    // listens data from stream
    body += decoder.write(data);
  });

  req.on('end', () =>{
    // closes the stream
    body += decoder.end();

    // organize data to pass down to the router
    const reqData = {
      path,
      method,
      queryParams,
      body
    };
  
    // passing down data to the router and getting back the response
    router(reqData, (code, payload) => {
      // setting response code
      res.writeHead(code, headers);

      // setting the payload and sending the response 
      res.end(JSON.stringify(payload));
    });
  });
};

module.exports = {
  serve
}