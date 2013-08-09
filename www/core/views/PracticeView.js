function PracticeView(controller) {
	this.controller = controller;
};
// Simulate inheritance
PracticeView.prototype = new View();

// destructor (is automatically called when you leave the page)
PracticeView.prototype.finalize = function() {

};

//draw rabbit
PracticeView.prototype.drawRabbit = function() {
	var body = new Kinetic.Image({image: this.images.rabbitBody});
	WidgetUtil.glue(body, {
		width: 0.36,
		height: 0.664,
		dx: 0.03,
		dy: 0.29
	});
	app.layer.add(body);
	
	var head = new Kinetic.Image({image: this.images.rabbitHead});
	WidgetUtil.glue(head, {
		width: 0.36,
		height: 0.664,
		dx: 0.05,
		dy: 0.29
	});
	app.layer.add(head);
};

//draw black board
PracticeView.prototype.drawBlackBoard = function() {
	var board = new Kinetic.Image({image: this.images.blackBoard});
	WidgetUtil.glue(board, {
		width: 0.82,
		height: 0.42,
		dx: 0.17,
		dy: 0.02
	});
	app.layer.add(board);
	
};

//draw questions and optional answers
PracticeView.prototype.drawQuestion = function() {

	this.questionNumberTextWidget = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.83),
		y: DimensionUtil.decimalToActualHeight(0.078),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 30,
		fontFamily: 'mainFont',
		fill: 'white',
		lineHeight: 1.3
	});
	app.layer.add(this.questionNumberTextWidget);
	
	this.questionTextWidget = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.25),
		y: DimensionUtil.decimalToActualHeight(0.13),
		width: DimensionUtil.decimalToActualWidth(0.67 / (1/1024*DimensionUtil.width)),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 45,
		fontFamily: 'mainFont',
		fill: 'white',
		align: 'center',
		lineHeight: 1.8
	});
	app.layer.add(this.questionTextWidget);
	
	
	this.placeHolderEgg = new Kinetic.Image({
		image: this.images.placeHolderEgg,
		width: DimensionUtil.decimalToActualWidth(0.18),
		height: DimensionUtil.decimalToActualHeight(0.22)
	});
	app.layer.add(this.placeHolderEgg);
	this.placeHolderEgg.hide();
	
	if (Env.debug) {
		this.placeHolderEgg.setDraggable(true);
		this.placeHolderEgg.on('dragend touchend', function () {
			console.log("placeholder egg at x:" + DimensionUtil.actualToDecimalWidth(this.getX()) + " y:" + DimensionUtil.actualToDecimalHeight(this.getY()));
		});
	}
	
	/*
	app.view.correctnessText = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.39),
		y: DimensionUtil.decimalToActualHeight(0.247),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 36,
		fontFamily: 'mainFont',
		align: 'center',
		lineHeight: 1.3
	});
	app.layer.add(app.view.correctnessText);
	*/
};




PracticeView.prototype.presentNextQuestion = function () {
	app.controller.currentQuestion++;
	
	var questionObject = app.controller.getCurrentQuestion();
	
	// display question number
	this.questionNumberTextWidget.setText( (app.controller.currentQuestion+1) + " / " + app.controller.gameQuestions.length);
	
	// display the question
	this.questionTextWidget.setText(questionObject.question);
	
	// set place holder egg
	this.placeHolderEgg.setX(DimensionUtil.decimalToActualWidth(questionObject.blankX));
	this.placeHolderEgg.setY(DimensionUtil.decimalToActualHeight(questionObject.blankY));
	this.placeHolderEgg.moveToTop();
	this.placeHolderEgg.show();
	
	// prepareKeyboard
	this.changeKeyboard(questionObject.keyboardId);
	
	app.stage.draw();
};


