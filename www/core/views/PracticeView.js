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
	}else{}
			
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
		}, 2000);
	}else{
		app.view.correctnessText.show();
		app.view.correctnessText.setText("Whoops! Answer is " + this.question.a + ".");
		app.view.correctnessText.setFill('red');
		app.view.correctnessText.setX(350);
		app.stage.draw();
		setTimeout(function() {
			app.view.removeCorrectness();
			app.view.questionCallback();
		}, 5000);
	}
	
}

PracticeView.prototype.removeCorrectness = function() {
	app.view.correctnessText.hide();
	app.stage.draw();
}
				
//draw questions and optional answers
PracticeView.prototype.drawQuestion = function() {

	app.view.questionNumber = new Kinetic.Text({
		x: 850,
		y: 60,
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 30,
		fontFamily: 'mainFont',
		fill: 'white',
		align: 'center',
		lineHeight: 1.3
	});
	app.layer.add(app.view.questionNumber);
	
	app.view.title1 = new Kinetic.Text({
		x: 300,
		y: 90,
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 45,
		fontFamily: 'mainFont',
		fill: 'white',
		align: 'center',
		lineHeight: 1.3
	});
	app.layer.add(app.view.title1);
	
	app.view.title2 = new Kinetic.Text({
		x: 300,
		y: 140,
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 36,
		fontFamily: 'mainFont',
		fill: 'white',
		align: 'center',
		lineHeight: 1.3
	});
	app.layer.add(app.view.title2);
	
	app.view.correctnessText = new Kinetic.Text({
		x: 400,
		y: 190,
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
				x: 460 + j*190,
				y: 330 + i*135,
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

