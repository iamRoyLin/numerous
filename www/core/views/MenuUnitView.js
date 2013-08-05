function MenuUnitView(controller) {
	this.controller = controller;
};
MenuUnitView.prototype = new View();


MenuUnitView.prototype.finalize = function() {

};


MenuUnitView.prototype.drawTitle = function() {
	var	title = new Kinetic.Image({image: this.images.title});
	WidgetUtil.glue(title, {
		width: 0.5,
		height: 0.12,
		dx: 0.25,
		dy: 0.05
	});
	app.layer.add(title);
};

MenuUnitView.prototype.drawButtonBack = function() {
	var	buttonBack = new Kinetic.Image({image: this.images.buttonBack});
	WidgetUtil.glue(buttonBack, {
		width: 0.10,
		height: 0.17,
		dx: 0.05,
		dy: 0.03
	});
	app.layer.add(buttonBack);
	
	buttonBack.on('click tap', function () {
		app.controller.back();
	});
};

MenuUnitView.prototype.drawBoxes = function(starsEarned) {
	// belongs in groups
	
	for(var boxNumber = 0; boxNumber < app.UNIT_GAMES[app.currentUnit].length; boxNumber++) {
		var x = 0.07 + (boxNumber % 7) * 0.13;
		var y = 0.28 + Math.floor(boxNumber / 7) * 0.225;
			
		// group
		var group = new Kinetic.Group({
			x: DimensionUtil.decimalToActualWidth(x),
			y: DimensionUtil.decimalToActualHeight(y)
		});

		// box
		var box = new Kinetic.Image({image: this.images.box});
		WidgetUtil.glue(box, {
			width: 0.12,
			height: 0.19,
			dx: 0,
			dy: 0
		});
		group.add(box);
		
		// stars
		var stars = new Kinetic.Image({image: this.images.stars[starsEarned[boxNumber]]});
		WidgetUtil.glue(stars, {
			width: 0.1,
			height: 0.05,
			dx: 0.01,
			dy: 0.15
		});
		group.add(stars);
		
		// text
		var text = new Kinetic.Text({
			x: DimensionUtil.decimalToActualWidth(0.01),
			y: DimensionUtil.decimalToActualHeight(0.05),
			width: DimensionUtil.decimalToActualWidth(0.099 / (1/1024*DimensionUtil.width)),
			scaleX: 1/1024*DimensionUtil.width,
			scaleY: 1/768*DimensionUtil.height,
			text: app.UNIT_GAMES[app.currentUnit][boxNumber].name,
			fontSize: 25,
			fontFamily: 'COMIC SANS MS',
			fill: 'black',
			align: 'center'
		});
		group.add(text);
		
		app.layer.add(group);
		
		group.gameId = boxNumber;
		group.on('click tap', function () {
			app.controller.game(this.gameId);
		});
	}
}


