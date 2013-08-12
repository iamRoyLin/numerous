function GroupingGame4Controller() {
	
	// Image that are automatically loaded
	this.images = {};

	this.images.rabbit = "images/grouping_game/rabbit_head.png";
	this.images.thinkCloud = "images/widgets/think_cloud.png";
	this.images.belts = "images/grouping_game/unit3/belts.png";
	//this.images.pack = "images/grouping_game/unit3/pack.png";
	this.images.board1 = "images/grouping_game/unit3/board1.png";
	this.images.board2 = "images/grouping_game/unit3/board2.png";
	this.images.track = "images/grouping_game/unit3/track.png";
	
	this.images.star1 = "images/widgets/star1.png";
	this.images.star2 = "images/widgets/star2.png";
	this.images.star3 = "images/widgets/star3.png";

	this.images.labelPaused = "images/widgets/label_paused.png";
	this.images.labelTryAgain = "images/widgets/label_try_again.png";
	this.images.labelPerfect = "images/widgets/label_perfect.png";
	this.images.labelGood = "images/widgets/label_good.png";
	this.images.labelExcellent = "images/widgets/label_excellent.png";

	this.images.buttonPause = "images/widgets/button_pause.png";
	this.images.buttonMenu = "images/widgets/button_menu.png";
	this.images.buttonRestart = "images/widgets/button_restart.png";
	this.images.buttonResume = "images/widgets/button_resume.png";
	this.images.buttonDone = "images/widgets/button_done.png";
	this.images.buttonRetry = "images/widgets/button_retry.png";
	this.images.buttonNext = "images/widgets/button_next.png";

	this.images.eggs = [
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
	
	// sounds
	this.sounds = {};
	this.sounds.acceptEgg = "sounds/grouping_game/accept_egg.wav";
	this.sounds.declineEgg = "sounds/grouping_game/reject_egg.wav";
	this.sounds.select = "sounds/menu/menu_select.wav";
	this.sounds.wrapUp = "sounds/grouping_game/wrap_up.wav";
	this.sounds.done = "sounds/grouping_game/done.wav";
	
	
};

GroupingGame4Controller.prototype.initialize = function() {
	this.view = new GroupingGameView(this);
	app.view = this.view;
	
	this.view.setImages(this.images);
	this.view.setSounds(this.sounds);
	
	// ==================================================
	// SETTING VIEW VARIABLES
	// ==================================================
	app.view.viewVars = {};
	
	// Number of packs at the origin at the beginning
	app.view.viewVars.initialPackCount = 3;
	
	// Number of eggs at the origin at the beginning
	app.view.viewVars.initialEggCount = 50;
	
	// The areas of the 'ones' belts that accepts the egg
	app.view.viewVars.beltOnesArea = {};
	app.view.viewVars.beltOnesArea.X_ARRAY =      [0.73, 0.79, 0.85, 0.91];
	app.view.viewVars.beltOnesArea.Y_ARRAY =      [0.50, 0.58, 0.66, 0.74];
	app.view.viewVars.beltOnesArea.RADIUS_ARRAY = [0.11, 0.11, 0.11, 0.11];

	// The areas of the 'tens' belts that accepts the egg
	app.view.viewVars.beltTensArea = {};
	app.view.viewVars.beltTensArea.X_ARRAY =      [0.38, 0.44, 0.50, 0.56, 0.62, 0.68];
	app.view.viewVars.beltTensArea.Y_ARRAY =      [0.50, 0.58, 0.66, 0.74, 0.82, 0.90];
	app.view.viewVars.beltTensArea.RADIUS_ARRAY = [0.13, 0.13, 0.13, 0.13, 0.13, 0.13];

	// widgets
	app.view.viewVars.rabbitDimensions = {x:0.07, y:0.78, width:0.13, height:0.22};
	app.view.viewVars.beltDimensions = {x:0.42, y:0.55, width:0.48, height:0.50};
	app.view.viewVars.thinkCloudDimensions = {x:-0.03, y:0.48, width:0.45, height:0.50};
	app.view.viewVars.thinkCloudTextLocation = {x:0.043, y:0.60};
	app.view.viewVars.pauseButtonDimensions = {x:0.02, y:0.035, width:0.09, height:0.12};
	app.view.viewVars.numberWidgetDimensions = {onesX: 0.62, onesY: 0.25, tensX: 0.36, tensY: 0.25};
	app.view.viewVars.doneButtonDimensions = {x:0.86, y:0.45, width:0.15, height:0.2};
	app.view.viewVars.trackDimensions = {x:0.01, y:0.14, width:0.89, height:0.43}
	app.view.viewVars.board1Dimensions = {x:0.88, y:0.22, width:0.12, height:0.18}
	app.view.viewVars.board2Dimensions = {x:0.88, y:0.75, width:0.12, height:0.18}
	
	// Tray and cover sizes and positions
	app.view.viewVars.traySize = {width:0.395, height:0.42};
	app.view.viewVars.trayCurrentPosition = {x:0.25, y:0.415};
	app.view.viewVars.trayNextPosition = {x:0.05, y:0.71};
	app.view.viewVars.trayBelowNextPosition = {x:-0.15, y:1.005};
	app.view.viewVars.initialCoverPosition = {x:0.25, y:-0.415};

	// Initial egg positions
	app.view.viewVars.initialEggRectangle = {x:0.07, y:0.75, width:0.15, height:0.01};
	app.view.viewVars.initialEggSize = {width:0.06, height:0.093};
	
	// Initial pack positions
	app.view.viewVars.initialPackRectangle = {x:0.1, y:0.85, width:0.2, height:0.05};
	app.view.viewVars.initialPackSize = {width:0.2, height:0.07};
	
	// The destination locations where packs will be locked in to
	app.view.viewVars.packDestinationLocations = [
		{x: 0.298, y: 0.444},
		{x: 0.338, y: 0.502},
		{x: 0.378, y: 0.560},
		{x: 0.418, y: 0.618},
		{x: 0.458, y: 0.676},
		{x: 0.498, y: 0.734},
		{x: 0.538, y: 0.792},
		{x: 0.578, y: 0.850},
		{x: 0.618, y: 0.908},
	];
	
	// The destination locations where eggs will be locked in to
	app.view.viewVars.eggDestinationLocations = [
		//{x:0.470, y: 0.465},
		{x:0.665, y: 0.405},
		{x:0.727, y: 0.405},
		
		{x:0.715, y: 0.458},
		{x:0.777, y: 0.458},
		
		{x:0.765, y: 0.511},
		{x:0.827, y: 0.511},
		
		{x:0.815, y: 0.564},
		{x:0.877, y: 0.564},
		
		{x:0.865, y: 0.617},
		{x:0.927, y: 0.617},
	];
	
	// complements
	app.view.viewVars.compliments = [
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
	
	// determines whether packs are being used.
	app.view.viewVars.usePacks = true;
	
	if (app.GroupingGame4RestartNumber != null) {
		this.goalNumber = app.GroupingGame4RestartNumber;
		app.GroupingGame4RestartNumber = null;
	} else {
		this.goalNumber = app.UNIT_GAMES[app.currentUnit][app.currentGame].goalNumber;
		this.goalNumber += MathUtil.random(0,9);
	}
	

	
	var title = MathUtil.convertNumberToWord(this.goalNumber);
	
	

	this.view.drawBelts();
	this.view.drawTrack();
	this.view.drawBoards();
	this.view.drawThinkCloud();
	this.view.drawRabbit();	
	this.view.drawPauseWidgets();	
	this.view.drawDoneButton();
	//this.view.drawEggs();
	//this.view.drawNumbers();
	//this.view.drawPacks();
	//this.view.drawTitle(title);	
	
	app.stage.draw();
};

// destructor
GroupingGame4Controller.prototype.finalize = function() {
	
};

GroupingGame4Controller.prototype.restart = function(sameNumber) {
	if (sameNumber) {
		app.GroupingGame4RestartNumber = this.goalNumber;
	}
	app.route(app.getCurrentPage(), app.getCurrentPageParams());
};

GroupingGame4Controller.prototype.menu = function() {
	app.route("MenuUnit");
};

GroupingGame4Controller.prototype.nextGame = function() {
	if (app.nextGame()) {
		app.route(app.getCurrentPage(), app.getCurrentPageParams());
	} else {
		app.route("MenuUnit");
	}
};

GroupingGame4Controller.prototype.achievedStars = function (starsCount) {
	var unitRecordsModel = new UnitRecordsModel(app.currentUnit);
	if (unitRecordsModel.getStars(app.currentGame) < starsCount) {
		unitRecordsModel.setStars(app.currentGame, starsCount);
	}
};
