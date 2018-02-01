// Initialize app
var myApp = new Framework7();

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

$.support.cors = true;

// variables for server url
var url = 'http://staging.redleafhq.com/';
var file = 'semicdraw.php';
var nonRepresentational = '?s=non-representational';
var representational = '?s=representational';
var imaginative = '?s=imaginative';
var random = '?s=rando';

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  console.log('Device is ready!');
  $$('body').css('background-image', localStorage.getItem('background'));
  $$('#info-div').css('background-image', localStorage.getItem('background'));
  if(localStorage.getItem('category-image') != null) {
    $$('#prompt-category').attr('src', localStorage.getItem('category-image'));
  }
  if(localStorage.getItem('current-keyword') != null) {
    $$('#keyword').text(localStorage.getItem('current-keyword'));
  }
});

// function to get prompt from server
function getKeyword(table) {
  var request = new XMLHttpRequest();
  var serverUrl = url + file + table;
  request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       var prompt = JSON.parse(this.responseText)
       document.getElementById('keyword').innerHTML = prompt.keywords;
       localStorage.setItem('current-keyword', prompt.keywords);
    }
  };
  request.open('POST', serverUrl, true);
  request.send();
}

// click to see prompt category folders
$$('#prompt-category').on('click', function() {
  $$('#prompt-folders').show();
  $$('#color-options').hide();
});

// click on specific prompt category folder
$$('.prompt-buttons').on('click', function() {
  var imageUpdate = $$(this).attr('src');
  if($$(this).attr('id') == 'all-categories') {
    getKeyword(random);
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
      getKeyword(random);
    }
    if(localStorage.getItem('current-category') == 'non-representational') {
      getKeyword(nonRepresentational);
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
