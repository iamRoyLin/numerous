function MenuUnit1View() {
	
	this.LEVEL_COUNT = 19;
	
	// level names
	this.LEVEL_NAMES = [
		"eleven",
		"twelve",
		"thirteen",
		"fourteen",
		"fifteen",
		"sixteen",
		"seventeen",
		"eighteen",
		"nineteen",
		
		'"four" "teen"',
		'"six" "teen"',
		'"seven" "teen"',
		'"eight" "teen"',
		'"nine" "teen"',
		
		'thir "teen"',
		'fif "teen"',
		
		'"eleven"',
		'"twelve"',
		
		'PRACTICE'
	];
	
	
	// Images. These will automatically be loaded
	this.images = {};
	this.images.title = "images/menu_unit1/label_title.png";
	this.images.buttonBack = "images/menu_unit1/button_back.png";
	this.images.box = "images/menu_unit1/box.png";
	
	this.images.stars = [];
	for(var i = 0; i < 4; i++) {
		this.images.stars[i] = "images/menu_unit1/star" + i + ".png";
	}
	
	// Sounds
	this.sounds = {};
};

MenuUnit1View.prototype.finalize = function() {

};

MenuUnit1View.prototype.draw = function(params) {
	this.starsEarned = params.starsEarned;

	// draw widgets here
	this.drawTitle();
	this.drawButtonBack();
	this.drawBoxes();
	
	// redraw all widgets
	app.stage.draw();
};

MenuUnit1View.prototype.drawTitle = function() {
	var	title = new Kinetic.Image({image: this.images.title});
	WidgetUtil.glue(title, {
		width: 0.5,
		height: 0.12,
		dx: 0.25,
		dy: 0.05
	});
	app.layer.add(title);
};

MenuUnit1View.prototype.drawButtonBack = function() {
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

MenuUnit1View.prototype.drawBoxes = function() {
	// belongs in groups
	
	for(var boxNumber = 0; boxNumber < this.LEVEL_COUNT; boxNumber++) {
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
		var stars = new Kinetic.Image({image: this.images.stars[this.starsEarned[boxNumber]]});
		WidgetUtil.glue(stars, {
			width: 0.1,
			height: 0.05,
			dx: 0.01,
			dy: 0.15
		});
		group.add(stars);
		
		// text
		var text = new Kinetic.Text({
			x: DimensionUtil.decimalToActualWidth(0),
			y: DimensionUtil.decimalToActualHeight(0.02),
			width: DimensionUtil.decimalToActualWidth(0.11 / (1/1024*DimensionUtil.width)),
			scaleX: 1/1024*DimensionUtil.width,
			scaleY: 1/768*DimensionUtil.height,
			text: this.LEVEL_NAMES[boxNumber],
			fontSize: 30,
			fontFamily: 'COMIC SANS MS',
			fill: 'black'
		});
		group.add(text);
		
		app.layer.add(group);
	}
}



