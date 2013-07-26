// This is the view logic of objective one, where the child user learns place value
var GroupingGameView = {};

// The stage to be instantiated in constructor
GroupingGameView.stage;
// The main layer (might be the only layer we need)
GroupingGameView.backgroundLayer;

// Number of eggs at the origin at the beginning
GroupingGameView.INITIAL_EGG_COUNT = 50;
// size of the eggs
GroupingGameView.INITIAL_EGG_DIMENSIONS = {width:60, height: 75};
// destination area of the eggs

GroupingGameView.INITIAL_EGG_RECTANGLE = {x:0.70, y:0.68, width: 0.2, height: 0.05};
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

//Objective 1 numbers in words and respective number
/*GroupingGameView.NumberMap = {
	11 : {value: 11, name: "Eleven"},
	12 : {value: 12, name: "Twelve"},
	13 : {value: 13, name: "Thirteen"},
	14 : {value: 14, name: "Fourteen"},
	15 : {value: 15, name: "Fifteen"},
	16 : {value: 16, name: "Sixteen"},
	17 : {value: 17, name: "Seventeen"},
	18 : {value: 18, name: "Eighteen"},
	19 : {value: 19, name: "Nineteen"}
};*/
GroupingGameView.NumberInWords = [];
GroupingGameView.NumberInWords[11] = "ELEVEN";
GroupingGameView.NumberInWords[12] = "TWELVE";
GroupingGameView.NumberInWords[13] = "THIRTEEN";
GroupingGameView.NumberInWords[14] = "FOURTEEN";
GroupingGameView.NumberInWords[15] = "FIFTEEN";
GroupingGameView.NumberInWords[16] = "SIXTEEN";
GroupingGameView.NumberInWords[17] = "SEVENTEEN";
GroupingGameView.NumberInWords[18] = "EIGHTEEN";
GroupingGameView.NumberInWords[19] = "NINETEEN";
// The destination locations where eggs will be locked in to
GroupingGameView.eggDestinationLocations = [
	{x:0.470, y: 0.465},
	{x:0.532, y: 0.465},
	
	{x:0.431, y: 0.526},
	{x:0.495, y: 0.526},
	
	{x:0.395, y: 0.585},
	{x:0.458, y: 0.585},
	
	{x:0.356, y: 0.648},
	{x:0.420, y: 0.648},
	
	{x:0.315, y: 0.710},
	{x:0.378, y: 0.710},
];

// Image Sources
GroupingGameView.sources = {};
GroupingGameView.sources.rabbit = "images/grouping_game/rabbit.png";
GroupingGameView.sources.belts = "images/grouping_game/belts.png";
GroupingGameView.sources.cover = "images/grouping_game/cover.png";
GroupingGameView.sources.coverFront = "images/grouping_game/cover_front.png";
GroupingGameView.sources.coverBack = "images/grouping_game/cover_back.png";
GroupingGameView.sources.tray = "images/grouping_game/tray.png";

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
	GroupingGameView.tensCount = 0;

	//create a random goal number between 11 and 19
	GroupingGameView.goalNumber = MathUtil.random(11,19);
	
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
	GroupingGameView.images.tray = loader.addImage(GroupingGameView.sources.tray);
	GroupingGameView.images.cover = loader.addImage(GroupingGameView.sources.cover);
	GroupingGameView.images.coverFront = loader.addImage(GroupingGameView.sources.coverFront);
	GroupingGameView.images.coverBack = loader.addImage(GroupingGameView.sources.coverBack);
	
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
	GroupingGameView.drawTrays();
	GroupingGameView.drawPauseButton();
	GroupingGameView.drawEggs();
	GroupingGameView.drawNumbers();	
	GroupingGameView.drawTitle();
	GroupingGameView.eggOnesGroup.moveToTop();
	
	GroupingGameView.stage.draw();
	
}

GroupingGameView.drawTrays = function() {
	GroupingGameView.trays = {};
	
	// tray current
	
	GroupingGameView.trays.current = new Kinetic.Image({image: GroupingGameView.images.tray});
	WidgetUtil.glue(GroupingGameView.trays.current, {
		glueTop: true,
		glueLeft: true,
		width: 0.395,
		height: 0.42,
		dx: 0.25,
		dy: 0.415
	});
	GroupingGameView.eggOnesGroup.add(GroupingGameView.trays.current);
	
	// tray next
	
	GroupingGameView.trays.next = new Kinetic.Image({image: GroupingGameView.images.tray});
	WidgetUtil.glue(GroupingGameView.trays.next, {
		glueTop: true,
		glueLeft: true,
		width: 0.395,
		height: 0.42,
		dx: 0.05,
		dy: 0.71
	});
	GroupingGameView.backgroundLayer.add(GroupingGameView.trays.next);
	
	
}


