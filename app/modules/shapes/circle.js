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
    * @class testgame.Circle
    * @classdesc a graphics object holding used for rendering
    * @constructor
    * @param { number } x - starting x position
    * @param { number } y - starting y position
    * @param { number } radius - starting radius
    * @param { string/Object } colour - starting colour as a string or a grad object
    */
    var Circle = function(x, y, radius, colour, relpos){
        //calls Shape constructor
        testgame.Shape.call(this, x, y, colour, relpos);

        /**
        * @property { string } - sets the object type used for rendering in the canvas
        * using a util constant
        */
        this.type = testgame.util.TYPE_CIR;

        /**
        * @property { number } - sets the intial radius
        * @default 0 - defaults to 0 if nothing is passed
        */
        this.radius = radius || 0;

        /**
        * @property { number } - sets the width to the radius
        * @bug currently not correct
        */
        this.width = this.radius*2;

        /**
        * @property { number } - sets the height to the radius
        * @bug currently not correct
        */
        this.height = this.radius*2;

        /**
        * @property { number } - sets the intial bound rectangle
        * @bug currently not correct
        */
        this.bounds = this.getBounds();
    };

    //constructor
    Circle.prototype = Object.create(testgame.Shape.prototype);
    Circle.prototype.constructor = Circle;


    (function(proto){
        /**
        * clones a Circle, returning a new copy of this object
        *
        * @method testgame.Circle#clone
        * @return { Object } - returns a copy of this Circle
        */
        var clone = function(){
            return new testgame.Circle(this.x, this.y, this.radius, this.colour);
        },

        /**
        * Returns a rectanlge thats fits around the circle
        *
        * @method testgame.Circle#getBounds
        * @return { Object }
        */
        getBounds = function(){
            return new testgame.BoundRectangle(this.point.x - this.radius, this.point.y - this.radius, this.width, this.height);
        };


        proto.clone = clone;
        proto.getBounds = getBounds;

    }(Circle.prototype));

    Circle.intersects = function(a,b){
        var dx = a.point.x - b.point.x;
        var dy = b.point.y - b.point.y;
        return (Math.sqrt(dx*dx + dy*dy) <= (a.radius + b.radius));
    };

    Circle.intersectsRectangle = function(c,r){
        var cx = Math.abs(c.point.x - r.point.x - r.halfwidth);
        var xdist = r.halfwidth + c.radius;

        if(cx > xdist){
            return false;
        }

        var cy = Math.abs(c.point.y - r.point.y - r.halfheight);
        var ydist = r.halfheight + c.radius;

        if(cy > ydist){
            return false;
        }

        if(cx <= r.halfwidth || cy <= r.halfheight){
            return true;
        }

        var xCornerDist = cx - r.halfwidth;
        var yCornerDist = cy - r.halfheight;
        var XCDSq = xCornerDist*xCornerDist;
        var YCDSq = yCornerDist*yCornerDist;
        var maxCornerDist = c.radius*c.radius;

        return XCDSq+YCDSq <= maxCornerDist;
    };

    testgame.Circle = Circle;

}(testgame));
