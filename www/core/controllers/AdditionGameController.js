function AdditionGameController() {
	
	// Image that are automatically loaded
	this.images = {};

	this.images.rabbitHead = "images/grouping_game/rabbit_head.png";
	this.images.thinkCloud = "images/widgets/think_cloud.png";
	this.images.belts = "images/addition_game/belts.png";
	this.images.board1 = "images/addition_game/board1.png";
	this.images.board2 = "images/addition_game/board2.png";
	this.images.track = "images/addition_game/track.png";
	
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

	this.images.pack = "images/addition_game/pack.png";
	this.images.box = "images/addition_game/box.png";
	
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

AdditionGameController.prototype.initialize = function() {
	this.view = new AdditionGameView(this);
	app.view = this.view;
	
	this.view.setImages(this.images);
	this.view.setSounds(this.sounds);
	
	
	// currentGame veriable may be directly converted into difficulty
	var q = additionGameHelper.generateQuestion(app.currentGame);
	this.goalNumber = q.left;
	this.goalNumber2 = q.right;
	
	// ==================================================
	// SETTING VIEW VARIABLES
	// ==================================================
	app.view.viewVars = {};

	// goal numbers
	app.view.viewVars.goalNumber = this.goalNumber;
	app.view.viewVars.goalNumber2 = this.goalNumber2;
	
	// The areas of the 'ones' belts that accepts the egg
	app.view.viewVars.beltOnesArea = {};
	app.view.viewVars.beltOnesArea.X_ARRAY =      [0.792, 0.792, 0.792];
	app.view.viewVars.beltOnesArea.Y_ARRAY =      [0.224, 0.303, 0.381];
	app.view.viewVars.beltOnesArea.RADIUS_ARRAY = [0.110, 0.110, 0.110];

	// The areas of the 'tens' belts that accepts the egg
	app.view.viewVars.beltTensArea = {};
	app.view.viewVars.beltTensArea.X_ARRAY =      [0.573, 0.573, 0.573];
	app.view.viewVars.beltTensArea.Y_ARRAY =      [0.224, 0.303, 0.381];
	app.view.viewVars.beltTensArea.RADIUS_ARRAY = [0.110, 0.110, 0.110];

	// The areas of the 'hundreds' belts that accepts the egg
	app.view.viewVars.beltHundredsArea = {};
	app.view.viewVars.beltHundredsArea.X_ARRAY =      [0.356, 0.356, 0.356];
	app.view.viewVars.beltHundredsArea.Y_ARRAY =      [0.224, 0.303, 0.381];
	app.view.viewVars.beltHundredsArea.RADIUS_ARRAY = [0.110, 0.110, 0.110];
		
	// widgets
	app.view.viewVars.rabbitDimensions = {x:0.07, y:0.78, width:0.13, height:0.22};
	app.view.viewVars.beltDimensions = {x:0.42, y:0.55, width:0.48, height:0.50};
	app.view.viewVars.thinkCloudDimensions = {x:-0.03, y:0.48, width:0.45, height:0.50};
	app.view.viewVars.thinkCloudTextLocation = {x:0.043, y:0.60};
	app.view.viewVars.pauseButtonDimensions = {x:0.02, y:0.035, width:0.09, height:0.12};
	app.view.viewVars.numberWidgetDimensions = {onesX: 0.62, onesY: 0.25, tensX: 0.36, tensY: 0.25};
	app.view.viewVars.doneButtonDimensions = {x:0.86, y:0.45, width:0.15, height:0.2};
	app.view.viewVars.trackDimensions = {x:0.01, y:0.14, width:0.89, height:0.448}
	app.view.viewVars.board1Dimensions = {x:0.85, y:0.22, width:0.15, height:0.18}
	app.view.viewVars.board2Dimensions = {x:0.85, y:0.75, width:0.15, height:0.18}
	
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
	app.view.viewVars.eggsGroupLocation = {x:0.722, y:0.165};
	app.view.viewVars.eggsBeltOffset = {x:0.722, y:0.680};
	app.view.viewVars.eggsRelativeLocations = [
		{x: 0.000, y: 0.000},
		{x: 0.062, y: 0.000},
		{x: 0.000, y: 0.050},
		{x: 0.062, y: 0.050},
		{x: 0.000, y: 0.100},
		{x: 0.062, y: 0.100},
		{x: 0.000, y: 0.150},
		{x: 0.062, y: 0.150},
		{x: 0.000, y: 0.200},
		{x: 0.062, y: 0.200}
	];
	app.view.viewVars.eggsPackedRelativeLocations = [
		{x: 0.060, y: 0.000}, // row:0 col:4
		{x: 0.060, y: 0.020}, // row:1 col:4
		{x: 0.045, y: 0.000}, // row:0 col:3
		{x: 0.045, y: 0.020}, // row:1 col:3
		{x: 0.030, y: 0.000}, // row:0 col:2
		{x: 0.030, y: 0.020}, // row:1 col:2
		{x: 0.015, y: 0.000}, // row:0 col:1
		{x: 0.015, y: 0.020}, // row:1 col:1
		{x: 0.000, y: 0.000}, // row:0 col:0
		{x: 0.000, y: 0.020}  // row:1 col:0
	];
	
	
	
	app.view.viewVars.packsGroupLocation = {x:0.48, y:0.16};
	app.view.viewVars.packsBeltOffset = {x:0.452, y:0.680};
	app.view.viewVars.packsRelativeLocations = [
		{x: 0.00, y: 0.00},
		{x: 0.09, y: 0.00},
		{x: 0.00, y: 0.06},
		{x: 0.09, y: 0.06},
		{x: 0.00, y: 0.12},
		{x: 0.09, y: 0.12},
		{x: 0.00, y: 0.18},
		{x: 0.09, y: 0.18},
		{x: 0.00, y: 0.24},
		{x: 0.09, y: 0.24}
	];
	app.view.viewVars.packsPackedRelativeLocations = [
		{x: 0.00, y: 0.00},
		{x: 0.05, y: 0.00},
		{x: 0.00, y: 0.03},
		{x: 0.05, y: 0.03},
		{x: 0.00, y: 0.06},
		{x: 0.05, y: 0.06},
		{x: 0.00, y: 0.09},
		{x: 0.05, y: 0.09},
		{x: 0.00, y: 0.12},
		{x: 0.05, y: 0.12}
	];
	
	app.view.viewVars.boxLocation = {x: 0.28, y: 0.23};


	
	
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
	
	//var title = mathUtil.convertNumberToWord(this.goalNumber);
	var title = this.goalNumber + " + " + this.goalNumber2 + " = ?";
	
	if(Storage.get("settingMusic") == true){
		music.stopBackgroundMusic();
		music.playBackgroundMusic(this.sounds.background);
	}
	
	this.view.initialize();
	this.view.drawEggsGroup();
	this.view.drawPacksGroup();
	
	this.view.drawBelts();
	this.view.drawTracks();
	this.view.drawBoards();
	this.view.drawThinkCloud();
	this.view.drawRabbitHead();	
	this.view.drawDoneButton();
	this.view.drawPauseWidgets();	
	this.view.drawTitle(title);

	
	this.view.drawEggs();
	this.view.drawPacks();
	
	this.view.drawNumbers();	
	
	if (Env.debug) {
		this.view.drawAreas();
	}
	
	app.stage.draw();
};

// destructor
AdditionGameController.prototype.finalize = function() {
	
};

AdditionGameController.prototype.restart = function(sameNumber) {
	app.view.titleAnim.stop();
	if (sameNumber) {
		app.AdditionGameRestartNumber = this.goalNumber;
		app.AdditionGameRestartNumber2 = this.goalNumber2;
	}
	app.route(app.getCurrentPage(), app.getCurrentPageParams(), true);
};

AdditionGameController.prototype.menu = function() {
	app.view.titleAnim.stop();
	app.route("MenuUnit", null, true);
};

AdditionGameController.prototype.nextGame = function() {
	app.view.titleAnim.stop();
	if (app.nextGame()) {
		app.route(app.getCurrentPage(), app.getCurrentPageParams(), true);
	} else {
		app.route("MenuUnit", null, true);
	}
};

AdditionGameController.prototype.achievedStars = function (starsCount) {
	var unitRecordsModel = new UnitRecordsModel(app.currentUnit);
	if (unitRecordsModel.getStars(app.currentGame) < starsCount) {
		unitRecordsModel.setStars(app.currentGame, starsCount);
	}
};
