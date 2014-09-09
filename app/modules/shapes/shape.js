/**
* @author Tom Hopkins https://github.com/worldofth
*/

/**
* engine namespace
*/
var testgame = testgame || {};

(function(testgame){
    'use strict';

    var Shape = function(x, y, colour, relpos){
        this.point = new testgame.util.Point(x,y);
        this.colour = colour || '#000';
        this.isReleativePos = relpos || true;
    };

    Shape.prototype.constructor = Shape;

    Shape.prototype = (function(){
        var clone = function(){
            return new Shape(this.x, this.y, this.colour);
        },

        setRelativePos = function(isRel){
            this.isReleativePos = isRel;
        };

        return{
            clone: clone,
            setRelativePos: setRelativePos
        };
    }());

    var BoundRectangle = function(x, y, width, height){
        this.point = new testgame.util.Point(x,y);
        this.width = width || 0;
        this.height = height || 0;
    };

    testgame.Shape = Shape;
    testgame.BoundRectangle = BoundRectangle;

}(testgame));

