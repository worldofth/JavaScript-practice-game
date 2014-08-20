/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};
/* globals window */

/**
* @class testgame.input
* @classdesc input manager for the game, holding all the logic for handling keys presses
* @static
*/
testgame.input = (function(){
	'use strict';

	/**
	* @class testgame.input.Key
	* @classdesc object which holds a key's current status
	* @constructor
	*/
	var Key = function(){
		/**
		* @property { boolean } - changed by key events to be pushed to
		* the other properties during an update call
		*/
		this.nextState = false;

		/**
		* @property { boolean } - sets when keys used to be down, so has
		* recently been released
		*/
		this._wasDown = false;

		/**
		* @property { boolean } - when the key is currently down
		*/
		this._isDown = false;
	};

	//constructor
	Key.prototype.constructor = Key;

	/**
	* an update tick, updating the keys status
	*
	* @method testgame.input.Key#tick
	*/
	Key.prototype.tick = function(){
		this._wasDown = this._isDown;
		this._isDown = this.nextState;
	};

	/**
	* returns true is the key has been pressed
	*
	* @method testgame.input.Key#wasPressed
	* @return { boolean }
	*/
	Key.prototype.wasPressed = function(){
		return !this._wasDown && this._isDown;
	};

	/**
	* returns true is the key has been released
	*
	* @method testgame.input.Key#wasReleased
	* @return { boolean }
	*/
	Key.prototype.wasReleased = function(){
		return this._wasDown && !this._isDown;
	};

	/**
	* sets the key to be released, this is used for when the game is paused
	*
	* @method testgame.input.Key#release
	*/
	Key.prototype.release = function(){
		this.nextState = false;
	};

	/**
	* @class testgame.input.Keys
	* @classdesc holds all the key objects and mappings
	* @static
	* @constructor
	*/
	var Keys = {};

	/**
	* @property { Object } - an array like mapping of action names to key object
	*/
	Keys.actionKeys = {};

	/**
	* @property { Object } - an array like mapping of keycodes to action names
	*/
	Keys.keyMap = {};

	/**
	* adds an action name to the action keys, and creates a new key object
	*
	* @method testgame.input.Keys#addAction
	*/
	Keys.addAction =function(actionName){
			Keys.actionKeys[actionName]	= new Key();
	};

	/**
	* adds an keycode map, if the action name doesn't exist it called addAction
	*
	* @method testgame.input.Keys#addKeyMap
	*/
	Keys.addKeyMap = function(keycode, actionName){
		if(!Keys.actionKeys[actionName]){
			Keys.addAction(actionName);
		}
		Keys.keyMap[keycode] = actionName;
	};

	/**
	* ticks all the keys to update thier status during an update call
	*
	* @method testgame.input#tickAll
	*/
	var tickAll = function(){
		for(var key in Keys.actionKeys){
			Keys.actionKeys[key].tick();
		}
		return this;
	};

	/**
	* releases all the keys
	*
	* @method testgame.input#releaseAll
	*/
	var releaseAll = function(){
		for(var key	in Keys.actionKeys){
			Keys.actionKeys[key].release();
		}
		return this;
	};

	/**
	* returns if an action key has been pressed
	*
	* @method testgame.input#wasPressed
	* @return { boolean }
	*/
	var wasPressed = function(actionName){
		return Keys.actionKeys[actionName].wasPressed();
	};

	/**
	* returns if an action key has been released
	*
	* @method testgame.input#wasReleased
	* @return { boolean }
	*/
	var wasReleased = function(actionName){
		return Keys.actionKeys[actionName].wasReleased();
	};

	/**
	* on key down callback method, setting the next state of a
	* key based on the keycode that was pressed
	*
	* @method testgame.input#_onKeyDown
	* @private
	*/
	var _onKeyDown = function(event){
		if(Keys.keyMap[event.keyCode]){
			Keys.actionKeys[Keys.keyMap[event.keyCode]].nextState = true;

		}
	};

	/**
	* on key up callback method, setting the next state of a
	* key based on the keycode that was released
	*
	* @method testgame.input#_onKeyUp
	* @private
	*/
	var _onKeyUp = function(event){
		if(Keys.keyMap[event.keyCode]){
			Keys.actionKeys[Keys.keyMap[event.keyCode]].nextState = false;
		}
	};

	//key event listeners
	window.addEventListener('keydown', _onKeyDown, false);
	window.addEventListener('keyup', _onKeyUp, false);

	//sets the public interface for testgame.input
	return{
		"tickAll": tickAll,
		"releaseAll": releaseAll,
		"wasPressed": wasPressed,
		"wasReleased": wasReleased,
		"addAction": Keys.addAction,
		"addKeyMap": Keys.addKeyMap
	};
}());

