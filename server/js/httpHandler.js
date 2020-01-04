const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messageQueue = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

module.exports.initialize = (queue) => {
  messageQueue.enqueue(queue);
};
var currMsg = messageQueue.dequeue();

module.exports.router = (req, res, next = ()=>{}) => {
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  if (req.url === '/' && req.method === 'OPTIONS') {
    res.writeHead(200, headers);
    res.end();
  } else if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, headers);
    if (currMsg === undefined) {
      res.end();
    } else {
      res.end(currMsg);
    }
  }
  // } else if (res.status === 404) {
  //   res.writeHead(404, headers);
  //   res.end();
  // }
  next(); // invoke next() at the end of a request to help with testing!
};
