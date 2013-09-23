var LoaderUtil = new Class ({

	// loads images
	load: function(images, callback) {
		var loader = new PxLoader();
	
		for(var key in images) {
			if (typeof images[key] == "string") {
				images[key] = loader.addImage(images[key]);
			} else if (images[key] instanceof Array) {
				for(var i = 0; i < images[key].length; i++) {
					images[key][i] = loader.addImage(images[key][i]);
				}
			} else if (images[key] instanceof Object) {
				this.load(images[key]);
			}
		}
		
		loader.addCompletionListener(callback);
		loader.start();	
	},

	// unloads images
	unload: function(images) {
		for(var key in images) {
		
			if (images[key] instanceof Array) {
				for(var i = 0; i < images[key].length; i++) {
					delete images[key][i];
				}
			} else {
				delete images[key];
			}
		}
	},
	
});

