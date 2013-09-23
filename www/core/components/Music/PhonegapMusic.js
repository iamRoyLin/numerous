var PhonegapMusic = new Class ({
	
	isPlaying: false,
	
	// call this function to play a sound
	play: function (src) {
		if(Storage.get("settingSound", true) == true){
			var myMedia = new Media(src);
			myMedia.play({ playAudioWhenScreenIsLocked: false });
		}
	},
	
	playBackgroundMusic: function (src) {
		if(Storage.get("settingMusic", true) == true){
			if(this.isPlaying == false){
				this.backgroundMusic = new Media(
					src,
					function() {	
					},
					function (error) {
						alert('code: ' + error.code + ' ||  message: ' + error.message);
					}
				);
				this.backgroundmusic.setVolume(0.2);
				this.isPlaying = true;
				this.backgroundmusic.play({ numberOfLoops: 999, playAudioWhenScreenIsLocked : false});
			}
		}
	},
	
	pauseBackgroundMusic: function () {
		if (this.isPlaying) {
			this.backgroundmusic.pause();
			this.isPlaying = false;
		}
	},
	
	resumeBackgroundMusic: function () {
		if (!this.isPlaying) {
			this.backgroundmusic.play({ numberOfLoops: 999});
			this.isPlaying = true;
		}
	},
	
	stopBackgroundMusic: function () {
		if (this.isPlaying == true) {
			if (this.backgroundMusic) {
				this.backgroundmusic.stop();
				this.isPlaying = false;
			}
		}
	},
	
});
