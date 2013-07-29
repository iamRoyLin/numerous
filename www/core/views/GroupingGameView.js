// This is the view logic of objective one, where the child user learns place value
var GroupingGameView = {};

// Number of eggs at the origin at the beginning
GroupingGameView.INITIAL_EGG_COUNT = 50;
// size of the eggs
GroupingGameView.INITIAL_EGG_DIMENSIONS = {width:60, height: 75};
// destination area of the eggs

// rabbit
GroupingGameView.RABBIT_DIMENSIONS = {x:0.03, y:0.01, width:0.3, height:0.8};

// belt
GroupingGameView.BELT_DIMENSIONS = {x:0, y:0.187, width:0.68, height:0.813};

// Initial egg positions
GroupingGameView.INITIAL_EGG_RECTANGLE = {x:0.70, y:0.68, width:0.2, height:0.05};
GroupingGameView.INITIAL_EGG_SIZE = {width:0.06, height:0.093};

// Tray and cover sizes and positions
GroupingGameView.TRAY_SIZE = {width:0.395, height:0.42};
GroupingGameView.TRAY_CURRENT_POSITION = {x:0.25, y:0.415};
GroupingGameView.TRAY_NEXT_POSITION = {x:0.05, y:0.71};
GroupingGameView.TRAY_BELOW_NEXT_POSITION = {x:-0.15, y:1.005};
GroupingGameView.INITIAL_COVER_POSITION = {x:0.25, y:-0.415};

// buttons and labels
GroupingGameView.PAUSE_BUTTON_DIMENSIONS = {x:0.02, y:0.035, width:0.09, height:0.12};


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

// Map of numbers to their words
GroupingGameView.NUMBER_TO_WORDS_MAP = [];
GroupingGameView.NUMBER_TO_WORDS_MAP[11] = "ELEVEN";
GroupingGameView.NUMBER_TO_WORDS_MAP[12] = "TWELVE";
GroupingGameView.NUMBER_TO_WORDS_MAP[13] = "THIRTEEN";
GroupingGameView.NUMBER_TO_WORDS_MAP[14] = "FOURTEEN";
GroupingGameView.NUMBER_TO_WORDS_MAP[15] = "FIFTEEN";
GroupingGameView.NUMBER_TO_WORDS_MAP[16] = "SIXTEEN";
GroupingGameView.NUMBER_TO_WORDS_MAP[17] = "SEVENTEEN";
GroupingGameView.NUMBER_TO_WORDS_MAP[18] = "EIGHTEEN";
GroupingGameView.NUMBER_TO_WORDS_MAP[19] = "NINETEEN";

