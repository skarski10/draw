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
  [
    "a baby monster", "a ballerina in a music box", "a barrel full of monkeys", "a bear family portrait", "a bear riding a bicycle", "a bearded lady", "a beetle", "a bird in the hand", "a bird's nest on steroids", "a birdhouse in your soul", "a blind bat", "a broken teacup", "a broken toy", "a bulldog", "a bully being bullied", "a butterfly made of glass", "a castle in the sky", "a cat burglar", "a cave with stalagmites", "a child with a helmet that's too big", "a circus", "a circus land", "a city built on gears", "a city in the clouds", "a clock maker", "a cluttered mind", "a corncob with ears", "a crash test dummy", "a crazy slide", "a criminal paw print", "a dancing hippo", "a desert monster", "a deserted island", "a dragon", "a dream", "a drunken sailor", "a drunken skunk", "a fairy", "a farm of cheese", "a fart", "a fence picketing", "a fire truck on fire", "a flamingo", "a floating house", "a flying bicycle", "a flying pirate ship", "a fortune from a crystal ball", "a fortune telling machine", "a frog king", "a funny mug shot", "a futuristic sidewalk", "a garden entrance", "a geometric landscape", "a ghost", "a giraffe in the hospital", "a grumpy old person", "a happy monster", "a hippy cow", "a hobbit shire", "a hotrod turtle", "a hummingbird", "a jungle made of machinery", "a keyhole to a magical land", "a kiss", "a knucklehead", "a ladybug on the town", "a landscape made of candy", "a lava lamp", "a leopard", "a leprechaun", "a lion tamer", "a living tree", "a lumberjack", "a mad scientist", "a man-eating plant", "a map to an unknown world", "a martian", "a maze", "a mechanical brain", "a melting candle", "a mexican thumb war", "a micro world", "a mime", "a mirage", "a monkey drummer", "a monster chef", "a monster dancing", "a monster in your closet", "a monster under your bed", "a monster's mug shot", "a mosquito squadron", "a mouse home in the wall", "a mummy wrapped in something other than gauze", "a mushroom village", "a mystery box", "a mystical creature", "a mythical creature", "a new airplane", "a new alphabet", "a new design for a skateboard deck", "a new helicopter", "a new musical instrument", "a nightmare", "a panda", "a paper airplane dogfight", "a paperclip construction", "a parallel universe", "a parrot singing", "a peacock", "a penguin", "a person made by a seamstress", "a person made of crystal", "a person made of diamond", "a person made of fire", "a person made of lava", "a person made of vegetation", "a person playing an accordion", "a person with a pumpkin head", "a person with extra eyes", "a phone booth", "a pig piñata", "a pirate with a peg leg", "a police animal lineup", "a porcupine getting a haircut", "a portal to another dimension", "a prism", "a propaganda poster", "a puppet", "a quiet cobblestone street", "a rainbow shooting from a body", "a rat rod", "a ray gun", "a reflection", "a revolutionary chicken", "a rocket ship", "a sand castle", "a sardine tin", "a scary monster", "a scorpion", "a scoundrel", "a scream", "a scribble and turn it into a monster", "a sea monster", "a sea of tears", "a seagull", "a seashell", "a secret door", "a secret garden", "a sense of humor", "a sensitive cowboy", "a ship inside a bottle", "a shooting star", "a singing teapot", "a single line doodle never lifting the pencil", "a skeletal creature", "a skunk", "a snake charmer", "a soapbox car", "a sock monkey", "a spaceship", "a spider web", "a steam punk world", "a story coming to life from a book", "a surreal landscape", "a swamp", "a swamp creature", "a tarantula", "a tear in space", "a teleportation machine", "a time machine", "a train", "a transportation system", "a troll", "a turkey on the lamb", "a turnip truck", "a tyrannosaurus rex", "a vampire", "a villain's mug shot", "a walnut brain", "a warthog", "a waterfall", "a weathervane", "a whisper", "a windmill", "a witch doctor", "a witch's workshop", "a witches shopping basket", "a wooly mammoth", "a world made of paper", "a world of windows", "a zombie", "a zombie chicken", "a zombie ninja", "a zombie pirate", "alpha betty spaghetti", "an anatomy chart for a mythical creature", "an animal gunslinger", "an animal social", "an arrogant racecar driving rabbit", "an elephant ballerina", "an enchanted sundial", "an exotic bird", "an exotic fish", "an igloo", "an inanimate object with human traits", "an invention", "an oasis", "an octopus", "an old lock and key", "an old western town", "an opera singer", "an organic circuit board", "an owl", "an underwater kingdom", "an undiscovered dinosaur", "an unexpected creature hatching from an egg", "angry fungus", "atlantis", "baby president", "balloon animals come to life", "battling rubber ducks", "behind the scenes", "bird feeder restaurant", "books conversing", "bottle cap hat", "broken glass", "bugs", "building blocks", "buildings swallowed up by vegetation", "buildings that float", "buildings that sail across the landscape", "buildings that talk", "caribbean crows", "chess pieces come to life", "chupacabra", "clouds in the sky like alphabet soup", "counting sheep", "crazy hair dos", "creature made with everyday objects", "dancing weeds", "dragonflies", "dutch ducks", "everything made of jello", "fasting condiment", "flowers having a conversation", "flying sailboats", "garden gnomes at the beach", "gargoyles coming to life", "geometric flowers", "geometric people", "gold fish", "graffiti", "grape vines spreading rumors", "haunted forest", "horsing around", "house badger", "insect robots", "jellyfish", "jolly jellybeans", "kaleidoscope of terror", "kites dancing in the wind", "life with no gravity", "lightning", "living cactus", "lollygagging", "misfit toys", "mountains that are slumbering giants", "music", "new forms of money", "pencils complaining about their jobs", "people made of rock", "person made of water", "pipe dreams", "puzzle people", "ribbons dancing", "sasquatch", "scardy cat", "sea animals swimming in the sky", "sea life in a light bulb", "sea of madness", "seaweed dealer", "shadow people", "shrimps cocktail party", "sideshow attraction", "singing siren", "sky surfing aliens", "small people in a land of giants", "someone flying with an umbrella", "someone in a birdcage", "someone made of electricity", "someone made of smoke", "someone with his or her head in the clouds", "something big", "something really small", "something scary", "something that crawls", "something that scares you", "the day of the dead", "the earth cracking apart", "the future", "the human body as a landscape", "the inside of your imagination", "the man on the moon", "the night", "the place you'd like to be right now", "the rain", "the sky falling", "the sound waves you hear right now", "the tree of knowledge", "the ultimate tree house", "the view while you fly", "things that go bump in the night", "tiny toy town", "trees growing from your hand", "tunnel vision", "unicorn", "utopia", "wanted poster with your face on it", "wilting hopes", "wind", "window to the soul", "wood elephant", "yeti", "your conscience giving you advice", "your dream house", "your face melting", "your face without skin", "your feelings", "your head as a balloon", "your mind if it were a room", "your spirit guide", "your thoughts", "yourself in a cubist style"
  ];

