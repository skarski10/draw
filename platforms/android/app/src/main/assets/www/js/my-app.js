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
  $$('body').css('background-image', localStorage.getItem("background"));
  $$('#info-div').css('background-image', localStorage.getItem("background"));
});

// document.addEventListener('deviceready', onDeviceReady, false);

// function onDeviceReady() {
//   var db = window.sqlitePlugin.openDatabase({name: 'prompts.db', location: 'default'});
//   db.executeSql("SELECT * FROM imaginative");
//   window.sqlitePlugin.echoTest(function() {
//     console.log('ECHO test OK');
//   });}

// function randomIndex() {
//   var max = 0;
//   db.readTransaction(function(tx) {
//     max += tx.executeSql("SELECT COUNT(index) FROM imaginative")
//   });
//     return Math.floor(Math.random() * max) + 1;
// }

// $$('#menu-closed').on('click', function() {
//   $$('#menu-closed').hide();
//   $$('#menu-icons').show();
// });

$$('#prompt-category').on('click', function() {
  $$('#prompt-folders').show();
  $$('#color-options').hide();
});

$$('.prompt-buttons').on('click', function() {
  var imageUpdate = $$(this).attr('src');
  // localStorage.setItem('prompt', '');
  $$('#prompt-category').attr('src', imageUpdate);
  $$('#prompt-folders').hide();
});

// $$('#imaginative-categories').on('click', function() {
//   function getImaginativePrompt() {
//     db.readTransaction(function(tx) {
//       tx.executeSql("SELECT prompt FROM imaginative WHERE id=1")
//       document.getElementById('prompt').innerHTML = result.row;
//     });
//   }
// });

$$('#background-color').on('click', function() {
  $$('#color-options').show();
  $$('#prompt-folders').hide();
});

$$('.color-buttons').on('click', function() {
  var backgroundColor = "../www/img/" + $$(this).attr('id') + ".png";
  localStorage.setItem('background', 'url(' + backgroundColor + ')');
  $$('body').css('background-image', 'url(' + backgroundColor + ')');
  $$('#info-div').css('background-image', 'url(' + backgroundColor + ')');
  $$('#color-options').hide();
});

$$('#click-area').on('click', function() {
  $$('#color-options').hide();
  $$('#prompt-folders').hide();
  $$('#info-div').hide();
})

$$('#info-button').on('click', function() {
  $$('#info-div').show();
})