//lists most keycodes for adding key code maps
testgame.input.Keyboard = {};
testgame.input.Keyboard.A = "A".charCodeAt(0);
testgame.input.Keyboard.B = "B".charCodeAt(0);
testgame.input.Keyboard.C = "C".charCodeAt(0);
testgame.input.Keyboard.D = "D".charCodeAt(0);
testgame.input.Keyboard.E = "E".charCodeAt(0);
testgame.input.Keyboard.F = "F".charCodeAt(0);
testgame.input.Keyboard.G = "G".charCodeAt(0);
testgame.input.Keyboard.H = "H".charCodeAt(0);
testgame.input.Keyboard.I = "I".charCodeAt(0);
testgame.input.Keyboard.J = "J".charCodeAt(0);
testgame.input.Keyboard.K = "K".charCodeAt(0);
testgame.input.Keyboard.L = "L".charCodeAt(0);
testgame.input.Keyboard.M = "M".charCodeAt(0);
testgame.input.Keyboard.N = "N".charCodeAt(0);
testgame.input.Keyboard.O = "O".charCodeAt(0);
testgame.input.Keyboard.P = "P".charCodeAt(0);
testgame.input.Keyboard.Q = "Q".charCodeAt(0);
testgame.input.Keyboard.R = "R".charCodeAt(0);
testgame.input.Keyboard.S = "S".charCodeAt(0);
testgame.input.Keyboard.T = "T".charCodeAt(0);
testgame.input.Keyboard.U = "U".charCodeAt(0);
testgame.input.Keyboard.V = "V".charCodeAt(0);
testgame.input.Keyboard.W = "W".charCodeAt(0);
testgame.input.Keyboard.X = "X".charCodeAt(0);
testgame.input.Keyboard.Y = "Y".charCodeAt(0);
testgame.input.Keyboard.Z = "Z".charCodeAt(0);
testgame.input.Keyboard.ZERO = "0".charCodeAt(0);
testgame.input.Keyboard.ONE = "1".charCodeAt(0);
testgame.input.Keyboard.TWO = "2".charCodeAt(0);
testgame.input.Keyboard.THREE = "3".charCodeAt(0);
testgame.input.Keyboard.FOUR = "4".charCodeAt(0);
testgame.input.Keyboard.FIVE = "5".charCodeAt(0);
testgame.input.Keyboard.SIX = "6".charCodeAt(0);
testgame.input.Keyboard.SEVEN = "7".charCodeAt(0);
testgame.input.Keyboard.EIGHT = "8".charCodeAt(0);
testgame.input.Keyboard.NINE = "9".charCodeAt(0);
testgame.input.Keyboard.ENTER = 13;
testgame.input.Keyboard.SHIFT = 16;
testgame.input.Keyboard.CONTROL = 17;
testgame.input.Keyboard.ALT = 18;
testgame.input.Keyboard.ESC = 27;
testgame.input.Keyboard.SPACEBAR = 32;
testgame.input.Keyboard.LEFT = 37;
testgame.input.Keyboard.UP = 38;
testgame.input.Keyboard.RIGHT = 39;
testgame.input.Keyboard.DOWN = 40;
