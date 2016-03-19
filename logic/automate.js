var names = require('../popChars/popChars.json');
var twitter = require('./twitter_rest');
var minutes = 0.001; // time interval for twitter api calls

var interval = minutes * 60 * 1000; //to milliseconds

var currentPos = 0;
/*
Runs REST analysis for characters in popChars.json for the last day.
Function is executed approx once per day per character
 */
setInterval(function(){

    var currentDate = new Date();
    var yesterday = currentDate.setDate(currentDate.getDay()-1);

    twitter.launchSearch(names[currentPos].name, yesterday, currentDate);
    currentPos = (currentPos +1)%names.length;

}, interval); // interval is set here