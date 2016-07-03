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



