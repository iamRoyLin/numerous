function MenuView() {

	// constants
	this.UNIT_COUNT = 4;
	
	// Images. These will automatically be loaded
	this.images = {};
	this.images.numerousTitle = "images/widgets/numerous_title.png";
	this.images.arrowLeft = "images/widgets/arrow_left.png";
	this.images.arrowRight = "images/widgets/arrow_right.png";
	this.images.homeButton = "images/widgets/button_back_to_home.png";
	
	this.images.unitLabels = [];
	this.images.unitPlayButtons = [];
	for(var i = 0; i < this.UNIT_COUNT; i++){
		this.images.unitLabels[i] = "images/widgets/label_unit" + (i+1) + ".png";
		this.images.unitPlayButtons[i] = "images/widgets/button_unit" + (i+1) + "_play.png";
	}
	
	// Sounds
	this.sounds = {};
	this.sounds.select = "sounds/menu/menu_select.wav";
	
	// the current unit being viewed
	this.currentUnit = 0;
};

MenuView.prototype.finalize = function () {

};

MenuView.prototype.draw = function () {

	// Call helper functionsthe to draw components
	this.drawTitle();
	this.drawHomeButton();
	this.drawArrows();
	this.drawGroups();
	
	//this._arrowLeft.hide();
	
	// redraw all widgets
	app.stage.draw();
};

MenuView.prototype.drawTitle = function() {
	var title = new Kinetic.Image({image: this.images.numerousTitle});
	WidgetUtil.glue(title, {
		width: 0.35,
		height: 0.1,
		dx: 0.31,
		dy: 0.05
	});
	app.layer.add(title);
};

MenuView.prototype.drawHomeButton = function() {
	var button = new Kinetic.Image({image: this.images.homeButton});
	WidgetUtil.glue(button, {
		width: 0.11,
		height: 0.12,
		dx: 0.05,
		dy: 0.05
	});
	app.layer.add(button);
	
	button.on('click tap', function () {
		Music.play(app.view.sounds.select);
		app.controller.home()
	});
}

MenuView.prototype.drawArrows = function() {
	this.arrowLeft = new Kinetic.Image({image: this.images.arrowLeft});
	WidgetUtil.glue(this.arrowLeft, {
		width: 0.1,
		height: 0.22,
		dx: 0.1,
		dy: 0.5
	});
	app.layer.add(this.arrowLeft);
	
	this.arrowRight = new Kinetic.Image({image: this.images.arrowRight});
	WidgetUtil.glue(this.arrowRight, {
		width: 0.1,
		height: 0.22,
		dx: 0.8,
		dy: 0.5
	});
	app.layer.add(this.arrowRight);
	
	this.arrowLeft.on('click tap', function () {
		app.view.left();
	});
	this.arrowRight.on('click tap', function () {
		app.view.right();
	});
	
	this.arrowLeft.hide();
}

MenuView.prototype.drawGroups = function() {
	this.unitsGroupArray = [];
	for(var i = 0; i < this.UNIT_COUNT; i++) {
		this.unitsGroupArray[i] = new Kinetic.Group({});
		
		var myLabel = new Kinetic.Image({image: this.images.unitLabels[i]});
		WidgetUtil.glue(myLabel, {
			width: 0.35,
			height: 0.12,
			dx: 0.3,
			dy: 0.15
		});
		this.unitsGroupArray[i].add(myLabel);
		
		var myButton = new Kinetic.Image({image: this.images.unitPlayButtons[i]});
		WidgetUtil.glue(myButton, {
			width: 0.3,
			height: 0.43,
			dx: 0.33,
			dy: 0.37
		});
		// Need to edit when the unit name is changed
		myButton.on('click tap', function () {
			Music.play(app.view.sounds.select);
			app.controller.unitSelect(app.view.currentUnit);
		});
		this.unitsGroupArray[i].add(myButton);
		
		app.layer.add(this.unitsGroupArray[i]);
		this.unitsGroupArray[i].hide();
	}
	this.unitsGroupArray[0].show();
}


MenuView.prototype.left = function () {
	var preUnit = this.currentUnit-1;
	var preGroup = this.unitsGroupArray[preUnit];
	var currentGroup = this.unitsGroupArray[this.currentUnit];
	
	preGroup.setOpacity(0);
	preGroup.setX(DimensionUtil.decimalToActualWidth(-0.35));
	preGroup.show();
	
	var tweenIn = new Kinetic.Tween({
		node: preGroup,
		duration: 0.5,
		x: 0,
		opacity: 1
	});
	tweenIn.play();
	
	var tweenOut = new Kinetic.Tween({
		node: currentGroup,
		duration: 0.5,
		x: DimensionUtil.decimalToActualWidth(0.35),
		opacity: 0,
		//Check
		onFinish: function () {
			currentGroup.hide();
		}
	});
	tweenOut.play();
	this.currentUnit--;
	
	this.hideArrows();
}

MenuView.prototype.right = function () {
	var nextUnit = this.currentUnit+1;
	var nextGroup = this.unitsGroupArray[nextUnit];
	var currentGroup = this.unitsGroupArray[this.currentUnit];
	
	nextGroup.setOpacity(0);
	nextGroup.setX(DimensionUtil.decimalToActualWidth(0.35));
	nextGroup.show();
	
	var tweenIn = new Kinetic.Tween({
		node: nextGroup,
		duration: 0.5,
		x: 0,
		opacity: 1
	});
	tweenIn.play();
	
	var tweenOut = new Kinetic.Tween({
		node: currentGroup,
		duration: 0.5,
		x: DimensionUtil.decimalToActualWidth(-0.35),
		opacity: 0,
		//Check
		onFinish: function () {
			currentGroup.hide();
		}
	});
	tweenOut.play();
	this.currentUnit++;
	
	this.hideArrows();
}

MenuView.prototype.hideArrows = function() {
	if (this.currentUnit == 0){
		this.arrowLeft.hide();
	}else if(this.currentUnit == this.UNIT_COUNT-1){
		this.arrowRight.hide();
	}else{
		this.arrowLeft.show();
		this.arrowRight.show();
	}
	
}

