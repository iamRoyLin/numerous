// This is the view logic of objective one, where the child user learns place value
var GroupingGameView = {};

// The stage to be instantiated in constructor
GroupingGameView.stage;
// The main layer (might be the only layer we need)
GroupingGameView.backgroundLayer;

// Number of eggs at the origin at the beginning
GroupingGameView.INITIAL_EGG_COUNT = 5;
// size of the eggs
GroupingGameView.INITIAL_EGG_DIMENSIONS = {width:60, height: 75};
// destination area of the eggs

GroupingGameView.INITIAL_EGG_RECTANGLE = {x:0.82, y:0.78, width: 0.1, height: 0.05};
GroupingGameView.INITIAL_EGG_SIZE = {width: 0.06, height: 0.093};

// The areas of the 'ones' belts that accepts the egg
GroupingGameView.BELT_ONES_AREA = {};
GroupingGameView.BELT_ONES_AREA.X_ARRAY =      [0.54, 0.48, 0.42, 0.36];
GroupingGameView.BELT_ONES_AREA.Y_ARRAY =      [0.56, 0.64, 0.72, 0.80];
GroupingGameView.BELT_ONES_AREA.RADIUS_ARRAY = [0.11, 0.11, 0.11, 0.11];

// The areas of the 'tens' belts that accepts the egg
GroupingGameView.BELT_TENS_AREA = {};
GroupingGameView.BELT_TENS_AREA.X_ARRAY =      [0.24, 0.18, 0.12];
GroupingGameView.BELT_TENS_AREA.Y_ARRAY =      [0.56, 0.64, 0.72];
GroupingGameView.BELT_TENS_AREA.RADIUS_ARRAY = [0.11, 0.11, 0.11];


// The destination locations where eggs will be locked in to
GroupingGameView.eggDestinationLocations = [
	{x:0.482, y: 0.460},
	{x:0.545, y: 0.460},
	
	{x:0.455, y: 0.513},
	{x:0.519, y: 0.513},
	
	{x:0.419, y: 0.566},
	{x:0.482, y: 0.566},
	
	{x:0.385, y: 0.619},
	{x:0.449, y: 0.619},
	
	{x:0.350, y: 0.675},
	{x:0.413, y: 0.675},
];

// Image Sources
GroupingGameView.sources = {};
GroupingGameView.sources.rabbit = "images/grouping_game/rabbit.png";
GroupingGameView.sources.belts = "images/grouping_game/belts.png";

GroupingGameView.sources.pauseButton = "images/widgets/pause_button.png";
GroupingGameView.sources.menuButton = "images/widgets/menu_button.png";
GroupingGameView.sources.restartButton = "images/widgets/restart_button.png";
GroupingGameView.sources.resumeButton = "images/widgets/resume_button.png";

GroupingGameView.sources.eggs = [
	"images/grouping_game/eggs/egg1.png",
	"images/grouping_game/eggs/egg2.png",
	"images/grouping_game/eggs/egg3.png",
	"images/grouping_game/eggs/egg4.png",
	"images/grouping_game/eggs/egg5.png",
	"images/grouping_game/eggs/egg6.png",
	"images/grouping_game/eggs/egg7.png",
	"images/grouping_game/eggs/egg8.png",
	"images/grouping_game/eggs/egg9.png"
];

// Images
GroupingGameView.images = {};

// As the images are loaded into memory, they will be accessible from this array
GroupingGameView.eggImageObjects = [];


