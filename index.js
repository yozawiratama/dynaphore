var finalhandler = require('finalhandler')
var http         = require('http')
var url          = require('url')
var Router       = require('router')
var path_module = require('path');
var fs = require('fs');

var module_holder = {}; 
var router = Router();




var Sequelize = require('sequelize');

var sequelize = new Sequelize('DBSIMONEV', 'mistraldb', 'mistraldb.123#', {
    host: 'mistralwebs.cloudapp.net',
    dialect: 'mssql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(function (err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

function LoadModules(path) {
    fs.lstat(path, function (err, stat) {
        console.log(stat.isDirectory());
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(path, function (err, files) {
                var f, l = files.length;
                for (var i = 0; i < l; i++) {
                    f = path_module.join(path, files[i]);

                    if (path_module.extname(f) == '.js')
                        LoadModules(f);
                }
            });
        } else {
            // we have a file: load it
            require(path)(module_holder);
        }
    });
}

function getDirectories(srcpath) {
    return fs.readdirSync(srcpath).filter(function (file) {
        return fs.statSync(path_module.join(srcpath, file)).isDirectory();
    });
}

var module_directories = getDirectories(path_module.join(__dirname, 'modules'));
for (d in module_directories) {
    var DIR = path_module.join(__dirname, 'modules', module_directories[d]);
    LoadModules(DIR);
}

exports.module_holder = module_holder;
function getQueryString(search) {
  console.log(search);
  JSON.parse('{"' + decodeURI(search.replace(/&/g, "\",\"").replace(/=/g,"\":\"")) + '"}')
}

// //post
// router.get('/:ctrl?/:act?/:param?', function (req, res) {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain; charset=utf-8')
//   console.log(req.params);
//   if (req.params.ctrl == 'login') {
//     module_holder['user.login'](req, res);
//   }
//   if (req.params.ctrl == 'register') {
//     module_holder['user.register'](req, res);
//   }
//   if (req.params.ctrl) {
//     if (req.params.act) {
//       if (req.params.param) {
//         res.end('controller : ' + req.params.ctrl + ' and action : ' + req.params.act + ' and param : ' + req.params.param)
//       }
//       else {
//         res.end('controller : ' + req.params.ctrl + ' and action : ' + req.params.act)
//       }
//     } else {
//       res.end('controller : ' + req.params.ctrl + ', but has no action')
//     }
//   } else {
//     res.end('no controller or action')
//   }
// })



// //post
// router.post('/submit', function (req, res) {

// });

var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res));
  var url_parts = url.parse(req.url, true);
var query = url_parts.query;
console.log(query);
console.log(url_parts);
  // console.log(req.url.split('?')[1]);
  // console.log(getQueryString(req.url.split('?')[1]));
})
 
server.listen(3000);