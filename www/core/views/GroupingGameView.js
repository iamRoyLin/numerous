function GroupingGameView(controller) {
	this.controller = controller;
	
	// constants
	
	// Number of packs at the origin at the beginning
	this.INITIAL_PACK_COUNT = 3;
	
	// Number of eggs at the origin at the beginning
	this.INITIAL_EGG_COUNT = 50;
	
	// size of the eggs
	this.INITIAL_EGG_DIMENSIONS = {width:60, height: 75};
	
	// The areas of the 'ones' belts that accepts the egg
	this.BELT_ONES_AREA = {};
	this.BELT_ONES_AREA.X_ARRAY =      [0.54, 0.48, 0.42, 0.36];
	this.BELT_ONES_AREA.Y_ARRAY =      [0.56, 0.64, 0.72, 0.80];
	this.BELT_ONES_AREA.RADIUS_ARRAY = [0.11, 0.11, 0.11, 0.11];

	// The areas of the 'tens' belts that accepts the egg
	this.BELT_TENS_AREA = {};
	this.BELT_TENS_AREA.X_ARRAY =      [0.24, 0.18, 0.12];
	this.BELT_TENS_AREA.Y_ARRAY =      [0.56, 0.64, 0.72];
	this.BELT_TENS_AREA.RADIUS_ARRAY = [0.11, 0.11, 0.11];

	// complements
	this.COMPLIMENTS = [
		"Good work!",
		"Well done!",
		"Great job!",
		"Nice going!",
		"Great!",
		"Perfect!",
		"Awesome!",
		"Looks good!",
		"Brilliant",
		"Good!",
		"Super!",
		"Superb!"
	];

	// The destination locations where eggs will be locked in to
	this.EGG_DESTINATION_LOCATIONS = [
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
	this.ERROR_TYPES = {
		DRAG_TO_TENS : 0,
		INCORRECT_DONE : 1,
		EXCEEDED_GOAL_NUMBER_WITH_EGGS : 2,
		PACK_DRAG_TO_ONES : 3,
		EXCEEDED_GOAL_NUMBER_WITH_PACKS : 4,
		
	}
		
	// widgets
	this.RABBIT_DIMENSIONS = {x:0.69, y:0.25, width:0.265, height:0.75};
	this.BELT_DIMENSIONS = {x:0, y:0.187, width:0.68, height:0.813};
	this.THINK_CLOUD_DIMENSIONS = {x:0.62, y:-0.02, width:0.41, height:0.45};
	this.PAUSE_BUTTON_DIMENSIONS = {x:0.02, y:0.035, width:0.09, height:0.12};
	
	// Tray and cover sizes and positions
	this.TRAY_SIZE = {width:0.395, height:0.42};
	this.TRAY_CURRENT_POSITION = {x:0.25, y:0.415};
	this.TRAY_NEXT_POSITION = {x:0.05, y:0.71};
	this.TRAY_BELOW_NEXT_POSITION = {x:-0.15, y:1.005};
	this.INITIAL_COVER_POSITION = {x:0.25, y:-0.415};

	// Initial egg positions
	this.INITIAL_EGG_RECTANGLE = {x:0.70, y:0.69, width:0.2, height:0.01};
	this.INITIAL_EGG_SIZE = {width:0.06, height:0.093};
	
	// Initial pack positions
	this.INITIAL_PACK_RECTANGLE = {x:0.59, y:0.80, width:0.2, height:0.05};
	this.INITIAL_PACK_SIZE = {width:0.2, height:0.2};
	
	this.PACK_DESTINATION_LOCATION = {x: 0.08, y: 0.485}
	
	// pack count
	this.packCount = 0;
	
	// boolean represent if there is already a pack at "tens" destination
	this.packAtDestination = false;
	
	// Array holding packs initial locations of when it was randomly generated
	this.packInitialLocations = [];
	
	// A count of all eggs that have been generated
	this.eggCount = 0;
	
	// Array of the eggs currently on the tray at ones
	this.eggsAtDestination = [];
	
	// Array holding eggs initial locations of when it was randomly generated
	this.eggInitialLocations = [];
	
	// As the images are loaded into memory, they will be accessible from this array
	this.eggImageObjects = [];
	
	// Variable for controlling whether activities are enabled (should be turned off during animations)
	this.activitiesEnabled = true;
	
	// timeouts to clear
	this.timeOuts = [];
	
	// number of mistakes made
	this.errorsMade = 0;
	
	// Number of allowable errors
	this.allowableErrorsCount = 3;
	
	// create the egg ones group
	this.onesWidgetGroup = new Kinetic.Group({});
	app.layer.add(this.onesWidgetGroup);
};
GroupingGameView.prototype = new View();

// destructor
GroupingGameView.prototype.finalize = function () {
	for(var i = 0; i < this.timeOuts.length; i++) {
		clearTimeout(this.timeOuts[i]);
	}
	this.timeOuts = [];
};

// draws the rabbit
GroupingGameView.prototype.drawRabbit = function () {
	var rabbit = new Kinetic.Image({image: this.images.rabbit});
	WidgetUtil.glue(rabbit, {
		width: this.RABBIT_DIMENSIONS.width,
		height: this.RABBIT_DIMENSIONS.height,
		dx: this.RABBIT_DIMENSIONS.x,
		dy: this.RABBIT_DIMENSIONS.y
	});
	app.layer.add(rabbit);
};

// Draws the think cloud 
GroupingGameView.prototype.drawThinkCloud = function () {
	
	// think cloud
	this.thinkCloud = new Kinetic.Image({image: this.images.thinkCloud});
	WidgetUtil.glue(this.thinkCloud, {
		width: this.THINK_CLOUD_DIMENSIONS.width,
		height: this.THINK_CLOUD_DIMENSIONS.height,
		dx: this.THINK_CLOUD_DIMENSIONS.x,
		dy: this.THINK_CLOUD_DIMENSIONS.y
	});
	app.layer.add(this.thinkCloud);
	
	// text in the think cloud
	this.thinkCloudTextWidget = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.68),
		y: DimensionUtil.decimalToActualHeight(0.08),
		width: DimensionUtil.decimalToActualWidth(0.28 / (1/1024*DimensionUtil.width)),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 25,
		fontFamily: 'COMIC SANS MS',
		fill: 'black',
		align: 'center',
		lineHeight: 1.3
	});
	app.layer.add(this.thinkCloudTextWidget);
	this.displayThinkCloud("Drag " + app.controller.NUMBER_TO_WORDS_MAP[app.controller.goalNumber] + " of my easter eggs onto the belt!");
};

