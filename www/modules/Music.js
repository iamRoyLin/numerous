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
	this.isPlaying = false;
	this.playBackgroundMusic = function (src) {
		if(Storage.get("settingMusic", true) == true){
			if (Env.phoneGap) {
				if(this.isPlaying == false){
					
					this.backgroundMusic = new Media(src, function() {}, function() {});
					this.backgroundMusic.setVolume(0.2);
					this.isPlaying = true;
					this.backgroundMusic.play({ numberOfLoops: 999});
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

