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
