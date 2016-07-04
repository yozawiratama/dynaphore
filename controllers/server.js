var server = http.createServer(function (req, res) {
  // router(req, res, finalhandler(req, res));
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var route = router.get(url_parts.path, req.method);
  console.log(req.method);
  moduleHolder[route.module.id][route.module.action](req, res);
  
})


server.listen(3000);
console.log('Serve at localhost:3000');