var nonRepresentationalKeywords =
[
  "abandoned", "abnormal", "abrasive", "abstracted", "abusive", "acceptance", "acidic", "adoration", "adventurous", "affection", "afraid", "aggravated", "aggressive", "agitated", "agonizing", "alert", "alive", "alluring", "aloof", "amazed", "ambiguous", "ambitious", "amused", "anger", "animated", "animosity", "annoyed", "anticipation", "anxiousness", "appreciative", "apprehensive", "ardent", "aroused", "ashamed", "astonished", "attraction", "awed", "bad", "beautiful", "berserk", "betrayed", "bewildered", "bitter", "bizarre", "bliss", "bloody", "blue", "boastful", "bored", "brave", "breakable", "breathless", "bubbly", "bumpy", "busy", "calamitous", "calculating", "calm", "camaraderie", "careful", "careless", "caring", "cautious", "changeable", "charming", "cheerful", "childlike", "chivalrous", "clever", "cocky", "cold", "collected", "colorful", "combative", "comfortable", "compassionate", "complete", "complex", "concerned", "condemned", "confident", "confused", "contempt", "content", "cool", "courageous", "cowardly", "crafty", "cranky", "crazy", "cruelty", "crummy", "crushed", "curious", "curvy", "cute", "cynic", "damaged", "dangerous", "dapper", "dark", "dead", "deep", "dejected", "delighted", "delirious", "demonic", "denial", "depression", "deranged", "deserted", "desire", "despair", "determined", "devastated", "devilish", "different", "difficult", "disappointed", "dismal", "dispirited", "distracted", "distressed", "dopey", "down", "drab", "dreadful", "dreary", "drunk", "dysfunctional", "eager", "earsplitting", "earthy", "ecstatic", "elastic", "elderly", "electric", "elegant", "embarrassed", "emptiness", "enchanted", "energetic", "enigmatic", "enlightened", "enraged", "enthralled", "enthusiastic", "envy", "ethereal", "euphoric", "excited", "exhausted", "exotic", "expectation", "exuberance", "faint", "faithful", "false", "fancy", "fantastic", "fascinated", "fast", "fear", "flabbergasted", "fluffy", "foolish", "frail", "frazzled", "friendly", "frustrated", "fulfillment", "furious", "gay", "giddy", "gleeful", "gloomy", "goofy", "grateful", "gratified", "greasy", "greedy", "grieving", "grotesque", "grouchy", "grudging", "guilty", "happy", "harmonious", "hate", "heartbroken", "hollow", "homesick", "hopeful", "hopeless", "horrified", "hostile", "humiliated", "humored", "hurt", "hyper", "hysterical", "imaginary", "imperfect", "indignation", "infatuation", "infuriated", "inner peace", "innocent", "insanity", "insecure", "insecure", "inspired", "interest", "intimidated", "invidious", "irate", "irritability", "irritated", "jaded", "jealousy", "joy", "jubilant", "kind", "knowing", "lazy", "left out", "liberated", "lively", "loathsome", "lonely", "longing", "loud", "love", "lovesick", "loyal", "lumpy", "lust", "macabre", "macho", "mad", "mean", "melancholic", "mellow", "melodic", "mercy", "merry", "mildness", "miserable", "morbid", "mourning", "naughty", "needed", "needy", "nervous", "obscene", "obsessed", "offended", "optimistic", "outraged", "overwhelmed", "pacified", "pain", "panicky", "paranoia", "passion", "pathetic", "peaceful", "pessimistic", "petrified", "pity", "playful", "pleased", "pleasure", "possessive", "pride", "proud", "provoked", "puzzled", "rage", "regretful", "relief", "remorse", "resentment", "resignation", "resolved", "sadness", "satisfied", "scared", "scorn", "selfish", "sensitive", "sensual", "sexy", "shame", "sheepish", "shocked", "shy", "sincerity", "solemn", "somber", "sorrow", "sorry", "spirited", "stressed", "strong", "submissive", "superior", "surprised", "sweet", "sympathetic", "tense", "terrified", "threatened", "thrilled", "tired", "tormented", "tranquil", "troubled", "trust", "uncertainty", "uneasiness", "unhappy", "upset", "vengeful", "vicious", "warm", "weary", "worn-out", "worried", "worthless", "wrathful", "yearning"
];

