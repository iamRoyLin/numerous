var TemplateController = new Class ({
	
	initialize: function () {
		// Images. These will automatically be loaded
		this.images = {};
		
		view.draw();
	},

	// Happens when images are loaded
	start: function () {
		// this.view = new ExampleView(this);
		// app.view = this.view;
		
		// this.view.setImages(this.images);
		// this.view.draw();
	},

	// destructor (is automatically called when you leave the page)
	finalize: function() {
		
	},
	
});