// Displays a message in the think cloud
GroupingGameView.prototype.displayThinkCloud = function(message) {
	this.thinkCloudTextWidget.setText(message);
	app.stage.draw();
};

// Draws the belts
GroupingGameView.prototype.drawBelts = function() {
	var belts = new Kinetic.Image({image: this.images.belts});
	WidgetUtil.glue(belts, {
		width: this.BELT_DIMENSIONS.width,
		height: this.BELT_DIMENSIONS.height,
		dx: this.BELT_DIMENSIONS.x,
		dy: this.BELT_DIMENSIONS.y
	});
	app.layer.add(belts);
};

// draws the two trays (has the animation logic here)
GroupingGameView.prototype.drawTrays = function() {

	this.trays = {};
	
	// tray current
	this.trays.current = new Kinetic.Image({image: this.images.tray});
	WidgetUtil.glue(this.trays.current, {
		width: this.TRAY_SIZE.width,
		height: this.TRAY_SIZE.height,
		dx: this.TRAY_CURRENT_POSITION.x,
		dy: this.TRAY_CURRENT_POSITION.y
	});
	this.onesWidgetGroup.add(this.trays.current);
	
	// tray next
	this.trays.next = new Kinetic.Image({image: this.images.tray});
	WidgetUtil.glue(this.trays.next, {
		width: this.TRAY_SIZE.width,
		height: this.TRAY_SIZE.height,
		dx: this.TRAY_NEXT_POSITION.x,
		dy: this.TRAY_NEXT_POSITION.y
	});
	
	app.layer.add(this.onesWidgetGroup);
	app.layer.add(this.trays.next);
};

