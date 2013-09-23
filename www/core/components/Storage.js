var Storage = new Class ({

	set: function(key, value) {
		$.jStorage.set(key, value);
	},
	
	get: function(key, defaultValue) {
		if ($.jStorage.get(key, null) == null) {
			$.jStorage.set(key, defaultValue);
		}
		return $.jStorage.get(key);
	},
	
	deleteKey: function(key) {
		$.jStorage.deleteKey(key);
	},
	
});
