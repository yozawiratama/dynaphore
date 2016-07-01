var finalhandler = require('finalhandler')
var http         = require('http')
var Router       = require('router')
var path_module = require('path');
var fs = require('fs');

var module_holder = {}; 
var router = Router();




function LoadModules(path) {
    fs.lstat(path, function(err, stat) {
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(path, function(err, files) {
                var f, l = files.length;
                for (var i = 0; i < l; i++) {
                    f = path_module.join(path, files[i]);
                    LoadModules(f);
                }
            });
        } else {
            // we have a file: load it
            require(path)(module_holder);
        }
    });
}
var DIR = path_module.join(__dirname, 'modules', 'user');
LoadModules(DIR);

exports.module_holder = module_holder;

//post
router.get('/:ctrl?/:act?/:param?', function (req, res) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
console.log(req.params);
if(req.params.ctrl == 'login'){
  module_holder['login'](req, res);
}
if(req.params.ctrl == 'register'){
  module_holder['register'](req, res);
}
  if (req.params.ctrl) {
    if (req.params.act) {
        if(req.params.param){
            res.end('controller : ' + req.params.ctrl + ' and action : ' + req.params.act + ' and param : ' + req.params.param)
        }
        else{
            res.end('controller : ' + req.params.ctrl + ' and action : ' + req.params.act)
        }
    } else {
      res.end('controller : ' + req.params.ctrl + ', but has no action')
    }
  } else {
    res.end('no controller or action')
  }
})



//post
router.post('/submit', function (req, res) {
  
});

var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
})
 
server.listen(3000);