function GroupingGame3Controller() {
	
	// Image that are automatically loaded
	this.images = {};

	this.images.rabbit = "images/grouping_game/rabbit.png";
	this.images.rabbitHead = "images/grouping_game/rabbit_head.png";
	this.images.rabbitBody = "images/grouping_game/rabbit_body.png";
	this.images.thinkCloud = "images/widgets/think_cloud.png";
	this.images.belts = "images/grouping_game/unit2/belts.png";
	this.images.pack = "images/grouping_game/unit2/pack.png";
	
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
	this.sounds.acceptEgg = "sounds/grouping_game/accept_egg.mp3";
	this.sounds.declineEgg = "sounds/grouping_game/reject_egg.mp3";
	this.sounds.select = "sounds/menu/menu_select.mp3";
	this.sounds.wrapUp = "sounds/grouping_game/wrap_up.mp3";
	this.sounds.done = "sounds/grouping_game/done.mp3";
	this.sounds.background = "sounds/background_music/game.mp3";
	
	
};

GroupingGame3Controller.prototype.initialize = function() {
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
	app.view.viewVars.initialEggCount = 18;
	
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
	app.view.viewVars.rabbitHeadDimensions = {x:0.18, y:0.68, width:0.24, height:0.37};
	app.view.viewVars.rabbitBodyDimensions = {x:0.04, y:0.66, width:0.265, height:0.35};
	app.view.viewVars.rabbitDimensions = {x:0.03, y:0.40, width:0.22, height:0.60};
	app.view.viewVars.beltDimensions = {x:0.2, y:0.14, width:0.80, height:0.85};
	app.view.viewVars.thinkCloudDimensions = {x:-0.03, y:0.133, width:0.41, height:0.45};
	app.view.viewVars.thinkCloudTextLocation = {x:0.033, y:0.24};
	app.view.viewVars.pauseButtonDimensions = {x:0.02, y:0.035, width:0.09, height:0.12};
	app.view.viewVars.numberWidgetDimensions = {onesX: 0.62, onesY: 0.25, tensX: 0.36, tensY: 0.25};
	app.view.viewVars.doneButtonDimensions = {x:0.80, y:0.228, width:0.15, height:0.2};

	
	// Tray and cover sizes and positions
	app.view.viewVars.traySize = {width:0.395, height:0.42};
	app.view.viewVars.trayCurrentPosition = {x:0.25, y:0.415};
	app.view.viewVars.trayNextPosition = {x:0.05, y:0.71};
	app.view.viewVars.trayBelowNextPosition = {x:-0.15, y:1.005};
	app.view.viewVars.initialCoverPosition = {x:0.25, y:-0.415};

	// Initial egg positions
	app.view.viewVars.initialEggRectangle = {x:0.07, y:0.75, width:0.15, height:0.01};
	app.view.viewVars.initialEggSize = {width:0.075, height:0.116};
	
	// Initial pack positions
	app.view.viewVars.initialPackRectangle = {x:0.1, y:0.865, width:0.2, height:0.05};
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
		{x:0.657, y: 0.376},
		{x:0.720, y: 0.378},
		
		{x:0.707, y: 0.430},
		{x:0.770, y: 0.431},
		
		{x:0.756, y: 0.487},
		{x:0.817, y: 0.486},
		
		{x:0.804, y: 0.546},
		{x:0.867, y: 0.546},
		
		{x:0.853, y: 0.598},
		{x:0.916, y: 0.598},
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
	
	if (app.groupingGame3RestartNumber != null) {
		this.goalNumber = app.groupingGame3RestartNumber;
		app.groupingGame3RestartNumber = null;
	} else {
		this.goalNumber = app.UNIT_GAMES[app.currentUnit][app.currentGame].goalNumber;
		this.goalNumber += mathUtil.random(0,9);
	}
	

	
	var title = mathUtil.convertNumberToWord(this.goalNumber);
	
	if(Storage.get("settingMusic") == true){
		music.stopBackgroundMusic();
		music.playBackgroundMusic(this.sounds.background);
	}

	this.view.drawBelts();
	this.view.drawRabbit();
	this.view.drawThinkCloud();	
	this.view.drawPauseWidgets();	
	this.view.drawDoneButton();
	this.view.drawEggs();
	this.view.drawNumbers();
	this.view.drawPacks();
	this.view.drawTitle(title);	
	
	app.stage.draw();
	SoundUtil.sayNumber(this.goalNumber);
};

// destructor
GroupingGame3Controller.prototype.finalize = function() {
	
};

GroupingGame3Controller.prototype.restart = function(sameNumber) {
	app.view.titleAnim.stop();
	if (sameNumber) {
		app.groupingGame3RestartNumber = this.goalNumber;
	}
	app.route(app.getCurrentPage(), app.getCurrentPageParams(), true);
};

GroupingGame3Controller.prototype.menu = function() {
	app.view.titleAnim.stop();
	app.route("MenuUnit", null, true);

};

GroupingGame3Controller.prototype.nextGame = function() {
	app.view.titleAnim.stop();
	if (app.nextGame()) {
		app.route(app.getCurrentPage(), app.getCurrentPageParams(), true);
	} else {
		app.route("MenuUnit", null, true);
	}
};

GroupingGame3Controller.prototype.achievedStars = function (starsCount) {
	var unitRecordsModel = new UnitRecordsModel(app.currentUnit);
	if (unitRecordsModel.getStars(app.currentGame) < starsCount) {
		unitRecordsModel.setStars(app.currentGame, starsCount);
	}
};
