var DimensionUtil = new function () {
	this.width = Env.width;
	this.height = Env.height;


	this.decimalToActualHeight = function (h) {
		return h * this.height;
	}
	this.actualToDecimalHeight = function(h) {
		return h / this.height;
	}
	
	this.decimalToActualWidth = function (w) {
		return w * this.width;
	}
	this.actualToDecimalWidth = function(w) {
		return w / this.width;
	}
	
}

