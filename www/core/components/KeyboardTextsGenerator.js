var KeyboardTextsGenerator = new Class ({
	
	// texts: all the texts from the pool of text (may contain correct text)
	// correctText: the correct answer
	// the number of texts to generate
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

