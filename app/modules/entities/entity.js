/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

/**
* @class testgame.Entity
* @classdesc the main structure to hold diffrent game entities like the npcs, objects and playable characters
* @constructor
* @param { number } x - starting x position
* @param { number } y - starting y position
* @param { Object } graphicsObject - the rendering object
* @param { number } speed - inital rate of movement
*/
testgame.Entity = function(x, y, graphicsObject, speed){
	'use strict';

	/**
	* @property { Object } - position object which is used to store and update position
	*/
	this.vec2 = new testgame.util.Vec2(x,y);

	/**
	* @property { number } - rate of movement
	* @default 0
	*/
	this.speed = speed || 0;

	//inital x velocity
	this.vec2.vx = -speed;

	//inital y velocity
	this.vec2.vy = speed;

	/**
	* @property { Object } - Render object
	* @default empty object
	*/
	this.graphicsObject = graphicsObject || {};
};

//constructor
testgame.Entity.prototype.constructor = testgame.Entity;

/**
* clamps a varible to set bounds
*
* @param { number } clamp varible - to be clamped
* @param { number } min
* @param { number } max
* @chainable
*/
testgame.Entity.prototype.clamp = function(cv, lb, up){
	'use strict';
	if(cv < lb){
		cv = lb;
	}
	if(cv > up){
		cv = up;
	}
	return cv;
};

/**
* The update before the main update
*
* @method testgame.Entity#preUpdate
*/
testgame.Entity.prototype.preUpdate = function(){
	'use strict';

	//if at the right most wall, invert x velocity
	if(this.vec2.x >= testgame.settings.width - this.graphicsObject.width){
		this.vec2.vx = -this.speed;
	}

	//if at the left most wall, invert x velocity
	if(this.vec2.x <= 0){
		this.vec2.vx = this.speed;
	}

	//if at the bottom most wall, invert y velocity
	if(this.vec2.y >= testgame.settings.height - this.graphicsObject.height){
		this.vec2.vy = -this.speed;
	}

	//if at the top most wall, invert y velocity
	if(this.vec2.y <= 0){
		this.vec2.vy = this.speed;
	}
};

/**
* The update after the main update
*
* @method testgame.Entity#postUpdate
*/
testgame.Entity.prototype.postUpdate = function(){
	'use strict';

};

/**
* The Main update
*
* @method testgame.Entity#update
*/
testgame.Entity.prototype.update = function(){
	'use strict';
	this.vec2.x += this.vec2.vx;
	this.vec2.y += this.vec2.vy;
};
