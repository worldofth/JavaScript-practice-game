/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

testgame.Shape = function(x, y, colour){
	'use strict';
	this.point = new testgame.util.Point(x,y);
	this.colour = colour || '#000';
};

testgame.Shape.prototype.constructor = testgame.Shape;
testgame.Shape.prototype.clone = function(){
	'use strict';
	return new testgame.Shape(this.x, this.y, this.colour);
};

testgame.BoundRectangle = function(x, y, width, height){
	'use strict';
	this.point = new testgame.util.Point(x,y);
	this.width = width || 0;
	this.height = height || 0;
};
