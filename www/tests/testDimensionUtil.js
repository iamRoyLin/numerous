module( "testDimensionUtil" );


test( "test decimal to actual height", function() {
	var actual = DimensionUtil.decimalToActualHeight(0.75);
	var exptected = 0.75 * Env.height;
	equal(actual, exptected);
});


test( "test actual to decimal height", function() {
	var actual = DimensionUtil.actualToDecimalHeight(500);
	var exptected = 500 / Env.height;
	equal(actual, exptected);
});


test( "test decimal to actual width", function() {
	var actual = DimensionUtil.decimalToActualWidth(0.75);
	var exptected = 0.75 * Env.width;
	equal(actual, exptected);
});


test( "test actual to decimal width", function() {
	var actual = DimensionUtil.actualToDecimalWidth(500);
	var exptected = 500 / Env.width;
	equal(actual, exptected);
});

