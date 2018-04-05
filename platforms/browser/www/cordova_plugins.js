cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-dbcopy/www/sqlDB.js",
        "id": "cordova-plugin-dbcopy.sqlDB",
        "pluginId": "cordova-plugin-dbcopy",
        "clobbers": [
            "window.plugins.sqlDB"
        ]
    },
    {
        "file": "plugins/cordova-sqlite-evcore-extbuild-free/www/SQLitePlugin.js",
        "id": "cordova-sqlite-evcore-extbuild-free.SQLitePlugin",
        "pluginId": "cordova-sqlite-evcore-extbuild-free",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-console": "1.0.7",
    "cordova-plugin-dbcopy": "2.0.0",
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-sqlite-evcore-extbuild-free": "0.9.3",
    "cordova-plugin-splashscreen": "5.0.2"
}
// BOTTOM OF METADATA
});