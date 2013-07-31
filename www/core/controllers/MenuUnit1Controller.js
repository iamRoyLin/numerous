function MenuUnit1Controller(view, params) {
	var params = {};
	
	params.starsEarned = [
		3,3,3,3,3,2,2,
		1,1,1,1,1,1,1,
		1,0,0,0,0
	]
	
	view.draw(params);
	
	this.GAMES = [
		{page:"GroupingGame", params:{goalNumber:11}},
		{page:"GroupingGame", params:{goalNumber:12}},
		{page:"GroupingGame", params:{goalNumber:13}},
		{page:"GroupingGame", params:{goalNumber:14}},
		{page:"GroupingGame", params:{goalNumber:15}},
		{page:"GroupingGame", params:{goalNumber:16}},
		{page:"GroupingGame", params:{goalNumber:17}},
		{page:"GroupingGame", params:{goalNumber:18}},
		{page:"GroupingGame", params:{goalNumber:19}},
		
		{page:"GroupingGame2", params:{goalNumber:14}},
		{page:"GroupingGame2", params:{goalNumber:16}},
		{page:"GroupingGame2", params:{goalNumber:17}},
		{page:"GroupingGame2", params:{goalNumber:18}},
		{page:"GroupingGame2", params:{goalNumber:19}},
		
		{page:"GroupingGame2", params:{goalNumber:13}},
		{page:"GroupingGame2", params:{goalNumber:15}},
		
		{page:"GroupingGame2", params:{goalNumber:11}},
		{page:"GroupingGame2", params:{goalNumber:12}},
		
		{page:"GroupingGamePractice", params:null}
	]
	
};

// destructor
MenuUnit1Controller.prototype.finalize = function() {
	
}

MenuUnit1Controller.prototype.back = function() {
	app.route("Menu");
};

MenuUnit1Controller.prototype.game = function(gameID) {
	var page = this.GAMES[gameID].page;
	var params = this.GAMES[gameID].params;
	
	app.route(page, params);
};
