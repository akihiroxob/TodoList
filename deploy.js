var packager = require('electron-packager');
var config = require('./package.json');
var electronVer = config.devDependencies['electron-prebuilt'];
electronVer = electronVer.replace(/\^/, '').replace(/\$/, '');

packager({
    dir: './',
    out: './dist',
    name: config.name,
    platform: 'darwin', // if you need to build for windows, set 'win32,darwin'
    arch: 'x64',
    version: electronVer,
    icon: './app.png',
    'app-bundle-id': 'jp.co.akihiroxob.todolist',
    'app-version': config.version,
    'helper-bundle-id': 'jp.co.akihiroxob.todolist',
    overwrite: true,
    asar: true,
    prune: true,
    ignore: "node_modules/(electron-packager|electron-prebuilt|\.bin)|deploy\.js",
    'version-string': {
        CompanyName: '',
        FileDescription: 'TodoList',
        OriginalFilename: config.name,
        FileVersion: config.version,
        ProductVersion: config.version,
        ProductName: config.name,
        InternalName: config.name
    }
}, function done (err, appPath) {
    if(err) {
        throw err;
    }
    console.log('Done!!');
});
