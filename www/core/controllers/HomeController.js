function HomeController(view) {
	
	view.draw();
};

// destructor
HomeController.prototype.finalize = function() {
	
}

HomeController.prototype.play = function () {
	app.route("Menu");
}