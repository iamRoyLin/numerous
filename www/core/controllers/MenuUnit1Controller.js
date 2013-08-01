function MenuUnit1Controller(view, params) {
	var params = {};
	
	params.starsEarned = [
		3,3,3,3,3,2,2,
		1,1,1,1,1,1,1,
		1,0,0,0,0
	]
	
	view.draw(params);
	
	this.GAMES = [
		{page:"GroupingGame", params:{goalNumber:11, nextPage: "GroupingGame", nextParams:{goalNumber:12}}},
		{page:"GroupingGame", params:{goalNumber:12, nextPage: "GroupingGame", nextParams:{goalNumber:13}}},
		{page:"GroupingGame", params:{goalNumber:13, nextPage: "GroupingGame", nextParams:{goalNumber:14}}},
		{page:"GroupingGame", params:{goalNumber:14, nextPage: "GroupingGame", nextParams:{goalNumber:15}}},
		{page:"GroupingGame", params:{goalNumber:15, nextPage: "GroupingGame", nextParams:{goalNumber:16}}},
		{page:"GroupingGame", params:{goalNumber:16, nextPage: "GroupingGame", nextParams:{goalNumber:17}}},
		{page:"GroupingGame", params:{goalNumber:17, nextPage: "GroupingGame", nextParams:{goalNumber:18}}},
		{page:"GroupingGame", params:{goalNumber:18, nextPage: "GroupingGame", nextParams:{goalNumber:19}}},
		{page:"GroupingGame", params:{goalNumber:19, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:14}}},
		
		{page:"GroupingGame", params:{variation: 2, goalNumber:14, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:16}}},
		{page:"GroupingGame", params:{variation: 2, goalNumber:16, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:17}}},
		{page:"GroupingGame", params:{variation: 2, goalNumber:17, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:18}}},
		{page:"GroupingGame", params:{variation: 2, goalNumber:18, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:19}}},
		{page:"GroupingGame", params:{variation: 2, goalNumber:19, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:13}}},
		
		{page:"GroupingGame", params:{variation: 2, goalNumber:13, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:15}}},
		{page:"GroupingGame", params:{variation: 2, goalNumber:15, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:11}}},
		
		{page:"GroupingGame", params:{variation: 2, goalNumber:11, nextPage: "GroupingGame", nextParams:{variation: 2, goalNumber:12}}},
		{page:"GroupingGame", params:{variation: 2, goalNumber:12, nextPage: "GroupingGamePractice", nextParams: null}},
		
		{page:"GroupingGamePractice", params:{nextPage: null, nextParams: null}}
	];
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
