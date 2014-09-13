/* globals testgame */

/**
* @author Tom Hopkins [https://github.com/worldofth]
* @file game and settings
* @version 1.0.0
*/

/**
* settings for the game
* @module testgame.settings
*/
(function(testgame){
    'use strict';
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
}(testgame));


/**
* main game container
* @module testgame.game
*/
(function(testgame){
	'use strict';
	/**
	* @property { boolean } - hold if the window has focus or not
    * @public
	*/
	var focused = true,

	/**
	* @property { Canvas } - create and holds the games canvas
    * @private
	*/
	canvas = new testgame.Canvas(),

	/**
	* The intialize function which sets up the game using the intial settings
	*
	* @method testgame.game#init
    * @public
	*/
	init = function(){
		testgame.input.addKeyMap(testgame.input.Keyboard.W, "up");
		testgame.input.addKeyMap(testgame.input.Keyboard.UP, "up");

		testgame.input.addKeyMap(testgame.input.Keyboard.S, "down");
		testgame.input.addKeyMap(testgame.input.Keyboard.DOWN, "down");

		testgame.input.addKeyMap(testgame.input.Keyboard.A, "left");
		testgame.input.addKeyMap(testgame.input.Keyboard.LEFT, "left");

		testgame.input.addKeyMap(testgame.input.Keyboard.D, "right");
		testgame.input.addKeyMap(testgame.input.Keyboard.RIGHT, "right");

		testgame.input.addKeyMap(testgame.input.Keyboard.Q, "remove");

		var grad1 = new testgame.util.Gradient(75,75,10,10,75,75).addColour(0,'#086a10').addColour(0.5, '#ffffff').addColour(1,'#086a10'),
			grad2 = new testgame.util.Gradient(0,0,50,0).addColour(0,'#821616').addColour(0.5, '#ffffff').addColour(1,'#821616');

		testgame.entityManager.addSet("player");
		testgame.entityManager.addEntitiy("player", "player1", new testgame.entities.Player(75, 432, 10).addShape(new testgame.shapes.RoundRectangle(0,0,50,50,10,'#086a10')).addShape(new testgame.shapes.Circle(0,25,25,'#086a10')));

		var setname = "objects";
		testgame.entityManager.addSet(setname);
		testgame.entityManager.addEntitiy(setname, "circ1", new testgame.entities.Entity(25, 550, testgame.settings.speed).addShape(new testgame.shapes.Circle(0,10,25,'#821616')));
		testgame.entityManager.addEntitiy(setname, "circ2", new testgame.entities.Entity(67, 543, testgame.settings.speed).addShape(new testgame.shapes.Circle(0,10,25,'#821616')));
		testgame.entityManager.addEntitiy(setname, "circ3", new testgame.entities.Entity(63, 73, testgame.settings.speed).addShape(new testgame.shapes.Circle(0,10,25,'#821616')));
		testgame.entityManager.addEntitiy(setname, "circ4", new testgame.entities.Entity(125, 123, testgame.settings.speed).addShape(new testgame.shapes.Circle(0,10,25,'#821616')));

		testgame.entityManager.addEntitiy(setname, "rec1", new testgame.entities.Entity(225, 410, testgame.settings.speed).addShape(new testgame.shapes.Rectangle(0,25,50,50,grad2)));
		testgame.entityManager.addEntitiy(setname, "rec2", new testgame.entities.Entity(350, 345, testgame.settings.speed).addShape(new testgame.shapes.Rectangle(0,25,50,50,'#821616')));

		testgame.entityManager.addEntitiy(setname, "rrec1", new testgame.entities.Entity(140, 200, testgame.settings.speed).addShape(new testgame.shapes.RoundRectangle(0,0,50,50,10,'#821616')));

		testgame.entityManager.addEntitiy(setname, "text1", new testgame.entities.Entity(0, 0, testgame.settings.speed).addShape(new testgame.shapes.Text(20, 20, "test")));
		testgame.entityManager.entities.objects.text1.moves = false;
	},

	/**
	* The update before the main update
	*
	* @method testgame.game#preUpdate
    * @private
	*/
	preUpdate = function(){
		testgame.input.tickAll();
		testgame.entityManager.preUpdate();
	},

	/**
	* The Main update
	*
	* @method testgame.game#update
    * @private
	*/
	update = function(){
		testgame.entityManager.update();
	},

	/**
	* The update after the main update
	*
	* @method testgame.game#postUpdate
    * @private
	*/
	postUpdate = function(){
		testgame.entityManager.postUpdate();

		if(testgame.input.wasPressed("remove")){
			testgame.entityManager.entities.player.player1.removeShape(1);
		}
	},

	/**
	* calls the draw function with all the entities
	*
	* @method testgame.game#draw
    * @private
	*/
	draw = function(){
		canvas.render(testgame.entityManager.sets, testgame.entityManager.entities);
	},

	/**
	* The main game loop, running all the updates and draw calls
	*
	* @method testgame.game#run
    * @public
	*/
	run = (function(){
		var loops = 0,
			fps = 60,
			skipTicks = (1000 / fps),
			maxFrameSkip = 10,
			nextGameTick = Date.now();

		return function(){
			loops = 0;
			if(testgame.game.focused){
				while(Date.now() > nextGameTick && loops < maxFrameSkip){
					preUpdate();
					update();
					postUpdate();
					nextGameTick += skipTicks;
					loops++;
				}
				draw();
			}else{
				nextGameTick += skipTicks;
				testgame.input.releaseAll();
			}
		};
	}());

	/**
	* defines the public interface to the game object, all other methods
	* are private inside the game closure.
	*
	* @exports public interface for the game object
	*/
	testgame.game = {
		"run": run,
		"init": init,
		"focused": focused
	};
}(testgame));
