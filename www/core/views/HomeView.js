function HomeView(controller) {
	this.controller = controller;
};
HomeView.prototype = new View();

HomeView.prototype.finalize = function() {

};

HomeView.prototype.draw = function() {
	this._drawBackground();
	this._drawButtons();

	// redraw all widgets
	app.stage.draw();
};

HomeView.prototype._drawBackground = function() {
	var background = new Kinetic.Image({image: this.images.background});
	WidgetUtil.glue(background, {
		width: 1,
		height: 1,
		dx: 0,
		dy: 0
	});
	app.layer.add(background);
}

HomeView.prototype._drawButtons = function() {

	//play button
	var	playButton = new Kinetic.Image({image: this.images.playButton});
	WidgetUtil.glue(playButton, {
		width: 0.20,
		height: 0.28,
		dx: 0.23,
		dy: 0.45
	});
	app.layer.add(playButton);
	playButton.on('click tap', function () {
		app.controller.play();
	});
	
	//options button
	var	optionsButton = new Kinetic.Image({image: this.images.optionsButton});
	WidgetUtil.glue(optionsButton, {
		width: 0.20,
		height: 0.28,
		dx: 0.55,
		dy: 0.45
	});
	app.layer.add(optionsButton);
	optionsButton.on('click tap', function () {
		app.controller.settings();
	});
}



