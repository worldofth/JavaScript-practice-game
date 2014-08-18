var testgame = testgame || {};

testgame.util = (function(){
	'use strict';
	var Vec2 = function(x,y){
		this.x = x || 0;
		this.y = y || 0;
		this.vx = 0;
		this.vy = 0;
	};

	Vec2.prototype.update = function(){
		this.x += this.vx;
		this.y += this.vy;
	};

	Vec2.prototype.clone = function(){
		return new Vec2(this.x, this.y);
	};

	Vec2.prototype.constructor = Vec2;

	var Rectangle = function(x, y, width, height, colour){
		this.type = "Rectangle";
		this.colour = colour;
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
	};
	Rectangle.prototype.constructor = Rectangle;
	Rectangle.prototype.clone = function(){
		return new Rectangle(this.x, this.y, this.width, this.height, this.colour);
	};

	var Circle = function(x, y, radius, colour){
		this.type = "Circle";
		this.colour = colour;
		this.x = x || 0;
		this.y = y || 0;
		this.radius = radius || 0;
		this.width = this.radius;
		this.height = this.radius;
	};
	Circle.prototype.constructor = Circle;
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
		this.grad = null;
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
