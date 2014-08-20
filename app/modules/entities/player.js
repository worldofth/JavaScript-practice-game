/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

/**
* @class testgame.Player
* @classdesc The main player Entity
* @extends testgame.Entity
* @constructor
* @param { number } x - starting x position
* @param { number } y - starting y position
* @param { Object } graphicsObject - the rendering object
* @param { number } speed - inital rate of movement
*/
testgame.Player = function(x, y, graphicsObject, speed){
	'use strict';

	//calls Entity constructor
	testgame.Entity.call(this, x, y, graphicsObject, speed);
	this.vec2.vx = 0;
	this.vec2.vy = 0;
};

//constructor
testgame.Player.prototype = Object.create(testgame.Entity.prototype);
testgame.Player.prototype.constructor = testgame.Player;

/**
* The update before the main update
*
* @method testgame.Player#preUpdate
*/
testgame.Player.prototype.preUpdate = function(){
	'use strict';
	if(testgame.input.wasPressed("up")){
		this.vec2.vy = -1;
	}
	if(testgame.input.wasReleased("up")){
		if(this.vec2.vy < 0){
			this.vec2.vy = 0;
		}
	}
	if(testgame.input.wasPressed("down")){
		this.vec2.vy = 1;
	}
	if(testgame.input.wasReleased("down")){
		if(this.vec2.vy > 0){
			this.vec2.vy = 0;
		}
	}
	if(testgame.input.wasPressed("left")){
		this.vec2.vx = -1;
	}
	if(testgame.input.wasReleased("left")){
		if(this.vec2.vx < 0){
			this.vec2.vx = 0;
		}
	}
	if(testgame.input.wasPressed("right")){
		this.vec2.vx = 1;
	}
	if(testgame.input.wasReleased("right")){
		if(this.vec2.vx > 0){
			this.vec2.vx = 0;
		}
	}

	if(this.vec2.vx < this.speed && this.vec2.vx > 0){
		this.vec2.vx++;
	}
	if(this.vec2.vx > -this.speed && this.vec2.vx < 0){
		this.vec2.vx--;
	}
	if(this.vec2.vy < this.speed && this.vec2.vy > 0){
		this.vec2.vy++;
	}
	if(this.vec2.vy > -this.speed && this.vec2.vy < 0){
		this.vec2.vy--;
	}

};

/**
* The update after the main update
*
* @method testgame.Player#postUpdate
*/
testgame.Player.prototype.postUpdate = function(){
	'use strict';

	this.vec2.x = this.clamp(this.vec2.x, 0, testgame.settings.width-this.graphicsObject.width);
	this.vec2.y = this.clamp(this.vec2.y, 0, testgame.settings.height-this.graphicsObject.height);
};
