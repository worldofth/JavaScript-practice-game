var testgame = testgame || {};

testgame.Entity = function(x, y, graphicsObject, speed){
	'use strict';
	this.vec2 = new testgame.util.Vec2(x,y);
	this.speed = speed;
	this.vec2.vx = -speed;
	this.vec2.vy = speed;
	this.graphicsObject = graphicsObject;
};

testgame.Entity.prototype.constructor = testgame.Entity;
testgame.Entity.prototype.preUpdate = function(){
	'use strict';
	if(this.vec2.x >= testgame.settings.width - this.graphicsObject.width){
		this.vec2.vx = -this.speed;
	}
	if(this.vec2.x <= 0){
		this.vec2.vx = this.speed;
	}
	if(this.vec2.y >= testgame.settings.height - this.graphicsObject.height){
		this.vec2.vy = -this.speed;
	}
	if(this.vec2.y <= 0){
		this.vec2.vy = this.speed;
	}
};
testgame.Entity.prototype.postUpdate = function(){
	'use strict';

};
testgame.Entity.prototype.update = function(){
	'use strict';
	this.vec2.x += this.vec2.vx;
	this.vec2.y += this.vec2.vy;
};
