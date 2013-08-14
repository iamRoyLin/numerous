function OptionsView(controller) {
	this.controller = controller;
};
// Simulate inheritance
OptionsView.prototype = new View();

// destructor (is automatically called when you leave the page)
OptionsView.prototype.finalize = function() {

};

OptionsView.prototype.drawTitle = function() {
	var title = new Kinetic.Image({image: this.images.titleOptions});
	WidgetUtil.glue(title, {
		width: this.viewVars.titleDimensions.width,
		height: this.viewVars.titleDimensions.height,
		dx: this.viewVars.titleDimensions.x,
		dy: this.viewVars.titleDimensions.y
	});
	app.layer.add(title);
};

OptionsView.prototype.drawSoundButtons = function() {
	var sound = new Kinetic.Image({image: this.images.iconSound});
	WidgetUtil.glue(sound, {
		width: this.viewVars.iconSoundDimensions.width,
		height: this.viewVars.iconSoundDimensions.height,
		dx: this.viewVars.iconSoundDimensions.x,
		dy: this.viewVars.iconSoundDimensions.y
	});
	app.layer.add(sound);
	
	var soundCross = new Kinetic.Image({image: this.images.iconCross});
	WidgetUtil.glue(soundCross, {
		width: this.viewVars.iconSoundCrossDimensions.width,
		height: this.viewVars.iconSoundCrossDimensions.height,
		dx: this.viewVars.iconSoundCrossDimensions.x,
		dy: this.viewVars.iconSoundCrossDimensions.y
	});
	app.layer.add(soundCross);
	soundCross.hide();
	
	var music = new Kinetic.Image({image: this.images.iconMusic});
	WidgetUtil.glue(music, {
		width: this.viewVars.iconMusicDimensions.width,
		height: this.viewVars.iconMusicDimensions.height,
		dx: this.viewVars.iconMusicDimensions.x,
		dy: this.viewVars.iconMusicDimensions.y
	});
	app.layer.add(music);
	
	var musicCross = new Kinetic.Image({image: this.images.iconCross});
	WidgetUtil.glue(musicCross, {
		width: this.viewVars.iconMusicCrossDimensions.width,
		height: this.viewVars.iconMusicCrossDimensions.height,
		dx: this.viewVars.iconMusicCrossDimensions.x,
		dy: this.viewVars.iconMusicCrossDimensions.y
	});
	app.layer.add(musicCross);
	musicCross.hide();
	
	//check whether hide the cross
	if ( Storage.get("settingSound", true) == true) {
			soundCross.hide();
		} else {
			soundCross.show();
	}
	if ( Storage.get("settingMusic", true) == true) {
			musicCross.hide();
		} else {
			musicCross.show();
	}
	
	//check turn on/off sound/music
	sound.on('click tap', function () {
		Music.play(app.view.sounds.select);
		if ( Storage.get("settingSound", true) == true) {
			//turn off the sound
			soundCross.show();
			Storage.set("settingSound", false);
		} else {
			//turn on the sound
			soundCross.hide();
			Storage.set("settingSound", true);
		}
		app.stage.draw();	
			
	});
	
	music.on('click tap', function () {
		Music.play(app.view.sounds.select);
		if ( Storage.get("settingMusic", true) == true) {
			//turn off the sound
			musicCross.show();
			Storage.set("settingMusic", false);
			Music.stopBackgroundMusic();
		} else {
			//turn on the sound
			musicCross.hide();
			Storage.set("settingMusic", true);
			Music.playBackgroundMusic(app.view.sounds.background);
		}
		app.stage.draw();	
			
	});
};