// draws the number the student needs to perform
GroupingGameView.prototype.drawTitle = function(title) {
	 this.titleTextWidget = new Kinetic.Text({
    	x: DimensionUtil.decimalToActualWidth(0.15),
		y: DimensionUtil.decimalToActualHeight(0.02),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
    	text: title,
    	fontSize: 90,
    	fontFamily: 'COMIC SANS MS',
    	fill: 'black'
    });
    app.layer.add(this.titleTextWidget);
};

// draws the done button
GroupingGameView.prototype.drawDoneButton = function() {
	var buttonDone = new Kinetic.Image({image: this.images.buttonDone});
	WidgetUtil.glue(buttonDone, {
		width: 0.15,
		height: 0.2,
		dx: 0.02,
		dy: 0.25
	});
	
	buttonDone.on('click tap', function () {
		Music.play(app.view.sounds.done);
		var total = app.view.calculateTotal();
		if (total == app.controller.goalNumber) {
			app.view.finish(app.view.allowableErrorsCount - app.view.errorsMade);
		} else {
			app.view.errorMade(app.view.ERROR_TYPES.INCORRECT_DONE);	
		}
	});
	
	app.layer.add(buttonDone);
};

// draws the number in the "tens" and "ones" boxes
GroupingGameView.prototype.drawNumbers = function() {

	// ones number
	this.onesTextWidget = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.52),
		y: DimensionUtil.decimalToActualHeight(0.28),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
    	text: 0,
    	fontSize: 110,
    	fontFamily: 'COMIC SANS MS',
    	fill: 'black'
    });
	app.layer.add(this.onesTextWidget);
	
	// tens number
	this.tensTextWidget = new Kinetic.Text({
    	x: DimensionUtil.decimalToActualWidth(0.26),
		y: DimensionUtil.decimalToActualHeight(0.28),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
    	text: 0,
    	fontSize: 110,
    	fontFamily: 'COMIC SANS MS',
    	fill: 'black'
    });
    app.layer.add(this.tensTextWidget);
};

GroupingGameView.prototype.drawPacks = function () {
	for (var i=0; i<this.INITIAL_PACK_COUNT; i++) {
		this.drawNewPack();
	}
};

// draws one new pack
GroupingGameView.prototype.drawNewPack = function () {
	var pack = new Kinetic.Image({
		image: this.images.pack,
		draggable: true
	});	
	
	pack.id = this.packCount;	
	this.packCount++;
	
	var xInit = MathUtil.random(this.INITIAL_PACK_RECTANGLE.x * 100, (this.INITIAL_PACK_RECTANGLE.x + this.INITIAL_PACK_RECTANGLE.width)*100)/100;
	var yInit = MathUtil.random(this.INITIAL_PACK_RECTANGLE.y * 100, (this.INITIAL_PACK_RECTANGLE.y + this.INITIAL_PACK_RECTANGLE.height)*100)/100;
	this.packInitialLocations[pack.id] = {x:xInit, y:yInit};
	WidgetUtil.glue(pack, {
		width: this.INITIAL_PACK_SIZE.width,
		height: this.INITIAL_PACK_SIZE.height,
		dx: xInit,
		dy: yInit
	});
	
	pack.on('dragstart', function() { this.moveToTop() });
	pack.on('dragend', function() {
		
		if (app.view.activitiesEnabled == false) {
			app.view.declinePack(this);
			return;
		}
		
		// accepts the pack at the destination if dropped close enough and not full or else return the pack to its starting position
		if (WidgetUtil.isNearPoints(this, app.view.BELT_TENS_AREA.X_ARRAY, app.view.BELT_TENS_AREA.Y_ARRAY, app.view.BELT_TENS_AREA.RADIUS_ARRAY)
				&& (!app.view.packAtDestination)) {
			app.view.acceptPack(this);
			
		} else if (WidgetUtil.isNearPoints(this, app.view.BELT_ONES_AREA.X_ARRAY, app.view.BELT_ONES_AREA.Y_ARRAY, app.view.BELT_ONES_AREA.RADIUS_ARRAY)) {
			// decline the pack and also record an error
			app.view.declinePack(this);
			app.view.errorMade(app.view.ERROR_TYPES.PACK_DRAG_TO_ONES);
		} else {
			app.view.errorMade(app.view.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_PACKS);
			app.view.declinePack(pack);
		}
		
	});
	
	app.layer.add(pack);
	app.stage.draw();
}

