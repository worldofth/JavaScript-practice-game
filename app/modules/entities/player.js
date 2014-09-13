/* globals testgame */

/**
* @author Tom Hopkins [https://github.com/worldofth]
* @file player object
* @version 1.0.0
*/

/**
* Player object
* @module testgame.entities.Player
*/
(function(testgame){
    'use strict';

    /**
    * @class testgame.entities.Player
    * @classdesc The main player Entity
    * @extends testgame.entities.Entity
    * @constructs Player
    * @param { number } x - starting x position
    * @param { number } y - starting y position
    * @param { Object } graphicsObject - the rendering object
    * @param { number } speed - inital rate of movement
    */
    var Player = function(x, y, speed, shapes){
        //calls Entity constructor
        testgame.entities.Entity.call(this, x, y, speed, shapes);
        this.vec2.vx = 0;
        this.vec2.vy = 0;
    };

    //constructor
    Player.prototype = Object.create(testgame.entities.Entity.prototype);
    Player.prototype.constructor = Player;

    (function(proto){
        /**
        * The update before the main update
        *
        * @method testgame.entities.Player#preUpdate
        */
        var preUpdate = function(){
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

        },

        /**
        * The update after the main update
        *
        * @method testgame.entities.Player#postUpdate
        */
        postUpdate = function(){
            this.vec2.x = this.clamp(this.vec2.x, 0, testgame.settings.width);
            this.vec2.y = this.clamp(this.vec2.y, 0, testgame.settings.height);
        };

        /**
        * @exports public prototype
        */
        proto.preUpdate = preUpdate;
        proto.postUpdate = postUpdate;

    }(Player.prototype));

    /**
    * @exports player to entities namespace
    */
    testgame.entities.Player = Player;

}(testgame));
