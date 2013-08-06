function Practice1Controller() {

	// Images. These will automatically be loaded
	this.images = {};
	
	this.images.rabbitBody = "images/grouping_game/practice/rabbit_body.png";
	this.images.rabbitHead = "images/grouping_game/practice/rabbit_head.png";
	this.images.blackBoard = "images/grouping_game/practice/black_board.png";
	this.images.pauseButton = "images/widgets/button_pause.png";
	this.images.pauseLabel = "images/widgets/label_paused.png";
	this.images.resumeButton = "images/widgets/button_resume.png";
	this.images.menuButton = "images/widgets/button_menu.png";
	this.images.restartButton = "images/widgets/button_restart.png";
	
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
	
	//view.draw();
};

// Happens when images are loaded
Practice1Controller.prototype.initialize = function () {
	this.view = new PracticeView(this);
	app.view = this.view;
	
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
		{q: "Ten and one", q2: " is the same as __?", a: "Eleven"},
		{q: "Ten and two", q2: " is the same as __?", a: "Twelve"},
		{q: "Three and ten", q2: " is the same as __?", a: "Thirteen"},
		{q: "Four and ten", q2: " is the same as __?", a: "Fourteen"},
		{q: "Ten and five", q2: " is the same as __?", a: "Fifteen"},
		{q: "Ten and six", q2: " is the same as __?", a: "Sixteen"},
		{q: "Seven and ten", q2: " is the same as __?", a: "Seventeen"},
		{q: "Eight and ten", q2: " is the same as __?", a: "Eighteen"},
		{q: "Ten and nine", q2: " is the same as __?", a: "Nineteen"}
	];
	var set3 = [
		{q: "Ten and one", q2: " is the same as __?", a: "11"},
		{q: "Ten and two", q2: " is the same as __?", a: "12"},
		{q: "Three and ten", q2: " is the same as __?", a: "13"},
		{q: "Four and ten", q2: " is the same as __?", a: "14"},
		{q: "Ten and five", q2: " is the same as __?", a: "15"},
		{q: "Ten and six", q2: " is the same as __?", a: "16"},
		{q: "Seven and ten", q2: " is the same as __?", a: "17"},
		{q: "Eight and ten", q2: " is the same as __?", a: "18"},
		{q: "Ten and nine", q2: " is the same as __?", a: "19"}
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
	app.view.questionSets.current = 0;
	
	this.view.setImages(this.images);
	this.view.drawBlackBoard();
	this.view.drawRabbit();
	this.view.drawOptionButtons();
	this.view.questionCallback();
	
	app.stage.draw();
};

// destructor (is automatically called when you leave the page)
Practice1Controller.prototype.finalize = function() {
	
}

