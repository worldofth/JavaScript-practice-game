/* globals testgame */

/**
* @author Tom Hopkins [https://github.com/worldofth]
* @file round rectangle object
* @version 1.0.0
*/

/**
* round rectangle object
* @module testgame.shapes.RoundRectangle
*/
(function(testgame){
    'use strict';

    /**
    * @class testgame.RoundRectangle
    * @classdesc a graphics object holding used for rendering
    * @constructs RoundRectangle
    * @param { number } x - starting x position
    * @param { number } y - starting y position
    * @param { number } width - starting width
    * @param { number } height - starting height
    * @param { number } radius - starting radius
    * @param { string|Object } colour - starting colour as a string or a grad object
    */
    var RoundRectangle = function(x, y, width, height, radius, colour, relpos){

        //calls Shape constructor
        testgame.shapes.Shape.call(this, x, y, colour, relpos);

        /**
        * @property { string } - sets the object type used for rendering in the canvas
        * using a util constant
        */
        this.type = testgame.shapes.type.TYPE_RREC;

        /**
        * @property { number } - sets the intial width
        * @default [0] - defaults to 0 if nothing is passed
        */
        this.width = width || 0;

        /**
        * @property { number } - sets the intial height
        * @default [0] - defaults to 0 if nothing is passed
        */
        this.height = height || 0;

        /**
        * @property { number } - sets the intial radius
        * @default [0] - defaults to 0 if nothing is passed
        */
        this.radius = radius || 0;

        /**
        * @property { number } - calculate half the width
        */
        this.halfwidth = this.width/2;

        /**
        * @property { number } - calculate half the height
        */
        this.halfheight = this.height/2;
    };

    //constructor
    RoundRectangle.prototype = Object.create(testgame.shapes.Shape.prototype);
    RoundRectangle.prototype.constructor = RoundRectangle;

    (function(proto){
        /**
        * clones a Round Rectangle, returning a new copy of this object
        *
        * @method testgame.RoundRectangle#clone
        * @return { RoundRectangle } - returns a copy of this Round Rectangle
        */
        var clone = function(){
            return new testgame.RoundRectangle(this.x, this.y, this.width, this.height, this.radius, this.colour);
        };

        /**
        * @exports public prototype
        */
        proto.clone = clone;

    }(RoundRectangle.prototype));

     /**
    * checks if two rectangles intersect ech other, not icluding rounded corners
    *
    * @method testgame.shapes.RoundRectangle#intersects
    * @param { RoundRectangle } a - first rectangle to test
    * @param { RoundRectangle } b - second rectangle to test
    * @return { boolean } if there is an intersection
    * @static
    * @public
    */
    RoundRectangle.intersects = function (a, b) {
        if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0){
            return false;
        }
        return !(a.right < b.point.x || a.bottom < b.point.y || a.point.x > b.right || a.point.y > b.bottom);
    };

    /**
    * @exports RoundRectangle to shapes namespace
    */
    testgame.shapes.RoundRectangle = RoundRectangle;

}(testgame));

