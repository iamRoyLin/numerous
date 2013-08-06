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
PracticeView.prototype.drawOptionButtons = function() {
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
	
};

//Qustions controller
PracticeView.prototype.questionCallback = function() {
	if (this.questionSets.current < this.totalNumberOfSets*this.numberOfQuestionsPerSet){
		//current set of questions
		var i = this.questionSets.current/this.numberOfQuestionsPerSet;
		var questionSet = this.questionSets.sets[i];
		//current keyboard
		var questionAnswers = this.questionSets.keyboards[i];
		//randomly select a question
		var question = questionSet[MathUtil.random(0, questionSet.length)];
		//remove this question from this question set
		questionSet.splice(questionSet.indexOf(question), 1);
		//call draw question to draw the text of this question
		this.drawQuestion(question, questionAnswers);
	}else{}
			
}
//draw questions and optional answers
PracticeView.prototype.drawQuestion = function(question, questionAnswers) {
	var title1 = new Kinetic.Text({
		x: 300,
		y: 100,
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 45,
		fontFamily: 'mainFont',
		fill: 'white',
		align: 'center',
		lineHeight: 1.3,
		text: question.q1
	});
	app.layer.add(title1);
	var title2 = new Kinetic.Text({
		x: 300,
		y: 150,
		scaleX: 1/1024*DimensionUtil.width,
		scaleY: 1/768*DimensionUtil.height,
		fontSize: 40,
		fontFamily: 'mainFont',
		fill: 'white',
		align: 'center',
		lineHeight: 1.3,
		text: question.q2
	});
	app.layer.add(title2);
	
	//draw keyboards
	var count = 0;
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			var buttonText = new Kinetic.Text({
				x: 460 + j*190,
				y: 330 + i*135,
				scaleX: 1/1024*DimensionUtil.width,
				scaleY: 1/768*DimensionUtil.height,
				fontSize: 25,
				fontFamily: 'mainFont',
				fill: 'black',
				align: 'center',
				lineHeight: 1.3,
				text: questionAnswers[count]
			});
			app.layer.add(buttonText);
			count ++;
				
		}
	}
};

