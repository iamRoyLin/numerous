var App = new Class ({
	
	initialize: function () {
	},
	
	start: function () {	
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
			{name:"eleven",         page:"GroupingGame", goalNumber:11},
			{name:"twelve",         page:"GroupingGame", goalNumber:12},
			{name:"thirteen",       page:"GroupingGame", goalNumber:13},
			{name:"four-teen",       page:"GroupingGame", goalNumber:14},
			{name:"fifteen",        page:"GroupingGame", goalNumber:15},
			{name:"sixteen",        page:"GroupingGame", goalNumber:16},
			{name:"seven-teen",     page:"GroupingGame", goalNumber:17},
			{name:"eighteen",       page:"GroupingGame", goalNumber:18},
			{name:"nineteen",       page:"GroupingGame", goalNumber:19},
			
			{name:'"four" "teen"',  page:"GroupingGame2", goalNumber:14},
			{name:'"six" "teen"',   page:"GroupingGame2", goalNumber:16},
			{name:'"seven" "teen"', page:"GroupingGame2", goalNumber:17},
			{name:'"eight" "teen"', page:"GroupingGame2", goalNumber:18},
			{name:'"nine" "teen"',  page:"GroupingGame2", goalNumber:19},
			
			{name:'thir "teen"',    page:"GroupingGame2", goalNumber:13},
			{name:'fif "teen"',     page:"GroupingGame2", goalNumber:15},
			
			{name:'"eleven"',       page:"GroupingGame2", goalNumber:11},
			{name:'"twelve"',       page:"GroupingGame2", goalNumber:12},
			
			{name:"Practice", page:"Practice1"}
		];
		
		// Unit 2 games
		this.UNIT_GAMES[1] = [
			{name:"20 to 29",  page:"GroupingGame3", goalNumber:20, variation:3},
			{name:"30 to 39",  page:"GroupingGame3", goalNumber:30, variation:3},
			{name:"40 to 49",  page:"GroupingGame3", goalNumber:40, variation:3},
			{name:"50 to 59",  page:"GroupingGame3", goalNumber:50, variation:3},
			{name:"60 to 69",  page:"GroupingGame3", goalNumber:60, variation:3},
			{name:"70 to 79",  page:"GroupingGame3", goalNumber:70, variation:3},
			{name:"80 to 89",  page:"GroupingGame3", goalNumber:80, variation:3},
			{name:"90 to 99",  page:"GroupingGame3", goalNumber:90, variation:3},
			
			{name:"Practice", page:"Practice2"}
		];
		
		this.UNIT_GAMES[2] = [
			{name:"? + ? \n = ?",  page:"AdditionGame"},
			{name:"? + ? \n = 1?",  page:"AdditionGame"},
			{name:"1? + ? \n = 1?",  page:"AdditionGame"},
			{name:"1? + ? \n = 2?",  page:"AdditionGame"},
			{name:"1? + 1? \n = 2?",  page:"AdditionGame"},
			{name:"1? + 1? \n = 3?",  page:"AdditionGame"},
			{name:"2? + 2? \n = 4?",  page:"AdditionGame"},
			{name:"2? + 2? \n = 5?",  page:"AdditionGame"},
			{name:"2? + 3? \n = 5?",  page:"AdditionGame"},
			{name:"2? + 3? \n = 6?",  page:"AdditionGame"},
			{name:"?0 + ?0 \n = ?0",  page:"AdditionGame"},
			{name:"9? + ? \n = 9?",  page:"AdditionGame"},
			{name:"9? + ? \n = 10?",  page:"AdditionGame"},
			{name:"?0 + ?0 \n = ??0",  page:"AdditionGame"},
			{name:"9? + 3? \n = 12?",  page:"AdditionGame"},
			{name:"9? + 3? \n = 13?",  page:"AdditionGame"},
			{name:"??+?? \n = 1??",  page:"AdditionGame"},
			
			{name:"Practice", page:"Practice3"}
		];
		
		app.page = storage.get("page", "Home");
		app.pageParams = storage.get("pageParams", null);
		
		app.currentUnit = storage.get("currentUnit", 0);
		app.currentGame = storage.get("currentGame", 0);
		
		app.route(app.page, app.pageParams);
	},

	route: function(page, pageParams, shouldReload) {
		storage.set("page", page);
		storage.set("pageParams", pageParams);
		
		if (this.controller != null) {
			if (shouldReload) {
				window.location = "";
				return;
			} else {
				this.controller.finalize();
				
				if (this.view != null) {
					this.view.finalize();
				}
					
				if (this.layer != null) {
					this.layer.remove();
				}	
			}

			

		}
		
		this.page = page;
		this.pageParams = pageParams;
		
		this.layer = new Kinetic.Layer();
		this.stage.add(this.layer);	
		
		// creates new controller
		eval("this.controller = new " + app.page + "Controller(app.view, app.pageParams);");
		
		// loads all images
		loaderUtil.load(this.controller.images, this._loaded);
	},
	
	_loaded: function () {
		// tell the controller to perform
		app.controller.initialize();
	},
	
	nextGame: function () {
		if (app.currentGame >= app.UNIT_GAMES[app.currentUnit].length-1) {
			return false;
		} else {
			app.currentGame++;
			storage.set("currentGame", app.currentGame);
			return true;
		}
	},
	
	
	getCurrentPage: function () {
		return app.UNIT_GAMES[app.currentUnit][app.currentGame].page;
	},
	
	getCurrentPageParams: function () {
		return app.UNIT_GAMES[app.currentUnit][app.currentGame].params;
	},

	setCurrentGame: function (gameName) {
		this.currentGame = gameName;
		storage.set("currentGame", gameName);
	},
	
	setCurrentUnit: function (unitNumber) {
		this.currentUnit = unitNumber;
		storage.set("currentUnit", unitNumber);
	},

	registerWait: function() {
		if (app.objectsWaiting == null) {
			app.objectsWaiting = 0;
		}
		app.objectsWaiting++;
	},
	
	notifyDone: function() {
		app.objectsWaiting--;
		if (app.objectsWaiting == 0) {
			app.start();
		}
	},
	
});



// start new app


app = new App();


// life cycle events


if (Env.phoneGap) {
	// register loading of device
	app.registerWait()
	document.addEventListener("deviceready", app.notifyDone, false);
} else {
	// register loading of sound manager
	app.registerWait()
	soundManager.onready(app.notifyDone);

	// register loading of jQuery and document
	app.registerWait()
	$(app.notifyDone);
}

document.addEventListener("pause", function () {
	navigator.splashscreen.show();
	music.pauseBackgroundMusic();
}, false);

document.addEventListener("resume", function () {
	navigator.splashscreen.hide();
	music.resumeBackgroundMusic();
}, false);