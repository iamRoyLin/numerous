function Practice1Controller() {

	// Images. These will automatically be loaded
	this.images = {};
	
	this.images.rabbitBody = "images/grouping_game/practice/rabbit_body.png";
	this.images.rabbitHead = "images/grouping_game/practice/rabbit_head.png";
	this.images.blackBoard = "images/grouping_game/practice/black_board.png";
	
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
	
	this.images.options = [
		"images/grouping_game/practice/egg1.png",
		"images/grouping_game/practice/egg2.png",
		"images/grouping_game/practice/egg3.png",
		"images/grouping_game/practice/egg4.png",
		"images/grouping_game/practice/egg5.png",
		"images/grouping_game/practice/egg6.png",
		"images/grouping_game/practice/egg7.png",
		"images/grouping_game/practice/egg8.png",
		"images/grouping_game/practice/egg9.png"
	];
	
	// sounds
	this.sounds = {};
	this.sounds.acceptEgg = "sounds/grouping_game/accept_egg.wav";
	this.sounds.declineEgg = "sounds/grouping_game/reject_egg.wav";
	this.sounds.select = "sounds/menu/menu_select.wav";
	this.sounds.wrapUp = "sounds/grouping_game/wrap_up.wav";
	this.sounds.done = "sounds/grouping_game/done.wav";
	
	//view.draw();
};

// Happens when images are loaded
Practice1Controller.prototype.initialize = function () {
	this.view = new PracticeView(this);
	app.view = this.view;
	
	//dimensions
	app.view.viewVars = {};
	app.view.viewVars.pauseButtonDimensions = {x:0.02, y:0.035, width:0.09, height:0.12};
	
	app.view.totalNumberOfSets = 4;
	app.view.numberOfQuestionsPerSet = 3;
	app.view.questionSets = {};
	var set1 = [
		/*{q: "Eleven is the same as one and __ ?", a: "ten"},
		{q: "Twelve is the same as two and __ ?", a: "ten"},
		{q: "Thirteen is the same as three and __ ?", a: "ten"},
		{q: "Fourteen is the same as four and __ ?", a: "ten"},
		{q: "Fifteen is the same as five and __ ?", a: "ten"},
		{q: "Sixteen is the same as six and __ ?", a: "ten"},
		{q: "Seventeen is the same as seven and __ ?", a: "ten"},
		{q: "Eighteen is the same as eight and __ ?", a: "ten"},
		{q: "Nineteen is the same as nine and __ ?", a: "ten"},*/
		
		{q1: "Eleven", q2: " is the same as __ and ten?", a: "One"},
		{q1: "Twelve", q2: " is the same as __ and ten?", a: "Two"},
		{q1: "Thirteen", q2: " is the same as __ and ten?", a: "Three"},
		{q1: "Fourteen", q2: " is the same as __ and ten?", a: "Four"},
		{q1: "Fifteen", q2: " is the same as __ and ten?", a: "Five"},
		{q1: "Sixteen", q2: " is the same as __ and ten?", a: "Six"},
		{q1: "Seventeen", q2: " is the same as __ and ten?", a: "Seven"},
		{q1: "Eighteen", q2: " is the same as __ and ten?", a: "Eight"},
		{q1: "Nineteen", q2: " is the same as __ and ten?", a: "Nine"}
	];
	var set2 = [
		{q1: "Ten and one", q2: " is the same as __?", a: "Eleven"},
		{q1: "Ten and two", q2: " is the same as __?", a: "Twelve"},
		{q1: "Three and ten", q2: " is the same as __?", a: "Thirteen"},
		{q1: "Four and ten", q2: " is the same as __?", a: "Fourteen"},
		{q1: "Ten and five", q2: " is the same as __?", a: "Fifteen"},
		{q1: "Ten and six", q2: " is the same as __?", a: "Sixteen"},
		{q1: "Seven and ten", q2: " is the same as __?", a: "Seventeen"},
		{q1: "Eight and ten", q2: " is the same as __?", a: "Eighteen"},
		{q1: "Ten and nine", q2: " is the same as __?", a: "Nineteen"}
	];
	var set3 = [
		{q1: "Ten and one", q2: " is the same as __?", a: "11"},
		{q1: "Ten and two", q2: " is the same as __?", a: "12"},
		{q1: "Three and ten", q2: " is the same as __?", a: "13"},
		{q1: "Four and ten", q2: " is the same as __?", a: "14"},
		{q1: "Ten and five", q2: " is the same as __?", a: "15"},
		{q1: "Ten and six", q2: " is the same as __?", a: "16"},
		{q1: "Seven and ten", q2: " is the same as __?", a: "17"},
		{q1: "Eight and ten", q2: " is the same as __?", a: "18"},
		{q1: "Ten and nine", q2: " is the same as __?", a: "19"}
	];
	var set4 = [
		{q1: "11", q2: " is the same as __ and ten?", a: "One"},
		{q1: "12", q2: " is the same as __ and ten?", a: "Two"},
		{q1: "13", q2: " is the same as __ and ten?", a: "Three"},
		{q1: "14", q2: " is the same as __ and ten?", a: "Four"},
		{q1: "15", q2: " is the same as __ and ten?", a: "Five"},
		{q1: "16", q2: " is the same as __ and ten?", a: "Six"},
		{q1: "17", q2: " is the same as __ and ten?", a: "Seven"},
		{q1: "18", q2: " is the same as __ and ten?", a: "Eight"},
		{q1: "19", q2: " is the same as __ and ten?", a: "Nine"}
	];
	/*app.view.questionSets.set5 = [
		{q1: "11", q2: " is the same as __ ?", a: "Eleven"},
		{q1: "12", q2: " is the same as __ ?", a: "Twelve"},
		{q1: "13", q2: " is the same as __ ?", a: "Thirteen"},
		{q1: "14", q2: " is the same as __ ?", a: "Fourteen"},
		{q1: "15", q2: " is the same as __ ?", a: "Fifteen"},
		{q1: "16", q2: " is the same as __ ?", a: "Sixteen"},
		{q1: "17", q2: " is the same as __ ?", a: "Seventeen"},
		{q1: "18", q2: " is the same as __ ?", a: "Eighteen"},
		{q1: "19", q2: " is the same as __ ?", a: "Nineteen"}
	];*/
	var keyboard1 = ["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
	var keyboard2 = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
	var keyboard3 = ["11", "12", "13", "14", "15", "16", "17", "18", "19"];
	
	app.view.questionSets.sets = [set1, set2, set3, set4];
	app.view.questionSets.keyboards = [keyboard2, keyboard1, keyboard3, keyboard2];
	app.view.questionSets.current = -1;
	
	//button enabled
	app.view.activitiesEnabled = true;
	
	//score
	app.view.allowableErrorsCount = 6;
	app.view.errorsMade = 0;
	app.view.errorsRange = 2;
	
	this.view.setImages(this.images);
	this.view.drawBlackBoard();
	this.view.drawRabbit();
	this.view.drawQuestion();
	this.view.drawPauseWidgets();
	//this.view.drawOptionButtons();
	this.view.questionCallback();
	
	app.stage.draw();
};

// destructor (is automatically called when you leave the page)
Practice1Controller.prototype.finalize = function() {
	
}

Practice1Controller.prototype.restart = function(sameNumber) {
	app.route("Practice1");
};

Practice1Controller.prototype.menu = function() {
	app.route("MenuUnit");
};

