function GroupingGameController(view, params) {

	if (params == null) {
		params = {};
	}
	
	// sets goal number
	this.goalNumber = params.goalNumber;
	if (this.goalNumber == null) this.goalNumber = MathUtil.random(11,19);
	
	// sets variation
	this.variation = params.variation;
	if (this.variation == null) this.variation = 1;
	
	
	// variations
	if (this.variation == 2 || this.variation == 3) {
		view.drawPacks();
	}	
	if (this.variation == 3 ) {
		this.goalNumber += MathUtil.random(0,9);
	}
	
	// tell the view to draw according to our number
	view.draw(this.goalNumber, this.variation);	
	


	
	
};

// destructor
GroupingGameController.prototype.finalize = function() {
	
};

GroupingGameController.prototype.restart = function(sameNumber) {
	app.route(app.getCurrentPage(), app.getCurrentPageParams());
};

GroupingGameController.prototype.menu = function() {
	app.route("MenuUnit");
};

GroupingGameController.prototype.nextGame = function() {
	if (app.nextGame()) {
		app.route(app.getCurrentPage(), app.getCurrentPageParams());
	} else {
		app.route("MenuUnit");
	}
};

