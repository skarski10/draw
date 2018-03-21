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
var imaginativeKeywords =
  [ "a baby monster", "a ballerina in a music box", "a barrel full of monkeys", "a bear family portrait", "a bear riding a bicycle", "a bearded lady", "a beetle", "a bird in the hand", "a bird's nest on steroids", "a birdhouse in your soul", "a blind bat", "a broken teacup", "a broken toy", "a bulldog", "a bully being bullied", "a butterfly made of glass", "a castle in the sky", "a cat burglar", "a cave with stalagmites", "a child with a helmet that's too big", "a circus", "a circus land", "a city built on gears", "a city in the clouds", "a clock maker", "a cluttered mind", "a corncob with ears", "a crash test dummy", "a crazy slide", "a criminal paw print", "a dancing hippo", "a desert monster", "a deserted island", "a dragon", "a dream", "a drunken sailor", "a drunken skunk", "a fairy", "a farm of cheese", "a fart", "a fence picketing", "a fire truck on fire", "a flamingo", "a floating house", "a flying bicycle", "a flying pirate ship", "a fortune from a crystal ball", "a fortune telling machine", "a frog king", "a funny mug shot", "a futuristic sidewalk", "a garden entrance", "a geometric landscape", "a ghost", "a giraffe in the hospital", "a grumpy old person", "a happy monster", "a hippy cow", "a hobbit shire", "a hotrod turtle", "a hummingbird", "a jungle made of machinery", "a keyhole to a magical land", "a kiss", "a knucklehead", "a ladybug on the town", "a landscape made of candy", "a lava lamp", "a leopard", "a leprechaun", "a lion tamer", "a living tree", "a lumberjack", "a mad scientist", "a man-eating plant", "a map to an unknown world", "a martian", "a maze", "a mechanical brain", "a melting candle", "a mexican thumb war", "a micro world", "a mime", "a mirage", "a monkey drummer", "a monster chef", "a monster dancing", "a monster in your closet", "a monster under your bed", "a monster's mug shot", "a mosquito squadron", "a mouse home in the wall", "a mummy wrapped in something other than gauze", "a mushroom village", "a mystery box", "a mystical creature", "a mythical creature", "a new airplane", "a new alphabet", "a new design for a skateboard deck", "a new helicopter", "a new musical instrument", "a nightmare", "a panda", "a paper airplane dogfight", "a paperclip construction", "a parallel universe", "a parrot singing", "a peacock", "a penguin", "a person made by a seamstress", "a person made of crystal", "a person made of diamond", "a person made of fire", "a person made of lava", "a person made of vegetation", "a person playing an accordion", "a person with a pumpkin head", "a person with extra eyes", "a phone booth", "a pig piñata", "a pirate with a peg leg", "a police animal lineup", "a porcupine getting a haircut", "a portal to another dimension", "a prism", "a propaganda poster", "a puppet", "a quiet cobblestone street", "a rainbow shooting from a body", "a rat rod", "a ray gun", "a reflection", "a revolutionary chicken", "a rocket ship", "a sand castle", "a sardine tin", "a scary monster", "a scorpion", "a scoundrel", "a scream", "a scribble and turn it into a monster", "a sea monster", "a sea of tears", "a seagull", "a seashell", "a secret door", "a secret garden", "a sense of humor", "a sensitive cowboy", "a ship inside a bottle", "a shooting star", "a singing teapot", "a single line doodle never lifting the pencil", "a skeletal creature", "a skunk", "a snake charmer", "a soapbox car", "a sock monkey", "a spaceship", "a spider web", "a steam punk world", "a story coming to life from a book", "a surreal landscape", "a swamp", "a swamp creature", "a tarantula", "a tear in space", "a teleportation machine", "a time machine", "a train", "a transportation system", "a troll", "a turkey on the lamb", "a turnip truck", "a tyrannosaurus rex", "a vampire", "a villain's mug shot", "a walnut brain", "a warthog", "a waterfall", "a weathervane", "a whisper", "a windmill", "a witch doctor", "a witch's workshop", "a witches shopping basket", "a wooly mammoth", "a world made of paper", "a world of windows", "a zombie", "a zombie chicken", "a zombie ninja", "a zombie pirate", "alpha betty spaghetti", "an anatomy chart for a mythical creature", "an animal gunslinger", "an animal social", "an arrogant racecar driving rabbit", "an elephant ballerina", "an enchanted sundial", "an exotic bird", "an exotic fish", "an igloo", "an inanimate object with human traits", "an invention", "an oasis", "an octopus", "an old lock and key", "an old western town", "an opera singer", "an organic circuit board", "an owl", "an underwater kingdom", "an undiscovered dinosaur", "an unexpected creature hatching from an egg", "angry fungus", "atlantis", "baby president", "balloon animals come to life", "battling rubber ducks", "behind the scenes", "bird feeder restaurant", "books conversing", "bottle cap hat", "broken glass", "bugs", "building blocks", "buildings swallowed up by vegetation", "buildings that float", "buildings that sail across the landscape", "buildings that talk", "caribbean crows", "chess pieces come to life", "chupacabra", "clouds in the sky like alphabet soup", "counting sheep", "crazy hair dos", "creature made with everyday objects", "dancing weeds", "dragonflies", "dutch ducks", "everything made of jello", "fasting condiment", "flowers having a conversation", "flying sailboats", "garden gnomes at the beach", "gargoyles coming to life", "geometric flowers", "geometric people", "gold fish", "graffiti", "grape vines spreading rumors", "haunted forest", "horsing around", "house badger", "insect robots", "jellyfish", "jolly jellybeans", "kaleidoscope of terror", "kites dancing in the wind", "life with no gravity", "lightning", "living cactus", "lollygagging", "misfit toys", "mountains that are slumbering giants", "music", "new forms of money", "pencils complaining about their jobs", "people made of rock", "person made of water", "pipe dreams", "puzzle people", "ribbons dancing", "sasquatch", "scardy cat", "sea animals swimming in the sky", "sea life in a light bulb", "sea of madness", "seaweed dealer", "shadow people", "shrimps cocktail party", "sideshow attraction", "singing siren", "sky surfing aliens", "small people in a land of giants", "someone flying with an umbrella", "someone in a birdcage", "someone made of electricity", "someone made of smoke", "someone with his or her head in the clouds", "something big", "something really small", "something scary", "something that crawls", "something that scares you", "the day of the dead", "the earth cracking apart", "the future", "the human body as a landscape", "the inside of your imagination", "the man on the moon", "the night", "the place you'd like to be right now", "the rain", "the sky falling", "the sound waves you hear right now", "the tree of knowledge", "the ultimate tree house", "the view while you fly", "things that go bump in the night", "tiny toy town", "trees growing from your hand", "tunnel vision", "unicorn", "utopia", "wanted poster with your face on it", "wilting hopes", "wind", "window to the soul", "wood elephant", "yeti", "your conscience giving you advice", "your dream house", "your face melting", "your face without skin", "your feelings", "your head as a balloon", "your mind if it were a room", "your spirit guide", "your thoughts", "yourself in a cubist style" ];

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
  // alert('Device is ready!');
  db = window.sqlitePlugin.openDatabase({
    name: 'semic-draw.db',
    location: 'default',
    androidDatabaseImplementation: 2,
    androidLockWorkaround: 1
  }, successcb, errorcb)

  insertKeywords();

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

