function PracticeView(controller) {
	this.controller = controller;
	
	this.board = {};
	this.mistakeMadeThisRound = false;
};
// Simulate inheritance
PracticeView.prototype = new View();

// destructor (is automatically called when you leave the page)
PracticeView.prototype.finalize = function() {

};

// draw rabbit
PracticeView.prototype.drawRabbit = function() {
	var body = new Kinetic.Image({image: this.images.rabbitBody});
	WidgetUtil.glue(body, {
		width: 0.36,
		height: 0.664,
		dx: 0.05,
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

// draw black board
PracticeView.prototype.drawBlackBoard = function() {
	var board = new Kinetic.Image({image: this.images.blackBoard});
	WidgetUtil.glue(board, {
		width: 0.82,
		height: 0.42,
		dx: 0.17,
		dy: 0.1
	});
	app.layer.add(board);
	
};

PracticeView.prototype.drawButtonNextBig = function() {
	this.buttonNextBig = new Kinetic.Image({image: this.images.buttonNextBig});
	WidgetUtil.glue(this.buttonNextBig, {
		width: 0.4,
		height: 0.43,
		dx: 0.47,
		dy: 0.45
	});

	this.buttonNextBig.on('click tap', function () {
	
		if (app.view.mistakeMadeThisRound) {
			app.controller.mistakeMade();
			app.view.mistakeMadeThisRound = false;
		}	
	
	
		Music.play(app.view.sounds.next);
		if (!app.controller.keyboardEnabled) {
			return;
		}
		
		
		if (!app.controller.nextQuestion()) {
			var score;
			if (app.controller.mistakesCount == 0) {
				score = 3;
			} else if (app.controller.mistakesCount <= 2) {
				score = 2
			} else if (app.controller.mistakesCount <= 4) {
				score = 1
			} else {
				score = 0;
			}
			app.view.finish(score);
		}
	});
	
	app.layer.add(this.buttonNextBig);
	this.buttonNextBig.setOpacity(0);
	this.buttonNextBig.hide();
};

// draw questions and optional answers
PracticeView.prototype.drawQuestion = function() {

	this.questionNumberTextWidget = new Kinetic.Text({
		x: DimensionUtil.decimalToActualWidth(0.83),
		y: DimensionUtil.decimalToActualHeight(0.08),
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
};

PracticeView.prototype.resetBoard = function() {
	
	if (this.board.widgets != null) {
		for(var i = 0; i < this.board.widgets.length; i++) {
			this.board.widgets[i].remove();
		}
	}
	this.board.widgets = [];
}

PracticeView.prototype.appendTextToBoard = function(newText) {
	var textWidget = new Kinetic.Text({
		text: newText,
		fontSize: 37,
		fontFamily: 'mainFont',
		fill: 'white'
	});
	this.board.widgets.push(textWidget);
	
	// need to calc width/height AFTER creation
	// set width and check for newline
	var width = DimensionUtil.actualToDecimalWidth(textWidget.getWidth());
	if (this.board.accumLineWidth + width > this.board.maxLineWidth) {
		this.board.verticalAlign += this.board.lineHeight;
		this.board.accumLineWidth = this.board.leftMargin;
	}
	// set X
	textWidget.setX(DimensionUtil.decimalToActualWidth(this.board.accumLineWidth));
	this.board.accumLineWidth += width;
	
	// set Y
	textWidget.setY(DimensionUtil.decimalToActualHeight(this.board.verticalAlign) - textWidget.getHeight() / 2);
	app.layer.add(textWidget);
	app.stage.draw();
}

PracticeView.prototype.appendPlaceHolderEggToBoard = function () {
	// need to calc width/height AFTER creation
	// set width and check for newline
	var width = DimensionUtil.actualToDecimalWidth(this.placeHolderEgg.getWidth());
	if (this.board.accumLineWidth + width > this.board.maxLineWidth) {
	this.board.verticalAlign += this.board.lineHeight;
	this.board.accumLineWidth = this.board.leftMargin;
	}
	// set X
	this.placeHolderEgg.setX(DimensionUtil.decimalToActualWidth(this.board.accumLineWidth));
	this.board.accumLineWidth += width;
	// set Y
	this.placeHolderEgg.setY(DimensionUtil.decimalToActualHeight(this.board.verticalAlign) - this.placeHolderEgg.getHeight() / 2);
	this.placeHolderEgg.moveToTop();
	this.placeHolderEgg.show();
};

PracticeView.prototype.presentNextQuestion = function (questionText, progressText, keyboardTexts, correctAnswerId) {
	this.correctAnswerId = correctAnswerId;
	
	this.board.leftMargin = 0.29;
	this.board.maxLineWidth = 0.95;
	this.board.lineHeight = 0.105;
	this.board.accumLineWidth = this.board.leftMargin;
	this.board.verticalAlign = 0.22;
	this.resetBoard();
	
	// display question number
	this.questionNumberTextWidget.setText(progressText);
	
	questionText = questionText.replace("___", " ___ ");
	questionText = questionText.replace("  ", " ");
	
	// display the question
	var questionTextParts = questionText.split(" ");
	for(var i = 0; i < questionTextParts.length; i++) {
		if (questionTextParts[i] == "___") {
			this.appendPlaceHolderEggToBoard();
		} else {
			this.appendTextToBoard(questionTextParts[i] + " ");
		}
	}
	
	// prepareKeyboard
	this.changeKeyboard(keyboardTexts);
	
	// hide the next button if necessary
	this.buttonNextBig.setOpacity(0);
	this.buttonNextBig.hide();
	
	app.stage.draw();
};


PracticeView.prototype.drawKeyboard = function() {

	this.keyboard = {};
	this.keyboard.groups = [];
	this.keyboard.buttons = [];
	this.keyboard.texts = [];
	this.keyboard.xPositions = [];
	this.keyboard.yPositions = [];
	
	for (var groupNumber = 0; groupNumber < 9; groupNumber++) {
		var x = 0.4 + (groupNumber % 3) * 0.18;
		var y = 0.4 + Math.floor(groupNumber / 3) * 0.19;
		
		// save their locations
		this.keyboard.xPositions[groupNumber] = x;
		this.keyboard.yPositions[groupNumber] = y;
		
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
			if (app.controller.keyboardEnabled) {
				app.view.keyboardClick(this);
			}
		});
	}
};

PracticeView.prototype.changeKeyboard = function(keyboardTexts) {
	for(var i = 0; i < this.keyboard.texts.length; i++) {
		// show every button incase they were made invisible or hidden previously
		this.keyboard.groups[i].show();
		this.keyboard.groups[i].setOpacity(1);
		
		// set their location in case they were moved
		this.keyboard.groups[i].setX(DimensionUtil.decimalToActualWidth(this.keyboard.xPositions[i]));
		this.keyboard.groups[i].setY(DimensionUtil.decimalToActualHeight(this.keyboard.yPositions[i]));
		
		// set the text of the keyboard
		this.keyboard.texts[i].setText(keyboardTexts[i]);
	}
	
	app.stage.draw();
};

PracticeView.prototype.keyboardClick = function(keyboardGroup) {
	keyboardGroup.moveToTop();

	if (keyboardGroup.id == this.correctAnswerId) {
		Music.play(app.view.sounds.acceptEgg);
		this.answeredRight(keyboardGroup.id);
	} else {
		Music.play(app.view.sounds.declineEgg);
		this.answeredWrong(keyboardGroup.id);
	}
};
PracticeView.prototype.answeredRight = function(id) {

	app.controller.keyboardEnabled = false;
	setTimeout(function() {
		app.controller.keyboardEnabled = true;
	}, 600);
	
	// move answer to the right place
	var tween = new Kinetic.Tween({
		node: this.keyboard.groups[id],
		duration: 0.45,
		x: this.placeHolderEgg.getX(),
		y: this.placeHolderEgg.getY()
	});
	tween.play();
	
	// make all the other keyboard buttons dissappear
	for (var i = 0; i < this.keyboard.groups.length; i++) {
		if (i == id) continue; // skip the correct button
		var tween = new Kinetic.Tween({
			node: this.keyboard.groups[i],
			duration: 0.45,
			opacity: 0
		});
		tween.play();
	}
	
	// make the next button appear
	this.buttonNextBig.show();
	var tween = new Kinetic.Tween({
		node: this.buttonNextBig,
		duration: 0.8,
		opacity: 1
	});
	tween.play();
	this.buttonNextBig.moveToTop();
	
};
PracticeView.prototype.answeredWrong = function(id) {
	
	app.controller.keyboardEnabled = false;
	setTimeout(function() {
		app.controller.keyboardEnabled = true;
	}, 300);
	
	var tween = new Kinetic.Tween({
		node: this.keyboard.groups[id],
		duration: 0.3,
		opacity: 0,
		onFinish: function() {this.node.hide()}
	});
	tween.play();
	
	this.mistakeMadeThisRound = true;
};



// Finsih the game. Score: 0 for fail, 1 to 3 for stars
PracticeView.prototype.finish = function(score) {
	var finishTitleImage = null;
	var starsImage = null;
	var starsCount = 0;
	
	switch(score) {
		case 0:
			finishTitleImage = this.images.labelTryAgain;
			starsImage = null;
			starsCount = 0;
		break;
		case 1:
			finishTitleImage = this.images.labelGood;
			starsImage = this.images.star1;
			starsCount = 1;
		break;
		case 2:
			finishTitleImage = this.images.labelExcellent;
			starsImage = this.images.star2;
			starsCount = 2;
		break;			
		case 3:
			finishTitleImage = this.images.labelPerfect;
			starsImage = this.images.star3;
			starsCount = 3;
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
		Music.play(app.view.sounds.select);
		app.controller.restart();
	});
	buttonMenu.on('click tap', function () {
		Music.play(app.view.sounds.select);
		if(Storage.get("settingMusic") == true){
			Music.stopBackgroundMusic();
		}
		app.controller.menu();
	});
	
	app.layer.add(buttonMenu);
	app.layer.add(buttonRetry);	
	
	app.stage.draw();
	
	// set the stars
	app.controller.achievedStars(starsCount);
	
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
		if(Storage.get("settingMusic") == true){
			Music.stopBackgroundMusic();
		}
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

