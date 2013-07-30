var MenuView = {};

// Image Sources
MenuView.sources = {};
MenuView.sources.numerousTitle = "images/widgets/numerous_title.png";
MenuView.sources.arrowLeft = "images/widgets/arrow_left.png";
MenuView.sources.arrowRight = "images/widgets/arrow_right.png";

// Number of Unit
MenuView.UNIT_COUNT = 4;

MenuView.sources.unitLabels = [];
MenuView.sources.unitPlayButtons = [];
for(var i = 0; i < MenuView.UNIT_COUNT; i++){
		var j = i+1;
		MenuView.sources.unitLabels[i] = "images/widgets/label_unit" + j + ".png";
		MenuView.sources.unitPlayButtons[i] = "images/widgets/button_unit" + j + "_play.png";
}

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
	
	
	//Index of the unit
	MenuView.indexOfUnit = 1;

	// The main layer (might be the only layer we need)
	MenuView.backgroundLayer = new Kinetic.Layer();
	MenuView.stage.add(MenuView.backgroundLayer);	
	
	var loader = new PxLoader();
	MenuView.images.numerousTitle = loader.addImage(MenuView.sources.numerousTitle);
	
	MenuView.images.unitLabels = [];
	MenuView.images.unitPlayButtons = [];

	for(var i = 0; i < MenuView.UNIT_COUNT; i++){
		MenuView.images.unitLabels[i] = loader.addImage(MenuView.sources.unitLabels[i]);
		MenuView.images.unitPlayButtons[i] = loader.addImage(MenuView.sources.unitPlayButtons[i]);

	}
	
	MenuView.images.unit1Label = loader.addImage(MenuView.sources.unit1Label);
	MenuView.images.unit1Play = loader.addImage(MenuView.sources.unit1Play);
	MenuView.images.unit2Label = loader.addImage(MenuView.sources.unit2Label);
	MenuView.images.unit2Play = loader.addImage(MenuView.sources.unit2Play);
	MenuView.images.unit3Label = loader.addImage(MenuView.sources.unit3Label);
	MenuView.images.unit3Play = loader.addImage(MenuView.sources.unit3Play);
	MenuView.images.unit4Label = loader.addImage(MenuView.sources.unit4Label);
	MenuView.images.unit4Play = loader.addImage(MenuView.sources.unit4Play);
	
	MenuView.images.arrowLeft = loader.addImage(MenuView.sources.arrowLeft);
	MenuView.images.arrowRight = loader.addImage(MenuView.sources.arrowRight);
	
	MenuView.unitsArray = [];
	
	for(var i = 0; i < MenuView.UNIT_COUNT; i++) {
		MenuView.unitsArray[i] = new Kinetic.Group({});
	}
	
	// Registers loaded() function, which gets called when images loaded into memory
	loader.addCompletionListener(MenuView.loaded);
	
	// Starts loading all the images into memory
	loader.start();
}

MenuView.loaded = function () {
	// Call helper functionsthe to draw components
	MenuView.drawTitle();
	MenuView.drawArrows();
	//MenuView.leftArrow.hide();
	// redraw all widgets
	MenuView.stage.draw();
}

MenuView.drawTitle = function() {
	var title = new Kinetic.Image({image: MenuView.images.numerousTitle});
	WidgetUtil.glue(title, {
		glueTop: true,
		glueLeft: true,
		width: 0.3,
		height: 0.1,
		dx: 0.33,
		dy: 0.05
	});
	MenuView.backgroundLayer.add(title);
}

MenuView.selectUnitCallback = function() {
	if (MenuView.indexOfUnit == 1){
		MenuView.leftArrow.hide();
	}else if(MenuView.indexOfUnit == 4){
		MenuView.rightArrow.hide();
	}else{
		MenuView.leftArrow.show();
		MenuView.rightArrow.show();
	}
	
}

MenuView.drawArrows = function() {
	MenuView.drawLeftArrow();
	MenuView.drawRightArrow();
}

MenuView.drawLeftArrow = function() {
	MenuView.leftArrow = new Kinetic.Image({image: MenuView.images.arrowLeft});
	WidgetUtil.glue(MenuView.leftArrow, {
		glueTop: true,
		glueLeft: true,
		width: 0.1,
		height: 0.22,
		dx: 0.1,
		dy: 0.4
	});
	MenuView.backgroundLayer.add(MenuView.leftArrow);
}	

MenuView.drawRightArrow = function() {
	MenuView.rightArrow = new Kinetic.Image({image: MenuView.images.arrowRight});
	WidgetUtil.glue(MenuView.rightArrow, {
		glueTop: true,
		glueLeft: true,
		width: 0.1,
		height: 0.22,
		dx: 0.8,
		dy: 0.4
	});
	MenuView.backgroundLayer.add(MenuView.rightArrow);
}

