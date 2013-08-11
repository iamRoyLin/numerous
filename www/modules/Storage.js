var Storage = new function () {

	this.set = function(key, value) {
		$.jStorage.set(key, value);
	};
	
	this.get = function(key, defaultValue) {
		if ($.jStorage.get(key, null) == null) {
			$.jStorage.set(key, defaultValue);
		}
		return $.jStorage.get(key);
	};
	
}

