var testgame = testgame || {};

testgame.util = (function(){
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


	return {
		//graphic object types
		"type_rec" 	: "Rectangle",
		"type_cir" 	: "Circle",
		"type_rrec" : "RoundRectangle",

		//objects
		"Vec2" 		: Vec2,
		"Rectangle"	: Rectangle,
		"Circle"	: Circle,
		"RoundRectangle": RoundRectangle
	};
}());
