function GroupingGameController(view, params) {

	if (params == null) {
		params = {};
	}

	this.nextPage = params.nextPage;
	this.nextParams = params.nextParams;
	
	// sets goal number
	this.goalNumber = params.goalNumber;
	if (this.goalNumber == null) this.goalNumber = MathUtil.random(11,19);
	
	// sets variation
	this.variation = params.variation;
	if (this.variation == null) this.variation = 1;
	
	// tell the view to draw according to our number
	view.draw(this.goalNumber, this.variation);	
	
	// the first variation of the game
	if (this.variation == 1) {
		
	}
	
	// the second variation of the game
	if (this.variation == 2) {
		view.drawPacks();
	}
	
	
};

// destructor
GroupingGameController.prototype.finalize = function() {
	
};

GroupingGameController.prototype.restart = function(sameNumber) {
	if (sameNumber) {
		app.route("GroupingGame", {goalNumber:this.goalNumber});
	} else {
		app.route("GroupingGame");
	}
};

GroupingGameController.prototype.menu = function() {
	app.route("MenuUnit1");
};

GroupingGameController.prototype.nextGame = function() {
	app.route(this.nextPage, this.nextParams);
};