var App = {};

App.initialize = function() {
	App.store = new MemoryStore();
	Controller.initialize();
	LoginView.initialize(App.store);
	//GroupingGameView.initialize();
	//MenuView.initialize();
}

$(function () {
	App.initialize();
});