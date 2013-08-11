function UnitRecordsModel(unitNumber) {

	// key for accessing storage
	this.keyName = "unit" + unitNumber + "Stars";

	// variable for storing default stars data structure if not set already
	var defaultStars = [];
	for(var i = 0; i < app.UNIT_GAMES[unitNumber].length; i++) defaultStars[i] = 0;
	
	// get the stars from the database
	this.starsEarned = Storage.get(this.keyName, defaultStars);
	
	
	this.getStars = function(gameNumber) {
		this.starsEarned = Storage.get(this.keyName, defaultStars);
		return this.starsEarned[gameNumber];
	};
	
	this.setStars = function(gameNumber, starsCount) {
		this.starsEarned[gameNumber] = starsCount;
		Storage.set(this.keyName, this.starsEarned);
	};
};