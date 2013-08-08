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
		width: 0.45,
		height: 0.83,
		dx: 0,
		dy: 0.17
	});
	app.layer.add(body);
	
	var head = new Kinetic.Image({image: this.images.rabbitHead});
	WidgetUtil.glue(head, {
		width: 0.45,
		height: 0.83,
		dx: 0,
		dy: 0.17
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

//draw option buttons
/*PracticeView.prototype.drawOptionButtons = function() {
	var count = 0;
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			var button = new Kinetic.Image({image: this.images.options[count]});
			WidgetUtil.glue(button, {
				width: 0.18,
				height: 0.22,
				dx: 0.4 + j*0.18,
				dy: 0.4 + i*0.19
			});
			app.layer.add(button);
			count ++;
		}
	}
	
};*/

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
		}, 2000);
	}
	
}

PracticeView.prototype.removeCorrectness = function() {
	app.view.correctnessText.hide();
	app.stage.draw();
}
				
//draw questions and optional answers
PracticeView.prototype.drawQuestion = function() {

	app.view.questionNumber = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.83),
		y: DimensionUtil.decimalToActualHeight(0.078),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 30,
		fontFamily: 'mainFont',
		fill: 'white',
		lineHeight: 1.3
	});
	app.layer.add(app.view.questionNumber);
	
	app.view.title1 = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.293),
		y: DimensionUtil.decimalToActualHeight(0.117),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 45,
		fontFamily: 'mainFont',
		fill: 'white',
		lineHeight: 1.3
	});
	app.layer.add(app.view.title1);
	
	app.view.title2 = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.293),
		y: DimensionUtil.decimalToActualHeight(0.182),
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 36,
		fontFamily: 'mainFont',
		fill: 'white',
		lineHeight: 1.3
	});
	app.layer.add(app.view.title2);
	
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
	
	//draw keyboards
	var count = 0;
	app.view.button = {};
	app.view.buttonText = {};
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			
			app.view.button[count] = new Kinetic.Image({image: this.images.options[count]});
			WidgetUtil.glue(app.view.button[count], {
				width: 0.18,
				height: 0.22,
				dx: 0.4 + j*0.18,
				dy: 0.4 + i*0.19
			});
			app.layer.add(app.view.button[count]);
			
			app.view.buttonText[count] = new Kinetic.Text({
				x: DimensionUtil.decimalToActualWidth(0.414 + j*0.181), //460 + j*190
				y: DimensionUtil.decimalToActualHeight(0.49 + i*0.196), // 330 + i*135,
				width: DimensionUtil.decimalToActualWidth(0.15 / (1/1024*DimensionUtil.width)),
				scaleX: 1/1024*DimensionUtil.width,
				scaleY: 1/768*DimensionUtil.height,
				fontSize: 25,
				fontFamily: 'mainFont',
				fill: 'black',
				align: 'center',
				lineHeight: 1.3,
				//text: questionAnswers[count]
			});
			app.layer.add(app.view.buttonText[count]);
			
			app.view.button[count].id = count;
			app.view.button[count].on('click tap', function () {
					app.view.checkCorrectness(this.id);
			});
			app.view.buttonText[count].id = count;
			app.view.buttonText[count].on('click tap', function () {
					app.view.checkCorrectness(this.id);
			});
			count ++;
			
		}
	}	
};


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
		app.controller.restart(true);
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

