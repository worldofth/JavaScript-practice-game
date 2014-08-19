var testgame = testgame || {};

testgame.Player = function(x, y, graphicsObject, speed){
	'use strict';
	testgame.Entity.call(this, x, y, graphicsObject, speed);
};

testgame.Player.prototype = Object.create(testgame.Entity.prototype);
testgame.Player.prototype.constructor = testgame.Player;

testgame.Player.prototype.preUpdate = function(){
	'use strict';
	if(testgame.input.wasPressed("up")){
		this.vec2.vy = -testgame.settings.speed;
	}
	if(testgame.input.wasPressed("down")){
		this.vec2.vy = testgame.settings.speed;
	}
	if(testgame.input.wasPressed("left")){
		this.vec2.vx = -testgame.settings.speed;
	}
	if(testgame.input.wasPressed("right")){
		this.vec2.vx = testgame.settings.speed;
	}
};
