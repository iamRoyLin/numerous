var Env = new function () {
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;
	
	// UI based on this. Might change in the future.
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.debug = true;
	
	
	//this.phoneGap = false;
	if (document.URL.indexOf('file:') === 0) {
		this.phoneGap = true;
		alert("PG!");
	} else {
		this.phoneGap = false;
		alert("no PG!");	
	}

	
}

/*
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	Env.phoneGap = true;
    alert("phonegap ready!");
}
*/