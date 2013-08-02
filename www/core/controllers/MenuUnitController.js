function MenuUnitController(view, params) {
	var params = {};
	
	params.starsEarned = [
		3,3,3,3,3,2,2,
		1,1,1,1,1,1,1,
		1,0,0,0,0
	]
	
	view.draw(params);
};

// destructor
MenuUnitController.prototype.finalize = function() {
	
}

MenuUnitController.prototype.back = function() {
	app.route("Menu");
};

MenuUnitController.prototype.game = function(gameID) {
	app.currentGame = gameID;

	var page = app.UNIT_GAMES[app.currentUnit][app.currentGame].page;
	var params = app.UNIT_GAMES[app.currentUnit][app.currentGame].params;
	
	app.route(page, params);
};