// Draws the rabbit
GroupingGameView.drawRabbit = function() {
	var rabbit = new Kinetic.Image({image: GroupingGameView.images.rabbit});
	WidgetUtil.glue(rabbit, {
		glueTop: false,
		glueLeft: false,
		width: 0.3,
		height: 0.8,
		dx: 0.03,
		dy: 0.01
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
	
	egg.on('dragstart', function() {
		// make it cover all other eggs.
		this.moveToTop();
	});
	
	egg.on('dragend', function() {
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
		
		// If we reach 10 eggs in our tray
		if (GroupingGameView.eggsAtDestination.length == 1) {
			GroupingGameView.trayOnesFullCallback();
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
	egg.remove();
	GroupingGameView.eggOnesGroup.add(egg);
	egg.moveToTop();
	
	egg.setX(DimensionUtil.decimalToActualWidth(GroupingGameView.eggDestinationLocations[index].x));
	egg.setY(DimensionUtil.decimalToActualHeight(GroupingGameView.eggDestinationLocations[index].y));
	
	
	GroupingGameView.stage.draw();
	// add it to the destination array
	GroupingGameView.eggsAtDestination.push(egg);
	
	// create another egg in its place
	var newEgg = GroupingGameView.drawNewEgg();
	
	// increase number of eggs
	var ones = GroupingGameView.eggsAtDestination.length;
	if (ones != 10){
		GroupingGameView.onesTextWidget.setText(ones);
	}else{
		GroupingGameView.onesTextWidget.setText(0);
		GroupingGameView.tensCount ++;
	}
	GroupingGameView.tensTextWidget.setText(GroupingGameView.tensCount);
	
	GroupingGameView.stage.draw();
}

// declines the egg and move it back to its original spot
GroupingGameView.declineEgg = function(egg) {
	WidgetUtil.animateMove(egg, 0.4, GroupingGameView.eggInitialLocations[egg.id].x, GroupingGameView.eggInitialLocations[egg.id].y);
}


GroupingGameView.trayOnesFullCallback = function() {
	
	// The cover is separated into two parts front (the part that are in front of the eggs) and the back (parts behind the eggs)
	
	// Draw the cover's front
	var coverFront = new Kinetic.Image({image: GroupingGameView.images.coverFront});
	WidgetUtil.glue(coverFront, {
		glueTop: true,
		glueLeft: true,
		width: 0.395,
		height: 0.42,
		dx: 0.25,
		dy: -0.415
	});
	GroupingGameView.eggOnesGroup.add(coverFront);
	coverFront.moveToTop();
	
	// Draw the cover's back
	var coverBack = new Kinetic.Image({image: GroupingGameView.images.coverBack});
	WidgetUtil.glue(coverBack, {
		glueTop: true,
		glueLeft: true,
		width: 0.395,
		height: 0.42,
		dx: 0.25,
		dy: -0.415
	});
	GroupingGameView.eggOnesGroup.add(coverBack);
	coverBack.moveToBottom();
	
	// redraw the stage
	GroupingGameView.stage.draw();
	
	var dropCoverFrontTween = new Kinetic.Tween({
		node: coverFront,
		duration: 2,
		x: DimensionUtil.decimalToActualWidth(0.25),
		y: DimensionUtil.decimalToActualHeight(0.415),
	});
	var dropCoverBackTween = new Kinetic.Tween({
		node: coverBack,
		duration: 2,
		x: DimensionUtil.decimalToActualWidth(0.25),
		y: DimensionUtil.decimalToActualHeight(0.415),
	});
	dropCoverFrontTween.play();
	dropCoverBackTween.play();
	
	setTimeout(function() {
		var liftTween = new Kinetic.Tween({
			node: GroupingGameView.eggOnesGroup, 
			y: DimensionUtil.decimalToActualHeight(-0.2)
		});
		liftTween.play();
	}, 2000);

	
/*
	var tween = new Kinetic.Tween({
		node: GroupingGameView.eggOnesGroup, 
		duration: 2,
		x: DimensionUtil.decimalToActualWidth(0.45),
		y: DimensionUtil.decimalToActualHeight(0.45),
		
		scaleX: 0.5,
		scaleY: 0.5,
		
		//rotation: Math.PI * 10,
		//opacity: 1,
		//strokeWidth: 6,
		
		
		easing: Kinetic.Easings.Linear,
		//fillR: 0,
		//fillG: 0,
		//fillB: 255
	});
	//tween.play();
*/
}



GroupingGameView.drawNumbers = function() {
	//add number of ones
	GroupingGameView.onesTextWidget = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.52),
		y: DimensionUtil.decimalToActualHeight(0.28),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
    	text: 0,
    	fontSize: 110,
    	fontFamily: 'COMIC SANS MS',
    	fill: 'black'
    });
	GroupingGameView.backgroundLayer.add(GroupingGameView.onesTextWidget);
	
	//add number of tens
    GroupingGameView.tensTextWidget = new Kinetic.Text({
    	x: DimensionUtil.decimalToActualWidth(0.26),
		y: DimensionUtil.decimalToActualHeight(0.28),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
    	text: 0,
    	fontSize: 110,
    	fontFamily: 'COMIC SANS MS',
    	fill: 'black'
    });
    GroupingGameView.backgroundLayer.add(GroupingGameView.tensTextWidget);
}

GroupingGameView.drawTitle = function() {
	var title = GroupingGameView.NumberInWords[GroupingGameView.goalNumber];
	 GroupingGameView.titleTextWidget = new Kinetic.Text({
    	x: DimensionUtil.decimalToActualWidth(0.15),
		y: DimensionUtil.decimalToActualHeight(0.02),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
    	text: title,
    	fontSize: 110,
    	fontFamily: 'COMIC SANS MS',
    	fill: 'black'
    });
    GroupingGameView.backgroundLayer.add(GroupingGameView.titleTextWidget);
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


