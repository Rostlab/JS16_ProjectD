/*
 Module to access database provided by Project A
 */
var config = require('../cfg/config.json');
var request = require('request');

//Database A security token
var tokenString = "?token=" + config.databaseA.token;
/*
 The callback function must take a date object as a parameter
 */

var jsonToCSV = function (json) {
    return json.date + "," + json.pos + "," + json.neg + "," + json.posT + "," + json.negT + "," + json.nullT;
}


/*
 Saves a json to the character in the database
 json format:
 {
 "date" : "12.11.2016",    //Analyzed date
 "pos" : "12",    //positive sentiment sum
 "neg" : "43",  // negative sentiment sum
 "posT" : "6",   //number of positive tweets
 "negT" : "4",   // number of negative tweets
 "nullT" : "23"  // number of neutral tweets
    }
 */
exports.saveSentiment = function (charName, json) {
    //TODO
}

exports.airDate = function (season, episode, callback) {
    //URL to the API provided by Project A
    var url = 'https://got-api.bruck.me/api/episodes/find/' + tokenString;
    //Form includes the search criteria
    var form = {
        form: {
            'season': season,
            'nr': episode
        }
    };
    //Make POST request to API
    request.post(url, form, function (err, resp, body) {
        if (!err && resp.statusCode === 200) {
            //just get the airing date information
            var json = JSON.parse(body);
            var airDate = json.data[0].airDate; //dateString is in format: "2011-04-16T22:00:00.000Z"
            //make a Date object for the callback function to use
            callback(new Date(airDate));
        }
    });
};

/*
 Callback function gets JSON with all character Names as parameter
 CURRENTLY BROKEN
 */
exports.characterNames = function (callback) {
    //URL to API by ProjectA
    var url = 'https://got-api.bruck.me/api/characters/56e38be36363e2222d6d0a3b' + tokenString;
    //GET request to API
    request.get(url, function (err, resp, body) {
        //check foŕ valid response
        console.log(body);
        if (!err && resp.statusCode === 200) {
            //parse answer String to a JSON Object
            var json = JSON.parse(body);
            var formatted = []; //make it an array for easier iteration
            for (var i = 0; i < json.length; i++) {
                //only include the names
                formatted.push({
                    name: json[i].name
                });
            }
            //give JSON object to the callback function
            callback(formatted);
        }
    });
};