GroupingGameView.prototype.acceptPack = function (pack) {
	
	// say a compliment
	var compliment = this.COMPLIMENTS[MathUtil.random(0,this.COMPLIMENTS.length-1)];
	this.displayThinkCloud(compliment);
	
	// increase the count
	this.packAtDestination = true;
	this.tensTextWidget.setText(parseInt(this.tensTextWidget.getText())+1);
	
	// play the accept egg sound
	Music.play(this.sounds.acceptEgg);
	
	// make the egg not draggable
	pack.setDraggable(false);

	// add it to the group
	//egg.remove();
	//this.onesWidgetGroup.add(egg);
	//egg.moveToTop();
	
	pack.setX(DimensionUtil.decimalToActualWidth(this.PACK_DESTINATION_LOCATION.x));
	pack.setY(DimensionUtil.decimalToActualHeight(this.PACK_DESTINATION_LOCATION.y));
	
	app.stage.draw();
	
	// create another egg in its place
	var newPack = this.drawNewPack();
	
	// increase number of eggs
	app.stage.draw();
};

GroupingGameView.prototype.declinePack = function (pack) {
	// play the decline egg sound
	Music.play(this.sounds.declineEgg);
	WidgetUtil.animateMove(pack, 0.4, this.packInitialLocations[pack.id].x, this.packInitialLocations[pack.id].y);
};

// draws all the pause widgets then hides them. Shows when the pause function is called
GroupingGameView.prototype.drawPauseWidgets = function() {

	// pause button
	var buttonPause = new Kinetic.Image({image: this.images.buttonPause});
	WidgetUtil.glue(buttonPause, {
		width: this.PAUSE_BUTTON_DIMENSIONS.width,
		height: this.PAUSE_BUTTON_DIMENSIONS.height,
		dx: this.PAUSE_BUTTON_DIMENSIONS.x,
		dy: this.PAUSE_BUTTON_DIMENSIONS.y
	});
	app.layer.add(buttonPause);
	buttonPause.on('click tap', function() {
		Music.play(app.view.sounds.select);
		app.view.pause();
	});
	
	// pause group
	this.pauseWidgetsGroup = new Kinetic.Group({});

	// overlay
	var overlay = new Kinetic.Rect({
		fill: 'black',
		opacity: 0.62
	});
	WidgetUtil.glue(overlay, {
		width: 1,
		height: 1,
		dx: 0,
		dy: 0
	});
	this.pauseWidgetsGroup.add(overlay);	
	
	// paused label
	var labelPaused = new Kinetic.Image({image: this.images.labelPaused});
	WidgetUtil.glue(labelPaused, {
		width: 0.3,
		height: 0.1,
		dx: 0.35,
		dy: 0.25
	});
	this.pauseWidgetsGroup.add(labelPaused);

	// resume button
	var buttonResume = new Kinetic.Image({image: this.images.buttonResume});
	WidgetUtil.glue(buttonResume, {
		width: 0.18,
		height: 0.25,
		dx: 0.21,
		dy: 0.42
	});
	this.pauseWidgetsGroup.add(buttonResume);
	
	buttonResume.on('click tap', function () {
		Music.play(app.view.sounds.select);
		app.view.unpause();
	});
	
	// menu button
	var buttonMenu = new Kinetic.Image({image: this.images.buttonMenu});
	WidgetUtil.glue(buttonMenu, {
		width: 0.18,
		height: 0.25,
		dx: 0.41,
		dy: 0.42
	});
	this.pauseWidgetsGroup.add(buttonMenu);
	
	buttonMenu.on('click tap', function () {
		Music.play(app.view.sounds.select);
		app.controller.menu();
	});
	
	// restart button
	var buttonRestart = new Kinetic.Image({image: this.images.buttonRestart});
	WidgetUtil.glue(buttonRestart, {
		width: 0.18,
		height: 0.25,
		dx: 0.61,
		dy: 0.42
	});
	this.pauseWidgetsGroup.add(buttonRestart);
	
	buttonRestart.on('click tap', function () {
		Music.play(app.view.sounds.select);
		app.controller.restart(true);
	});
	
	app.layer.add(this.pauseWidgetsGroup);
	this.pauseWidgetsGroup.hide();
};

