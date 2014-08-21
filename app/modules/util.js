/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

/* globals window */

/**
* @class Anon
* @classdesc sets up the request animation method if the browser has it
* if not it falls back to set interval
*/
(function(){
	'use strict';
	var onEachFrame;
	if(window.requestAnimationFrame){
		onEachFrame = function(cb){
			var _cb = function(){ cb(); window.requestAnimationFrame(_cb); };
			_cb();
		};
	}else if(window.webkitRequestAnimationFrame){
		onEachFrame = function(cb){
			var _cb = function(){ cb(); window.webkitRequestAnimationFrame(_cb); };
			_cb();
		};
	}else if(window.mozRequestAnimationFrame){
		onEachFrame = function(cb){
			var _cb = function(){ cb(); window.mozRequestAnimationFrame(_cb); };
			_cb();
		};
	}else{
		onEachFrame = function(cb){
			window.setInterval(cb, 0);
		};
	}

	window.onEachFrame = onEachFrame;
}());

/**
* @class testgame.util
* @classdesc a closure namespace for util objects
* @static
*/
testgame.util = (function(){
	'use strict';

	/**
	* @class testgame.util.Vec2
	* @classdesc holds the position and velocity of an object
	* @constructor
	* @param { number } x - starting x position
	* @param { number } y - starting y position
	*/
	var Vec2 = function(x,y){
		/**
		* @property { number } - sets the intial x position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.x = x || 0;

		/**
		* @property { number } - sets the intial y position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.y = y || 0;

		/**
		* @property { number } - sets the intial x velocity
		*/
		this.vx = 0;

		/**
		* @property { number } - sets the intial y velocity
		*/
		this.vy = 0;
	};

	//constructor
	Vec2.prototype.constructor = Vec2;

	/**
	* updates the x and y position based on the velocities
	*
	* @method testgame.util.Vec2#update
	*/
	Vec2.prototype.update = function(){
		this.x += this.vx;
		this.y += this.vy;
	};

	/**
	* clones a Vec2, returning a new copy of this object
	*
	* @method testgame.util.Vec2#clone
	* @return { Object } - returns a copy of this Vec2
	*/
	Vec2.prototype.clone = function(){
		return new Vec2(this.x, this.y);
	};

	/**
	* @class testgame.util.Point
	* @classdesc holds an x,y point
	* @constructor
	* @param { number } x - starting x position
	* @param { number } y - starting y position
	*/
	var Point = function(x,y){

		/**
		* @property { number } - sets the intial x position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.x = x || 0;

		/**
		* @property { number } - sets the intial y position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.y = y || 0;
	};

	/**
	* @class testgame.util.Gradient
	* @classdesc a Gradient object to hold a colour Gradient
	* @constructor
	* @param { number } x - starting x position
	* @param { number } y - starting y position
	* @param { number } x1 - starting x1 position
	* @param { number } y1 - starting y1 position
	* @param { number } r - starting radius position
	* @param { number } r1 - starting radius1 position
	* @param { string/Object } colour - starting colour as a string or a grad object
	*/
	var Gradient = function(x,y,x1,y1,r,r1,colours){
		/**
		* if the radius is truthy or greater than 0 then this is a radial gradient
		*
		* @property { string } - sets if the gradient is radial or not
		*/
		this.isRadial = !!r || r>0;

		/**
		* @property { number } - sets the intial radius
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.r = r || 0;

		/**
		* @property { number } - sets the intial radius1
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.r1 = r1 || 0;

		/**
		* @property { number } - sets the intial x position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.x = x || 0;

		/**
		* @property { number } - sets the intial y position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.y = y || 0;

		/**
		* @property { number } - sets the intial x1 position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.x1 = x1 || 0;

		/**
		* @property { number } - sets the intial x2 position
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.y1 = y1 || 0;

		/**
		* @property { Array } - sets the colours, which is an array of position (0-1) and colour strings
		* @default [] - if empty defaults to an array
		*/
		this.colours = colours || [];
	};

	//constructor
	Gradient.prototype.constructor = Gradient;

	/**
	* clones a Gradient object, returning a new copy of this object
	*
	* @method testgame.util.Gradient#clone
	* @return { Object } - returns a copy of this Gradient
	*/
	Gradient.prototype.clone = function(){
		return new Gradient(this.x, this.y, this.x1, this.y1, this.r, this.r1, this.colours);
	};

	/**
	* adds a colour to the colour lists, each element holds a position (0-1) and a
	* string colour, hex or rgb
	*
	* @method testgame.util.Gradient#addColour
	* @param { number } pos - a number between 0 - 1 pertaining to the colour's position in the gradient
	* @param { string } colour - either a hex string to a rgb
	* @chainable
	* @return { Object } - returns this for chain calls
	*/
	Gradient.prototype.addColour = function(pos, colour){
		pos = pos > 1 ? 1 : pos;
		this.colours.push({ "pos": pos, "colour" : colour });
		return this;
	};

	/**
	* defines the public interface to the util object, all other methods
	* are private inside the util closure.
	*
	* @return { Object } - public interface for the util object
	*/
	return {
		//graphic object types
		"TYPE_REC" 	: "Rectangle",
		"TYPE_CIR" 	: "Circle",
		"TYPE_RREC" : "RoundRectangle",
		"TYPE_TEXT" : "Text",

		//objects
		"Vec2" 		: Vec2,
		"Point"		: Point,
		"Gradient" 	: Gradient
	};
}());
