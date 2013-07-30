var MenuView = {};

// Image Sources
MenuView.sources = {};
MenuView.sources.numerousTitle = "images/widgets/numerous_title.png";
MenuView.sources.arrowLeft = "images/widgets/arrow_left.png";
MenuView.sources.arrowRight = "images/widgets/arrow_right.png";
MenuView.sources.homeButton = "images/widgets/button_back_to_home.png";

// Sounds
MenuView.sounds = {};
MenuView.sounds.select = "sounds/menu/menu_select.wav";

// Number of Unit
MenuView.UNIT_COUNT = 4;

MenuView.sources.unitLabels = [];
MenuView.sources.unitPlayButtons = [];
for(var i = 0; i < MenuView.UNIT_COUNT; i++){
	MenuView.sources.unitLabels[i] = "images/widgets/label_unit" + (i+1) + ".png";
	MenuView.sources.unitPlayButtons[i] = "images/widgets/button_unit" + (i+1) + "_play.png";
}

// Images
MenuView.images = {};

//	Initialize login view
MenuView.initialize = function() {
	View.render("MenuView");
	
	// current unit that is showing
	MenuView.currentUnit = 0;
	
	
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
	
	MenuView.images.unitLabels = [];
	MenuView.images.unitPlayButtons = [];

	for(var i = 0; i < MenuView.UNIT_COUNT; i++){
		MenuView.images.unitLabels[i] = loader.addImage(MenuView.sources.unitLabels[i]);
		MenuView.images.unitPlayButtons[i] = loader.addImage(MenuView.sources.unitPlayButtons[i]);

	}
	
	MenuView.images.arrowLeft = loader.addImage(MenuView.sources.arrowLeft);
	MenuView.images.arrowRight = loader.addImage(MenuView.sources.arrowRight);
	MenuView.images.homeButton = loader.addImage(MenuView.sources.homeButton);
	
	// Registers loaded() function, which gets called when images loaded into memory
	loader.addCompletionListener(MenuView.loaded);
	
	// Starts loading all the images into memory
	loader.start();
}

MenuView.loaded = function () {
	// Call helper functionsthe to draw components
	MenuView.drawTitle();
	MenuView.drawArrows();
	MenuView.drawGroups();
	MenuView.leftArrow.hide();
	MenuView.drawHomeButton();
	// redraw all widgets
	MenuView.stage.draw();
}

MenuView.drawGroups = function() {
	MenuView.unitsGroupArray = [];
	for(var i = 0; i < MenuView.UNIT_COUNT; i++) {
		MenuView.unitsGroupArray[i] = new Kinetic.Group({});
		
		var myLabel = new Kinetic.Image({image: MenuView.images.unitLabels[i]});
		WidgetUtil.glue(myLabel, {
			width: 0.4,
			height: 0.14,
			dx: 0.28,
			dy: 0.15
		});
		MenuView.unitsGroupArray[i].add(myLabel);
		
		var myButton = new Kinetic.Image({image: MenuView.images.unitPlayButtons[i]});
		WidgetUtil.glue(myButton, {
			width: 0.33,
			height: 0.45,
			dx: 0.33,
			dy: 0.37
		});
		// Need to edit when the unit name is changed
		myButton.on('click tap', function () {
			Music.play(MenuView.sounds.select);
			GroupingGameView.initialize();
		});
		MenuView.unitsGroupArray[i].add(myButton);
		
		MenuView.backgroundLayer.add(MenuView.unitsGroupArray[i]);
		MenuView.unitsGroupArray[i].hide();
	}
	MenuView.unitsGroupArray[0].show();
}

MenuView.drawTitle = function() {
	var title = new Kinetic.Image({image: MenuView.images.numerousTitle});
	WidgetUtil.glue(title, {
		width: 0.35,
		height: 0.1,
		dx: 0.31,
		dy: 0.05
	});
	MenuView.backgroundLayer.add(title);
}

MenuView.drawHomeButton = function() {
	var button = new Kinetic.Image({image: MenuView.images.homeButton});
	WidgetUtil.glue(button, {
		width: 0.11,
		height: 0.12,
		dx: 0.05,
		dy: 0.05
	});
	MenuView.backgroundLayer.add(button);
	button.on('click tap', function () {
		Music.play(MenuView.sounds.select);
		LoginView.initialize();
	});
}

MenuView.selectUnitCallback = function() {
	if (MenuView.currentUnit == 0){
		MenuView.leftArrow.hide();
	}else if(MenuView.currentUnit == MenuView.UNIT_COUNT-1){
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
		width: 0.1,
		height: 0.22,
		dx: 0.1,
		dy: 0.5
	});
	
	MenuView.leftArrow.on('click tap', function () {
		Music.play(MenuView.sounds.select);
		MenuView.leftClick();
	});
	
	MenuView.backgroundLayer.add(MenuView.leftArrow);
}	

MenuView.drawRightArrow = function() {
	MenuView.rightArrow = new Kinetic.Image({image: MenuView.images.arrowRight});
	WidgetUtil.glue(MenuView.rightArrow, {
		width: 0.1,
		height: 0.22,
		dx: 0.8,
		dy: 0.5
	});
	
	MenuView.rightArrow.on('click tap', function () {
		Music.play(MenuView.sounds.select);
		MenuView.rightClick();
	});
	
	MenuView.backgroundLayer.add(MenuView.rightArrow);
}

MenuView.leftClick = function () {
	var preUnit = MenuView.currentUnit-1;
	var preGroup = MenuView.unitsGroupArray[preUnit];
	var currentGroup = MenuView.unitsGroupArray[MenuView.currentUnit];
	
	preGroup.setOpacity(0);
	preGroup.setX(DimensionUtil.decimalToActualWidth(-0.35));
	preGroup.show();
	
	var tweenIn = new Kinetic.Tween({
		node: preGroup,
		duration: 0.5,
		x: 0,
		opacity: 1
	});
	tweenIn.play();
	
	var tweenOut = new Kinetic.Tween({
		node: currentGroup,
		duration: 0.5,
		x: DimensionUtil.decimalToActualWidth(0.35),
		opacity: 0,
		//Check
		onFinish: function () {
			currentGroup.hide();
		}
	});
	tweenOut.play();
	MenuView.currentUnit--;
	MenuView.selectUnitCallback();
}
MenuView.rightClick = function () {
	var nextUnit = MenuView.currentUnit+1;
	var nextGroup = MenuView.unitsGroupArray[nextUnit];
	var currentGroup = MenuView.unitsGroupArray[MenuView.currentUnit];
	
	nextGroup.setOpacity(0);
	nextGroup.setX(DimensionUtil.decimalToActualWidth(0.35));
	nextGroup.show();
	
	var tweenIn = new Kinetic.Tween({
		node: nextGroup,
		duration: 0.5,
		x: 0,
		opacity: 1
	});
	tweenIn.play();
	
	var tweenOut = new Kinetic.Tween({
		node: currentGroup,
		duration: 0.5,
		x: DimensionUtil.decimalToActualWidth(-0.35),
		opacity: 0,
		//Check
		onFinish: function () {
			currentGroup.hide();
		}
	});
	tweenOut.play();
	MenuView.currentUnit++;
	MenuView.selectUnitCallback();
}


