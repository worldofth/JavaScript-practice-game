/* globals testgame */

/**
* @author Tom Hopkins https://github.com/worldofth
*/

(function(testgame){
    'use strict';

    /**
    * @class testgame.RoundRectangle
    * @classdesc a graphics object holding used for rendering
    * @constructor
    * @param { number } x - starting x position
    * @param { number } y - starting y position
    * @param { number } width - starting width
    * @param { number } height - starting height
    * @param { number } radius - starting radius
    * @param { string/Object } colour - starting colour as a string or a grad object
    */
    var RoundRectangle = function(x, y, width, height, radius, colour, relpos){

        //calls Shape constructor
        testgame.Shape.call(this, x, y, colour, relpos);

        /**
        * @property { string } - sets the object type used for rendering in the canvas
        * using a util constant
        */
        this.type = testgame.util.TYPE_RREC;

        /**
        * @property { number } - sets the intial width
        * @default 0 - defaults to 0 if nothing is passed
        */
        this.width = width || 0;

        /**
        * @property { number } - sets the intial height
        * @default 0 - defaults to 0 if nothing is passed
        */
        this.height = height || 0;

        /**
        * @property { number } - sets the intial radius
        * @default 0 - defaults to 0 if nothing is passed
        */
        this.radius = radius || 0;

        this.halfwidth = this.width/2;
        this.halfheight = this.height/2;
    };

    //constructor
    RoundRectangle.prototype = Object.create(testgame.Shape.prototype);
    RoundRectangle.prototype.constructor = RoundRectangle;

    (function(proto){
        /**
        * clones a Round Rectangle, returning a new copy of this object
        *
        * @method testgame.RoundRectangle#clone
        * @return { Object } - returns a copy of this Round Rectangle
        */
        var clone = function(){
            return new testgame.RoundRectangle(this.x, this.y, this.width, this.height, this.radius, this.colour);
        };

        proto.clone = clone;

    }(RoundRectangle.prototype));


    testgame.RoundRectangle = RoundRectangle;

}(testgame));

