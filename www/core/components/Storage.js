/**
 * Class to store the data
 */
var Storage = new Class ({

	/**
	 * TO COMMENT
	 * @param
	 * @param
	 */
	set: function(key, value) {
		$.jStorage.set(key, value);
	},
	
	/**
	 * TO COMMENT
	 * @param
	 * @param
	 * @return
	 */
	get: function(key, defaultValue) {
		if ($.jStorage.get(key, null) == null) {
			$.jStorage.set(key, defaultValue);
		}
		return $.jStorage.get(key);
	},
	
	/**
	 * TO COMMENT
	 * @param
	 */
	deleteKey: function(key) {
		$.jStorage.deleteKey(key);
	},
	
});
