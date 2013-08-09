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
	
	this.images.eggs = [
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
	
	
	this.keyboards = [
		["Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
		["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
		["11", "12", "13", "14", "15", "16", "17", "18", "19"]
	]
	
	this.questionSets = [
		[
			{question: "Eleven is the same as ____ and ten?", answer: "One", keyboardId: 1},
			{question: "Twelve is the same as ____ and ten?", answer: "Two", keyboardId: 1},
			{question: "Thirteen is the same as ____ and ten?", answer: "Three", keyboardId: 1},
			{question: "Fourteen is the same as ____ and ten?", answer: "Four", keyboardId: 1},
			{question: "Fifteen is the same as ____ and ten?", answer: "Five", keyboardId: 1},
			{question: "Sixteen is the same as ____ and ten?", answer: "Six", keyboardId: 1},
			{question: "Seventeen is the same as ____ and ten?", answer: "Seven", keyboardId: 1},
			{question: "Eighteen is the same as ____ and ten?", answer: "Eight", keyboardId: 1},
			{question: "Nineteen is the same as ____ and ten?", answer: "Nine", keyboardId: 1}	
		],
		[ 
			{question: "Ten and one is the same as ____?", answer: "Eleven", keyboardId: 0},
			{question: "Ten and two is the same as ____?", answer: "Twelve", keyboardId: 0},
			{question: "Three and ten is the same as ____?", answer: "Thirteen", keyboardId: 0},
			{question: "Four and ten is the same as ____?", answer: "Fourteen", keyboardId: 0},
			{question: "Ten and five is the same as ____?", answer: "Fifteen", keyboardId: 0},
			{question: "Ten and six is the same as ____?", answer: "Sixteen", keyboardId: 0},
			{question: "Seven and ten is the same as ____?", answer: "Seventeen", keyboardId: 0},
			{question: "Eight and ten is the same as ____?", answer: "Eighteen", keyboardId: 0},
			{question: "Ten and nine is the same as ____?", answer: "Nineteen", keyboardId: 0}
		],
		[
			{question: "Ten and one is the same as ____?", answer: "11", keyboardId: 2},
			{question: "Ten and two is the same as ____?", answer: "12", keyboardId: 2},
			{question: "Three and ten is the same as ____?", answer: "13", keyboardId: 2},
			{question: "Four and ten is the same as ____?", answer: "14", keyboardId: 2},
			{question: "Ten and five is the same as ____?", answer: "15", keyboardId: 2},
			{question: "Ten and six is the same as ____?", answer: "16", keyboardId: 2},
			{question: "Seven and ten is the same as ____?", answer: "17", keyboardId: 2},
			{question: "Eight and ten is the same as ____?", answer: "18", keyboardId: 2},
			{question: "Ten and nine is the same as ____?", answer: "19", keyboardId: 2}
		],
		[
			{question: "11 is the same as ____ and ten?", answer: "One", keyboardId: 1},
			{question: "12 is the same as ____ and ten?", answer: "Two", keyboardId: 1},
			{question: "13 is the same as ____ and ten?", answer: "Three", keyboardId: 1},
			{question: "14 is the same as ____ and ten?", answer: "Four", keyboardId: 1},
			{question: "15 is the same as ____ and ten?", answer: "Five", keyboardId: 1},
			{question: "16 is the same as ____ and ten?", answer: "Six", keyboardId: 1},
			{question: "17 is the same as ____ and ten?", answer: "Seven", keyboardId: 1},
			{question: "18 is the same as ____ and ten?", answer: "Eight", keyboardId: 1},
			{question: "19 is the same as ____ and ten?", answer: "Nine", keyboardId: 1}
		]
		
	]
	
	app.view.viewVars.keyboards = this.keyboards;
	app.view.viewVars.questionSets = this.questionSets;
	app.view.viewVars.currentQuestionSet = -1;
	
	//button enabled
	this.activitiesEnabled = true;
	
	//score
	app.view.allowableErrorsCount = 6;
	app.view.errorsMade = 0;
	app.view.errorsRange = 2;
	
	this.view.setImages(this.images);
	this.view.drawBlackBoard();
	this.view.drawRabbit();
	this.view.drawQuestion();
	this.view.drawKeyboard();
	this.view.drawPauseWidgets();
	//this.view.questionCallback();
	
	app.stage.draw();
	
	this.pickQuestions();
	this.currentQuestion = -1;
	app.view.presentNextQuestion();
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

Practice1Controller.prototype.pickQuestions = function() {
	this.gameQuestions = [];
	
	for(var setNumber = 0; setNumber < this.questionSets.length; setNumber++) {
		// create an array of numbers
		var list = [];
		while(list.length < 3) {
			var questionNumber = MathUtil.random(0, this.questionSets[setNumber].length);
			if (list.indexOf(questionNumber) == -1) {
				list.push(questionNumber);
				this.gameQuestions.push({set: setNumber, question: questionNumber});
			}
		}
	}
};

Practice1Controller.prototype.getCurrentQuestionText = function() {
	return this.questionSets[this.gameQuestions[this.currentQuestion].set][this.gameQuestions[this.currentQuestion].question].question;
};
