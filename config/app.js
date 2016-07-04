var jsonfile = require('jsonfile');
var path_module = require('path');
var settings = jsonfile.readFileSync(path_module.join(__dirname,'settings.json'));
module.exports = {
    name : "My Application",
    version : "0.0.1",
    codename : "beginning",
    author : "",
    settings : settings

};