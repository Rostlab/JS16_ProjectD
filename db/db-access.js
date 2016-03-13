var request = require('request');

/*
The callback function must take a date object as a parameter
*/
exports.airDate = function(season, episode, callback){
	//URL to the API provided by Project A
	var url = 'https://got-api.bruck.me/api/episodes/find';
	//Form includes the search criteria 
	var form =  {
		form: {
			'season': season,
			'nr' : episode
		}	
	};
	//Make POST request to API
	var answer = request.post(url,form, function(err, resp, body){
		if(!err && resp.statusCode === 200){
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
*/
exports.characterNames = function(callback){
	//URL to API by ProjectA
	var url = 'https://got-api.bruck.me/api/characters/';
	//Helper function to transform repsonce in JSON of names
	
	var answer = request.get(url, function(err, resp, body){
		if(!err && resp.statusCode === 200){
			var json = JSON.parse(body);
			var formatted = {};
			for ( var i=0;i<json.length;i++){
				formatted[i] = json[i].name;
			}				
		callback(formatted);
		}
	});
};
