var Music = new function () {
	
	if (!Env.phoneGap) {
		soundManager.setup({
			url: 'lib/soundmanager/swf_files/',
			onready: function() {},
			useHTML5Audio: false
		});
	}
		
	// call this function to play a sound
	this.play = function (src) {
		if (Env.phoneGap) {
			myMedia = new Media(src, function() {}, function() {});
			myMedia.play();
		} else {
			soundManager.createSound({
				url: src,
				autoLoad: true,
				autoPlay: true
			});
		}
	}
}

