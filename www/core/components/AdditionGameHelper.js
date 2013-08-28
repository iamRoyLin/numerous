var AdditionGameHelper = new function () {

	// difficulty is between 0 and 16.
	// generates an object {left: 0, right: 0, answer: 0}
	this.generateQuestion = function(difficulty) {
		var q = {};
		switch (difficulty) {
			case 0:
				// ? + ? = ?
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9 - q.left);
			break;
			case 1:
				// ? + ? = 1?
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
			break;
			case 2:
				// 1? + ? = 1?
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9-q.left);
				q.left += 10;
			break;
			case 3:
				// 1? + ? = 2?
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				q.left += 10;
			break;
			case 4:
				// 1? + 1? = 2?
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9-q.left);
				q.left += 10;
				q.right += 10;
			break;
			case 5:
				// 1? + 1? = 3?
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				q.left += 10;
				q.right += 10;
			break;
			case 6:
				// 2? + 2? = 4?
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9-q.left);
				q.left += 20;
				q.right += 20;
			break;
			case 7:
				// 2? + 2? = 5?
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				q.left += 20;
				q.right += 20;
			break;
			case 8:
				// 2? + 3? = 5?
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9-q.left);
				q.left += 20;
				q.right += 30;
			break;
			case 9:
				// 2? + 3? = 6?
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				q.left += 20;
				q.right += 30;
			break;
			case 10:
				// ?0 + ?0 = ?0
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9-q.left);
				q.left *= 10;
				q.right *= 10;
			break;
			case 11:
				// 9? + ? = 9?
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9-q.left);
				q.left += 90;
			break;
			case 12:
				// 9? + ? = 10?
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				q.left += 90;
			break;
			case 13:
				// ?0 + ?0 = ??0
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				q.left *= 10;
				q.right *= 10;
			break;
			case 14:
				// 9? + 3? = 12?
				q.left = MathUtil.random(1,8);
				q.right = MathUtil.random(1, 9-q.left);
				q.left += 90;
				q.right += 30;
			break;
			case 15:
				// 8? + 4? = 13?
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				q.left += 80;
				q.right += 40;
			break;
			case 16:
				// ?? + ?? = 1??
				var tempLeft = MathUtil.random(1,9);
				var tempRight = MathUtil.random(10-tempLeft ,9);
				
				q.left = MathUtil.random(1,9);
				q.right = MathUtil.random(10-q.left ,9);
				
				q.left += tempLeft * 10;
				q.right += tempRight * 10;
			break;
		}
		q.answer = q.left + q.right;
		return q;
	};
	
}

