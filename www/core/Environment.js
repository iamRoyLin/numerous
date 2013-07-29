var Env = new function () {
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;
	
	// UI based on this. Might change in the future.
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.debug = true;
	
	if (document.URL.indexOf('file:') === 0) {
		this.phoneGap = true;
	} else {
		this.phoneGap = false;
	}

	
}
