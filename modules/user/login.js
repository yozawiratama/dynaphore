var fs = require('fs');
var path_module = require('path');
var vash = require('vash');
function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    var tpl = vash.compile(fs.readFileSync(path_module.join(__dirname,'login.html'), 'utf8'));
    res.end(tpl(
        { 
            title: 'Masuk'
        }));
}

module.exports = function (module_holder, moduleid) {
    module_holder[moduleid]['user.login'] = handler;
    module_holder[moduleid]['view']['user.login'] = fs.readFileSync(
        path_module.join(__dirname,'login.html'), 'utf8');;
};