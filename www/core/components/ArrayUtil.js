var ArrayUtil = new function () {

	this.shuffleArray = function(arr) {
		arr2 = arr.slice(0);
		for(var j, x, i = arr2.length; i; j = Math.floor(Math.random() * i), x = arr2[--i], arr2[i] = arr2[j], arr2[j] = x);
		return arr2;
	};
	
	this.generateNumberArray = function(lower, upper, increment) {
		var output = [];
		for(var i = lower; i <= upper; i+= increment) {
			output.push(i);
		}
		return output;
	};
	
	
	
}

