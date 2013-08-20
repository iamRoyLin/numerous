var Music = new function () {
	
	if (!Env.phoneGap) {
		soundManager.setup({
			url: 'lib/soundmanager/swf_files/',
			onready: function() {}
		});
	}
		
	// call this function to play a sound
	this.play = function (src) {
		if(Storage.get("settingSound", true) == true){
			if (Env.phoneGap) {
				var myMedia = new Media(src);
				myMedia.play({ playAudioWhenScreenIsLocked : false });
			} else {
				soundManager.createSound({
					url: src,
					autoLoad: true,
					autoPlay: true
				});
			}
		}
	}
	this.isPlaying = false;
	this.playBackgroundMusic = function (src) {
		if(Storage.get("settingMusic", true) == true){
			if (Env.phoneGap) {
				
				if(this.isPlaying == false){
					alert("Play Background Music");
					this.backgroundMusic = new Media(src);
					this.backgroundMusic.setVolume(0.2);
					this.isPlaying = true;
					this.backgroundMusic.play({ numberOfLoops: 999, playAudioWhenScreenIsLocked : false});
				}
				
			} else {
				
				if(this.backgroundMusic == null || this.backgroundMusic.playState == 0 ){
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
		}
	}
	
	this.stopBackgroundMusic = function () {
		if (Env.phoneGap) {
			if (this.isPlaying == true) {
				if (this.backgroundMusic) {
					alert("Stop Background Music");
					this.backgroundMusic.stop();
					this.isPlaying = false;
				}
			}
		} else {
			// Not Phonegap
			if (this.backgroundMusic != null) {
				this.backgroundMusic.stop();
			}
		}
	}
}

