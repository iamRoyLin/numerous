function MenuUnitController() {

	// Images. These will automatically be loaded
	this.images = {};
	this.images.title = "images/menu_unit1/label_title.png";
	this.images.buttonBack = "images/menu_unit1/button_back.png";
	this.images.box = "images/menu_unit1/box.png";
	
	this.images.stars = [];
	for(var i = 0; i < 4; i++) {
		this.images.stars[i] = "images/menu_unit1/star" + i + ".png";
	}
	
	// Sounds
	this.sounds = {};

	// variables
	this.starsEarned = [
		3,3,3,3,3,2,2,
		1,1,1,1,1,1,1,
		1,0,0,0,0
	];
};

MenuUnitController.prototype.initialize = function () {
	this.view = new MenuUnitView(this);
	app.view = this.view;
	
	this.view.setImages(this.images);
	this.view.setSounds(this.sounds);
	
	this.view.drawTitle();
	this.view.drawButtonBack();
	this.view.drawBoxes(this.starsEarned);
	app.stage.draw();
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