/* globals window */

var testgame = testgame || {};

testgame.input = (function(){
	'use strict';

	var Key = function(){
		this.nextState = false;
		this._wasDown = false;
		this._isDown = false;
	};

	Key.prototype.constructor = Key;

	Key.prototype.tick = function(){
		this._wasDown = this._isDown;
		this._isDown = this.nextState;
	};

	Key.prototype.wasPressed = function(){
		return !this._wasDown && this._isDown;
	};

	Key.prototype.wasReleased = function(){
		return this._wasDown && !this._isDown;
	};

	Key.prototype.release = function(){
		this.nextState = false;
	};

	var Keys = {};

	Keys.actionKeys = {};
	Keys.keyMap = {};

	Keys.addAction =function(actionName){
			Keys.actionKeys[actionName]	= new Key();
	};

	Keys.addKeyMap = function(keycode, actionName){
		if(!Keys.actionKeys[actionName]){
			Keys.addAction(actionName);
		}
		Keys.keyMap[keycode] = actionName;
	};

	var tickAll = function(){
		for(var key in Keys.actionKeys){
			Keys.actionKeys[key].tick();
		}
		return this;
	};

	var releaseAll = function(){
		for(var key	in Keys.actionKeys){
			Keys.actionKeys[key].release();
		}
		return this;
	};

	var wasPressed = function(actionName){
		return Keys.actionKeys[actionName].wasPressed();
	};

	var wasReleased = function(actionName){
		return Keys.actionKeys[actionName].wasReleased();
	};

	var _onKeyDown = function(event){
		if(Keys.keyMap[event.keyCode]){
			Keys.actionKeys[Keys.keyMap[event.keyCode]].nextState = true;

		}
	};

	var _onKeyUp = function(event){
		if(Keys.keyMap[event.keyCode]){
			Keys.actionKeys[Keys.keyMap[event.keyCode]].nextState = false;
		}
	};

	window.addEventListener('keydown', _onKeyDown, false);
	window.addEventListener('keyup', _onKeyUp, false);

	return{
		"tickAll": tickAll,
		"releaseAll": releaseAll,
		"wasPressed": wasPressed,
		"wasReleased": wasReleased,
		"addAction": Keys.addAction,
		"addKeyMap": Keys.addKeyMap
	};
}());

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
