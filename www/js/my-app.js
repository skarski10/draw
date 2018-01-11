// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  console.log("Device is ready!");
  var db = window.sqlitePlugin.openDatabase({name: 'prompts.db', location: 'default', androidDatabaseImplementation: 2});
});

// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//   var db = window.sqlitePlugin.openDatabase({name: 'prompts.db', location: 'default'});
//   db.executeSql("SELECT * FROM imaginative");
//   window.sqlitePlugin.echoTest(function() {
//     console.log('ECHO test OK');
//   });}

function randomIndex() {
  var max = 0;
  db.readTransaction(function(tx) {
    max += tx.executeSql("SELECT COUNT(index) FROM imaginative")
  });
    return Math.floor(Math.random() * max) + 1;
}

// $$('#menu-closed').on('click', function() {
//   $$('#menu-closed').hide();
//   $$('#menu-icons').show();
// });

$$('#prompt-category').on('click', function() {
  $$('.prompt-buttons').show();
  $$('#color-options').hide();
});

$$('.prompt-buttons').on('click', function() {
  var imageUpdate = $$(this).attr('src')
  $$('#prompt-category').attr('src', imageUpdate);
  $$('.prompt-buttons').hide();
});

$$('#imaginative-categories').on('click', function() {
  function getImaginativePrompt() {
    db.readTransaction(function(tx) {
      tx.executeSql("SELECT prompt FROM imaginative WHERE id=1")
      document.getElementById('prompt').innerHTML = result.row;
    });
  }
});

$$('#background-color').on('click', function() {
  $$('#color-options').show();
  $$('.prompt-buttons').hide();
});

$$('.color-buttons').on('click', function() {
  var backgroundColor = "../www/img/" + $$(this).attr('id') + ".png";
  $$('body').css('background-image', 'url(' + backgroundColor + ')');
  $$('#color-options').hide();
});

$$('#click-area').on('click', function() {
  $$('#color-options').hide();
  $$('#prompt-folders').hide();
})
