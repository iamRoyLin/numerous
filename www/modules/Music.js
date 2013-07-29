var Music = new function () {
	
	this.manager = soundManager.setup({
		url: 'lib/soundmanager/swf_files/',
		onready: function() {}
	});
		
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

