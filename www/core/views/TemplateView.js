function TemplateView() {
	
	// Images. These will automatically be loaded
	this.images = {};
	
	// Sounds
	this.sounds = {};
};

TemplateView.prototype.finalize = function() {

};

TemplateView.prototype.draw = function() {
	// draw widgets here
	
	// redraw all widgets
	app.stage.draw();
};

