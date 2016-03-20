var should= require('should');
var api = require ('../index.js'); //In index.js should be the export method. TODO

describe('API gets tested', function (){
	var nameCol = ['Jon Snow', 'Tyrion Lennister', 'Daenery Targaryen', 'Arya Stark', 'Khal Drogo', 'Joffrey Baratheon'],//automation... but needs approval if something in the DB exists.
		date = new Date();

//Testing test....
	describe('#getSentimentForName(name,date): ',function(){
		context('Name is present and on the Specific day exists a Tweet',function(){
			it('should return the specified JSON in a callback',function(done){
				var json = {"characterName":"Jon Snow", "date": (new Date()).toISOString()};
				api.getSentimentForName(json,function(json,err){
					if (err) throw err;
					json.characterName.should.be.equal('Jon Snow');
					done();
				});
			});
		});




//********************************************
//TODO
		context.skip('name is not present',function (){
			it('should throw an SearchException',function(){
				(function (){
					api.getSentimentForName('Donald Trump', new Date(2016,2,16));
				}).should.throw("This is not a GoT-Character",{date:new Date(2016,2,16), searchedName:'Donald Trump'});
			});
		});
		context.skip('No Data exists for this date', function (){
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