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
testgame.Entity = function(x, y, shapes, speed){
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
	* @property { boolean } - if the object moves
	* @default true
	*/
	this.moves = true;

	/**
	* @property { boolean } - if the renders
	* @default true
	*/
	this.renders = true;

	/**
	* @property { Object } - Render objects
	* @default empty array
	*/
	this.shapes = shapes || [];

	this.bound = null;
};

//constructor
testgame.Entity.prototype.constructor = testgame.Entity;

/**
* adds a shape to the list
*
* @method testgame.Entity#addShape
* @param { object } shape - shape object to be rendered or used for collision
* @chainable
*/
testgame.Entity.prototype.addShape = function(shape){
	'use strict';
	this.shapes.push(shape);
	return this;
};

/**
* adds a shape to the list
*
* @method testgame.Entity#addShape
* @param { object } shape - shape object to be rendered or used for collision
* @chainable
*/
testgame.Entity.prototype.removeShape = function(shape){
	'use strict';
	this.shapes.slice(this.shapes.indexOf(shape), 1);
	return this;
};

/**
* clamps a varible to set bounds

* @method testgame.Entity#clamp
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
	if(this.moves){
		//if at the right most wall, invert x velocity
		if(this.vec2.x >= testgame.settings.width){
			this.vec2.vx = -this.speed;
		}

		//if at the left most wall, invert x velocity
		if(this.vec2.x <= 0){
			this.vec2.vx = this.speed;
		}

		//if at the bottom most wall, invert y velocity
		if(this.vec2.y >= testgame.settings.height){
			this.vec2.vy = -this.speed;
		}

		//if at the top most wall, invert y velocity
		if(this.vec2.y <= 0){
			this.vec2.vy = this.speed;
		}
	}
};

/**
* The update after the main update
*
* @method testgame.Entity#postUpdate
*/
testgame.Entity.prototype.postUpdate = function(){
	'use strict';
	if(this.moves){
		this.vec2.x = this.clamp(this.vec2.x, 0, testgame.settings.width);
		this.vec2.y = this.clamp(this.vec2.y, 0, testgame.settings.height);
	}

};

/**
* The Main update
*
* @method testgame.Entity#update
*/
testgame.Entity.prototype.update = function(){
	'use strict';
	if(this.moves){
		this.vec2.x += this.vec2.vx;
		this.vec2.y += this.vec2.vy;
	}
};
