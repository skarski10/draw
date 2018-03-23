// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

$.support.cors = true;

// variables for server url
var url = 'http://staging.redleafhq.com/';
var file = 'semicdraw.php';
// var nonRepresentational = '?s=non-representational';
// var representational = '?s=representational';
// var imaginative = '?s=imaginative';
// var random = '?s=rando';
var db = null;
var nonRepresentational = 'non-representational';
var representational = 'representational';
var imaginative = 'imaginative';


// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  // alert('Device is ready!');
  window.plugins.sqlDB.copy("semic_draw.db", 0, copysuccess, copyerror);

  if (db = window.sqlitePlugin.openDatabase({
    name: 'semic-draw.db',
    location: 'default',
    androidDatabaseImplementation: 2,
    androidLockWorkaround: 1
  }, successcb, errorcb)) {
    alert('DB Opened');
  } else {
    alert(':( DB NOT opened');
  }

  // insertKeywords(imaginativeKeywords);
  // insertKeywords(nonRepresentationalKeywords);
  // insertKeywords(representationalKeywords);

  // db.sqlBatch([
  //   'DROP TABLE IF EXISTS imaginative',
  //   'CREATE TABLE IF NOT EXISTS imaginative (keywords)',
  //   // 'CREATE TABLE IF NOT EXISTS non-representational (keywords)',
  //   // 'CREATE TABLE IF NOT EXISTS representational (keywords)',
  //   //  [ insertKeywords(imaginative, imaginativeKeywords) ],
  //   // [ 'INSERT INTO imaginative VALUES (?)', [ 'blah' ] ],
  //   // [ 'INSERT INTO non-representational VALUES (?)', [  ] ],
  //   // [ 'INSERT INTO representational VALUES (?)', [  ] ],
  // ],
  // function() {
  //   alert("INSERTED");
  //   db.executeSql('SELECT * FROM imaginative', [], function (result) {
  //     alert('got keyword: ' + JSON.stringify(result));
  //     alert('Sample column value: ' + result.rows.item(0).keywords);
  //   });
  // },
  // function(error) {
  //   alert('Populate table error: ' + error.message);
  // });

  $$('body').css('background-image', localStorage.getItem('background'));
  $$('#info-div').css('background-image', localStorage.getItem('background'));
  if(localStorage.getItem('category-image') != null) {
    $$('#prompt-category').attr('src', localStorage.getItem('category-image'));
  }
  if(localStorage.getItem('current-keyword') != null) {
    $$('#keyword').text(localStorage.getItem('current-keyword'));
  }
});



function getKeyword (table) {
  alert(table);
  if (table == "imaginative") {
    db.executeSql('SELECT keyword FROM imaginative ORDER BY RANDOM() LIMIT 1', [], function (result) {
      alert(result);
      alert('got keyword: ' + JSON.stringify(result.rows.item(0).keyword));
      document.getElementById('keyword').innerHTML = result.rows.item(0).keyword;
    }, function(error) {
      alert('SELECT error: ' + error.message);
    })
  }
  if (table == "non-representational") {
    db.executeSql('SELECT keyword FROM non_representational ORDER BY RANDOM() LIMIT 1', [], function (result) {
      alert('got keyword: ' + JSON.stringify(result.rows.item(0).keyword));
      document.getElementById('keyword').innerHTML = result.rows.item(0).keyword;
    }, function(error) {
      alert('SELECT error: ' + error.message);
    })
  }
  if (table == "representational") {
    db.executeSql('SELECT keyword FROM representational ORDER BY RANDOM() LIMIT 1', [], function (result) {
      alert('got keyword: ' + JSON.stringify(result.rows.item(0).keyword));
      document.getElementById('keyword').innerHTML = result.rows.item(0).keyword;
    }, function(error) {
      alert('SELECT error: ' + error.message);
    })
  }
}

