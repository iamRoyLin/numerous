// This is the view logic of objective one, where the child user learns place value
var GroupingGameView = {};

// The stage to be instantiated in constructor
GroupingGameView.stage;
// The main layer (might be the only layer we need)
GroupingGameView.mainLayer;

// Number of eggs at the origin at the beginning
GroupingGameView.INITIAL_EGG_COUNT = 5;
// size of the eggs
GroupingGameView.INITIAL_EGG_DIMENSIONS = {width:120, height: 150};
// destination area of the eggs

			
GroupingGameView.INITIAL_EGG_RECTANGLE = {x:DimensionUtil.width() - 350, y:415, width: 150, height: 50};

// As eggs reach the destination, it will be added here
GroupingGameView.eggsAtDestination = [];
// As eggs gets created, it will be added here
GroupingGameView.eggInitialLocations = [];

// The destination locations where eggs will be locked in to
GroupingGameView.eggDestinationLocations = [
	{x:150, y: 140},
	{x:250, y: 140},
	{x:120, y: 250},
	{x:220, y: 250}
];

// location of egg images in the file system
GroupingGameView.eggImageSources = [
	"images/grouping_game/eggs/egg1.png",
	"images/grouping_game/eggs/egg2.png",
	"images/grouping_game/eggs/egg3.png",
	"images/grouping_game/eggs/egg4.png",
	"images/grouping_game/eggs/egg5.png",
	"images/grouping_game/eggs/egg6.png",
	"images/grouping_game/eggs/egg7.png",
	"images/grouping_game/eggs/egg8.png",
	"images/grouping_game/eggs/egg9.png"
];
// As the images are loaded into memory, they will be accessible from this array
GroupingGameView.eggImageObjects = [];



GroupingGameView.initialize = function (employee) {

	// clear variables
	GroupingGameView.eggsAtDestination = [];
	GroupingGameView.eggInitialLocations = [];
	GroupingGameView.eggImageObjects = [];
	
	// render the html view
	View.render("GroupingGameView");
	
	// setup view routing
	Controller.routeAnchor(".grouping_back", "LoginView", App.store);
	
	// Setup the stage
	GroupingGameView.stage = new Kinetic.Stage({
		container: "container",
		width: window.innerWidth,
		height: window.innerHeight
	});
	
	// Create the main layer and stage
	GroupingGameView.mainLayer = new Kinetic.Layer();
	GroupingGameView.stage.add(GroupingGameView.mainLayer);	
	
	// Initialise graphics components
	GroupingGameView.drawBackground();
	GroupingGameView.drawRabbit();
	GroupingGameView.drawEggs();
	GroupingGameView.drawTemp();
}

// Draws the background
GroupingGameView.drawBackground = function() {
	
}

// Draws the rabbit
GroupingGameView.drawRabbit = function() {
	var rabbitImage = new Image();
	rabbitImage.src = "images/grouping_game/rabbit_bak.png";
	rabbitImage.onload = function() {
		var rabbit = new Kinetic.Image({
			x: DimensionUtil.width() - rabbitImage.width/2.3 - 50,
			y: 30,
			image: rabbitImage,
			width: rabbitImage.width/2.3,
			height: rabbitImage.height/2.3
		});
		
		GroupingGameView.mainLayer.add(rabbit);
	}
	
}

// Draws eggs in a specified area
GroupingGameView.drawEggs = function() {
	// number of eggs loaded into memory
	var loadedImages = 0;
	
	// loops through all the egg images
	for (var imageNumber=0; imageNumber<GroupingGameView.eggImageSources.length; imageNumber++) {
		GroupingGameView.eggImageObjects[imageNumber] = new Image();
		GroupingGameView.eggImageObjects[imageNumber].src = GroupingGameView.eggImageSources[imageNumber];
		GroupingGameView.eggImageObjects[imageNumber].onload = function() {
			if (++loadedImages == GroupingGameView.eggImageSources.length) {
				// All images loaded into memory. Now draw the required amount of eggs.
				for (var i=0; i<GroupingGameView.INITIAL_EGG_COUNT; i++) {
					
					// Create 1 egg
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
					egg.createImageHitRegion(function() {GroupingGameView.mainLayer.draw()});
					
					// add cursor styling
					egg.on('mouseover', function() {document.body.style.cursor = 'pointer'});
					egg.on('mouseout', function() {document.body.style.cursor = 'default'});					
					
					egg.on('dragend', function() {
						// accepts the egg at the destination if dropped close enough and not full or else return the egg to its starting position
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

// draws any temporary shapes
GroupingGameView.drawTemp = function() {
	// draws the temporary destination shape
	var poly = new Kinetic.Polygon({
		points: [200, 200, 400, 200, 300, 400, 100, 400],
		fill: '#00D2FF',
		stroke: 'black',
		strokeWidth: 5
	});

	// add the shape to the layer
	GroupingGameView.mainLayer.add(poly);
}

// utility funtion to see if two points are close enough given a radius
// @returns boolean
GroupingGameView.isNear = function (x1, y1, x2, y2, distance) {
	var dx = Math.abs(x1 - x2);
	var dy = Math.abs(y1 - y2);
	distance -= Math.sqrt( (dx*dx) + (dy*dy) );
	
	if (distance >= 0) return true;
	return false;
}

// accepts the egg and add it to the accepted array
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

// declines the egg and animates it back to its starting position
GroupingGameView.declineEgg = function(egg) {
	var tween = new Kinetic.Tween({
		node: egg, 
		duration: 0.4,
		x: GroupingGameView.eggInitialLocations[egg.id].x,
		y: GroupingGameView.eggInitialLocations[egg.id].y,
	});
	tween.play();
}

