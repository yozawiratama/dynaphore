function LoadModules(path) {
    fs.lstat(path, function(err, stat) {
        if (stat.isDirectory()) {
            // we have a directory: do a tree walk
            fs.readdir(path, function(err, files) {
                var f, l = files.length;
                for (var i = 0; i < l; i++) {
                    f = path_module.join(path, files[i]);
                    LoadModules(f);
                }
            });
        } else {
            // we have a file: load it
            require(path)(module_holder);
        }
    });
}
var DIR = path_module.join(__dirname, 'modules', 'user');
LoadModules(DIR);

exports.module_holder = module_holder;