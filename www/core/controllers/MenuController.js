function MenuController() {

	// Images. These will automatically be loaded
	this.images = {};
	this.images.numerousTitle = "images/widgets/numerous_title.png";
	this.images.arrowLeft = "images/widgets/arrow_left.png";
	this.images.arrowRight = "images/widgets/arrow_right.png";
	this.images.homeButton = "images/widgets/button_back_to_home.png";
	
	this.images.unitLabels = [];
	this.images.unitPlayButtons = [];
	for(var i = 0; i < app.UNIT_GAMES.length; i++){
		this.images.unitLabels[i] = "images/widgets/label_unit" + (i+1) + ".png";
		this.images.unitPlayButtons[i] = "images/widgets/button_unit" + (i+1) + "_play.png";
	}
	
	// Sounds
	this.sounds = {};
	this.sounds.select = "sounds/menu/menu_select.mp3";
	
};

MenuController.prototype.initialize = function () {
	this.view = new MenuView(this);
	app.view = this.view;
	
	this.view.setImages(this.images);
	this.view.setSounds(this.sounds);
	this.view.draw();
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
	app.currentUnit = unit;
	app.route("MenuUnit");
}