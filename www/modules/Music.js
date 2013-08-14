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
	
	this.playBackgroundMusic = function (src) {
		if(Storage.get("settingMusic", true) == true){
			if (Env.phoneGap) {
				if(this.backgroundMusic == null || this.status == null || this.status == false ){
					this.backgroundMusic = new Media(src, function() {}, function() {});
					this.backgroundMusic.setVolume(0.2);
					this.backgroundMusic.play({ numberOfLoops: 999});
					this.status = true;
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
			if (this.backgroundMusic) {
				this.backgroundMusic.stop();
				this.status = false;
            }
		} else {
			this.backgroundMusic.stop();
		}
	}
}

