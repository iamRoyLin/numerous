var KeyboardTextsGenerator = new function () {
	
	// texts: all the texts from the pool of text (may contain correct text)
	// correctText: the correct answer
	// the number of texts to generate
	this.generateKeyboardTexts = function (texts, correctText, textsCount) {
		var output = [correctText];
		
		var shuffledTexts = ArrayUtil.shuffle(texts);
		
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
		
		return output;
	}
}

