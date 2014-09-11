/**
* @author Tom Hopkins https://github.com/worldofth
*/

/* globals window, testgame */

/**
* @class testgame.input
* @classdesc input manager for the game, holding all the logic for handling keys presses
* @static
*/
(function(testgame){
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


	Key.prototype = (function(){
        /**
        * an update tick, updating the keys status
        *
        * @method testgame.input.Key#tick
        */
        var tick = function(){
            this._wasDown = this._isDown;
            this._isDown = this.nextState;
        },

        /**
        * returns true is the key has been pressed
        *
        * @method testgame.input.Key#wasPressed
        * @return { boolean }
        */
        wasPressed = function(){
            return !this._wasDown && this._isDown;
        },

        /**
        * returns true is the key has been released
        *
        * @method testgame.input.Key#wasReleased
        * @return { boolean }
        */
        wasReleased = function(){
            return this._wasDown && !this._isDown;
        },

        /**
        * sets the key to be released, this is used for when the game is paused
        *
        * @method testgame.input.Key#release
        */
        release = function(){
            this.nextState = false;
        };

        return{
            tick: tick,
            wasPressed: wasPressed,
            wasReleased: wasReleased,
            release: release
        };

    }());

	/**
	* @class testgame.input.Keys
	* @classdesc holds all the key objects and mappings
	* @static
	* @constructor
	*/
	var Keys = (function(Key){

        /**
        * @property { Object } - an array like mapping of action names to key object
        */
        var actionKeys = {},

        /**
        * @property { Object } - an array like mapping of keycodes to action names
        */
        keyMap = {},

        /**
        * adds an action name to the action keys, and creates a new key object
        *
        * @method testgame.input.Keys#addAction
        */
        addAction =function(actionName){
                Keys.actionKeys[actionName]	= new Key();
        },

        /**
        * adds an keycode map, if the action name doesn't exist it called addAction
        *
        * @method testgame.input.Keys#addKeyMap
        */
        addKeyMap = function(keycode, actionName){
            if(!Keys.actionKeys[actionName]){
                Keys.addAction(actionName);
            }
            Keys.keyMap[keycode] = actionName;
        },

        /**
        * ticks all the keys to update thier status during an update call
        *
        * @method testgame.input#tickAll
        */
        tickAll = function(){
            for(var key in Keys.actionKeys){
                Keys.actionKeys[key].tick();
            }
            return this;
        },

        /**
        * releases all the keys
        *
        * @method testgame.input#releaseAll
        */
        releaseAll = function(){
            for(var key	in Keys.actionKeys){
                Keys.actionKeys[key].release();
            }
            return this;
        },

        /**
        * returns if an action key has been pressed
        *
        * @method testgame.input#wasPressed
        * @return { boolean }
        */
        wasPressed = function(actionName){
            return Keys.actionKeys[actionName].wasPressed();
        },

        /**
        * returns if an action key has been released
        *
        * @method testgame.input#wasReleased
        * @return { boolean }
        */
        wasReleased = function(actionName){
            return Keys.actionKeys[actionName].wasReleased();
        },

        /**
        * on key down callback method, setting the next state of a
        * key based on the keycode that was pressed
        *
        * @method testgame.input#_onKeyDown
        * @private
        */
        onKeyDown = function(event){
            if(Keys.keyMap[event.keyCode]){
                Keys.actionKeys[Keys.keyMap[event.keyCode]].nextState = true;

            }
        },

        /**
        * on key up callback method, setting the next state of a
        * key based on the keycode that was released
        *
        * @method testgame.input#_onKeyUp
        * @private
        */
        onKeyUp = function(event){
            if(Keys.keyMap[event.keyCode]){
                Keys.actionKeys[Keys.keyMap[event.keyCode]].nextState = false;
            }
        };

        //key event listeners
        window.addEventListener('keydown', onKeyDown, false);
        window.addEventListener('keyup', onKeyUp, false);

        return{
            actionKeys: actionKeys,
            keyMap: keyMap,
            addAction: addAction,
            addKeyMap: addKeyMap,
            tickAll: tickAll,
            releaseAll: releaseAll,
            wasPressed: wasPressed,
            wasReleased: wasReleased
        };
    }(Key));

	//sets the public interface for testgame.input
	testgame.input = {
		"tickAll": Keys.tickAll,
		"releaseAll": Keys.releaseAll,
		"wasPressed": Keys.wasPressed,
		"wasReleased": Keys.wasReleased,
		"addAction": Keys.addAction,
		"addKeyMap": Keys.addKeyMap
	};

    //lists most keycodes for adding key code maps
    testgame.input.Keyboard = {
        A       : "A".charCodeAt(0),
        B       : "B".charCodeAt(0),
        C       : "C".charCodeAt(0),
        D       : "D".charCodeAt(0),
        E       : "E".charCodeAt(0),
        F       : "F".charCodeAt(0),
        G       : "G".charCodeAt(0),
        H       : "H".charCodeAt(0),
        I       : "I".charCodeAt(0),
        J       : "J".charCodeAt(0),
        K       : "K".charCodeAt(0),
        L       : "L".charCodeAt(0),
        M       : "M".charCodeAt(0),
        N       : "N".charCodeAt(0),
        O       : "O".charCodeAt(0),
        P       : "P".charCodeAt(0),
        Q       : "Q".charCodeAt(0),
        R       : "R".charCodeAt(0),
        S       : "S".charCodeAt(0),
        T       : "T".charCodeAt(0),
        U       : "U".charCodeAt(0),
        V       : "V".charCodeAt(0),
        W       : "W".charCodeAt(0),
        X       : "X".charCodeAt(0),
        Y       : "Y".charCodeAt(0),
        Z       : "Z".charCodeAt(0),
        ZERO    : "0".charCodeAt(0),
        ONE     : "1".charCodeAt(0),
        TWO     : "2".charCodeAt(0),
        THREE   : "3".charCodeAt(0),
        FOUR    : "4".charCodeAt(0),
        FIVE    : "5".charCodeAt(0),
        SIX     : "6".charCodeAt(0),
        SEVEN   : "7".charCodeAt(0),
        EIGHT   : "8".charCodeAt(0),
        NINE    : "9".charCodeAt(0),
        ENTER   : 13,
        SHIFT   : 16,
        CONTROL : 17,
        ALT     : 18,
        ESC     : 27,
        SPACEBAR: 32,
        LEFT    : 37,
        UP      : 38,
        RIGHT   : 39,
        DOWN    : 40
    };

}(testgame));

