var redis = require('redis');
var config = require('./config.js');
var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
  var query = url.parse(req.url, true).query;
  if (typeof query.channel === undefined) {
    res.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    res.end('Invalid Request\n');
  } else {
    var rclient = redis.createClient(config.rport, config.rhost);
    rclient.subscribe(query.channel);
    rclient.on('message', function (channel, message) {
      res.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': true
      });
      res.end(message);
      rclient.unsubscribe();
      rclient.end();
    });
  }
}).listen(config.port, config.host, function () {
  console.log('push server is on...');
});