PracticeView.prototype.drawKeyboard = function() {

	this.keyboard = {};
	this.keyboard.groups = [];
	this.keyboard.buttons = [];
	this.keyboard.texts = [];
	
	for (var groupNumber = 0; groupNumber < 9; groupNumber++) {
		var x = 0.4 + (groupNumber % 3) * 0.18;
		var y = 0.4 + Math.floor(groupNumber / 3) * 0.19;
	
		// group
		this.keyboard.groups[groupNumber] = new Kinetic.Group({
			x: DimensionUtil.decimalToActualWidth(x),
			y: DimensionUtil.decimalToActualHeight(y),
		});
		app.layer.add(this.keyboard.groups[groupNumber]);

		// keyboard button
		this.keyboard.buttons[groupNumber] = new Kinetic.Image({
			image: this.images.eggs[groupNumber],
			width: DimensionUtil.decimalToActualWidth(0.18),
			height: DimensionUtil.decimalToActualHeight(0.22)
		});
		this.keyboard.groups[groupNumber].add(this.keyboard.buttons[groupNumber]);
		
		// keyboard button text
		this.keyboard.texts[groupNumber] = new Kinetic.Text({
			x: DimensionUtil.decimalToActualWidth(0.01),
			y: DimensionUtil.decimalToActualHeight(0.1),
			width: DimensionUtil.decimalToActualWidth(0.15 / (1/1024*DimensionUtil.width)),
			scaleX: 1/1024*DimensionUtil.width,
			scaleY: 1/768*DimensionUtil.height,
			fontSize: 25,
			fontFamily: 'mainFont',
			fill: 'black',
			align: 'center',
			lineHeight: 1.3,
		});
		this.keyboard.groups[groupNumber].add(this.keyboard.texts[groupNumber]);
		
		this.keyboard.groups[groupNumber].id = groupNumber;
		this.keyboard.groups[groupNumber].on('click tap', function () {
			app.view.keyboardClick(this);
		});
	}
};

PracticeView.prototype.changeKeyboard = function(keyboardId) {
	for(var i = 0; i < this.keyboard.texts.length; i++) {
		this.keyboard.texts[i].setText(this.viewVars.keyboardTexts[keyboardId][i]);
	}
};

PracticeView.prototype.keyboardClick = function(keyboardGroup) {
	keyboardGroup.moveToTop();

	var questionObject = app.controller.getCurrentQuestion();

	if (keyboardGroup.id == questionObject.answer) {
		// right answer
		
		var tween = new Kinetic.Tween({
			node: keyboardGroup,
			duration: 0.8,
			x: DimensionUtil.decimalToActualWidth(questionObject.blankX),
			y: DimensionUtil.decimalToActualHeight(questionObject.blankY)
		});
		tween.play();
		
	} else {
		// wrong answer
		
	}
};


/*
//Qustions controller
PracticeView.prototype.questionCallback = function() {
	this.questionSets.current++;
	//check if failed
	if(app.view.allowableErrorsCount == app.view.errorsMade){
		app.view.finish(Math.floor((app.view.allowableErrorsCount - app.view.errorsMade)/app.view.errorsRange));
	}
	if (this.questionSets.current < this.totalNumberOfSets*this.numberOfQuestionsPerSet){
		//update current question number
		this.updateCurrentQuestionNumber();
		//current set of questions
		var i = Math.floor(this.questionSets.current/this.numberOfQuestionsPerSet);
		var questionSet = this.questionSets.sets[i];
		//current keyboard
		this.questionAnswers = this.questionSets.keyboards[i];
		//randomly select a question
		this.question = questionSet[MathUtil.random(0, questionSet.length)];
		//remove this question from this question set
		questionSet.splice(questionSet.indexOf(this.question), 1);
		//call draw question to draw the text of this question
		this.updateQuestion();
	}else{
		app.view.finish(Math.floor((app.view.allowableErrorsCount - app.view.errorsMade)/app.view.errorsRange));
	}
			
}

PracticeView.prototype.updateCurrentQuestionNumber = function() {
	app.view.questionNumber.setText((this.questionSets.current+1) + "/" +  this.totalNumberOfSets*this.numberOfQuestionsPerSet);
	app.stage.draw();
}

PracticeView.prototype.updateQuestion = function() {
	app.view.title1.setText(this.question.q1);
	app.view.title2.setText(this.question.q2);
	var count = 0;
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			app.view.buttonText[count].setText(this.questionAnswers[count]);
			count ++;
		}
	}
	app.stage.draw();
}


PracticeView.prototype.checkCorrectness = function(count) {
	app.controller.activitiesEnabled = false;
	var updatedLine2 = this.question.q2.replace("__", this.questionAnswers[count]);
	updatedLine2 = updatedLine2.replace("?", ".");
	app.view.title2.setText(updatedLine2);
	app.stage.draw();
	if(this.question.a == this.questionAnswers[count]){
		app.view.correctnessText.show();
		app.view.correctnessText.setText("Correct!");
		app.view.correctnessText.setFill('green');
		app.view.correctnessText.setX(500);
		app.stage.draw();
		setTimeout(function() {
			app.view.removeCorrectness();
			app.view.questionCallback();
			app.controller.activitiesEnabled = true;
		}, 1000);
	}else{
		app.view.errorsMade++;
		app.view.correctnessText.show();
		app.view.correctnessText.setText("Whoops! Answer is " + this.question.a + ".");
		app.view.correctnessText.setFill('red');
		app.view.correctnessText.setX(350);
		app.stage.draw();
		setTimeout(function() {
			app.view.removeCorrectness();
			app.view.questionCallback();
			app.controller.activitiesEnabled = true;
		}, 2000);
	}
	
}

PracticeView.prototype.disableButtons = function() {
	
}
PracticeView.prototype.removeCorrectness = function() {
	app.view.correctnessText.hide();
	app.stage.draw();
}
				
*/


