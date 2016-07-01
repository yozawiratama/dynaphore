function LoadModules(path) {
    fs.lstat(path, function (err, stat) {
        console.log(stat.isDirectory());
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(path, function (err, files) {
                var f, l = files.length;
                for (var i = 0; i < l; i++) {
                    f = path_module.join(path, files[i]);

                    if (path_module.extname(f) == '.js')
                        LoadModules(f);
                }
            });
        } else {
            // we have a file: load it
            require(path)(module_holder);
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
    LoadModules(DIR);
}

exports.module_holder = module_holder;