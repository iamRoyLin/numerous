function MenuUnit1Controller(view, params) {
	var params = {};
	
	params.starsEarned = [
		3,3,3,3,3,2,2,
		1,1,1,1,1,1,1,
		1,0,0,0,0
	]

	
	view.draw(params);
};

// destructor
MenuUnit1Controller.prototype.finalize = function() {
	
}

MenuUnit1Controller.prototype.back = function() {
	app.route("Menu");
};