GroupingGameView.initialize = function () {

	// clear variables
	GroupingGameView.eggsAtDestination = [];
	GroupingGameView.eggInitialLocations = [];
	GroupingGameView.eggCount = 0;


	
	
	// render the html view
	View.render("GroupingGameView");
	
	// setup view routing
	Controller.routeAnchor(".grouping_back", "LoginView", App.store);
	
	// Setup the stage
	GroupingGameView.stage = new Kinetic.Stage({
		container: "container",
		width: window.innerWidth,
		height: window.innerHeight
	});
	
	// Create the main layer and stage
	GroupingGameView.backgroundLayer = new Kinetic.Layer();
	GroupingGameView.stage.add(GroupingGameView.backgroundLayer);	
	
	// create the egg ones group
	GroupingGameView.eggOnesGroup = new Kinetic.Group({ x: 0, y: 0 });
	GroupingGameView.backgroundLayer.add(GroupingGameView.eggOnesGroup);	
	
	// Add images to the loader class
	var loader = new PxLoader();
	GroupingGameView.images.rabbit = loader.addImage(GroupingGameView.sources.rabbit);
	GroupingGameView.images.belts = loader.addImage(GroupingGameView.sources.belts);
	
	GroupingGameView.images.pauseButton = loader.addImage(GroupingGameView.sources.pauseButton);
	GroupingGameView.images.menuButton = loader.addImage(GroupingGameView.sources.menuButton);
	GroupingGameView.images.restartButton = loader.addImage(GroupingGameView.sources.restartButton);
	GroupingGameView.images.resumeButton = loader.addImage(GroupingGameView.sources.resumeButton);
	GroupingGameView.images.eggs = [];
	for (var i = 0; i < GroupingGameView.sources.eggs.length; i++) {
		GroupingGameView.images.eggs[i] = loader.addImage(GroupingGameView.sources.eggs[i]);
	}
	
	// Registers loaded() function, which gets called when images loaded into memory
	loader.addCompletionListener(GroupingGameView.loaded);
	
	// Starts loading all the images into memory
	loader.start();
}

// Should be called once graphics are loaded into memory
GroupingGameView.loaded = function () {
	// Draw the graphics components
	
	GroupingGameView.drawRabbit();
	GroupingGameView.drawBelts();
	GroupingGameView.drawPauseButton();
	GroupingGameView.drawEggs();
	
	GroupingGameView.stage.draw();
}

// Draws the rabbit
GroupingGameView.drawRabbit = function() {
	var rabbit = new Kinetic.Image({image: GroupingGameView.images.rabbit});
	WidgetUtil.glue(rabbit, {
		glueTop: false,
		glueLeft: false,
		width: 0.2,
		height: 0.5,
		dx: 0,
		dy: 0
	});
	GroupingGameView.backgroundLayer.add(rabbit);
}

// Draws the belts
GroupingGameView.drawBelts = function() {
	var belts = new Kinetic.Image({image: GroupingGameView.images.belts});
	WidgetUtil.glue(belts, {
		glueTop: true,
		glueLeft: true,
		width: 0.68,
		height: 0.813,
		dx: 0,
		dy: 0.187
	});
	GroupingGameView.backgroundLayer.add(belts);
}

GroupingGameView.drawPauseButton = function() {
	var pauseButton = new Kinetic.Image({image: GroupingGameView.images.pauseButton});
	WidgetUtil.glue(pauseButton, {
		glueTop: true,
		glueLeft: true,
		width: 0.09,
		height: 0.12,
		dx: 0.02,
		dy: 0.035
	});
	GroupingGameView.backgroundLayer.add(pauseButton);
	
	pauseButton.on('mouseover', function() {document.body.style.cursor = 'pointer'});
	pauseButton.on('mouseout', function() {document.body.style.cursor = 'default'});	
	
	pauseButton.on('click tap', function() {
		GroupingGameView.pause();
	});
	
}

// Draws eggs in a specified area
GroupingGameView.drawEggs = function() {

	for (var i=0; i<GroupingGameView.INITIAL_EGG_COUNT; i++) {
		GroupingGameView.drawNewEgg();
	}
	
	if (Env.debug) {
		// draw out the region ones
		for (var i = 0; i < GroupingGameView.BELT_ONES_AREA.RADIUS_ARRAY.length; i++) {
			var ellipse = new Kinetic.Ellipse({
				x: DimensionUtil.decimalToActualWidth(GroupingGameView.BELT_ONES_AREA.X_ARRAY[i]),
				y: DimensionUtil.decimalToActualHeight(GroupingGameView.BELT_ONES_AREA.Y_ARRAY[i]),
				radius: 
					{x:DimensionUtil.decimalToActualWidth(GroupingGameView.BELT_ONES_AREA.RADIUS_ARRAY[i]), 
					y:DimensionUtil.decimalToActualHeight(GroupingGameView.BELT_ONES_AREA.RADIUS_ARRAY[i])},
				stroke: 'red',
				strokeWidth: 6
			});
			GroupingGameView.backgroundLayer.add(ellipse);
		}
		
		// draws out the region for tens
		for (var i = 0; i < GroupingGameView.BELT_TENS_AREA.RADIUS_ARRAY.length; i++) {
			var ellipse = new Kinetic.Ellipse({
				x: DimensionUtil.decimalToActualWidth(GroupingGameView.BELT_TENS_AREA.X_ARRAY[i]),
				y: DimensionUtil.decimalToActualHeight(GroupingGameView.BELT_TENS_AREA.Y_ARRAY[i]),
				radius: 
					{x:DimensionUtil.decimalToActualWidth(GroupingGameView.BELT_TENS_AREA.RADIUS_ARRAY[i]), 
					y:DimensionUtil.decimalToActualHeight(GroupingGameView.BELT_TENS_AREA.RADIUS_ARRAY[i])},
				stroke: 'red',
				strokeWidth: 6
			});
			GroupingGameView.backgroundLayer.add(ellipse);
		}
	}
}

