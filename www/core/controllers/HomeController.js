var HomeController = new Class({

	initialize: function () {
		
		// Images. These will automatically be loaded
		this.images = {};
		this.images.background = "images/widgets/home_screen.png";
		this.images.playButton = "images/widgets/button_play.png";
		this.images.optionsButton = "images/widgets/button_options.png";
		
		this.sounds = {};
		this.sounds.background = "sounds/background_music/menu.mp3";
		this.sounds.select = "sounds/menu/menu_select.mp3";
		
	},

	start: function () {
		this.view = new HomeView(this);
		app.view = this.view;
		
		this.view.setImages(this.images);
		this.view.setSounds(this.sounds);
		
		music.playBackgroundMusic(this.sounds.background);
		
		this.view.draw();
	},

	// destructor
	finalize: function() {
		
	},

	play: function () {
		app.route("Menu");
	},

	settings: function() {
		app.route("Options");
	},
	
});
