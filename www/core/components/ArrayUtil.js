/**
 * Class to manimuplate arrays
 */	
var ArrayUtil = new Class ({
	
	/**
	 * Constructor
	 */	
	initialize: function () {
	
	},
	
	/**
	 * Randomly rearrange arrays
	 * @param {array} array that you want to shuffle
	 * @return {array} rearranged array
	 */	
	shuffleArray: function(arr) {
		arr2 = arr.slice(0);
		for(var j, x, i = arr2.length; i; j = Math.floor(Math.random() * i), x = arr2[--i], arr2[i] = arr2[j], arr2[j] = x);
		return arr2;
	},
	
	/**
	 * Generate a number array from one lower value to another upper value with an increment value
	 * @param {integer} lower value
	 * @param {integer} upper value
	 * @param {integer} increment value
	 * @param {array} generated array
	 */	
	generateNumberArray: function(lower, upper, increment) {
		var output = [];
		for(var i = lower; i <= upper; i+= increment) {
			output.push(i);
		}
		return output;
	},
	
});
