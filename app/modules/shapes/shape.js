/* globals testgame */

/**
* @author Tom Hopkins [https://github.com/worldofth]
* @file shape abstract class and bound rectangle
* @version 1.0.0
*/

/**
* text object
* @module testgame.shapes
* @module testgame.shapes.shape
*/
(function(testgame){
    'use strict';

    /**
    * @class testgame.shapes.Text
    * @classdesc an abstract class that all shapes extent
    * @abstract
    * @constructs Shape
    * @param { number } x - the x position of the shape
    * @param { number } y - the y position of the shape
    * @param { Object|string } colour - the colour of the shapes
    * @param { boolean } relpos - if the position is relative to the entity
    */
    var Shape = function(x, y, colour, relpos){
        /**
        * @property { Point } - creates a point object based on the x, y position
        */
        this.point = new testgame.util.Point(x,y);

        /**
        * @property { Object|string } - gradient object or a colour string
        */
        this.colour = colour || '#000';

        /**
        * @property { boolean } - if the position is relative to the entity or it's absolute position on the window
        */
        this.isReleativePos = relpos || true;
    };
    //constructor
    Shape.prototype.constructor = Shape;

    Shape.prototype = (function(){
        /**
        * Changes if the shape is relative or not
        *
        * @method testgame.Shape#setRelativePos
        * @param { Object } context - need the drawing context to access the measure method
        * @return { Object } - returns a object containing the calculated sizes
        */
        var setRelativePos = function(isRel){
            this.isReleativePos = isRel;
        };

        /**
        * @exports shape prototype
        */
        return{
            setRelativePos: setRelativePos
        };
    }());

    /**
    * @class testgame.shapes.BoundRectangle
    * @classdesc for shapes that doen't have a defined square box
    * and box collision/calculations are needed
    * @constructs BoundRectangle
    * @param { number } x - the x position of the bound box
    * @param { number } y - the y position of the bound box
    * @param { number } width - the width of the bound box
    * @param { number } height - the height of the bound box
    */
    var BoundRectangle = function(x, y, width, height){
        this.point = new testgame.util.Point(x,y);
        this.width = width || 0;
        this.height = height || 0;
    };

    /**
    * @exports shapes interface,
    * adding both shape and bound rectangle objects to it
    */
    testgame.shapes = {};
    testgame.shapes.Shape = Shape;
    testgame.shapes.BoundRectangle = BoundRectangle;

    /**
    * @enum shape types
    */
    testgame.shapes.type = {
		"TYPE_REC" 	: "Rectangle",
		"TYPE_CIR" 	: "Circle",
		"TYPE_RREC" : "RoundRectangle",
		"TYPE_TEXT" : "Text"
    };


}(testgame));

