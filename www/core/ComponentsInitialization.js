var storage = new Storage();
	
if (Env.phoneGap) {
	var music = new PhonegapMusic();
} else {
	var music = new BrowserMusic();
}

var keyboardTextsGenerator = new KeyboardTextsGenerator();
var arrayUtil = new ArrayUtil();
var mathUtil = new MathUtil();
var dimensionUtil = new DimensionUtil();
var widgetUtil = new WidgetUtil();
var loaderUtil = new LoaderUtil();
var speechUtil = new SpeechUtil();
var additionGameHelper = new AdditionGameHelper();
