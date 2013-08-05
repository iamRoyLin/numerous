function TemplateView(controller) {
	this.controller = controller;
};
// Simulate inheritance
TemplateView.prototype = new View();

// destructor (is automatically called when you leave the page)
TemplateView.prototype.finalize = function() {

};