function getKeyword () {
  db.executeSql('SELECT DISTINCT keywords FROM imaginative ORDER BY RANDOM() LIMIT 1', [], function (result) {
    // alert('got keyword: ' + JSON.stringify(result.rows.item(0).keywords));
    document.getElementById('keyword').innerHTML = result.rows.item(0).keywords;
  }, function(error) {
    alert('SELECT error: ' + error.message);
  })
}

function insertKeywords () {
  var i;

	for (i = 0; i < imaginativeKeywords.length; i++) {
		db.sqlBatch(
			[
        'DROP TABLE IF EXISTS imaginative',
				'CREATE TABLE IF NOT EXISTS imaginative (keywords)',
				[ 'INSERT INTO imaginative VALUES (?)', [ imaginativeKeywords[i] ] ] ],
			function() {
				db.executeSql('SELECT * FROM imaginative', [], function ( result ) {
					// alert( 'got keyword: ' + JSON.stringify( result, null, 4 ) );
					// alert( 'Sample column value: ' + i + result.rows.item(i).keywords );
				});
			},
			function(error) {
				alert( 'Populate table error: ' + error.message );
			}
		);
	}
}

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
    getKeyword();
    localStorage.setItem('current-category', 'non-representational');
  }
  if($$(this).attr('id') == 'imaginative-categories') {
    getKeyword();
    localStorage.setItem('current-category', 'imaginative');
  }
  if($$(this).attr('id') == 'rep-categories') {
    getKeyword();
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
      getKeyword();
    }
    if(localStorage.getItem('current-category') == 'representational') {
      getKeyword();
    }
    if(localStorage.getItem('current-category') == 'imaginative') {
      getKeyword();
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
