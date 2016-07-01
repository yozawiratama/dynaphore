var server = http.createServer(function (req, res) {
  router(req, res, finalhandler(req, res));
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log(query);
  console.log(url_parts);
  // console.log(req.url.split('?')[1]);
  // console.log(getQueryString(req.url.split('?')[1]));
})

server.listen(3000);