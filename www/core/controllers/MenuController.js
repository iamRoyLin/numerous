function MenuController(view) {
	
	view.draw();
};

// destructor
MenuController.prototype.finalize = function() {
	
};

MenuController.prototype.play = function () {
	
};

MenuController.prototype.home = function () {
	app.route("Home");
};

MenuController.prototype.unitSelect = function(unit) {
	app.route("GroupingGame");
}