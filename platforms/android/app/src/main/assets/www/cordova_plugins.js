cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cordova-sqlite-evcore-extbuild-free.SQLitePlugin",
    "file": "plugins/cordova-sqlite-evcore-extbuild-free/www/SQLitePlugin.js",
    "pluginId": "cordova-sqlite-evcore-extbuild-free",
    "clobbers": [
      "SQLitePlugin"
    ]
  },
  {
    "id": "cordova-plugin-splashscreen.SplashScreen",
    "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
    "pluginId": "cordova-plugin-splashscreen",
    "clobbers": [
      "navigator.splashscreen"
    ]
  },
  {
    "id": "cordova-plugin-dbcopy.sqlDB",
    "file": "plugins/cordova-plugin-dbcopy/www/sqlDB.js",
    "pluginId": "cordova-plugin-dbcopy",
    "clobbers": [
      "window.plugins.sqlDB"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cordova-plugin-console": "1.0.7",
  "cordova-plugin-whitelist": "1.2.2",
  "cordova-sqlite-evcore-extbuild-free": "0.9.3",
  "cordova-plugin-splashscreen": "5.0.2",
  "cordova-plugin-dbcopy": "2.0.0"
};
// BOTTOM OF METADATA
});