var BrowserMusic = new Class ({
	Implements: Music,
	
	isPlaying: false,
	
	initialize: function () {
		soundManager.setup({
			url: 'lib/soundmanager/swf_files/',
			onready: function() {}
		});
	},

	play: function (src) {
		if(Storage.get("settingSound", true) == true){
			soundManager.createSound({
				url: src,
				autoLoad: true,
				autoPlay: true
			});
		}
	},
	
	playBackgroundMusic: function (src) {
		if(Storage.get("settingMusic", true) == true){
			if(this.backgroundMusic == null || this.backgroundmusic.playState == 0 ){
				this.backgroundMusic = soundManager.createSound({
					url: src,
					autoLoad: true,
					autoPlay: true,
					loops: 999,
					onload: function() {
						this.play({volume: 20});
					}
				});
			}
		}
	},
	
	pauseBackgroundMusic: function () {

	},
	
	resumeBackgroundMusic: function () {

	},
	
	
	stopBackgroundMusic: function () {
		if (this.backgroundMusic != null) {
			this.backgroundmusic.stop();
		}
	},
	
});