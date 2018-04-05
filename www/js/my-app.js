// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let"s save it to $$ variable:
var $$ = Dom7;

// // variables for server url
// var url = "http://staging.redleafhq.com/";
// var file = "semicdraw.php";
// var nonRepresentational = "?s=non_representational";
// var representational = "?s=representational";
// var imaginative = "?s=imaginative";
// var random = "?s=rando";

var db = null;
var nonRepresentational = "non_representational";
var representational = "representational";
var imaginative = "imaginative";


// Handle Cordova Device Ready Event
$$(document).on("deviceready", function() {
  // alert("Device is ready!");
  if (db == null) {
    // copy pre exisiting database and then open SQLite database
    window.plugins.sqlDB.copy("semic_draw.db", 0, copysuccess, copyerror);
    db = window.sqlitePlugin.openDatabase({
      name: "semic_draw.db",
      location: "default",
      androidDatabaseImplementation: 2,
      androidLockWorkaround: 1
    }, successcb, errorcb)
  } else {
    // if database has already been copied, open database
    db = window.sqlitePlugin.openDatabase({
      name: "semic_draw.db",
      location: "default",
      androidDatabaseImplementation: 2,
      androidLockWorkaround: 1
    }, successcb, errorcb)
  }

  // load from local storage for background, current word pack icon, current keyword
  console.log(localStorage.getItem("background"));
  $$("body").css("background-image", localStorage.getItem("background"));
  $$("#info-view").css("background-image", localStorage.getItem("background"));
  $$("#word-pack-view").css("background-image", localStorage.getItem("background"));
  if(localStorage.getItem("category-image") != null) {
    $$("#word-pack-categories").attr("src", localStorage.getItem("category-image"));
  }
  if(localStorage.getItem("current-keyword") != null) {
    $$("#keyword").text(localStorage.getItem("current-keyword"));
  } else {
    // $$("#welcome").show();
  }

  // db.sqlBatch([
  //   "DROP TABLE IF EXISTS imaginative",
  //   "CREATE TABLE IF NOT EXISTS imaginative (keywords)",
  //   "CREATE TABLE IF NOT EXISTS non_representational (keywords)",
  //   "CREATE TABLE IF NOT EXISTS representational (keywords)",
  //   [ "INSERT INTO imaginative VALUES (?)", [ "blah" ] ],
  //   [ "INSERT INTO non_representational VALUES (?)", [  ] ],
  //   [ "INSERT INTO representational VALUES (?)", [  ] ],
  // ],
  // function() {
  //   alert("INSERTED");
  //   db.executeSql("SELECT * FROM imaginative", [], function (result) {
  //     alert("got keyword: " + JSON.stringify(result));
  //     alert("Sample column value: " + result.rows.item(0).keywords);
  //   });
  // },
  // function(error) {
  //   alert("Populate table error: " + error.message);
  // });
});


// function to get random keyword from current word pack
function getKeyword (table) {
  // get keyword from imaginative word pack
  if (table == "imaginative") {
    db.executeSql("SELECT keyword FROM imaginative ORDER BY RANDOM() LIMIT 1", [], function (result) {
      // alert("got keyword: " + JSON.stringify(result.rows.item(0).keyword));
      document.getElementById("keyword").innerHTML = result.rows.item(0).keyword;
      localStorage.setItem("current-keyword", result.rows.item(0).keyword);
    }, function(error) {
      alert("SELECT error: " + error.message);
    })
  }
  // get keyword from non-representational word pack
  if (table == "non_representational") {
    db.executeSql("SELECT keyword FROM non_representational ORDER BY RANDOM() LIMIT 1", [], function (result) {
      // alert("got keyword: " + JSON.stringify(result.rows.item(0).keyword));
      document.getElementById("keyword").innerHTML = result.rows.item(0).keyword;
      localStorage.setItem("current-keyword", result.rows.item(0).keyword);
    }, function(error) {
      alert("SELECT error: " + error.message);
    })
  }
  // get keyword from representational word pack
  if (table == "representational") {
    db.executeSql("SELECT keyword FROM representational ORDER BY RANDOM() LIMIT 1", [], function (result) {
      // alert("got keyword: " + JSON.stringify(result.rows.item(0).keyword));
      document.getElementById("keyword").innerHTML = result.rows.item(0).keyword;
      localStorage.setItem("current-keyword", result.rows.item(0).keyword);
    }, function(error) {
      alert("SELECT error: " + error.message);
    })
  }
}

// function insertKeywords (keywordArray) {
//   var i;
//
// 	for (i = 0; i < keywordArray.length; i++) {
// 		db.sqlBatch(
// 			[
//         "DROP TABLE IF EXISTS imaginative",
// 				"CREATE TABLE IF NOT EXISTS imaginative(keywords)",
// 				[ "INSERT INTO imaginative VALUES (?)", [ keywordArray[i] ] ] ]
// 			function() {
// 				db.executeSql("SELECT * FROM imaginative", [], function ( result ) {
// 					// alert( "got keyword: " + JSON.stringify( result, null, 4 ) );
// 					// alert( "Sample column value: " + i + result.rows.item(i).keywords );
// 				});
// 			},
// 			function(error) {
// 				alert( "Populate table error: " + error.message );
// 			}
// 		);
// 	}
// }
//
// // function to get prompt from server
// function getKeyword() {
//   var request = new XMLHttpRequest();
//   var serverUrl = url + file + table;
//   request.onreadystatechange = function() {
//     if (this.readyState == 4 && ((this.status == 200) || (this.status == 0))) {
//        var prompt = JSON.parse(this.responseText);
//        document.getElementById("keyword").innerHTML = prompt.keywords;
//        localStorage.setItem("current-keyword", prompt.keywords);
//     } else {
//       alert("onreadystatechange: N " + "status: " + this.status + " ready state: " + this.readyState);
//     }
//   };
//   request.open("POST", serverUrl, true);
//   request.send();
// }

