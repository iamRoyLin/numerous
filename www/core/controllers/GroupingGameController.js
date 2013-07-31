function GroupingGameController(view, params) {

	if (params == null || params.goalNumber == null) {
		this.goalNumber = MathUtil.random(11,19);
	} else {
		this.goalNumber = params.goalNumber;
	}
	
	view.draw(this.goalNumber);
};

// destructor
GroupingGameController.prototype.finalize = function() {
	
}

GroupingGameController.prototype.restart = function(sameNumber) {
	if (sameNumber) {
		app.route("GroupingGame", {goalNumber:this.goalNumber});
	} else {
		app.route("GroupingGame");
	}
}

GroupingGameController.prototype.menu = function() {
	app.route("Menu");
}