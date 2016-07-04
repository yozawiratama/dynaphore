var fs = require('fs');
var path_module = require('path');
var dyna_tpl = require('../../config/template');
function handler(req, res) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    var root = path_module.resolve(__dirname);
    res.end(
        dyna_tpl.compile(
            dyna_tpl.getLayout(),
            fs.readFileSync(path_module.join(__dirname, 'feed.html'), 'utf8'),
            {
                pageTitle: 'Login'
            },
            {
                title: 'Login'
            }
        ));
}

module.exports = function (module_holder, moduleid) {
    module_holder[moduleid]['post.feed'] = handler;
};