// click to see category packs
$$(".word-pack-categories").on("click", function() {
  // hide/show views
  console.log("hello from word packs ");
  $$("#word-pack-view").show();
  $$("#top-view").hide();
  $$("#background-color-view").hide();
  $$("#info-view").hide();
});

// click on specific category pack
$$(".category-icons").on("click", function() {
  var imageUpdate = $$(this).attr("id");
  // if($$(this).attr("id") == "all-folder") {
  //   getKeyword();
  //   localStorage.setItem("current-category", "all");
  // }
  if($$(this).attr("id") == "non-rep-folder") {
    getKeyword(nonRepresentational);
    localStorage.setItem("current-category", "non_representational");
  }
  if($$(this).attr("id") == "imaginative-folder") {
    getKeyword(imaginative);
    localStorage.setItem("current-category", "imaginative");
  }
  if($$(this).attr("id") == "rep-folder") {
    getKeyword(representational);
    localStorage.setItem("current-category", "representational");
  }
  localStorage.setItem("category-image", "img/" + imageUpdate + ".png");
  $$(".word-pack-categories").attr("src", "img/" + imageUpdate + ".png");
  // hide/show views
  $$("#top-view").show();
  $$("#info-view").hide()
  $$("#background-color-view").hide();
  $$("#word-pack-view").hide();
});

// click to show background color options
$$(".background-color-button").on("click", function() {
  var backgroundOptions = $$(".background-options").attr("id");
  alert("#" + backgroundOptions + "");
  $$("#" + backgroundOptions + "").css("background-image", "url(" + backgroundOptions + ")")
  // hide/show views
  $$("#background-color-view").show();
  $$("#top-view").hide();
  $$("#info-view").hide()
  $$("#word-pack-view").hide();
});

// click to choose background color
$$(".background-options").on("click", function() {
  var backgroundColor = "../www/img/" + $$(this).attr("id") + ".png";
  console.log($$(this).attr("id"));

  // change to white draw logo and white menu icons
  if ($$(this).attr("id") == "pinkPurple") {
    $$("#draw-logo").attr("src", "img/draw-white.png");
    $$("#info-draw-image").attr("src", "img/draw-white.png");
    $$(".word-pack-categories").attr("src", "img/category-folder-white.png");
    $$(".background-color-button").attr("src", "img/background-color-white.png");
    $$(".info-button").attr("src", "img/info-button-white.png");
  } else {
    // change to black draw logo and black menu icons
    $$("#draw-logo").attr("src", "img/draw.png");
    $$("#info-draw-image").attr("src", "img/draw.png");
    $$(".word-pack-categories").attr("src", "img/category-folder.png");
    $$(".background-color-button").attr("src", "img/background-color.png");
    $$(".info-button").attr("src", "img/info-button.png");
  }
  localStorage.setItem("background", "url(" + backgroundColor + ")");
  // change background color on main view, info and category packs
  $$("body").css("background-image", "url(" + backgroundColor + ")");
  $$("#info-view").css("background-image", "url(" + backgroundColor + ")");
  $$("#word-pack-view").css("background-image", "url(" + backgroundColor + ")");
  // hide/show views
  $$("#top-view").show();
  $$("#background-color-view").hide();
  $$("#word-pack-view").hide();
  $$("#info-view").hide();
});

// click area is all but bottom option bar. Clicking here will give new drawing prompt
$$("#top-view").on("click", function() {
  if(localStorage.getItem("current-keyword") != null) {
  //   if(localStorage.getItem("current-category") == "all") {
  //     getKeyword();
  //   }
    if(localStorage.getItem("current-category") == "non_representational") {
      getKeyword(nonRepresentational);
    }
    if(localStorage.getItem("current-category") == "representational") {
      getKeyword(representational);
    }
    if(localStorage.getItem("current-category") == "imaginative") {
      getKeyword(imaginative);
    }
  }
  $$("#word-pack-view").hide();
  $$("#background-color-view").hide();
  $$("#info-view").hide();
})

// click to show info div
$$(".info-button").on("click", function() {
  $$("#info-view").show();
  $$("#top-view").hide();
  $$("#word-pack-view").hide();
  $$("#background-color-view").hide();
})

$$("#info-div").on("click", function() {
  $$("#top-view").show();
  $$("#info-view").hide();
  $$("#background-color-view").hide();
  $$("#word-pack-view").hide();
})

function errorcb(err) {
 alert("Error processing SQL: " + JSON.stringify( err, null, 4 ) );
}

function successcb() {
 alert("success!");
}

function copysuccess()
{
  // db = window.sqlitePlugin.openDatabase({name: "semic_draw.db"});
}

function copyerror(e)
{
  alert("Error Code = "+JSON.stringify(e));
}
