var Music = new function () {
	
	this.manager = soundManager.setup({
		url: 'lib/soundmanager/swf_files/',
		onready: function() {}
	});
		
	
	this.play = function (src) {
		soundManager.createSound({
		  url: src,
		  autoLoad: true,
		  autoPlay: true
		});
	}
}

