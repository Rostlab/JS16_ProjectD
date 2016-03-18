var should= require('should');
var api = require ('../index.js'); //In index.js should be the export method. TODO

describe('API gets tested', function (){
	var nameCol = ['Jon Snow', 'Tyrion Lennister', 'Daenery Targaryen', 'Arya Stark', 'Khal Drogo', 'Joffrey Baratheon'],//automation... but needs approval if something in the DB exists.
		date = new Date();
	describe.skip('#getSentimentForName(name,date): ',function(){
		context('Name is present and on the Specific day exists a Tweet',function(){
			
			for (var i=0; i<nameCol.length-1;i+=1){
				it('posSent should be positiv', function (){
					api.getSentimentForName(nameCol[i], date).posSent.should.be.aboveOrEqual(0);
				});
				it('negSent should be negativ',function(){
					api.getSentimentForName(nameCol[i],date).negSent.should.be.belowOrEqual(0);
				});
				it('Number of Twitter should be at least 1 - or it should have thrown',function(){
					api.getSentimentForName(nameCol[i],date).numTweets.should.be.aboveOrEqual(1);
				});
			}

		});
		context('name is not present',function (){
			it('should throw an SearchException',function(){
				(function (){
					api.getSentimentForName('Donald Trump', new Date(2016,2,16));
				}).should.throw("This is not a GoT-Character",{date:new Date(2016,2,16), searchedName:'Donald Trump'});
			});
		});
		context('No Data exists for this date', function (){
			it ('should throw an SearchException',function (){
				(function (){
					api.getSentimentForName('Jon Snow', new Date(1990,1,1));
				}).should.throw("For this date does no Twitterdata exist",{date:new Date(1990,1,1),searchedName: 'Jon Snow'});
			});
		});
	});
	describe.skip('#getSentimentForNameTimeframe (name,startDate,endDate): ',function(){

	});
	describe.skip('#topSentiment(num, startDate,endDate',function(){

	});
	describe.skip('#worstSentiment(num, startDate,endDate): ',function() {

	});
	describe.skip('#mostTalkedAbout(number,startDate, endDate): ',function(){

	});
	describe.skip('#topControversial(number,startDate, endDate): ',function(){

	});
	describe.skip('#sentimentForEpisode(name,season,episode): ',function(){

	});
	describe.skip('#runTwitterAPI(char, startDate: ',function(){

	});
	describe.skip('#runStreamingAPI(char, time): ',function() {

	});
});