// Finsih the game. Score: 0 for fail, 1 to 3 for stars
PracticeView.prototype.finish = function(score) {
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
	
	// draw buttons 
	var buttonRetry = null;	
	var buttonMenu = null;
	if (score == 0) {
		// draw retry button only
		buttonRetry = new Kinetic.Image({image: this.images.buttonRetry});
		WidgetUtil.glue(buttonRetry, {
			width: 0.18,
			height: 0.25,
			dx: 0.32,
			dy: 0.45
		});
		
		// draw retry button only
		buttonMenu = new Kinetic.Image({image: this.images.buttonMenu});
		WidgetUtil.glue(buttonMenu, {
			width: 0.18,
			height: 0.25,
			dx: 0.52,
			dy: 0.45
		});
	} else {
		buttonRetry = new Kinetic.Image({image: this.images.buttonRetry});
		WidgetUtil.glue(buttonRetry, {
			width: 0.18,
			height: 0.25,
			dx: 0.32,
			dy: 0.6
		});
		
		// draw retry button only
		buttonMenu = new Kinetic.Image({image: this.images.buttonMenu});
		WidgetUtil.glue(buttonMenu, {
			width: 0.18,
			height: 0.25,
			dx: 0.52,
			dy: 0.6
		});
		
	}
	
	buttonRetry.on('click tap', function () {
		//Music.play(app.view.sounds.select);
		app.controller.restart();
	});
	buttonMenu.on('click tap', function () {
		//Music.play(app.view.sounds.select);
		app.controller.menu();
	});
	
	app.layer.add(buttonMenu);
	app.layer.add(buttonRetry);	
	
	app.stage.draw();
};

// draws all the pause widgets then hides them. Shows when the pause function is called
PracticeView.prototype.drawPauseWidgets = function() {

	// pause button
	var buttonPause = new Kinetic.Image({image: this.images.buttonPause});
	WidgetUtil.glue(buttonPause, {
		width: this.viewVars.pauseButtonDimensions.width,
		height: this.viewVars.pauseButtonDimensions.height,
		dx: this.viewVars.pauseButtonDimensions.x,
		dy: this.viewVars.pauseButtonDimensions.y
	});
	app.layer.add(buttonPause);
	buttonPause.on('click tap', function() {
		//Music.play(this.sounds.select);
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
		//Music.play(this.sounds.select);
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
		//Music.play(this.sounds.select);
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
		//Music.play(this.sounds.select);
		app.controller.restart();
	});
	
	app.layer.add(this.pauseWidgetsGroup);
	this.pauseWidgetsGroup.hide();
};

// pause the game
PracticeView.prototype.pause = function() {
	this.pauseWidgetsGroup.show();
	this.pauseWidgetsGroup.moveToTop();
	app.stage.draw();
};

// unpause the game
PracticeView.prototype.unpause = function() {
	this.pauseWidgetsGroup.hide();
	app.stage.draw();
};

