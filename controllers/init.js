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




