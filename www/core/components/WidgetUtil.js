var WidgetUtil = new function () {
	this.width = Env.width;
	this.height = Env.height;

	/*
	 * Glues a KineticJs node to the correct position with a correct size relative to screen size.
	 * 
	 * @param node the KineticJs node
	 * @param params {
	 * 		@param glueTop (boolean): true for glue top and false (or no definition) for glue bottom. defaults to true
	 * 		@param glueLeft (boolean): true for glue left and false (or no definition) for glue right. defaults to true
	 * 		@param width (decimal): between 0 and 1 (proportional to screen size).
	 * 		@param height (decimal): between 0 and 1 (proportional to screen size).
	 * 		@param dx (decimal): x-displacement of image from side it is glued (proportional to screen size).
	 * 		@param dy (decimal): y-displacement of image from side it is glued (proportional to screen size).
	 * }
	 */
	this.glue = function (node, params) {
		var myWidth, myHight, myX, myY;
		
		myWidth = params.width * this.width;
		myHeight = params.height * this.height;
		
		if (params.glueTop == null) params.glueTop = true;
		if (params.glueLeft == null) params.glueLeft = true;
		
		if (params.glueTop) {
			myY = params.dy * this.height;
		} else {
			myY = this.height - myHeight - (params.dy * this.height);
		}

		if (params.glueLeft) {
			myX = params.dx * this.width;
		} else {
			myX = this.width - myWidth - (params.dx * this.width);
		}
		
		node.setX(myX);
		node.setY(myY);
		node.setWidth(myWidth);
		node.setHeight(myHeight);
	};
	
	
	/*
	 * Determines if the center of the object is within radius of a specified point
	 * @param node the KineticJs node
	 * @param x horrizontal position of destination between 0 and 1
	 * @param y vertical position of destination etween 0 and 1
	 * @param radius the radius which determines what is close
	 * @return boolean
	 */
	this.isNearPoint = function(node, x, y, radius) {
		// we are working in real width and height and not decimal
		x = x * this.width;
		y = y * this.height;
		
		// screen might be skewed, so we have an ellipse.
		radiusWidth = radius * this.width;
		radiusHeight = radius * this.height;
		
		objX = node.getX() + ( node.getWidth() / 2 );
		objY = node.getY() + ( node.getHeight() / 2 );
		
		if ( (((objX-x)*(objX-x))/(radiusWidth*radiusWidth)+((objY-y)*(objY-y))/(radiusHeight*radiusHeight)) <= 1 ) {
			// It is close enough
			return true;
		} else {
			// Too far
			return false;
		}
	}
	
	/*
	 * Determines if the center of the object is within radius of a specified point
	 * @return boolean
	 * @param node the KineticJs node
	 * @param xArray an array of horrizontal positions of destination between 0 and 1
	 * @param yArray an array of vertical positions of destination etween 0 and 1
	 * @param radiusArray an array of radius which determines what is close
	 * @return boolean
	 */
	this.isNearPoints = function(node, xArray, yArray, radiusArray) {
		for (var i = 0; i < radiusArray.length; i++) {
			if (this.isNearPoint(node, xArray[i], yArray[i], radiusArray[i])) {
				return true;
			}
		}
		return false;
	}
	
	this.animateMove = function(node, duration, x, y) {
		var tween = new Kinetic.Tween({
			node: node, 
			duration: duration,
			x: DimensionUtil.decimalToActualWidth(x),
			y: DimensionUtil.decimalToActualHeight(y)
		});
		tween.play();
	}
	
	
	
}

