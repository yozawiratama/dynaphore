var path_module = require('path');
var jsonfile = require('jsonfile');
var fs = require('fs');
var _ = require('lodash');
var app = require('./app');
module.exports = {
    get: function (path, method) {
        if(!method) method = 'GET';
        var r = jsonfile.readFileSync(path_module.join(__dirname, 'router.json'));
        var route = {};
        for (rr in r) {
            if (r[rr].path == path && r[rr].method == method)
                route = r[rr];
        }
        return route;
    },
    add: function () {

    },
    remove: function () {

    }
};