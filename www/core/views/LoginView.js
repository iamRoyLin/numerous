var LoginView = {};

// Image Sources
LoginView.sources = {};
LoginView.sources.background = "images/widgets/home_screen.png";
LoginView.sources.playButton = "images/widgets/button_play.png";
LoginView.sources.optionsButton = "images/widgets/button_options.png";

// Images
LoginView.images = {};

// Sounds
LoginView.sounds = {};
LoginView.sounds.select = "sounds/menu/menu_select.wav";

//	Initialize login view
LoginView.initialize = function(store) {
	LoginView.store = store;
	View.render("LoginView");
	
	//$('body').on('keyup', '.search-key', LoginView.findByName)
	//LoginView.registerEvents();
	//Controller.routeAnchor(".login_linkToGroupingGame", "GroupingGameView", null);
	
	// Setup the stage
	LoginView.stage = new Kinetic.Stage({
		container: "container",
		width: window.innerWidth,
		height: window.innerHeight
	});
	
	// The main layer (might be the only layer we need)
	LoginView.backgroundLayer = new Kinetic.Layer();
	LoginView.stage.add(LoginView.backgroundLayer);	
	
	var loader = new PxLoader();
	LoginView.images.background = loader.addImage(LoginView.sources.background);
	LoginView.images.playButton = loader.addImage(LoginView.sources.playButton);
	LoginView.images.optionsButton = loader.addImage(LoginView.sources.optionsButton);
	
	// Registers loaded() function, which gets called when images loaded into memory
	loader.addCompletionListener(LoginView.loaded);
	
	// Starts loading all the images into memory
	loader.start();
}

LoginView.loaded = function () {
	// Call helper functionsthe to draw components
	LoginView.drawBackground();
	LoginView.drawButtons();
	
	// redraw all widgets
	LoginView.stage.draw();
}

LoginView.drawBackground = function() {
	var background = new Kinetic.Image({image: LoginView.images.background});
	WidgetUtil.glue(background, {
		glueTop: false,
		glueLeft: false,
		width: 1,
		height: 1,
		dx: 0,
		dy: 0
	});
	LoginView.backgroundLayer.add(background);
}

LoginView.drawButtons = function() {

	//play button
	var	playButton = new Kinetic.Image({image: LoginView.images.playButton});
	WidgetUtil.glue(playButton, {
		glueTop: true,
		glueLeft: true,
		width: 0.20,
		height: 0.28,
		dx: 0.23,
		dy: 0.45
	});
	LoginView.backgroundLayer.add(playButton);
	playButton.on('click tap', function () {
			Music.play(LoginView.sounds.select);
			MenuView.initialize();
	});
	
	//options button
	var	optionsButton = new Kinetic.Image({image: LoginView.images.optionsButton});
	WidgetUtil.glue(optionsButton, {
		glueTop: true,
		glueLeft: true,
		width: 0.20,
		height: 0.28,
		dx: 0.55,
		dy: 0.45
	});
	LoginView.backgroundLayer.add(optionsButton);
}

	