var representationalKeywords =
[
  "a bald head", "a barbeque", "a bathroom", "a bathroom faucet", "a bathroom sink", "a beard", "a bicycle", "a bird", "a bird nest", "a birdcage", "a birdhouse", "a boat", "a boat motor", "a boat on a trailer", "a boat on the water", "a bookshelf", "a bottle opener", "a bowl of fruit", "a box of crayons", "a brick wall", "a building under construction", "a bulldozer", "a bunch of grapes", "a burrito", "a busy pin board", "a cabin", "a camera", "a candelabra", "a candle", "a candy jar", "a car", "a car engine", "a cardboard house", "a cassette tape", "a cat", "a chair", "a child's toy", "a christmas tree", "a cluttered counter", "a cluttered desk", "a cluttered shelf", "a coat rack", "a coffee cup", "a coffee maker", "a coffee table", "a collection of vegetables", "a construction site", "a couple of wine glasses", "a dead tree", "a desk chair", "a dirt road", "a discarded shirt", "a dog", "a doll", "a fan", "a fire escape", "a fire hydrant", "a fishing boat", "a flower vase", "a flower vendor", "a garden", "a garden gnome", "a glass with ice water", "a gravel road", "a gravestone", "a graveyard", "a group of bottles", "a group of candles", "a group of chairs", "a group of coffee cups", "a group of dolls", "a group of drinking glasses", "a group of people", "a group of trees", "a hamburger", "a hammock", "a hot rod", "a hotdog", "a house under construction", "a human nose", "a human smile", "a jacket over a chair", "a jar of food", "a jewelry box", "a kitchen faucet", "a lamp", "a landscape with mountains", "a landscape with rain", "a landscape with snow", "a landscape with water", "a lantern", "a laundry basket", "a laundry mat", "a light fixture", "a made bed", "a magazine rack", "a medicine bowl", "a melting candle", "a music box", "a napkin holder", "a newspaper box", "a pair of shoes", "a paper airplane", "a parking attendant", "a patio on a house", "a pay phone", "a person fishing", "a picket fence", "a pile of clothes", "a pile of firewood", "a pile of pillows", "a pile of rocks", "a pile of shoes", "a pile of sticks", "a plant with vines", "a plate of tacos", "a portrait of someone else", "a profile of someone", "a rolling pin", "a rowboat", "a sailboat", "a sandwich", "a self-portrait", "a shirt", "a shopping cart filled with stuff", "a skateboard", "a skeleton", "a sofa", "a stack of books", "a stack of stuff", "a stairwell", "a still life", "a storefront", "a street", "a surfboard", "a toilet", "a tree", "a tree", "a tree with no leaves", "a truck", "a typewriter", "a utility vehicle", "a vending machine", "a view from the top of a building", "a vintage camera", "a water faucet with a hose", "a water tower", "a windowpane", "a wine glass", "a work desk", "a woven basket", "alcohol bottles", "an airplane", "an airplane", "an ally", "an anchor", "an apartment building", "an armchair", "an empty glass", "an empty park bench", "an escalator", "an interesting chair", "an iron", "an office lobby", "an old phone", "an open book", "an unmade bed", "anything on your desk", "beer taps at a bar", "bird bath", "bird feeder", "boat oars", "bones", "bottles behind the bar", "bubbles", "business trash bin", "cactus", "carnival games", "carnival rides", "chickens", "chips and dip", "cloths hanging in doorway", "coat hooks with coats", "coins", "cooking tools", "corn on the cob", "cows", "crayons", "crew loading luggage onto plane", "crumpled paper", "crustaceans", "curly hair", "deck of a house", "different sized balls", "dirty dishes", "drapery", "driftwood", "ducks", "eggs", "empty boxes", "firewood", "fish", "fishing equipment", "french fries", "garden gates", "glasses at a bar", "glasses at a restaurant", "golf clubs", "hats", "human ear", "ice cubes", "inside a library", "inside your medicine cabinet", "inside your tool box", "ironing board", "jack-o-lantern", "jewelry", "knots in rope", "leaves on the ground", "library books", "light bulbs", "lightbulbs", "luggage", "machinery", "marbles", "mechanical parts", "mushrooms", "musical instruments", "newspaper stand", "office equipment", "office supplies", "old sandals", "old shoes", "open human mouth", "origami", "packaged food", "paintbrushes", "paper clips", "paper money", "parked cars", "parking meters", "pencil jar", "people at a bar", "people in a restaurant", "people on the bus", "people working in a restaurant", "performing musicians", "piercings", "pinecones", "playground equipment", "potted plants", "pumpkin", "random objects hanging from string", "ribbons", "rocks", "roller blades", "roller skates", "rope", "salt and peppershakers", "science equipment", "scissors", "sea shells", "seedpods", "shrubbery", "silverware", "skateboards", "some fruit", "someone lying down", "someone near you", "someone on a park bench", "someone riding a bicycle", "someone sitting", "someone sitting on the sidewalk", "someone's bare feet", "someone's feet with shoes on", "spiral staircase", "stairs", "sticks", "stools", "straight hair", "styrofoam cups", "surfboards", "table settings at a restaurant", "tangled ribbons", "tattoos", "teeth", "tennis racket", "the back of someone's head", "the back of your hand", "the dashboard of your car", "the inside of a bus", "the inside of your car", "the inside of your cupboards", "the inside of your freezer", "the inside of your refrigerator", "the palm of your hand", "the room your in", "the sunrise", "the sunset", "tools", "toothbrush holder", "torn wrapping paper", "tortilla chips and salsa", "weaves", "weeds", "weights", "what you're drinking", "what you're eating", "what's in your sink", "what's on your table", "wine bottles", "wood working tools", "wooden mannequins", "work out equipment", "woven baskets", "wrapped presents", "your bare feet", "your eyewear", "your feet with shoes on", "your fist", "your hand at rest", "your hand holding something", "your hand tense", "your headphones", "your keys", "your laundry", "your left overs", "your mail", "your other hand", "your pet", "your recycling", "your trash", "yourself"
];

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
				[ 'INSERT INTO imaginative VALUES (?)', [ imaginativeKeywords[i] ] ] ]
			// function() {
			// 	db.executeSql('SELECT * FROM imaginative', [], function ( result ) {
			// 		// alert( 'got keyword: ' + JSON.stringify( result, null, 4 ) );
			// 		// alert( 'Sample column value: ' + i + result.rows.item(i).keywords );
			// 	});
			// },
			// function(error) {
			// 	alert( 'Populate table error: ' + error.message );
			// }
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