// function insertKeywords (keywordArray) {
//   var i;
//
// 	for (i = 0; i < keywordArray.length; i++) {
// 		db.sqlBatch(
// 			[
//         'DROP TABLE IF EXISTS imaginative',
// 				'CREATE TABLE IF NOT EXISTS imaginative(keywords)',
// 				[ 'INSERT INTO imaginative VALUES (?)', [ keywordArray[i] ] ] ]
// 			// function() {
// 			// 	db.executeSql('SELECT * FROM imaginative', [], function ( result ) {
// 			// 		// alert( 'got keyword: ' + JSON.stringify( result, null, 4 ) );
// 			// 		// alert( 'Sample column value: ' + i + result.rows.item(i).keywords );
// 			// 	});
// 			// },
// 			// function(error) {
// 			// 	alert( 'Populate table error: ' + error.message );
// 			// }
// 		);
// 	}
// }

// function to get prompt from server
// function getKeyword() {
//   var request = new XMLHttpRequest();
//   var serverUrl = url + file + table;
//   request.onreadystatechange = function() {
//     if (this.readyState == 4 && ((this.status == 200) || (this.status == 0))) {
//        var prompt = JSON.parse(this.responseText);
//        document.getElementById('keyword').innerHTML = prompt.keywords;
//        localStorage.setItem('current-keyword', prompt.keywords);
//     } else {
//       alert('onreadystatechange: N ' + "status: " + this.status + " ready state: " + this.readyState);
//     }
//   };
//   request.open('POST', serverUrl, true);
//   request.send();
// }

// click to see prompt category folders
$$('#prompt-category').on('click', function() {
  $$('#prompt-folders').show();
  $$('#color-options').hide();
});

// click on specific prompt category folder
$$('.prompt-buttons').on('click', function() {
  var imageUpdate = $$(this).attr('src');
  if($$(this).attr('id') == 'all-categories') {
    getKeyword();
    localStorage.setItem('current-category', 'all');
  }
  if($$(this).attr('id') == 'non-rep-categories') {
    getKeyword(nonRepresentational);
    localStorage.setItem('current-category', 'non-representational');
  }
  if($$(this).attr('id') == 'imaginative-categories') {
    getKeyword(imaginative);
    localStorage.setItem('current-category', 'imaginative');
  }
  if($$(this).attr('id') == 'rep-categories') {
    getKeyword(representational);
    localStorage.setItem('current-category', 'representational');
  }
  localStorage.setItem('category-image', imageUpdate);
  $$('#prompt-category').attr('src', imageUpdate);
  $$('#prompt-folders').hide();
});

// click to show background color options
$$('#background-color').on('click', function() {
  $$('#color-options').show();
  $$('#prompt-folders').hide();
});

// click to choose background color
$$('.color-buttons').on('click', function() {
  var backgroundColor = '../www/img/' + $$(this).attr('id') + '.png';
  localStorage.setItem('background', 'url(' + backgroundColor + ')');
  $$('body').css('background-image', 'url(' + backgroundColor + ')');
  $$('#info-div').css('background-image', 'url(' + backgroundColor + ')');
  $$('#color-options').hide();
});

// click area is all but bottom option bar. Clicking here will give new drawing prompt
$$('#click-area').on('click', function() {
  if(localStorage.getItem('current-keyword') != null) {
    if(localStorage.getItem('current-category') == 'all') {
      getKeyword();
    }
    if(localStorage.getItem('current-category') == 'non-representational') {
      getKeyword(nonrepresentational);
    }
    if(localStorage.getItem('current-category') == 'representational') {
      getKeyword(representational);
    }
    if(localStorage.getItem('current-category') == 'imaginative') {
      getKeyword(imaginative);
    }
  }
  $$('#color-options').hide();
  $$('#prompt-folders').hide();
  $$('#info-div').hide();
})

// click to show info div
$$('#info-button').on('click', function() {
  $$('#info-div').show();
})

function errorcb(err) {
 alert("Error processing SQL: " + JSON.stringify( err, null, 4 ) );
}

function successcb() {
 alert("success!");
}

function copysuccess()
{
  alert("DB Copy Success");
  // db = window.sqlitePlugin.openDatabase({name: "semic_draw.db"});
}

function copyerror(e)
{
  alert("Error Code = "+JSON.stringify(e));
}
