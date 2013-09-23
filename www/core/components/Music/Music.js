
/*
var Music = new Class ({
	
	// call this function to play a sound
	play: function (src) {
		throw "method not implemented";
	},
	
	playBackgroundMusic: function (src) {
		throw "method not implemented";
	},
	
	pauseBackgroundMusic: function () {
		throw "method not implemented";
	},
	
	resumeBackgroundMusic: function () {
		throw "method not implemented";
	},
	
	stopBackgroundMusic: function () {
		throw "method not implemented";
	},
	
});
*/


var music = new function () {
	
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
				myMedia.play({ playAudioWhenScreenIsLocked: false });
			} else {
				soundManager.createSound({
					url: src,
					autoLoad: true,
					autoPlay: true
				});
			}
		}
	}
	
	    

        // onError Callback 
        //
        function onError(error) {
            alert('code: '    + error.code    + '\n' + 
                  'message: ' + error.message + '\n');
        }
	
	this.isPlaying = false;
	this.playBackgroundMusic = function (src) {
		if(Storage.get("settingMusic", true) == true){
			if (Env.phoneGap) {
				
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
	
	this.pauseBackgroundMusic = function () {
		if (Env.phoneGap) {
			if (this.isPlaying) {
				this.backgroundMusic.pause();
				this.isPlaying = false;
			}
		}
	}
	this.resumeBackgroundMusic = function () {
		if (Env.phoneGap) {
			if (!this.isPlaying) {
				this.backgroundMusic.play({ numberOfLoops: 999});
				this.isPlaying = true;
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

