//Added some dummy logic to test the tests :P
//The whole thing has to be done!
//Functions can be changed
//Content needs to be changed.
	//get n biggest element from the list
	//i: position of the value in object
	var getMostNFromArray1= function(array, n, property){
		var nMost = new Array(n);
		//sorting the list in decreasing oder
		array.sort(function(a,b){return b[property] -a[property];});
		for (var j= 0;j<n;j++){
			nMost[j]= listA[j];
		}
		return nMost;
	};
	var getMostNFromArray2= function(array,n, arrayOfProp){
		var nMost = new Array(n);
		//sorting the list in decreasing oder
		array.sort(function(a,b){
			var aSum = 0,bSum =0;
			for (var k = 0;k<arrayOfProp.length;k++) {
				aSum+=a[arrayOfProp[k]];
				bSum+=b[arrayOfProp[k]];
			}
			return aSum -bSum;
			});
		for (var j= 0;j<n;j++){
			nMost[j]= listA[j];
		}
		return nMost;
	};
	var testDateAndName = function (date,name){
		var error = new Error();
		error.date = date;
		error.searchedName=name;
		if (!date) {
			//throw new Error('Date is empty');
			return new SearchError('Date is empty',date, name);
		}
		if (date===new Date(1990,1,1)){
			//error.message="For this date does no Twitterdata exist!";
			//throw error;
			return new SearchError('For this date does no Twitterdata exist!',date, name);
		}
		return;
	};
	var testDate = function(date){
		var error = new Error();
		error.date = date;
		error.searchedName=name;
		if (!date) {
			//throw new Error('Date is empty');

			return true	;
		}
		if (date===new Date(1990,1,1)){
			error.message="For this date does no Twitterdata exist!";
			//throw error;

			return true;
		}
	};
function SearchError(message, date, searchedName){
	this.name='SearchError';
	this.message= message || 'Some Failure happened while searching for a SentimentAnalyses';
	this.stack= (new Error()).stack;
	this.date= date;
	this.searchedName= searchedName;
}