OptionsView.prototype.drawOptionsButtons = function() {
	var buttonStatistics = new Kinetic.Image({image: this.images.buttonStatistics});
	WidgetUtil.glue(buttonStatistics, {
		width: this.viewVars.buttonStatisticsDimensions.width,
		height: this.viewVars.buttonStatisticsDimensions.height,
		dx: this.viewVars.buttonStatisticsDimensions.x,
		dy: this.viewVars.buttonStatisticsDimensions.y
	});
	app.layer.add(buttonStatistics);
	
	buttonStatistics.on('click tap', function () {
		Music.play(app.view.sounds.select);
		//do something
			
	});
	
	var buttonLock = new Kinetic.Image({image: this.images.buttonLock});
	WidgetUtil.glue(buttonLock, {
		width: this.viewVars.buttonLockDimensions.width,
		height: this.viewVars.buttonLockDimensions.height,
		dx: this.viewVars.buttonLockDimensions.x,
		dy: this.viewVars.buttonLockDimensions.y
	});
	app.layer.add(buttonLock);
	
	var buttonUnlock = new Kinetic.Image({image: this.images.buttonUnlock});
	WidgetUtil.glue(buttonUnlock, {
		width: this.viewVars.buttonUnlockDimensions.width,
		height: this.viewVars.buttonUnlockDimensions.height,
		dx: this.viewVars.buttonUnlockDimensions.x,
		dy: this.viewVars.buttonUnlockDimensions.y
	});
	app.layer.add(buttonUnlock);
	
	var iconLock = new Kinetic.Image({image: this.images.iconLock});
	WidgetUtil.glue(iconLock, {
		width: this.viewVars.iconLockDimensions.width,
		height: this.viewVars.iconLockDimensions.height,
		dx: this.viewVars.iconLockDimensions.x,
		dy: this.viewVars.iconLockDimensions.y
	});
	app.layer.add(iconLock);
	
	if (Storage.get("lockLevel", true) == true){
		buttonLock.hide();
		buttonUnlock.show();
		iconLock.show();
	} else {
		
		buttonLock.show();
		buttonUnlock.hide();
		iconLock.hide();
	}
	
	buttonLock.on('click tap', function () {
		Music.play(app.view.sounds.select);
		//lock levels
		Storage.set("lockLevel", true);
		buttonUnlock.show();
		iconLock.show();
		buttonLock.hide();
		app.stage.draw();
	});
	
	buttonUnlock.on('click tap', function () {
		Music.play(app.view.sounds.select);
		//unlock levels
		Storage.set("lockLevel", false);
		buttonLock.show();
		iconLock.hide();
		buttonUnlock.hide();
		app.stage.draw();
	});
	
	var buttonReset = new Kinetic.Image({image: this.images.buttonReset});
	WidgetUtil.glue(buttonReset, {
		width: this.viewVars.buttonResetDimensions.width,
		height: this.viewVars.buttonResetDimensions.height,
		dx: this.viewVars.buttonResetDimensions.x,
		dy: this.viewVars.buttonResetDimensions.y
	});
	app.layer.add(buttonReset);
	
	buttonReset.on('click tap', function () {
		Music.play(app.view.sounds.select);
		//do something
			
	});
	
	var buttonAbout = new Kinetic.Image({image: this.images.buttonAbout});
	WidgetUtil.glue(buttonAbout, {
		width: this.viewVars.buttonAboutDimensions.width,
		height: this.viewVars.buttonAboutDimensions.height,
		dx: this.viewVars.buttonAboutDimensions.x,
		dy: this.viewVars.buttonAboutDimensions.y
	});
	app.layer.add(buttonAbout);
	
	buttonAbout.on('click tap', function () {
		Music.play(app.view.sounds.select);
		//do something
			
	});
	
};

OptionsView.prototype.drawTitle = function() {
	var title = new Kinetic.Image({image: this.images.titleOptions});
	WidgetUtil.glue(title, {
		width: this.viewVars.titleDimensions.width,
		height: this.viewVars.titleDimensions.height,
		dx: this.viewVars.titleDimensions.x,
		dy: this.viewVars.titleDimensions.y
	});
	app.layer.add(title);
};

OptionsView.prototype.drawHomeButton = function() {
	var buttonHome = new Kinetic.Image({image: this.images.buttonHome});
	WidgetUtil.glue(buttonHome, {
		width: this.viewVars.homeButtonDimensions.width,
		height: this.viewVars.homeButtonDimensions.height,
		dx: this.viewVars.homeButtonDimensions.x,
		dy: this.viewVars.homeButtonDimensions.y
	});
	app.layer.add(buttonHome);
	
	buttonHome.on('click tap', function () {
		Music.play(app.view.sounds.select);
		app.controller.home()
	});
}