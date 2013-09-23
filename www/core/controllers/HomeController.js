function HomeController() {
	
	// Images. These will automatically be loaded
	this.images = {};
	this.images.background = "images/widgets/home_screen.png";
	this.images.playButton = "images/widgets/button_play.png";
	this.images.optionsButton = "images/widgets/button_options.png";
	
	this.sounds = {};
	this.sounds.background = "sounds/background_music/menu.mp3";
	this.sounds.select = "sounds/menu/menu_select.mp3";
	
};

HomeController.prototype.initialize = function () {
	this.view = new HomeView(this);
	app.view = this.view;
	
	this.view.setImages(this.images);
	this.view.setSounds(this.sounds);
	
	music.playBackgroundMusic(this.sounds.background);
	
	this.view.draw();
};

// destructor
HomeController.prototype.finalize = function() {
	
};

HomeController.prototype.play = function () {
	app.route("Menu");
};

HomeController.prototype.settings = function() {
	app.route("Options");
};