SearchError.prototype = Object.create(Error.prototype);
SearchError.prototype.constructor = SearchError;
var automation = require('./logic/automate.js');
var twitterAPI = require('./logic/twitterAPI.js');
var database  = require('./db/database.js');
//start automation as default
automation.startAutomation();
module.exports={

/*
 Gets the score (positive and negative) for a character on a given day
 Input:
 {
 "characterName" : "Jon Snow",
 "date" : "2016-03-18T"
 }
 */
getSentimentForName: function (json, callback) {

	var date = json.date;
	var charName = json.characterName;
	var error = testDateAndName(date,charName);

	//mongodb api here, then handle the response from mongodb
	// always error in callback
	database.getSentimentForNameTimeframe(charName,date,date,function(json){callback(json,error);});

	/*
	 //DUMMY RESPOSE, TO BE REPLACED
	var resp = {
		"characterName": json.characterName,
		"date": json.date, //date of the tweets
		"posSum": 23, //sum of the positive sentiment score on that given day
		"negSum": 21,   //sum of the negative sentiment score on that given day
		"posCount": 11, //count of positive tweets that day
		"negCount": 5, //sum of negative tweets that day
		"nullCount": 8 //sum of neutral tweets that day
	}; //not an array, single element response
	*/

},
/*
 returns Analysis over a timeframe (same as above)
 Input json:
 {
 "name" : "Some Name",
 "startDate" : ISODate",
 "endDate" : 'ISODate"
 }
 */
getSentimentForNameTimeframe: function (json, callback) {
	var name = json.name;
	var startDate = json.startDate;
	var endDate = json.endDate;
	//if (testDate(startDate,charName)){console.log('Error');return;}
	if (endDate === undefined){
		//basiclly using getSentimentForName()

	}
	else {
		//if(testDate(endDate,charName)){console.log('Error');return;}
		//mongodb api here, then handle the response from mongodb
		database.getSentimentForNameTimeframe(name,startDate,endDate,function(json){callback(json);});
	}
	/*
	//DUMMY RESPOSE, TO BE REPLACED
	var resp = [{
		"characterName": "Jon Snow",
		"date": "2016-03-18T14:40:42.782Z",
		"posSum": 23,
		"negSum": 21,
		"posCount": 11,
		"negCount": 5,
		"nullCount": 8
	}]; //note that this in array and will usually contain more than one element
	*/


},
/*
    /*
     returns Array of names, which are most loved. with length=number. Ordered!
     Input:
     {
     "number" : 3,  //this is the count of how many you want e.g. 3 for top3
     "startDate' : "ISODate",
     "endDate' : "ISODate"
     */
    topSentiment: function (json, callback) {
		var number = json.number;
		var startDate = json.startDate;
		var endDate = json.endDate;
		//if (testDate(startDate,charName)){console.log('Error');return;}

		if (endDate === undefined){
			/* endDate= startDate
			*mongodb api here, then handle the response from mongodb
			*/
			database.getSentimentTimeframe(startDate,startDate,function(json) {
				callback(getMostNFromArray1(json,number,"posSum"));
			});

		}
		else {
			//if(testDate(endDate,charName)){console.log('Error');return;}
			//mongodb api here, then handle the response from mongodb
			database.getSentimentTimeframe(startDate,endDate,function(json) {
				callback(getMostNFromArray1(json,number,"posSum"));

			});
		}
		/*
        var resp = [{
            "name": "Jon Snow",
            "posSum": 60,
            "negSum": 21,
            "posCount": 11,
            "negCount": 5,
            "nullCount": 8
        },
            {
                "name": "Hodor",
                "posSum": 59,
                "negSum": 21,
                "posCount": 11,
                "negCount": 5,
                "nullCount": 8
            }
        ];
        */
    },
    /*
     Same as above but most hated
     */
    worstSentiment: function  (json, callback) {
		var number = json.number;
		var startDate = json.startDate;
		var endDate = json.endDate;
		//if (testDate(startDate,charName)){console.log('Error');return;}
		if (endDate === undefined){
			//mongodb api here, then handle the response from mongodb
			database.getSentimentTimeframe(startDate,startDate,function(json) {
				callback(getMostNFromArray1(json,number,"negSum"));
			});

		}
		else {
			//if(testDate(endDate,charName)){console.log('Error');return;}
			//mongodb api here, then handle the response from mongodb
			database.getSentimentTimeframe(startDate,endDate,function(json) {
				callback(getMostNFromArray1(json,number,"negSum"));
			});

		}
		/*
        var resp = [{
            "name": "Jon Snow",
            "posSum": 23,
            "negSum": 66,
            "posCount": 11,
            "negCount": 5,
            "nullCount": 8
        }
        ];
        */

    },
    /*
     Same as above but with most tweeted about
     */
    mostTalkedAbout: function (json, callback) {
		var number = json.number;
		var startDate = json.startDate;
		var endDate = json.endDate;
		//if (testDate(startDate,charName)){console.log('Error');return;}
		if (endDate === undefined){
			//mongodb api here, then handle the response from mongodb
			database.getSentimentTimeframe(startDate,startDate,function(json) {
				var resp = getMostNFromArray2(json,number,["posCount","negCount","nullCount"]);
				callback(resp);
			});

		}
		else {
			//if(testDate(endDate,charName)){console.log('Error');return;}
			//mongodb api here, then handle the response from mongodb
			database.getSentimentTimeframe(startDate,endDate,function(json) {
				var resp = getMostNFromArray2(json,number,["posCount","negCount","nullCount"]);
				callback(resp);
				});

		}
		/*
        var resp = [{
            "name": "Jon Snow",
            "posSum": 23,
            "negSum": 21,
            "posCount": 110,
            "negCount": 5,
            "nullCount": 8
        },
            {
                "name": "Hodor",
                "posSum": 23,
                "negSum": 21,
                "posCount": 11,
                "negCount": 5,
                "nullCount": 8
            }];
		 */


    },
    /*
     returns Characters, which have the highest difference between positive and negative sentiments. Ordered.
     Still same as above
     */
    topControversial: function (json, callback) {
		var number = json.number;
		var startDate = json.startDate;
		var endDate = json.endDate;
		//if (testDate(startDate,charName)){console.log('Error');return;}
		if (endDate === undefined){
			//mongodb api here, then handle the response from mongodb
			database.getSentimentTimeframe(startDate,startDate,function(json) {
				var resp = getMostNFromArray2(json,number,["posSum","negSum"]);
				callback(resp);
			});

		}
		else {
			//if(testDate(endDate,charName)){console.log('Error');return;}
			//mongodb api here, then handle the response from mongodb
			database.getSentimentTimeframe(startDate,endDate,function(json) {
				var resp = getMostNFromArray2(json,number,["posSum","negSum"]);
				callback(resp);
			});

		}
		/*
        var resp = [{
            "name": "Jon Snow",
            "posSum": 30,
            "negSum": 30,
            "posCount": 11,
            "negCount": 5,
            "nullCount": 8
        },
            {
                "name": "Hodor",
                "posSum": 23,
                "negSum": 21,
                "posCount": 11,
                "negCount": 5,
                "nullCount": 8
            }];
            */

    },
    /*
     returns sentiments for name from airing date and the week after on (season,episode).
     Input:
     {
     "name" : "Jon Snow",
     "season" : 1,
     "episode" : 1
     }
     */
    sentimentPerEpisode: function (json, callback) {
        var resp = {
            "name": json.name,
            "posSum": 23,
            "negSum": 21,
            "posCount": 11,
            "negCount": 5,
            "nullCount": 8
        };
        callback(resp);
    },
    /*
     run the twitter REST API for a character to fill the database with tweets. startDate can be 2 weeks
     in the past at most
     */

    runTwitterREST: function (characterName, startDate, callback) {
        twitterAPI.getRest(characterName, startDate, new Date(), false, callback);

    },
    /*
     runs the twitter streaming API to fill the database for a character and a duration in seconds
     */

    runTwitterStreaming: function (characterName, duration, callback) {
        twitterAPI.getStream(characterName, duration, false, callback);

    },
    /*
     Starts the automation for an optional amount of minutes, default is 12 minutes timeframe
     */

    startAutomation: function () {
        automation.startAutomation();

    },
    /*
     Stops the automation. Can be restarted again with startAutomation()
     */
    stopAutomation: function () {
        automation.stopAutomation();
    },

};