module( "testKeyboardTextsGenerator" );


test("test if correct answer exists in generating keyboard tests", function() {
	var out = KeyboardTextsGenerator.generate(['one', 'two', 'three'], 'four', 1);
	notEqual(out.indexOf("four"), -1);
});










