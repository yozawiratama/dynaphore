var path_module = require('path');
var fs = require('fs');
var app = require('./app');
var vash = require('vash');
module.exports = {
    getLayout: function () {
        var path = path_module.join(process.cwd(), "layouts", app.settings.layout, 'layout.html');
        return fs.readFileSync(path, 'utf-8');
    },
    compile: function (layout, view, layoutData, viewData) {
        var tpl = vash.compile(view);
        var body = tpl(viewData);
        layoutData['body'] = body;
        var layout = vash.compile(layout);
        var html = layout(layoutData);
        return html;
    }
};