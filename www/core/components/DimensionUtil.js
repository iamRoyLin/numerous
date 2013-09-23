var DimensionUtil = new Class ({

	width: Env.width,
	
	height: Env.height,

	decimalToActualHeight: function (h) {
		return h * this.height;
	},
	
	actualToDecimalHeight: function(h) {
		return h / this.height;
	},
	
	decimalToActualWidth: function (w) {
		return w * this.width;
	},
	
	actualToDecimalWidth: function(w) {
		return w / this.width;
	},
	
});

var dimensionUtil = new DimensionUtil();

