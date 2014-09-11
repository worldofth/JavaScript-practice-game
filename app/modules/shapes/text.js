/* globals testgame */

/**
* @author Tom Hopkins https://github.com/worldofth
*/

(function(testgame){
    'use strict';

    /**
    * @class testgame.Text
    * @classdesc a graphics object holding used for rendering text
    * @constructor
    * @param { number } x - starting x position
    * @param { number } y - starting y position
    * @param { string } textStr - the string that will be rendered
    * @param { string } font - a font string defining the size and type similar to the css font attribute
    * @param { string/Object } colour - starting colour as a string or a grad object
    */
    var Text = function(x, y, textStr, font, colour, relpos){
        //calls Shape constructor
        testgame.Shape.call(this, x, y, colour, relpos);

        /**
        * @property { string } - sets the object type used for rendering in the canvas
        * using a util constant
        */
        this.type = testgame.util.TYPE_TEXT;

        /**
        * @property { number } - sets the intial x position
        * @default 0 - defaults to 0 if nothing is passed
        */
        this.x = x || 0;

        /**
        * @property { number } - sets the intial y position
        * @default 0 - defaults to 0 if nothing is passed
        */
        this.y = y || 0;

        /**
        * @property { string } - sets the intial string to be rendered
        * @default '' - defaults to an empty string if nothing is passed
        */
        this.textStr = textStr || '';

        /**
        * @property { string } - sets the intial font type
        * @default "10px Arial" - defaults to 10px arial if nothing is passed
        */
        this.font = font || "10px Arial";

        /**
        * @property { string/Object } - sets the intial colour to a colour string or a grad object
        * @default #000000 - defaults to black if nothing is passed in
        */
        this.colour = colour || '#000000';

        this.relpos = false;
    };

    //constructor
    Text.prototype = Object.create(testgame.Shape.prototype);
    Text.prototype.constructor = Text;


    (function(proto){
        /**
        * clones a Text object, returning a new copy of this object
        *
        * @method testgame.Text#clone
        * @return { Object } - returns a copy of this Round Rectangle
        */
        var clone = function(){
            return new Text(this.x, this.y, this.textStr, this.font, this.colour);
        },

        /**
        * measure the size of the text string that is going to be rendered
        *
        * @method testgame.Text#measureText
        * @param { Object } context - need the drawing context to access the measure method
        * @return { Object } - returns a object containing the calculated sizes
        */
        measureText = function(context){
            context.font=this.font;
            return context.measureText(this.textStr);
        };


        proto.clone = clone;
        proto.measureText = measureText;

    }(Text.prototype));


    testgame.Text = Text;
}(testgame));


