var util = require('util');
var Twitter = require('twitter');
var config = require('./config.json');
var charArray;

var apiAccess = {
  	consumer_key: config.consumer_key,
  	consumer_secret: config.consumer_secret,
  	access_token_key: config.access_token_key,
  	access_token_secret: config.access_token_secret
};

var client = new Twitter(apiAccess);

LoadFile();
for (var character in charArray) {
  var arguments = getArguments(charArray[character]);
  launchSearch(arguments);
}

function getArguments(character) {
  return {q: character, result_type: 'popular', lang: 'en'};
}

function launchSearch(arguments) {
    client.get('search/tweets', arguments, callback);
}

function callback(error, tweets, response){
    var statuses = tweets['statuses'];
    var tweetArray = [];
    for (var index in statuses) {
      var tweet = statuses[index];
      tweetArray.push(tweet.text);
    }
    responseHandler(tweetArray);
}

function LoadFile() {
  var fs = require('fs');
  charArray = fs.readFileSync('Short_List').toString().split("\n");
}

function responseHandler(tweetArray){
  console.log(tweetArray);
}
