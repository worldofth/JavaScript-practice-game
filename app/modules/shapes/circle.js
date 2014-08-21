/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

/**
* @class testgame.Circle
* @classdesc a graphics object holding used for rendering
* @constructor
* @param { number } x - starting x position
* @param { number } y - starting y position
* @param { number } radius - starting radius
* @param { string/Object } colour - starting colour as a string or a grad object
*/
testgame.Circle = function(x, y, radius, colour){
	'use strict';
	//calls Shape constructor
	testgame.Shape.call(this, x, y, colour);

	/**
	* @property { string } - sets the object type used for rendering in the canvas
	* using a util constant
	*/
	this.type = testgame.util.TYPE_CIR;

	/**
	* @property { number } - sets the intial radius
	* @default 0 - defaults to 0 if nothing is passed
	*/
	this.radius = radius || 0;

	/**
	* @property { number } - sets the width to the radius
	* @bug currently not correct
	*/
	this.width = this.radius;

	/**
	* @property { number } - sets the height to the radius
	* @bug currently not correct
	*/
	this.height = this.radius;

	/**
	* @property { number } - sets the intial bound rectangle
	* @bug currently not correct
	*/
	this.bounds = this.getBounds();
};

//constructor
testgame.Circle.prototype = Object.create(testgame.Shape.prototype);
testgame.Circle.prototype.constructor = testgame.Circle;

/**
* clones a Circle, returning a new copy of this object
*
* @method testgame.Circle#clone
* @return { Object } - returns a copy of this Circle
*/
testgame.Circle.prototype.clone = function(){
	'use strict';
	return new testgame.Circle(this.x, this.y, this.radius, this.colour);
};

/**
* Returns a rectanlge thats fits around the circle
*
* @method testgame.Circle#getBounds
* @return { Object }
*/
testgame.Circle.prototype.getBounds = function(){
	'use strict';
    return new testgame.BoundRectangle(this.point.x - this.radius, this.point.y - this.radius, this.width, this.height);
};
