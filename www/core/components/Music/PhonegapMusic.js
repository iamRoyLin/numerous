var PhonegapMusic = new Class ({
	Implements: Music,
		
	isPlaying: false,
		
	// call this function to play a sound
	play: function (src) {
		if(Storage.get("settingSound", true) == true){
			var myMedia = new Media(src);
			myMedia.play({ playAudioWhenScreenIsLocked: false });
		}
	},
	
	
	onError: function(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
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
				this.backgroundMusic.setVolume(0.2);
				this.isPlaying = true;
				this.backgroundMusic.play({ numberOfLoops: 999, playAudioWhenScreenIsLocked : false});
			}
		}
	},
	
	pauseBackgroundMusic: function () {
		if (this.isPlaying) {
			this.backgroundMusic.pause();
			this.isPlaying = false;
		}
	},
	
	resumeBackgroundMusic: function () {
		if (!this.isPlaying) {
			this.backgroundMusic.play({ numberOfLoops: 999});
			this.isPlaying = true;
		}
	},
	
	stopBackgroundMusic: function () {
		if (this.isPlaying == true) {
			if (this.backgroundMusic) {
				this.backgroundMusic.stop();
				this.isPlaying = false;
			}
		}
	},
	
});

