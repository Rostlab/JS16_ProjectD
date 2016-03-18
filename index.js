//Feel free to change everything :-)
	function SearchError(text, date, searchedName){
		this.name='SearchError';
		this.message=text || 'Some Failure happpened while searching for a SentimentAnalyses';
		this.stack= (new Error()).stack;
		this.date= date;
		this.searchedName= searchedName;
	}
	SearchError.prototype= Object.create(Error.prototype);
	SearchError.prototype.constructor= SearchError;
module.exports={

		// returns {posSent: Number, negSent:Number, numTweets:Number}
	getSentimentForName: function(name,date){
		//TODO
		return null;		
	},
	//returns Analysis over a timeframe (same as above)
	getSentimentForNameTimeframe: function(name, startDate,endDate){
		//TODO
		return null;
	},
	//returns Array of names, which are most loved. with length=number. Ordered!
	topSentiment: function(number, startDate,endDate){
		//TODO
		return null;
	},
	//returns Array of most hated Characternames. Ordered.
	worstSentiment: function(number, startDate, endDate){
		//TODO
		return null;
	},
	//returns Array of Characters, where the most Tweets exist in a certain Timeframe. Ordered!
	mostTalkedAbout: function(number,startDate, endDate){
		//TODO
		return null;
	},
	//returns Characters, which have the highest difference between positive and negative sentiments. Ordered.
	topControversial: function(number, startDate,endDate){
		//TODO
		return null;
	},
	//returns sentiments for name from airing date and the week after on (season,episode).
	sentimentPerEpisode: function(name, season, episode){
		//TODO
		return null;
	},
	//runs the REST API to collect all tweets from the startDate until now 
	runTwitterAPI: function(char,startDate){
		//TODO
		return null;
	},
	//runs the streaming API for time seconds
	runStreamingAPI: function(char,time) {
		//TODO
		return null;
	}
};