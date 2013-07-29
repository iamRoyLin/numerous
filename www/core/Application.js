var App = {};

App.initialize = function() {
	App.store = new MemoryStore();
	Controller.initialize();
	LoginView.initialize(App.store);
	//GroupingGameView.initialize();
}

$(function () {
	App.initialize();
});

function onDeviceReady() {
	alert("device ready!");
	Env.phoneGap = true;
}
