/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

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
		* @default 0 - defaults to 0 if nothing is passed
		*/
		this.vx = 0;

		/**
		* @property { number } - sets the intial y velocity
		* @default 0 - defaults to 0 if nothing is passed
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
	* clones a Vec2, turning a new copy of this object
	*
	* @method testgame.util.Vec2#clone
	* @return { Object } - returns a copy of this Vec2
	*/
	Vec2.prototype.clone = function(){
		return new Vec2(this.x, this.y);
	};


	/**
	* @class testgame.util.Rectangle
	* @classdesc a graphics object holding used for rendering
	* @constructor
	* @param { number } x - starting x position
	* @param { number } y - starting y position
	* @param { number } width - starting width
	* @param { number } height - starting height
	* @param { string/Object } colour - starting colour as a string or a grad object
	*/
	var Rectangle = function(x, y, width, height, colour){
		/**
		* @property { string } - sets the object type used for rendering in the canvas
		* using a util constant
		*/
		this.type = testgame.util.TYPE_REC;

		/**
		* @property { string/Object } - sets the colour, either a colour string or a grad object
		*/
		this.colour = colour;

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
	Rectangle.prototype.constructor = Rectangle;

	/**
	* clones a Rectangle, turning a new copy of this object
	*
	* @method testgame.util.Rectangle#clone
	* @return { Object } - returns a copy of this Rectangle
	*/
	Rectangle.prototype.clone = function(){
		return new Rectangle(this.x, this.y, this.width, this.height, this.colour);
	};

	/**
	* @class testgame.util.Circle
	* @classdesc a graphics object holding used for rendering
	* @constructor
	* @param { number } x - starting x position
	* @param { number } y - starting y position
	* @param { number } radius - starting radius
	* @param { string/Object } colour - starting colour as a string or a grad object
	*/
	var Circle = function(x, y, radius, colour){
		/**
		* @property { string } - sets the object type used for rendering in the canvas
		* using a util constant
		*/
		this.type = testgame.util.TYPE_CIR;

		/**
		* @property { string/Object } - sets the colour, either a colour string or a grad object
		*/
		this.colour = colour;

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
	};

	//constructor
	Circle.prototype.constructor = Circle;

	/**
	* clones a Rectangle, turning a new copy of this object
	*
	* @method testgame.util.Rectangle#clone
	* @return { Object } - returns a copy of this Rectangle
	*/
	Circle.prototype.clone = function(){
		return new Circle(this.x, this.y, this.radius, this.colour);
	};

	var RoundRectangle = function(x, y, width, height, radius, colour){
		this.type = "RoundRectangle";
		this.colour = colour;
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
		this.radius = radius || 0;
	};
	RoundRectangle.prototype.constructor = RoundRectangle;
	RoundRectangle.prototype.clone = function(){
		return new RoundRectangle(this.x, this.y, this.width, this.height, this.radius, this.colour);
	};

	var Text = function(x, y, textStr, font, colour){
		this.x = x || 0;
		this.y = x || 0;
		this.textStr = textStr || '';
		this.font = font || "10px Arial";
		this.colour = colour || '#000000';
	};
	Text.prototype.constructor = Text;
	Text.prototype.clone = function(){
		return new Text(this.x, this.y, this.textStr, this.font, this.colour);
	};
	Text.prototype.measureText = function(context){
		context.font=this.font;
		return context.measureText(this.textStr);
	};

	var Gradient = function(x,y,x1,y1,r,r1,colours){
		this.isRadial = !!r || r>0;
		this.r = r || 0;
		this.r1 = r1 || 0;
		this.x = x || 0;
		this.y = y || 0;
		this.x1 = x1 || 0;
		this.y1 = y1 || 0;
		this.colours = colours || [];
		this.colLength = 0;
	};
	Gradient.prototype.constructor = Gradient;
	Gradient.prototype.clone = function(){
		return new Gradient(this.x, this.y, this.x1, this.y1, this.r, this.r1, this.colours);
	};
	Gradient.prototype.addColour = function(pos, colour){
		pos = pos > 1 ? 1 : pos;
		this.colours.push({ "pos": pos, "colour" : colour });
		return this;
	};


	return {
		//graphic object types
		"TYPE_REC" 	: "Rectangle",
		"TYPE_CIR" 	: "Circle",
		"TYPE_RREC" : "RoundRectangle",
		"TYPE_TEXT" : "Text",

		//objects
		"Vec2" 		: Vec2,
		"Rectangle"	: Rectangle,
		"Circle"	: Circle,
		"RoundRectangle": RoundRectangle,
		"Gradient" : Gradient
	};
}());
