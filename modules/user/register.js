var fs = require('fs');
var path_module = require('path');
function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(fs.readFileSync(path_module.join(__dirname,'register.html'), 'utf8'));
}

module.exports = function (module_holder, moduleid) {
    module_holder[moduleid]['user.register'] = handler;
};