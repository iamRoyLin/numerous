var Env = new function () {
	this.screenWidth = window.innerWidth;
	this.screenHeight = window.innerHeight;
	
	// UI based on this. Might change in the future.
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	this.debug = true;
	
	alert(document.URL);
	
	//this.phoneGap = false;
	if (typeof PhoneGap === "undefined") {
		this.phoneGap = false;
		alert("no PG!");
	} else {
		this.phoneGap = true;
		alert("PG!");	

	}

	
}

/*
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
	Env.phoneGap = true;
    alert("phonegap ready!");
}
*/