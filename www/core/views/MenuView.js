var MenuView = {};

// Image Sources
MenuView.sources = {};
MenuView.sources.numerousTitle = "images/widgets/numerous_title.png";
MenuView.sources.objective1Title = "images/widgets/objective1_menu_title.png";

// Images
MenuView.images = {};

//	Initialize login view
MenuView.initialize = function() {
	View.render("MenuView");
	
	// Setup the stage
	MenuView.stage = new Kinetic.Stage({
		container: "container",
		width: window.innerWidth,
		height: window.innerHeight
	});
	
	// The main layer (might be the only layer we need)
	MenuView.backgroundLayer = new Kinetic.Layer();
	MenuView.stage.add(MenuView.backgroundLayer);	
	
	var loader = new PxLoader();
	MenuView.images.numerousTitle = loader.addImage(MenuView.sources.numerousTitle);
	MenuView.images.objectiveTitle = loader.addImage(MenuView.sources.objective1Title);
	
	// Registers loaded() function, which gets called when images loaded into memory
	loader.addCompletionListener(MenuView.loaded);
	
	// Starts loading all the images into memory
	loader.start();
}

MenuView.loaded = function () {
	// Call helper functionsthe to draw components
	
	// redraw all widgets
	MenuView.stage.draw();
}

MenuView.drawButtons = function() {


}

	

