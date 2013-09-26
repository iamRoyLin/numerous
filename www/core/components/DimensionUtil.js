/**
 * Class to help coordinate the dimensions of patterns in the game
 */
var DimensionUtil = new Class ({

	/**
	 * Represents the width of the canvas
	 */
	width: env.width,
	
	/**
	 * Represents the height of the canvas
	 */
	height: env.height,
	
	/**
	 * Convert decimal height to the actual height
	 * @param {float} decimal height
	 * @return {double} actual height
	 */
	decimalToActualHeight: function (h) {
		return h * this.height;
	},
	
	/**
	 * Convert actual height to the decimal height
	 * @param {double} actual height
	 * @return {float} decimal height
	 */
	actualToDecimalHeight: function(h) {
		return h / this.height;
	},
	
	/**
	 * Convert decimal width to the actual width
	 * @param {float} decimal width
	 * @return {double} actual width
	 */
	decimalToActualWidth: function (w) {
		return w * this.width;
	},
	
	/**
	 * Convert actual width to the decimal width
	 * @param {double} actual width
	 * @return {float} decimal width
	 */
	actualToDecimalWidth: function(w) {
		return w / this.width;
	},
	
});


