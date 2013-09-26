var TemplateView = new Class ({
	Extends: View,

	/**
	 * Constructor
	 * @param {Controller} controller control this view
	 */
	initialize: function(controller) {
		this.controller = controller;
	},
	
	/**
	 * Destructor(is automatically called when you leave the page)
	 */
	finalize: function() {
	
	},

});

