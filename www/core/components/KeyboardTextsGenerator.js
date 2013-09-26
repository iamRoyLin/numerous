/**
 * Class to help generate the keyboard text in the practice level
 */
var KeyboardTextsGenerator = new Class ({
	
	/**
	 * Generate the keyboard text for the practice level
	 * @param {array[String]} all the texts from the pool of text (may contain correct text)
	 * @param {string} the correct answer
	 * @param {integer} the number of texts to generate
	 * @return {array[string]} shuffled keyborad texts
	 */
	generate: function (texts, correctText, textsCount) {
		var output = [correctText];
		
		var shuffledTexts = arrayUtil.shuffleArray(texts);
		
		while(output.length != textsCount) {
			if (shuffledTexts.length == 0) {
				break;
			}
			var newText = shuffledTexts.pop();
			if (newText == correctText) {
				continue;
			} else {
				output.push(newText);
			}
		}
		
		output = arrayUtil.shuffleArray(output);
		return output;
	},
	
});

