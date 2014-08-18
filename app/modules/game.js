/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

/**
* @class testgame.settings
* @classdesc settings hold the intial parameters of the game, starting off with defaults
* @static
*/
testgame.settings = {
	/**
	* @property { string } - DOM ID for the canvas element
	*/
	"canvasID": 'canvas',

	/**
	* @property { number } - initial canvas width
	*/
	"width": 800,

	/**
	* @property { number } - intial canvas height
	*/
	"height": 600,

	/**
	* @property { string } - intial canvas clear colour
	*/
	"clearClr": '#efefef',

	/**
	* @property { number } - intial global max speed
	*/
	"speed": 3
};

/**
* @class testgame.game
* @classdesc The main holder for the game functionality, contains main loop and all game entities
* @static
* @return { Object } - returns the public interface to the game object
*/
testgame.game = (function(){
	'use strict';

	/**
	* @property { Array } - holds all game entities
	*/
	var	entities = [];

	/**
	* @property { number } - pre declared counter for loops, to prevent extra garbage
	*/
	var	i = 0;

	/**
	* @property { boolean } - hold if the window has focus or not
	*/
	var focused = true;

	/**
	* @property { Object } - create and holds the games canvas
	*/
	var canvas = new testgame.Canvas();

	/**
	* The intialize function which sets up the game using the intial settings
	*
	* @method testgame.game#init
	*/
	var	init = function(){
		var grad1 = new testgame.util.Gradient(0,0,50,50,10,10).addColour(0,'#821616').addColour(0.5, '#ffffff').addColour(1,'#821616'),
			grad2 = new testgame.util.Gradient(0,0,50,0).addColour(0,'#821616').addColour(0.5, '#ffffff').addColour(1,'#821616');
		entities.push(new testgame.Entity(25, 550, new testgame.util.Circle(0,10,25,grad1), testgame.settings.speed));
		entities.push(new testgame.Entity(67, 543, new testgame.util.Circle(0,0,25,'#821616'), testgame.settings.speed));
		entities.push(new testgame.Entity(63, 73, new testgame.util.Circle(0,0,25,'#821616'), testgame.settings.speed));
		entities.push(new testgame.Entity(125, 123, new testgame.util.Circle(0,0,25,'#821616'), testgame.settings.speed));

		entities.push(new testgame.Entity(225, 410, new testgame.util.Rectangle(0,25,50,50,grad2), testgame.settings.speed));
		entities.push(new testgame.Entity(350, 345, new testgame.util.Rectangle(0,0,50,50,'#821616'), testgame.settings.speed));

		entities.push(new testgame.Entity(75, 432, new testgame.util.RoundRectangle(0,0,50,50,10,'#821616'), testgame.settings.speed));
		entities.push(new testgame.Entity(140, 200, new testgame.util.RoundRectangle(0,0,50,50,10,'#821616'), testgame.settings.speed));
	};

	/**
	* The update before the main update
	*
	* @method testgame.game#preUpdate
	*/
	var	preUpdate = function(){
		i=0;

		//looping through all entities
		for(; i < entities.length; i++){
			entities[i].preUpdate();
		}
	};

	/**
	* The Main update
	*
	* @method testgame.game#update
	*/
	var update = function(){
		i=0;

		//looping through all entities
		for(; i < entities.length; i++){
			entities[i].update();
		}
	};

	/**
	* The update after the main update
	*
	* @method testgame.game#postUpdate
	*/
	var	postUpdate = function(){
		i=0;

		//looping through all entities
		for(; i < entities.length; i++){
			entities[i].postUpdate();
		}
	};

	/**
	* calls the draw function with all the entities
	*
	* @method testgame.game#draw
	*/
	var draw = function(){
		canvas.render(entities);
	};

	/**
	* The main game loop, running all the updates and draw calls
	*
	* @method testgame.game#run
	*/
	var run = (function(){
		var loops = 0,
			fps = 60,
			skipTicks = (1000 / fps),
			maxFrameSkip = 10,
			nextGameTick = Date.now();

		return function(){
			loops = 0;
			while(Date.now() > nextGameTick && loops < maxFrameSkip){
				if(testgame.game.focused){
					preUpdate();
					update();
					postUpdate();
				}
				nextGameTick += skipTicks;
				loops++;
			}
			draw();
		};
	}());

	/**
	* defines the public interface to the game object, all other methods
	* are private inside the game closure.
	*
	* @return { Object } - public interface for the game object
	*/
	return {
		"run": run,
		"init": init,
		"focused": focused
	};
}());
