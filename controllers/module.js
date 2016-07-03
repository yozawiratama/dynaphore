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