// Draws one egg in a specified area
GroupingGameView.drawNewEgg = function() {
	var egg = new Kinetic.Image({
		image: GroupingGameView.images.eggs[MathUtil.random(0, GroupingGameView.sources.eggs.length)],
		draggable: true
	});	
	
	egg.id = GroupingGameView.eggCount;	
	GroupingGameView.eggCount++;
	
	var xInit = MathUtil.random(GroupingGameView.INITIAL_EGG_RECTANGLE.x * 1000, (GroupingGameView.INITIAL_EGG_RECTANGLE.x + GroupingGameView.INITIAL_EGG_RECTANGLE.width)*1000)/1000;
	var yInit = MathUtil.random(GroupingGameView.INITIAL_EGG_RECTANGLE.y * 1000, (GroupingGameView.INITIAL_EGG_RECTANGLE.y + GroupingGameView.INITIAL_EGG_RECTANGLE.height)*1000)/1000;
	GroupingGameView.eggInitialLocations[egg.id] = {x:xInit, y:yInit};
	
	WidgetUtil.glue(egg, {
		width: GroupingGameView.INITIAL_EGG_SIZE.width,
		height: GroupingGameView.INITIAL_EGG_SIZE.height,
		dx: xInit,
		dy: yInit
	});
	
	// create touch hit region of only non-transparent pixels
	// Creates a weird region, fix and maybe add back in later
	// egg.createImageHitRegion(function() {GroupingGameView.backgroundLayer.draw()});
	
	// add cursor styling
	egg.on('mouseover', function() {document.body.style.cursor = 'pointer'});
	egg.on('mouseout', function() {document.body.style.cursor = 'default'});					
	
	egg.on('dragend', function() {
		// make it cover all other eggs.
		this.moveToTop();
		
		// accepts the egg at the destination if dropped close enough and not full or else return the egg to its starting position
		if (WidgetUtil.isNearPoints(this, GroupingGameView.BELT_ONES_AREA.X_ARRAY, GroupingGameView.BELT_ONES_AREA.Y_ARRAY, GroupingGameView.BELT_ONES_AREA.RADIUS_ARRAY)
				&& (GroupingGameView.eggsAtDestination.length != 10)) {
			GroupingGameView.acceptEgg(this);
		} else if (WidgetUtil.isNearPoints(this, GroupingGameView.BELT_ONES_AREA.X_ARRAY, GroupingGameView.BELT_ONES_AREA.Y_ARRAY, GroupingGameView.BELT_ONES_AREA.RADIUS_ARRAY)) {
			// decline the egg and also record an error
			GroupingGameView.declineEgg(this);
		} else {
			GroupingGameView.declineEgg(this);
		}
		
		if (GroupingGameView.eggsAtDestination.length == 4) {
			var tween = new Kinetic.Tween({
				node: GroupingGameView.eggOnesGroup, 
				duration: 2,
				x: 150,
				y: 150,
				//rotation: Math.PI * 10,
				//opacity: 1,
				//strokeWidth: 6,
				scaleX: 0.8,
				scaleY: 0.8,
				easing: Kinetic.Easings.Linear,
				//fillR: 0,
				//fillG: 0,
				//fillB: 255
			});
			tween.play();
		}
		
		
		
	});
	GroupingGameView.backgroundLayer.add(egg);
	return egg;
}


