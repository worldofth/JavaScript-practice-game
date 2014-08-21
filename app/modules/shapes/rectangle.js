/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};


/**
* @class testgame.Rectangle
* @classdesc a graphics object holding used for rendering
* @constructor
* @param { number } x - starting x position
* @param { number } y - starting y position
* @param { number } width - starting width
* @param { number } height - starting height
* @param { string/Object } colour - starting colour as a string or a grad object
*/
testgame.Rectangle = function(x, y, width, height, colour, relpos){
	'use strict';
	//calls Shape constructor
	testgame.Shape.call(this, x, y, colour, relpos);

	/**
	* @property { string } - sets the object type used for rendering in the canvas
	* using a util constant
	*/
	this.type = testgame.util.TYPE_REC;

	/**
	* @property { number } - sets the intial width
	* @default 0 - defaults to 0 if nothing is passed
	*/
	this.width = width || 0;

	/**
	* @property { number } - sets the intial height
	* @default 0 - defaults to 0 if nothing is passed
	*/
	this.height = height || 0;
};

//constructor
testgame.Rectangle.prototype = Object.create(testgame.Shape.prototype);
testgame.Rectangle.prototype.constructor = testgame.Rectangle;

/**
* clones a Rectangle, returning a new copy of this object
*
* @method testgame.Rectangle#clone
* @return { Object } - returns a copy of this Rectangle
*/
testgame.Rectangle.prototype.clone = function(){
	'use strict';
	return new testgame.Rectangle(this.x, this.y, this.width, this.height, this.colour);
};
