console.log('Getting Start ...');
var finalhandler = require('finalhandler')
var http = require('http')
var url = require('url')
// var Router = require('router')
var path_module = require('path');
var fs = require('fs');
var jsonfile = require('jsonfile');

var app = require('./config/app');
var template = require('./config/template');
var router = require('./config/router');
var database = require('./config/database');


//config section
var app = require('./config/app');

console.log('Begin application : ' + app.name);

console.log('Initialize Module');
var moduleHolder = {};
console.log('Initialize Router');
// var router = Router();





var Sequelize = require('sequelize');

// var sequelize = new Sequelize('DBSIMONEV', 'mistraldb', 'mistraldb.123#', {
//     host: 'mistralwebs.cloudapp.net',
//     dialect: 'mssql',

//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });

// sequelize
//     .authenticate()
//     .then(function (err) {
//         console.log('Connection has been established successfully.');
//     })
//     .catch(function (err) {
//         console.log('Unable to connect to the database:', err);
//     });

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
                require(path)(moduleHolder, moduleid);
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
    moduleHolder[jdata.id] = jdata;
    moduleHolder[jdata.id]['view'] = {};
    LoadModules(DIR, jdata.id);

}

exports.moduleHolder = moduleHolder;

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