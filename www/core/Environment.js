var Env = new function () {
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;
	
	// UI based on this. Might change in the future.
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.debug = true;
	
	this.phoneGap = (typeof(device) != 'undefined');
	
	if (this.phoneGap) {
		alert("phonegap");
	} else {
		alert("not phonegap");
	}
	
}