// pause the game
GroupingGameView.prototype.pause = function() {
	this.pauseWidgetsGroup.show();
	this.pauseWidgetsGroup.moveToTop();
	app.stage.draw();
};

// unpause the game
GroupingGameView.prototype.unpause = function() {
	this.pauseWidgetsGroup.hide();
	app.stage.draw();
};

// Draws eggs in a specified area
GroupingGameView.prototype.drawEggs = function(onesLimitation) {
	if (onesLimitation == null) {
		onesLimitation = 10;
	}

	for (var i=0; i<this.INITIAL_EGG_COUNT; i++) {
		this.drawNewEgg(onesLimitation);
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
};

// Draws one egg in a specified area
GroupingGameView.prototype.drawNewEgg = function(onesLimitation) {
	var egg = new Kinetic.Image({
		image: this.images.eggs[MathUtil.random(0, this.images.eggs.length)],
		draggable: true
	});	
	
	egg.id = this.eggCount;	
	this.eggCount++;
	
	var xInit = MathUtil.random(this.INITIAL_EGG_RECTANGLE.x * 1000, (this.INITIAL_EGG_RECTANGLE.x + this.INITIAL_EGG_RECTANGLE.width)*1000)/1000;
	var yInit = MathUtil.random(this.INITIAL_EGG_RECTANGLE.y * 1000, (this.INITIAL_EGG_RECTANGLE.y + this.INITIAL_EGG_RECTANGLE.height)*1000)/1000;
	this.eggInitialLocations[egg.id] = {x:xInit, y:yInit};
	
	WidgetUtil.glue(egg, {
		width: this.INITIAL_EGG_SIZE.width,
		height: this.INITIAL_EGG_SIZE.height,
		dx: xInit,
		dy: yInit
	});
	
	egg.on('dragstart', function() { this.moveToTop() });
	egg.on('dragend', function() {
		
		if (app.view.activitiesEnabled == false) {
			app.view.declineEgg(this);
			return;
		}
		
		
		
		// accepts the egg at the destination if dropped close enough and not full or else return the egg to its starting position
		if (WidgetUtil.isNearPoints(this, app.view.BELT_ONES_AREA.X_ARRAY, app.view.BELT_ONES_AREA.Y_ARRAY, app.view.BELT_ONES_AREA.RADIUS_ARRAY)) {
			if (app.view.eggsAtDestination.length < onesLimitation) {
				app.view.acceptEgg(this);
			} else {
				app.view.errorMade(app.view.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_EGGS);
			}
		} else if (WidgetUtil.isNearPoints(this, app.view.BELT_TENS_AREA.X_ARRAY, app.view.BELT_TENS_AREA.Y_ARRAY, app.view.BELT_TENS_AREA.RADIUS_ARRAY)) {
			// decline the egg and also record an error
			app.view.declineEgg(this);
			app.view.errorMade(app.view.ERROR_TYPES.DRAG_TO_TENS);
		} else {
			app.view.declineEgg(this);
		}
		
		// If we reach 10 eggs in our tray
		if (app.view.eggsAtDestination.length == 10) {
			app.view.trayFull();
		}
		
	});
	
	app.layer.add(egg);
};

// accepts the egg and add it to the accepted array
GroupingGameView.prototype.acceptEgg = function(egg) {
	
	// check to see if total is greater than goal Number
	if (this.calculateTotal() >= app.controller.goalNumber) {
		this.errorMade(this.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_EGGS);
		this.declineEgg(egg);
		return;
	}
	
	// say a compliment
	var compliment = this.COMPLIMENTS[MathUtil.random(0,this.COMPLIMENTS.length-1)];
	this.displayThinkCloud(compliment);	
	
	// play the accept egg sound
	Music.play(this.sounds.acceptEgg);
	
	// make the egg not draggable
	egg.setDraggable(false);
	// move it to the right position
	var index = this.eggsAtDestination.length;

	// add it to the group
	egg.remove();
	this.onesWidgetGroup.add(egg);
	egg.moveToTop();
	
	egg.setX(DimensionUtil.decimalToActualWidth(this.EGG_DESTINATION_LOCATIONS[index].x));
	egg.setY(DimensionUtil.decimalToActualHeight(this.EGG_DESTINATION_LOCATIONS[index].y));
	
	app.stage.draw();
	// add it to the destination array
	this.eggsAtDestination.push(egg);
	
	// create another egg in its place
	var newEgg = this.drawNewEgg();
	
	// increase number of eggs
	var ones = this.eggsAtDestination.length;
	if (ones < 10) {
		this.onesTextWidget.setText(ones);
		this.onesTextWidget.draw();
		app.stage.draw();
	}
	
	app.stage.draw();
};

// declines the egg and move it back to its original spot
GroupingGameView.prototype.declineEgg = function(egg) {
	// play the decline egg sound
	Music.play(this.sounds.declineEgg);
	WidgetUtil.animateMove(egg, 0.4, this.eggInitialLocations[egg.id].x, this.eggInitialLocations[egg.id].y);
};

// Is called when the "ones" tray is full
GroupingGameView.prototype.trayFull = function() {
	
	// Disable all performable activities by user
	this.activitiesEnabled = false;
	
	var fallCoverDurationSeconds = 2;
	var trayLiftDurationSeconds = 1;
	var shrinkTrayDurationSeconds = 1;
	var beltSlideDurationSeconds = 1;
	
	// The cover is separated into two parts front (the part that are in front of the eggs) and the back (parts behind the eggs)
	
	// Draw the cover's front
	var coverFront = new Kinetic.Image({image: this.images.coverFront});
	WidgetUtil.glue(coverFront, {
		width: this.TRAY_SIZE.width,
		height: this.TRAY_SIZE.height,
		dx: this.INITIAL_COVER_POSITION.x,
		dy: this.INITIAL_COVER_POSITION.y
	});
	this.onesWidgetGroup.add(coverFront);
	coverFront.moveToTop();
	
	// Draw the cover's back
	var coverBack = new Kinetic.Image({image: this.images.coverBack});
	WidgetUtil.glue(coverBack, {
		width: this.TRAY_SIZE.width,
		height: this.TRAY_SIZE.height,
		dx: this.INITIAL_COVER_POSITION.x,
		dy: this.INITIAL_COVER_POSITION.y
	});
	this.onesWidgetGroup.add(coverBack);
	coverBack.moveToBottom();
	
	// redraw the stage
	app.stage.draw();
	
	Music.play(app.view.sounds.wrapUp);
	// Make the covers fall onto the tray
	var dropCoverFrontTween = new Kinetic.Tween({
		node: coverFront,
		duration: fallCoverDurationSeconds,
		x: DimensionUtil.decimalToActualWidth(this.TRAY_CURRENT_POSITION.x),
		y: DimensionUtil.decimalToActualHeight(this.TRAY_CURRENT_POSITION.y)
	});
	
	var dropCoverBackTween = new Kinetic.Tween({
		node: coverBack,
		duration: fallCoverDurationSeconds,
		x: DimensionUtil.decimalToActualWidth(this.TRAY_CURRENT_POSITION.x),
		y: DimensionUtil.decimalToActualHeight(this.TRAY_CURRENT_POSITION.y),
	});
	dropCoverFrontTween.play();
	dropCoverBackTween.play();
	
	// Make the tray lift up
	this.timeOuts[this.timeOuts.length] = setTimeout(function() {
		var liftTween = new Kinetic.Tween({
			node: app.view.onesWidgetGroup, 
			duration: trayLiftDurationSeconds,
			y: DimensionUtil.decimalToActualHeight(-0.2)
		});
		liftTween.play();
	}, fallCoverDurationSeconds * 1000);

	// Shrink the tray
	this.timeOuts[this.timeOuts.length] = setTimeout(function() {
		var shrinkTrayTween = new Kinetic.Tween({
			node: app.view.onesWidgetGroup, 
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
	this.timeOuts[this.timeOuts.length] = setTimeout(function() {
		// set current tray to next
		app.view.trays.current = app.view.trays.next;
		
		// create new next tray
		app.view.trays.next = new Kinetic.Image({image: app.view.images.tray});
		WidgetUtil.glue(app.view.trays.next, {
			width: app.view.TRAY_SIZE.width,
			height: app.view.TRAY_SIZE.height,
			dx: app.view.TRAY_BELOW_NEXT_POSITION.x,
			dy: app.view.TRAY_BELOW_NEXT_POSITION.y
		});
		app.layer.add(app.view.trays.next);		
		
		// move current tray up
		var moveCurrentTrayTween = new Kinetic.Tween({
			node: app.view.trays.current, 
			duration: beltSlideDurationSeconds,
			x: DimensionUtil.decimalToActualWidth(0.25),
			y: DimensionUtil.decimalToActualHeight(0.415),
			easing: Kinetic.Easings.Linear
		});
		moveCurrentTrayTween.play();
		
		// move next tray up
		var moveNextTrayTween = new Kinetic.Tween({
			node: app.view.trays.next, 
			duration: beltSlideDurationSeconds,
			x: DimensionUtil.decimalToActualWidth(0.05),
			y: DimensionUtil.decimalToActualHeight(0.71),
			easing: Kinetic.Easings.Linear
		});
		moveNextTrayTween.play();
		
	}, (fallCoverDurationSeconds + trayLiftDurationSeconds + shrinkTrayDurationSeconds) * 1000);
	
	this.timeOuts[this.timeOuts.length] = setTimeout(function() {
		app.view.eggsAtDestination = [];
		app.view.onesWidgetGroup = new Kinetic.Group({});
		app.layer.add(app.view.onesWidgetGroup);
		app.view.onesWidgetGroup.moveToTop();
		
		app.view.onesTextWidget.setText(0);
		app.view.tensTextWidget.setText(parseInt(app.view.tensTextWidget.getText())+1);
		
		app.view.activitiesEnabled = true;
	}, (fallCoverDurationSeconds + trayLiftDurationSeconds + shrinkTrayDurationSeconds + beltSlideDurationSeconds) * 1000);
};

// Is called when a mistake is made by the student
GroupingGameView.prototype.errorMade = function (errorType) {
	this.errorsMade++;

	switch (errorType) {
		case this.ERROR_TYPES.DRAG_TO_TENS:
			this.displayThinkCloud("WHOOPS! This is only ONE easter egg! You need to drag this to ONES!");
		break;
		case this.ERROR_TYPES.INCORRECT_DONE:
			this.displayThinkCloud("UH OH! The number you have made is not " + 
				app.controller.NUMBER_TO_WORDS_MAP[app.controller.goalNumber] +
				"! You need more!");
		break;
		case this.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_EGGS:
			this.displayThinkCloud("You're trying to make " + 
				app.controller.NUMBER_TO_WORDS_MAP[app.controller.goalNumber] +
				". Count your eggs! Have you already got the correct number?");
		break;
		case this.ERROR_TYPES.PACK_DRAG_TO_ONES:
			this.displayThinkCloud("WHOOPS! The packs of tens do not go there!");
		break;
		case this.ERROR_TYPES.EXCEEDED_GOAL_NUMBER_WITH_PACKS:
			alert(1);
			this.displayThinkCloud("You're trying to make " + 
				app.controller.NUMBER_TO_WORDS_MAP[app.controller.goalNumber] +
				". Count your packs! Have you got enough?");
		break;
	}
	
	if (this.errorsMade == this.allowableErrorsCount) {
		this.finish(0);
	}
}

// Calculate the current total the student has already performed
GroupingGameView.prototype.calculateTotal = function () {
	var ones = parseInt(this.onesTextWidget.getText());
	var tens = parseInt(this.tensTextWidget.getText() * 10);
	return (tens + ones);
};

// Finsih the game. Score: 0 for fail, 1 to 3 for stars
GroupingGameView.prototype.finish = function(score) {
	var finishTitleImage = null;
	var starsImage = null;
	
	switch(score) {
		case 0:
			finishTitleImage = this.images.labelTryAgain;
			starsImage = null;
			
		break;
		case 1:
			finishTitleImage = this.images.labelGood;
			starsImage = this.images.star1;
		
		break;
		case 2:
			finishTitleImage = this.images.labelExcellent;
			starsImage = this.images.star2;
			
		break;			
		case 3:
			finishTitleImage = this.images.labelPerfect;
			starsImage = this.images.star3;
			
		break;
	}

	// draw overlay
	var overlay = new Kinetic.Rect({
		fill: 'black',
		opacity: 0.62
	});
	WidgetUtil.glue(overlay, {
		width: 1,
		height: 1,
		dx: 0,
		dy: 0
	});
	app.layer.add(overlay);
	
	// draw title
	var finishTitle = new Kinetic.Image({image: finishTitleImage});
	WidgetUtil.glue(finishTitle, {
		width: 0.45,
		height: 0.15,
		dx: 0.27,
		dy: 0.2
	});
	app.layer.add(finishTitle);
	
	if (starsImage != null) {
		// draw stars
		var starsWidget = new Kinetic.Image({image: starsImage});
		WidgetUtil.glue(starsWidget, {
			width: 0.35,
			height: 0.14,
			dx: 0.325,
			dy: 0.35
		});
		app.layer.add(starsWidget);
			
	}
	
	var buttonRetry = null;
	
	// draw buttons 
	if (score == 0) {
		// draw retry button only
		buttonRetry = new Kinetic.Image({image: this.images.buttonRetry});
		WidgetUtil.glue(buttonRetry, {
			width: 0.15,
			height: 0.25,
			dx: 0.425,
			dy: 0.45
		});
	} else {
		buttonRetry = new Kinetic.Image({image: this.images.buttonRetry});
		WidgetUtil.glue(buttonRetry, {
			width: 0.1,
			height: 0.17,
			dx: 0.36,
			dy: 0.6
		});
		
		var buttonNext = new Kinetic.Image({image: this.images.buttonNext});
		WidgetUtil.glue(buttonNext, {
			width: 0.1,
			height: 0.17,
			dx: 0.54,
			dy: 0.6
		});
		app.layer.add(buttonNext);	
		buttonNext.on('click tap', function () {
			app.controller.nextGame();
		});
	}
	
	buttonRetry.on('click tap', function () {
		Music.play(app.view.sounds.select);
		app.controller.restart(true);
	});
	
	app.layer.add(buttonRetry);	
	
	app.stage.draw();
};