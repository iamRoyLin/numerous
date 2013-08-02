function App() {
	
	this.view = null;
	this.controller = null;
	
	this.pageParams = null;
	this.layer = null;
	
	this.currentUnit = null;
	this.currentGame = null;
	
	this.stage = new Kinetic.Stage({
		container: "container",
		width: window.innerWidth,
		height: window.innerHeight
	});
	
	// constants
	this.UNIT_GAMES = [];
	
	// Unit 1 games
	this.UNIT_GAMES[0] = [
		{name:"eleven",         page:"GroupingGame", params:{goalNumber:11}},
		{name:"twelve",         page:"GroupingGame", params:{goalNumber:12}},
		{name:"thirteen",       page:"GroupingGame", params:{goalNumber:13}},
		{name:"fourteen",       page:"GroupingGame", params:{goalNumber:14}},
		{name:"fifteen",        page:"GroupingGame", params:{goalNumber:15}},
		{name:"sixteen",        page:"GroupingGame", params:{goalNumber:16}},
		{name:"seven-teen",     page:"GroupingGame", params:{goalNumber:17}},
		{name:"eighteen",       page:"GroupingGame", params:{goalNumber:18}},
		{name:"nineteen",       page:"GroupingGame", params:{goalNumber:19}},
		
		{name:'"four" "teen"',  page:"GroupingGame", params:{goalNumber:14, variation:2}},
		{name:'"six" "teen"',   page:"GroupingGame", params:{goalNumber:16, variation:2}},
		{name:'"seven" "teen"', page:"GroupingGame", params:{goalNumber:17, variation:2}},
		{name:'"eight" "teen"', page:"GroupingGame", params:{goalNumber:18, variation:2}},
		{name:'"nine" "teen"',  page:"GroupingGame", params:{goalNumber:19, variation:2}},
		
		{name:'thir "teen"',    page:"GroupingGame", params:{goalNumber:13, variation:2}},
		{name:'fif "teen"',     page:"GroupingGame", params:{goalNumber:15, variation:2}},
		
		{name:'"eleven"',       page:"GroupingGame", params:{goalNumber:11, variation:2}},
		{name:'"twelve"',       page:"GroupingGame", params:{goalNumber:12, variation:2}},
		
		{name:"Practice", page:"GroupingGamePractice", params:{}}
	];
	
	// Unit 2 games
	this.UNIT_GAMES[1] = [
		{name:"20 to 29",  page:"GroupingGame", params:{goalNumber:20, variation:3}},
		{name:"30 to 39",  page:"GroupingGame", params:{goalNumber:30, variation:3}},
		{name:"40 to 49",  page:"GroupingGame", params:{goalNumber:40, variation:3}},
		{name:"50 to 59",  page:"GroupingGame", params:{goalNumber:50, variation:3}},
		{name:"60 to 69",  page:"GroupingGame", params:{goalNumber:60, variation:3}},
		{name:"70 to 79",  page:"GroupingGame", params:{goalNumber:70, variation:3}},
		{name:"80 to 89",  page:"GroupingGame", params:{goalNumber:80, variation:3}},
		{name:"90 to 99",  page:"GroupingGame", params:{goalNumber:90, variation:3}},
		
		{name:"Practice", page:"GroupingGamePractice", params:{}}
	];
	
};

App.prototype.route = function(page, pageParams) {
	if (this.controller != null) {
		this.controller.finalize();
	}
	if (this.view != null) {
		this.view.finalize();
	}
	if (this.layer != null) {
		this.layer.remove();
	}
	
	this.page = page;
	this.pageParams = pageParams;
	
	this.layer = new Kinetic.Layer();
	this.stage.add(this.layer);	
	
	
	// creates new view
	eval("this.view = new " +page+ "View();");
	
	// loads all images
	LoaderUtil.load(this.view.images, this._loaded);
	
}

App.prototype._loaded = function() {

	// creates new controller
	eval("app.controller = new " + app.page + "Controller(app.view, app.pageParams);");
	
	// link the views and controllers
	app.controller.view = app.view;
	app.view.controller = app.controller;
}

App.prototype.nextGame = function () {
	if (app.currentGame >= app.UNIT_GAMES[app.currentUnit].length-1) {
		return false;
	} else {
		app.currentGame++;
		return true;
	}
};
App.prototype.getCurrentPage = function () {
	return app.UNIT_GAMES[app.currentUnit][app.currentGame].page;
};
App.prototype.getCurrentPageParams = function () {
	return app.UNIT_GAMES[app.currentUnit][app.currentGame].params;
};

$(function () {
	app = new App();
	app.route("Menu");
});