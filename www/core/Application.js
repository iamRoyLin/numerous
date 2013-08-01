function App() {
	
	this.view = null;
	this.controller = null;
	
	this.pageParams = null;
	this.layer = null;
	
	this.stage = new Kinetic.Stage({
		container: "container",
		width: window.innerWidth,
		height: window.innerHeight
	});
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

$(function () {
	app = new App();
	app.route("MenuUnit1");
});