// The destination locations where eggs will be locked in to
GroupingGameView.EGG_DESTINATION_LOCATIONS = [
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

// error types
GroupingGameView.ERROR_TYPES = {
	DRAG_TO_TENS : 0,
	INCORRECT_DONE : 1,
	EXCEEDED_GOAL_NUMBER : 2
}

// Image Sources
GroupingGameView.sources = {};
GroupingGameView.sources.rabbit = "images/grouping_game/rabbit.png";
GroupingGameView.sources.belts = "images/grouping_game/belts.png";
GroupingGameView.sources.coverFront = "images/grouping_game/cover_front.png";
GroupingGameView.sources.coverBack = "images/grouping_game/cover_back.png";
GroupingGameView.sources.tray = "images/grouping_game/tray.png";

GroupingGameView.sources.pauseButton = "images/widgets/pause_button.png";
GroupingGameView.sources.pausedLabel = "images/widgets/paused_label.png";
GroupingGameView.sources.menuButton = "images/widgets/menu_button.png";
GroupingGameView.sources.restartButton = "images/widgets/restart_button.png";
GroupingGameView.sources.resumeButton = "images/widgets/resume_button.png";
GroupingGameView.sources.doneButton = "images/widgets/done_button.png";

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

// Called when the user enters this page
GroupingGameView.initialize = function () {
	
	if (Env.phoneGap) {
		alert("phonegap!");
	} else {
		alert("not phonegap!");
	}
	
	// Music.play("sounds/grouping_game/accept_egg.wav");
	
	// Number of errors the child has made so far
	GroupingGameView.errorsMade = 0;

	// Array of the eggs currently on the tray at ones
	GroupingGameView.eggsAtDestination = [];
	
	// Array holding eggs initial locations of when it was randomly generated
	GroupingGameView.eggInitialLocations = [];
	
	// A count of all eggs that have been generated
	GroupingGameView.eggCount = 0;
	
	// Variable for controlling whether activities are enabled (should be turned off during animations)
	GroupingGameView.activitiesEnabled = true;
	
	// As images are loaded into memory, they will be accessible from this array
	GroupingGameView.images = {};
	// As eggs are loaded into memory, they will be accessible from this array
	GroupingGameView.eggImageObjects = [];
	
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
	
	// The main layer (might be the only layer we need)
	GroupingGameView.backgroundLayer = new Kinetic.Layer();
	GroupingGameView.stage.add(GroupingGameView.backgroundLayer);	
	
	// create the egg ones group
	GroupingGameView.onesWidgetGroup = new Kinetic.Group({});
	GroupingGameView.backgroundLayer.add(GroupingGameView.onesWidgetGroup);
	
	// Add images to the loader class
	var loader = new PxLoader();
	GroupingGameView.images.rabbit = loader.addImage(GroupingGameView.sources.rabbit);
	GroupingGameView.images.belts = loader.addImage(GroupingGameView.sources.belts);
	GroupingGameView.images.tray = loader.addImage(GroupingGameView.sources.tray);
	GroupingGameView.images.coverFront = loader.addImage(GroupingGameView.sources.coverFront);
	GroupingGameView.images.coverBack = loader.addImage(GroupingGameView.sources.coverBack);
	GroupingGameView.images.pauseButton = loader.addImage(GroupingGameView.sources.pauseButton);
	GroupingGameView.images.menuButton = loader.addImage(GroupingGameView.sources.menuButton);
	GroupingGameView.images.restartButton = loader.addImage(GroupingGameView.sources.restartButton);
	GroupingGameView.images.resumeButton = loader.addImage(GroupingGameView.sources.resumeButton);
	GroupingGameView.images.doneButton = loader.addImage(GroupingGameView.sources.doneButton);
	GroupingGameView.images.pausedLabel = loader.addImage(GroupingGameView.sources.pausedLabel);
	GroupingGameView.images.eggs = [];
	
	GroupingGameView.images.rabbit = loader.addImage(GroupingGameView.sources.rabbit);
	for (var i = 0; i < GroupingGameView.sources.eggs.length; i++) {
		GroupingGameView.images.eggs[i] = loader.addImage(GroupingGameView.sources.eggs[i]);
	}
	
	//Added sounds to the loader class
	//GroupingGameView.sounds.acceptEggs = loader.addImage(GroupingGameView.sources.acceptEggs);
	
	//Start and load sound
	/*soundManager.setup({
    		url: 'sounds/grouping_game/',
    		onready: function() {
     			soundManager.createSound({
 					id: 'acceptEggs',
					url: 'sounds/grouping_game/accept_egg.wav'
				});
				soundManager.createSound({
 					id: 'rejectEggs',
					url: 'sounds/grouping_game/reject_egg.wav'
				});
   			}
	});*/
	
	// Initialize tens count
	GroupingGameView.tensCount = null;
	// Registers loaded() function, which gets called when images loaded into memory
	loader.addCompletionListener(GroupingGameView.loaded);
	
	// Starts loading all the images into memory
	loader.start();
}

GroupingGameView.finalize = function() {
	GroupingGameView.pauseWidgets = null;
	GroupingGameView.tensCount = null;
}

// Should be called once graphics are loaded into memory
GroupingGameView.loaded = function () {
	// Call helper functionsthe to draw components
	GroupingGameView.drawRabbit();
	GroupingGameView.drawBelts();
	GroupingGameView.drawTrays();
	GroupingGameView.drawPauseButton();
	GroupingGameView.drawEggs();
	GroupingGameView.drawNumbers();
	GroupingGameView.drawTitle();
	GroupingGameView.drawDoneButton();
	
	// layering
	GroupingGameView.onesWidgetGroup.moveToTop();
	
	// redraw all widgets
	GroupingGameView.stage.draw();
}

GroupingGameView.drawDoneButton = function() {
	var doneButton = new Kinetic.Image({image: GroupingGameView.images.doneButton});
	WidgetUtil.glue(doneButton, {
		glueTop: true,
		glueLeft: true,
		width: 0.15,
		height: 0.2,
		dx: 0.02,
		dy: 0.25
	});
	
	doneButton.on('click tap', function () {
		var total = GroupingGameView.calculateTotal();
		
		if (total == GroupingGameView.goalNumber) {
			alert("Correct!");
		} else {
			GroupingGameView.errorMade(GroupingGameView.ERROR_TYPES.INCORRECT_DONE);	
		}
	});
	
	GroupingGameView.backgroundLayer.add(doneButton);
}

GroupingGameView.calculateTotal = function () {
	var ones = parseInt(GroupingGameView.onesTextWidget.getText());
	var tens = parseInt(GroupingGameView.tensTextWidget.getText() * 10);
	return (tens + ones);
}

GroupingGameView.drawTrays = function() {
	GroupingGameView.trays = {};
	
	// tray current
	GroupingGameView.trays.current = new Kinetic.Image({image: GroupingGameView.images.tray});
	WidgetUtil.glue(GroupingGameView.trays.current, {
		glueTop: true,
		glueLeft: true,
		width: GroupingGameView.TRAY_SIZE.width,
		height: GroupingGameView.TRAY_SIZE.height,
		dx: GroupingGameView.TRAY_CURRENT_POSITION.x,
		dy: GroupingGameView.TRAY_CURRENT_POSITION.y
	});
	GroupingGameView.onesWidgetGroup.add(GroupingGameView.trays.current);
	
	// tray next
	GroupingGameView.trays.next = new Kinetic.Image({image: GroupingGameView.images.tray});
	WidgetUtil.glue(GroupingGameView.trays.next, {
		glueTop: true,
		glueLeft: true,
		width: GroupingGameView.TRAY_SIZE.width,
		height: GroupingGameView.TRAY_SIZE.height,
		dx: GroupingGameView.TRAY_NEXT_POSITION.x,
		dy: GroupingGameView.TRAY_NEXT_POSITION.y
	});
	GroupingGameView.backgroundLayer.add(GroupingGameView.trays.next);
}

// Draws the rabbit
GroupingGameView.drawRabbit = function() {
	var rabbit = new Kinetic.Image({image: GroupingGameView.images.rabbit});
	WidgetUtil.glue(rabbit, {
		glueTop: false,
		glueLeft: false,
		width: GroupingGameView.RABBIT_DIMENSIONS.width,
		height: GroupingGameView.RABBIT_DIMENSIONS.height,
		dx: GroupingGameView.RABBIT_DIMENSIONS.x,
		dy: GroupingGameView.RABBIT_DIMENSIONS.y
	});
	GroupingGameView.backgroundLayer.add(rabbit);
}

// Draws the belts
GroupingGameView.drawBelts = function() {
	var belts = new Kinetic.Image({image: GroupingGameView.images.belts});
	WidgetUtil.glue(belts, {
		glueTop: true,
		glueLeft: true,
		width: GroupingGameView.BELT_DIMENSIONS.width,
		height: GroupingGameView.BELT_DIMENSIONS.height,
		dx: GroupingGameView.BELT_DIMENSIONS.x,
		dy: GroupingGameView.BELT_DIMENSIONS.y
	});
	GroupingGameView.backgroundLayer.add(belts);
}

GroupingGameView.drawPauseButton = function() {
	var pauseButton = new Kinetic.Image({image: GroupingGameView.images.pauseButton});
	WidgetUtil.glue(pauseButton, {
		glueTop: true,
		glueLeft: true,
		width: GroupingGameView.PAUSE_BUTTON_DIMENSIONS.width,
		height: GroupingGameView.PAUSE_BUTTON_DIMENSIONS.height,
		dx: GroupingGameView.PAUSE_BUTTON_DIMENSIONS.x,
		dy: GroupingGameView.PAUSE_BUTTON_DIMENSIONS.y
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
	
	/*if (Env.debug) {
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
	}*/
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
	
	// add cursor styling
	egg.on('mouseover', function() {document.body.style.cursor = 'pointer'});
	egg.on('mouseout', function() {document.body.style.cursor = 'default'});					
	
	egg.on('dragstart', function() {
		// make it cover all other eggs.
		this.moveToTop();
	});
	
	egg.on('dragend', function() {
		if (GroupingGameView.activitiesEnabled == false) {
			GroupingGameView.declineEgg(this);
			return;
		}
		
		// accepts the egg at the destination if dropped close enough and not full or else return the egg to its starting position
		if (WidgetUtil.isNearPoints(this, GroupingGameView.BELT_ONES_AREA.X_ARRAY, GroupingGameView.BELT_ONES_AREA.Y_ARRAY, GroupingGameView.BELT_ONES_AREA.RADIUS_ARRAY)
				&& (GroupingGameView.eggsAtDestination.length != 10)) {
			GroupingGameView.acceptEgg(this);
			//soundManager.play('acceptEggs');
			//soundManager.play(GroupingGameView.sounds.acceptEggs);
		} else if (WidgetUtil.isNearPoints(this, GroupingGameView.BELT_TENS_AREA.X_ARRAY, GroupingGameView.BELT_TENS_AREA.Y_ARRAY, GroupingGameView.BELT_TENS_AREA.RADIUS_ARRAY)) {
			// decline the egg and also record an error
			GroupingGameView.declineEgg(this);
			GroupingGameView.errorMade(GroupingGameView.ERROR_TYPES.DRAG_TO_TENS);
			//soundManager.play('rejectEggs');
		} else {
			GroupingGameView.declineEgg(this);
			//soundManager.play('rejectEggs');
		}
		
		// If we reach 10 eggs in our tray
		if (GroupingGameView.eggsAtDestination.length == 10) {
			GroupingGameView.trayOnesFullCallback();
		}
	});
	
	GroupingGameView.backgroundLayer.add(egg);
	return egg;
}


// accepts the egg and add it to the accepted array
GroupingGameView.acceptEgg = function(egg) {
	
	// check to see if total is greater than goal Number
	if (GroupingGameView.calculateTotal() >= GroupingGameView.goalNumber) {
		GroupingGameView.errorMade(GroupingGameView.ERROR_TYPES.EXCEEDED_GOAL_NUMBER);
		GroupingGameView.declineEgg(egg);
		return;
	}
	
	// make the egg not draggable
	egg.setDraggable(false);
	// move it to the right position
	var index = GroupingGameView.eggsAtDestination.length;

	// add it to the group
	egg.remove();
	GroupingGameView.onesWidgetGroup.add(egg);
	egg.moveToTop();
	
	egg.setX(DimensionUtil.decimalToActualWidth(GroupingGameView.EGG_DESTINATION_LOCATIONS[index].x));
	egg.setY(DimensionUtil.decimalToActualHeight(GroupingGameView.EGG_DESTINATION_LOCATIONS[index].y));
	
	GroupingGameView.stage.draw();
	// add it to the destination array
	GroupingGameView.eggsAtDestination.push(egg);
	
	// create another egg in its place
	var newEgg = GroupingGameView.drawNewEgg();
	
	// increase number of eggs
	var ones = GroupingGameView.eggsAtDestination.length;
	if (GroupingGameView.tensCount == null) GroupingGameView.tensCount = 0;
	if (ones != 10) {
		GroupingGameView.onesTextWidget.setText(ones);
		GroupingGameView.onesTextWidget.draw();
		GroupingGameView.stage.draw();
	} else {
		GroupingGameView.onesTextWidget.setText(0);
		GroupingGameView.tensCount++;
	}
	
	GroupingGameView.tensTextWidget.setText(GroupingGameView.tensCount);
	GroupingGameView.stage.draw();
}

// declines the egg and move it back to its original spot
GroupingGameView.declineEgg = function(egg) {
	WidgetUtil.animateMove(egg, 0.4, GroupingGameView.eggInitialLocations[egg.id].x, GroupingGameView.eggInitialLocations[egg.id].y);
}


GroupingGameView.trayOnesFullCallback = function() {
	
	// Disable all performable activities by user
	GroupingGameView.activitiesEnabled = false;
	
	var fallCoverDurationSeconds = 2;
	var trayLiftDurationSeconds = 1;
	var shrinkTrayDurationSeconds = 1;
	var beltSlideDurationSeconds = 1;
	
	// The cover is separated into two parts front (the part that are in front of the eggs) and the back (parts behind the eggs)
	
	// Draw the cover's front
	var coverFront = new Kinetic.Image({image: GroupingGameView.images.coverFront});
	WidgetUtil.glue(coverFront, {
		glueTop: true,
		glueLeft: true,
		width: GroupingGameView.TRAY_SIZE.width,
		height: GroupingGameView.TRAY_SIZE.height,
		dx: GroupingGameView.INITIAL_COVER_POSITION.x,
		dy: GroupingGameView.INITIAL_COVER_POSITION.y
	});
	GroupingGameView.onesWidgetGroup.add(coverFront);
	coverFront.moveToTop();
	
	// Draw the cover's back
	var coverBack = new Kinetic.Image({image: GroupingGameView.images.coverBack});
	WidgetUtil.glue(coverBack, {
		glueTop: true,
		glueLeft: true,
		width: GroupingGameView.TRAY_SIZE.width,
		height: GroupingGameView.TRAY_SIZE.height,
		dx: GroupingGameView.INITIAL_COVER_POSITION.x,
		dy: GroupingGameView.INITIAL_COVER_POSITION.y
	});
	GroupingGameView.onesWidgetGroup.add(coverBack);
	coverBack.moveToBottom();
	
	// redraw the stage
	GroupingGameView.stage.draw();
	
	// Make the covers fall onto the tray
	var dropCoverFrontTween = new Kinetic.Tween({
		node: coverFront,
		duration: fallCoverDurationSeconds,
		x: DimensionUtil.decimalToActualWidth(GroupingGameView.TRAY_CURRENT_POSITION.x),
		y: DimensionUtil.decimalToActualHeight(GroupingGameView.TRAY_CURRENT_POSITION.y)
	});
	var dropCoverBackTween = new Kinetic.Tween({
		node: coverBack,
		duration: fallCoverDurationSeconds,
		x: DimensionUtil.decimalToActualWidth(GroupingGameView.TRAY_CURRENT_POSITION.x),
		y: DimensionUtil.decimalToActualHeight(GroupingGameView.TRAY_CURRENT_POSITION.y),
	});
	dropCoverFrontTween.play();
	dropCoverBackTween.play();
	
	// Make the tray lift up
	setTimeout(function() {
		var liftTween = new Kinetic.Tween({
			node: GroupingGameView.onesWidgetGroup, 
			duration: trayLiftDurationSeconds,
			y: DimensionUtil.decimalToActualHeight(-0.2)
		});
		liftTween.play();
	}, fallCoverDurationSeconds * 1000);

	// Shrink the tray
	setTimeout(function() {
		var shrinkTrayTween = new Kinetic.Tween({
			node: GroupingGameView.onesWidgetGroup, 
			duration: shrinkTrayDurationSeconds,
			x: DimensionUtil.decimalToActualWidth(-0.05),
			y: DimensionUtil.decimalToActualHeight(0.26),
			scaleX: 0.5,
			scaleY: 0.5,
			easing: Kinetic.Easings.Linear,
		});
		shrinkTrayTween.play();
	}, (fallCoverDurationSeconds + trayLiftDurationSeconds) * 1000);
	
	// Move belt up
	setTimeout(function() {
		// set current tray to next
		GroupingGameView.trays.current = GroupingGameView.trays.next;
		
		// create new next tray
		GroupingGameView.trays.next = new Kinetic.Image({image: GroupingGameView.images.tray});
		WidgetUtil.glue(GroupingGameView.trays.next, {
			glueTop: true,
			glueLeft: true,
			width: GroupingGameView.TRAY_SIZE.width,
			height: GroupingGameView.TRAY_SIZE.height,
			dx: GroupingGameView.TRAY_BELOW_NEXT_POSITION.x,
			dy: GroupingGameView.TRAY_BELOW_NEXT_POSITION.y
		});
		GroupingGameView.backgroundLayer.add(GroupingGameView.trays.next);		
		
		// move current tray up
		var moveCurrentTrayTween = new Kinetic.Tween({
			node: GroupingGameView.trays.current, 
			duration: beltSlideDurationSeconds,
			x: DimensionUtil.decimalToActualWidth(0.25),
			y: DimensionUtil.decimalToActualHeight(0.415),
			easing: Kinetic.Easings.Linear
		});
		moveCurrentTrayTween.play();
		
		// move next tray up
		var moveNextTrayTween = new Kinetic.Tween({
			node: GroupingGameView.trays.next, 
			duration: beltSlideDurationSeconds,
			x: DimensionUtil.decimalToActualWidth(0.05),
			y: DimensionUtil.decimalToActualHeight(0.71),
			easing: Kinetic.Easings.Linear
		});
		moveNextTrayTween.play();
		
	}, (fallCoverDurationSeconds + trayLiftDurationSeconds + shrinkTrayDurationSeconds) * 1000);
	
	setTimeout(function() {
		GroupingGameView.eggsAtDestination = [];
		GroupingGameView.onesWidgetGroup = new Kinetic.Group({});
		GroupingGameView.backgroundLayer.add(GroupingGameView.onesWidgetGroup);
		GroupingGameView.onesWidgetGroup.moveToTop();
		
		GroupingGameView.activitiesEnabled = true;
	}, (fallCoverDurationSeconds + trayLiftDurationSeconds + shrinkTrayDurationSeconds + beltSlideDurationSeconds) * 1000);
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
	var title = GroupingGameView.NUMBER_TO_WORDS_MAP[GroupingGameView.goalNumber];
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
				
// call this to pause the game
GroupingGameView.pause = function() {
	
	// lazy loading
	if (GroupingGameView.pauseWidgets == null) {
		GroupingGameView.pauseWidgets = {};
		
		// draw overlay
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
		
		// paused label
		GroupingGameView.pauseWidgets.pausedLabel = new Kinetic.Image({image: GroupingGameView.images.pausedLabel});
		WidgetUtil.glue(GroupingGameView.pauseWidgets.pausedLabel, {
			glueTop: true,
			glueLeft: true,
			width: 0.3,
			height: 0.1,
			dx: 0.35,
			dy: 0.25
		});

		// resume button
		GroupingGameView.pauseWidgets.resumeButton = new Kinetic.Image({image: GroupingGameView.images.resumeButton});
		WidgetUtil.glue(GroupingGameView.pauseWidgets.resumeButton, {
			glueTop: true,
			glueLeft: true,
			width: 0.18,
			height: 0.25,
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
			height: 0.25,
			dx: 0.41,
			dy: 0.42
		});
		GroupingGameView.pauseWidgets.menuButton.on('click tap', function () {
			GroupingGameView.pauseWidgets = null;
			LoginView.initialize();
		});
		
		// restart button
		GroupingGameView.pauseWidgets.restartButton = new Kinetic.Image({image: GroupingGameView.images.restartButton});
		WidgetUtil.glue(GroupingGameView.pauseWidgets.restartButton, {
			glueTop: true,
			glueLeft: true,
			width: 0.18,
			height: 0.25,
			dx: 0.61,
			dy: 0.42
		});
		GroupingGameView.pauseWidgets.restartButton.on('click tap', function () {
			GroupingGameView.backgroundLayer.remove();
			GroupingGameView.finalize();
			GroupingGameView.initialize();
			
		});
		
		// Add all the widgets onto the background layer
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.resumeButton);
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.menuButton);
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.restartButton);
		GroupingGameView.backgroundLayer.add(GroupingGameView.pauseWidgets.pausedLabel);
	}
	
	GroupingGameView.pauseWidgets.overlay.show();
	GroupingGameView.pauseWidgets.overlay.moveToTop();
	
	GroupingGameView.pauseWidgets.resumeButton.show();
	GroupingGameView.pauseWidgets.resumeButton.moveToTop();
	
	GroupingGameView.pauseWidgets.menuButton.show();
	GroupingGameView.pauseWidgets.menuButton.moveToTop();
	
	GroupingGameView.pauseWidgets.restartButton.show();
	GroupingGameView.pauseWidgets.restartButton.moveToTop();
	
	GroupingGameView.pauseWidgets.pausedLabel.show();
	GroupingGameView.pauseWidgets.pausedLabel.moveToTop();
	
	GroupingGameView.stage.draw();
}

// call this to unpause the game
GroupingGameView.unpause = function() {
	GroupingGameView.pauseWidgets.overlay.hide();
	GroupingGameView.pauseWidgets.resumeButton.hide();
	GroupingGameView.pauseWidgets.menuButton.hide();
	GroupingGameView.pauseWidgets.restartButton.hide();
	GroupingGameView.pauseWidgets.pausedLabel.hide();
	GroupingGameView.stage.draw();
}

GroupingGameView.errorMade = function (errorType) {
	alert("made error");
}




