function HomeController() {
	
	// Images. These will automatically be loaded
	this.images = {};
	this.images.background = "images/widgets/home_screen.png";
	this.images.playButton = "images/widgets/button_play.png";
	this.images.optionsButton = "images/widgets/button_options.png";
	
};

HomeController.prototype.initialize = function () {
	this.view = new HomeView(this);
	app.view = this.view;
	
	this.view.setImages(this.images);
	this.view.draw();
};

// destructor
HomeController.prototype.finalize = function() {
	
};

HomeController.prototype.play = function () {
	app.route("Menu");
};