// accepts the egg and add it to the accepted array
GroupingGameView.acceptEgg = function(egg) {
	// make the egg not draggable
	egg.setDraggable(false);
	// move it to the right position
	var index = GroupingGameView.eggsAtDestination.length;

	// add it to the group
	GroupingGameView.eggOnesGroup.add(egg);
	
	egg.setX(DimensionUtil.decimalToActualWidth(GroupingGameView.eggDestinationLocations[index].x));
	egg.setY(DimensionUtil.decimalToActualHeight(GroupingGameView.eggDestinationLocations[index].y));
	
	
	GroupingGameView.stage.draw();
	// add it to the destination array
	GroupingGameView.eggsAtDestination.push(egg);
	
	// create another egg in its place
	var newEgg = GroupingGameView.drawNewEgg();
	GroupingGameView.stage.draw();
}

// declines the egg and move it back to its original spot
GroupingGameView.declineEgg = function(egg) {
	WidgetUtil.animateMove(egg, 0.4, GroupingGameView.eggInitialLocations[egg.id].x, GroupingGameView.eggInitialLocations[egg.id].y);
}

GroupingGameView.pauseWidgets = null;
GroupingGameView.pause = function() {

	// lazy loading
	if (GroupingGameView.pauseWidgets == null) {
		GroupingGameView.pauseWidgets = {};
		
		// overlay
		
		GroupingGameView.pauseWidgets.overlay = new Kinetic.Rect({
			fill: 'black',
			opacity: 0.62
		});
		WidgetUtil.glue(GroupingGameView.pauseWidgets.overlay, {
			glueTop: true,
			glueLeft: true,
			width: 1,
			height: 1,
			dx: 0,
			dy: 0
		});
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.overlay);		

		// resume button
		
		GroupingGameView.pauseWidgets.resumeButton = new Kinetic.Image({image: GroupingGameView.images.resumeButton});
		WidgetUtil.glue(GroupingGameView.pauseWidgets.resumeButton, {
			glueTop: true,
			glueLeft: true,
			width: 0.18,
			height: 0.28,
			dx: 0.21,
			dy: 0.42
		});
		GroupingGameView.pauseWidgets.resumeButton.on('click tap', function () {
			GroupingGameView.unpause();
		});
		
		
		// menu button
		
		GroupingGameView.pauseWidgets.menuButton = new Kinetic.Image({image: GroupingGameView.images.menuButton});
		WidgetUtil.glue(GroupingGameView.pauseWidgets.menuButton, {
			glueTop: true,
			glueLeft: true,
			width: 0.18,
			height: 0.28,
			dx: 0.41,
			dy: 0.42
		});
		GroupingGameView.pauseWidgets.menuButton.on('click tap', function () {
			
		});
		
		
		// restart button
		
		GroupingGameView.pauseWidgets.restartButton = new Kinetic.Image({image: GroupingGameView.images.restartButton});
		WidgetUtil.glue(GroupingGameView.pauseWidgets.restartButton, {
			glueTop: true,
			glueLeft: true,
			width: 0.18,
			height: 0.28,
			dx: 0.61,
			dy: 0.42
		});
		GroupingGameView.pauseWidgets.restartButton.on('click tap', function () {
			
		});
		
	
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.resumeButton);
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.menuButton);
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.restartButton);
	}
	
	GroupingGameView.pauseWidgets.overlay.show();
	GroupingGameView.pauseWidgets.overlay.moveToTop();
	
	GroupingGameView.pauseWidgets.resumeButton.show();
	GroupingGameView.pauseWidgets.resumeButton.moveToTop();
	
	GroupingGameView.pauseWidgets.menuButton.show();
	GroupingGameView.pauseWidgets.menuButton.moveToTop();
	
	GroupingGameView.pauseWidgets.restartButton.show();
	GroupingGameView.pauseWidgets.restartButton.moveToTop();
	
	GroupingGameView.stage.draw();
	
}

GroupingGameView.unpause = function() {
	GroupingGameView.pauseWidgets.overlay.hide();
	GroupingGameView.pauseWidgets.resumeButton.hide();
	GroupingGameView.pauseWidgets.menuButton.hide();
	GroupingGameView.pauseWidgets.restartButton.hide();
	GroupingGameView.stage.draw();
}

