var UnitRecordsModel = new Class ({

	// key for accessing storage
	keyName: null,

	// variable for storing default stars data structure if not set already
	defaultStars: [],
	
	starsEarned: [],
	
	initialize: function (unitNumber) {
		this.unitNumber = unitNumber;
		this.keyName = "unit" + this.unitNumber + "Stars";
	
		for(var i = 0; i < app.UNIT_GAMES[this.unitNumber].length; i++) {
			this.defaultStars[i] = 0;
		}
		
		// get the stars from the database
		this.starsEarned = storage.get(this.keyName, this.defaultStars);
	},
	
	getStars: function(gameNumber) {
		this.starsEarned = storage.get(this.keyName, this.defaultStars);
		return this.starsEarned[gameNumber];
	},
	
	setStars: function(gameNumber, starsCount) {
		this.starsEarned[gameNumber] = starsCount;
		storage.set(this.keyName, this.starsEarned);
	},

});