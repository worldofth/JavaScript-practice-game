var testgame = testgame || {};

testgame.Entity = function(graphicsObject, speed){
	'use strict';
	this.vx = -speed;
	this.vy = speed;
	this.speed = speed;
	this.graphicsObject = graphicsObject;
};

testgame.Entity.prototype.constructor = testgame.Entity;
testgame.Entity.prototype.preUpdate = function(){
	'use strict';
	if(this.graphicsObject.x >= testgame.settings.width - this.graphicsObject.width){
		this.vx = -this.speed;
	}
	if(this.graphicsObject.x <= 0){
		this.vx = this.speed;
	}
	if(this.graphicsObject.y >= testgame.settings.height - this.graphicsObject.height){
		this.vy = -this.speed;
	}
	if(this.graphicsObject.y <= 0){
		this.vy = this.speed;
	}
};
testgame.Entity.prototype.postUpdate = function(){
	'use strict';

};
testgame.Entity.prototype.update = function(){
	'use strict';
	this.graphicsObject.x += this.vx;
	this.graphicsObject.y += this.vy;
};
