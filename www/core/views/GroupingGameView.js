var GroupingGameView = {};

GroupingGameView.stage;
GroupingGameView.mainLayer;

GroupingGameView.INITIAL_EGG_COUNT = 5;
GroupingGameView.INITIAL_EGG_DIMENSIONS = {width:120, height: 150};
GroupingGameView.INITIAL_EGG_RECTANGLE = {x:700, y:460, width: 180, height: 50};


GroupingGameView.eggsAtDestination = [];

GroupingGameView.eggInitialLocations = [];
GroupingGameView.eggDestinationLocations = [
	{x:150, y: 140},
	{x:250, y: 140},
	{x:120, y: 250},
	{x:220, y: 250}
];


GroupingGameView.eggImageSources = [
	"images/grouping_game/eggs/egg1.png",
	"images/grouping_game/eggs/egg2.png",
];
GroupingGameView.eggImageObjects = [];



GroupingGameView.initialize = function (employee) {

	// render the html view
	View.render("GroupingGameView");
	
	// setup view routing
	Controller.routeAnchor(".grouping_back", "LoginView", App.store);
	
	// Setup the stage
	GroupingGameView.stage = new Kinetic.Stage({
		container: "container",
		width: 1024,
		height: 768
	});
	GroupingGameView.mainLayer = new Kinetic.Layer();
	GroupingGameView.stage.add(GroupingGameView.mainLayer);	
	
	// Initialise graphics components
	GroupingGameView.drawBackground();
	GroupingGameView.drawEggs();
	GroupingGameView.drawTemp();
}

GroupingGameView.drawBackground = function() {
	
}

// Draws eggs in a specified area
GroupingGameView.drawEggs = function() {
	var loadedImages = 0;
	for (var imageNumber=0; imageNumber<GroupingGameView.eggImageSources.length; imageNumber++) {
		GroupingGameView.eggImageObjects[imageNumber] = new Image();
		GroupingGameView.eggImageObjects[imageNumber].src = GroupingGameView.eggImageSources[imageNumber];
		GroupingGameView.eggImageObjects[imageNumber].onload = function() {
			if (++loadedImages == GroupingGameView.eggImageSources.length) {
				// All images loaded. Now draw all the eggs.
				for (var i=0; i<GroupingGameView.INITIAL_EGG_COUNT; i++) {
				
					var xInit = MathUtil.random(GroupingGameView.INITIAL_EGG_RECTANGLE.x, GroupingGameView.INITIAL_EGG_RECTANGLE.x + GroupingGameView.INITIAL_EGG_RECTANGLE.width);
					var yInit = MathUtil.random(GroupingGameView.INITIAL_EGG_RECTANGLE.y, GroupingGameView.INITIAL_EGG_RECTANGLE.y + GroupingGameView.INITIAL_EGG_RECTANGLE.height);
					GroupingGameView.eggInitialLocations[i] = {x:xInit, y:yInit};
					
					var egg = new Kinetic.Image({
						image: GroupingGameView.eggImageObjects[MathUtil.random(0, GroupingGameView.eggImageSources.length)],
						x: xInit,
						y: yInit,
						width: GroupingGameView.INITIAL_EGG_DIMENSIONS.width,
						height: GroupingGameView.INITIAL_EGG_DIMENSIONS.height,
						draggable: true
					});
					egg.id = i;
					
					// create touch hit region of only non-transparent pixels
					egg.createImageHitRegion(function() {
						GroupingGameView.mainLayer.draw();
					});
					
					// add cursor styling
					egg.on('mouseover', function() {
						document.body.style.cursor = 'pointer';
					});
					egg.on('mouseout', function() {
						document.body.style.cursor = 'default';
					});					
					
					egg.on('dragend', function() {
						if (GroupingGameView.isNear(250, 300, this.getAttr('x') + this.getAttr('width')/2, this.getAttr('y') + this.getAttr('height')/2, 130)
								&& (GroupingGameView.eggsAtDestination.length != 4)) {
							GroupingGameView.acceptEgg(this);
						} else {
							GroupingGameView.declineEgg(this);
						}
					});
					
					GroupingGameView.mainLayer.add(egg);
					

				}
			
			}
		}
	}
}

GroupingGameView.drawTemp = function() {
		/*
      var cir = new Kinetic.Circle({
        x: 250,
		y: 300,
        radius: 130,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4
      });

      // add the shape to the layer
      GroupingGameView.mainLayer.add(cir);
	  */
	  
	   var poly = new Kinetic.Polygon({
        points: [200, 200, 400, 200, 300, 400, 100, 400],
        fill: '#00D2FF',
        stroke: 'black',
        strokeWidth: 5
      });

      // add the shape to the layer
      GroupingGameView.mainLayer.add(poly);
	  
}

GroupingGameView.isNear = function (x1, y1, x2, y2, distance) {
	var dx = Math.abs(x1 - x2);
	var dy = Math.abs(y1 - y2);
	distance -= Math.sqrt( (dx*dx) + (dy*dy) );
	
	if (distance >= 0) return true;
	return false;
}

GroupingGameView.acceptEgg = function(egg) {
	// make the egg not draggable
	egg.setDraggable(false);
	// move it to the right position
	var index = GroupingGameView.eggsAtDestination.length;

	egg.setX(GroupingGameView.eggDestinationLocations[index].x);
	egg.setY(GroupingGameView.eggDestinationLocations[index].y);
	
	
	GroupingGameView.mainLayer.draw();
	// add it to the destination array
	GroupingGameView.eggsAtDestination.push(egg);
	
}
GroupingGameView.declineEgg = function(egg) {
	var tween = new Kinetic.Tween({
		node: egg, 
		duration: 0.4,
		x: GroupingGameView.eggInitialLocations[egg.id].x,
		y: GroupingGameView.eggInitialLocations[egg.id].y,
	});
	tween.play();
}
