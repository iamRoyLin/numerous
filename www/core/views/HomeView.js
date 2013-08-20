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
		Music.play(app.view.sounds.select);
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
		Music.play(app.view.sounds.select);
		app.controller.settings();
	});
	
	var anim = new Kinetic.Animation(function(frame) {
			var dx = -Math.sin(frame.time / 200) * 0.006;
			var dy = Math.sin(frame.time / 200) * 0.006;
       		var scaleX = Math.sin(frame.time / 200) * 0.06 + 0.9;
			var scaleY = -1 * Math.sin(frame.time / 200) * 0.06 + 0.9;
        		// scale x and y
        		playButton.setScale(scaleX, scaleY);
				playButton.setX(DimensionUtil.decimalToActualWidth(0.23 + dx));
				playButton.setY(DimensionUtil.decimalToActualWidth(0.35 + dy));
        		optionsButton.setScale(scaleX, scaleY);
				optionsButton.setX(DimensionUtil.decimalToActualWidth(0.55 + dx));
				optionsButton.setY(DimensionUtil.decimalToActualWidth(0.35 + dy));
      	}, app.layer);

      	anim.start();
}



