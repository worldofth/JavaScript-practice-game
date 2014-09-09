/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

(function(testgame){
    'use strict';

    /**
    * @class testgame.Rectangle
    * @classdesc a graphics object holding used for rendering
    * @constructor
    * @param { number } x - starting x position
    * @param { number } y - starting y position
    * @param { number } width - starting width
    * @param { number } height - starting height
    * @param { string/Object } colour - starting colour as a string or a grad object
    */
    var Rectangle = function(x, y, width, height, colour, relpos){
        //calls Shape constructor
        testgame.Shape.call(this, x, y, colour, relpos);

        /**
        * @property { string } - sets the object type used for rendering in the canvas
        * using a util constant
        */
        this.type = testgame.util.TYPE_REC;

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

        this.halfwidth = this.width/2;
        this.halfheight = this.height/2;
    };

    //constructor
    Rectangle.prototype = Object.create(testgame.Shape.prototype);
    Rectangle.prototype.constructor = Rectangle;


    (function(proto){
        /**
        * clones a Rectangle, returning a new copy of this object
        *
        * @method testgame.Rectangle#clone
        * @return { Object } - returns a copy of this Rectangle
        */
        var clone = function(){
            return new Rectangle(this.x, this.y, this.width, this.height, this.colour);
        };

        proto.clone = clone;

    }(Rectangle.prototype));


    Rectangle.intersects = function (a, b) {
        if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0){
            return false;
        }
        return !(a.right < b.point.x || a.bottom < b.point.y || a.point.x > b.right || a.point.y > b.bottom);
    };

    testgame.Rectangle = Rectangle;

}(testgame));
