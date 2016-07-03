console.log('Getting Start ...');
var finalhandler = require('finalhandler')
var http         = require('http')
var url          = require('url')
var Router       = require('router')
var path_module = require('path');
var fs = require('fs');

console.log('Initialize Module');
var module_holder = {}; 
console.log('Initialize Router');
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

function LoadModules(path, moduleid) {
    fs.lstat(path, function (err, stat) {
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(path, function (err, files) {
                var f, l = files.length;
                for (var i = 0; i < l; i++) {
                    f = path_module.join(path, files[i]);
                    LoadModules(f, moduleid);

                }
            });
        } else {
            // we have a file: load it
            if (path_module.extname(path) == '.js')
                require(path)(module_holder, moduleid);
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
    console.log(DIR);
    var modjson = path_module.join(__dirname, 'modules', module_directories[d], 'module.json');
    var moduleid = '';
    // console.log(fs.readFileSync(modjson, 'utf8'));
    var jdata = JSON.parse(fs.readFileSync(modjson, 'utf8'));
    module_holder[jdata.id] = jdata;
    module_holder[jdata.id]['view'] = {};
    LoadModules(DIR, jdata.id);

}

exports.module_holder = module_holder;

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

var server = http.createServer(function (req, res) {
  router(req, res, finalhandler(req, res));
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  console.log(query);
  console.log(url_parts);
  module_holder['mod.dynaphore.user']['user.login'](req, res);
  // console.log(req.url.split('?')[1]);
  // console.log(getQueryString(req.url.split('?')[1]));
})


server.listen(3000);
console.log('Serve at localhost:3000');