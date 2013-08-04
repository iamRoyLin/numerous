function GroupingGame2Controller() {
	
	// Image that are automatically loaded
	this.images = {};

	this.images.rabbit = "images/grouping_game/rabbit.png";
	this.images.thinkCloud = "images/widgets/think_cloud.png";
	this.images.belts = "images/grouping_game/belts.png";
	this.images.coverFront = "images/grouping_game/cover_front.png";
	this.images.coverBack = "images/grouping_game/cover_back.png";
	this.images.tray = "images/grouping_game/tray.png";
	this.images.pack = "images/grouping_game/pack.png";
	
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
	
	// Map of numbers to their words
	this.NUMBER_TO_WORDS_MAP = [];
	this.NUMBER_TO_WORDS_MAP[11] = "ELEVEN";
	this.NUMBER_TO_WORDS_MAP[12] = "TWELVE";
	this.NUMBER_TO_WORDS_MAP[13] = "THIRTEEN";
	this.NUMBER_TO_WORDS_MAP[14] = "FOURTEEN";
	this.NUMBER_TO_WORDS_MAP[15] = "FIFTEEN";
	this.NUMBER_TO_WORDS_MAP[16] = "SIXTEEN";
	this.NUMBER_TO_WORDS_MAP[17] = "SEVENTEEN";
	this.NUMBER_TO_WORDS_MAP[18] = "EIGHTEEN";
	this.NUMBER_TO_WORDS_MAP[19] = "NINETEEN";
	
};

GroupingGame2Controller.prototype.initialize = function() {
	this.view = new GroupingGameView(this);
	app.view = this.view;
	
	this.view.setImages(this.images);
	this.view.setSounds(this.sounds);
	
	this.goalNumber = app.UNIT_GAMES[app.currentUnit][app.currentGame].goalNumber;
	var title = this.NUMBER_TO_WORDS_MAP[this.goalNumber];
	
	this.view.drawRabbit();
	this.view.drawThinkCloud();
	this.view.drawBelts();
	this.view.drawTrays();
	this.view.drawTitle(title);	
	this.view.drawPauseWidgets();	
	this.view.drawDoneButton();
	this.view.drawEggs();	
	this.view.drawNumbers();
	
	this.view.drawPacks();
	
	app.stage.draw();
};

// destructor
GroupingGame2Controller.prototype.finalize = function() {
	
};

GroupingGame2Controller.prototype.restart = function(sameNumber) {
	app.route(app.getCurrentPage(), app.getCurrentPageParams());
};

GroupingGame2Controller.prototype.menu = function() {
	app.route("MenuUnit");
};

GroupingGame2Controller.prototype.nextGame = function() {
	if (app.nextGame()) {
		app.route(app.getCurrentPage(), app.getCurrentPageParams());
	} else {
		app.route("MenuUnit");
	}
};

