/* globals document, testgame */

/**
* @author Tom Hopkins https://github.com/worldofth
*/

(function(testgame){
    'use strict';

    /**
    * @class testgame.Canvas
    * @classdesc Controls everything to do with the canvas, this includes all the
    *  rendering attributes of the canvas
    * @constructor
    * @param { number } width - width of the canvas
    * @param { number } height - height of the canvas
    * @param { string } canvasID - the DOM id of the canvas
    */
    var Canvas = function(width, height, canvasID, clrClr){

        this.clearColour = clrClr || testgame.settings.clearClr;

        /**
        * @property { number } - width of the canvas
        * @default 800px
        */
        this.width = width || 800;

        /**
        * @property { number } - height of the canvas
        * @default 600px
        */
        this.height = height || 600;

        /**
        * @property { HTMLElement } - html element of the canvas
        * @default id set to settings canvasID if not 'canvas'
        */
        this.canvas = document.getElementById(canvasID || testgame.settings.canvasID || 'canvas');

        /**
        * @property { Object } - 2d drawing context of canvas
        */
        this.context = this.canvas.getContext('2d');

        //sets width of the canvas
        this.canvas.width = this.width;

        //sets height of the canvas
        this.canvas.height = this.height;

        /**
        * @property { HTMLElement } - Creates buffer element to render objects to
        */
        this.buffer = document.createElement('canvas');

        /**
        * @property { Object } - 2d drawing context of buffer canvas
        */
        this.bufferContext = this.buffer.getContext('2d');

        //set buffer width to be same as canvas width
        this.buffer.width = this.width;

        //set buffer height to be same as canvas height
        this.buffer.height = this.height;

        //variables used in game loop to prevent redeclaring variables each time
        this.data = null;
        this.shapes = null;
        this.shape = null;
        this.grad = null;
        this.x = 0;
        this.y = 0;
    };

    //constructor
    Canvas.prototype.constructor = Canvas;


    Canvas.prototype = (function(){
        /**
        * The main render method which is publically called, here the buffer context is cleared,
        * all the objects are passed in and rendered, then the buffer is drawn to the main canvas.
        *
        * @method testgame.Canvas#render
        * @param { Array } array of all entities in the game
        */
        var render = function(sets, entities){
            //clear
            this.bufferContext.fillStyle = this.clearColour;
            this.bufferContext.fillRect(0, 0, this.width, this.height);

            //this.bufferContext.setTransform(1,0,0,1,0,0);

            //render basic objects
            renderObjects.call(this, sets, entities);

            //render buffer
            this.context.drawImage(this.buffer, 0, 0);
        },

        /**
        * If a grad is being used as the fill colour, this method checks for it and returns the
        * grad based on the buffer context, if it's just a hex string or a rgb string it returns that.
        *
        * @method testgame.Canvas#processColour
        * @param { Object/String } either a grad object or a colour string
        * @param { number } x coordinate of the object's location
        * @param { number } y coordinate of the object's location
        * @return { Object/String } returns created grad object or colour string
        */
        processColour = function(colourObj, x, y){
            //if colourObj is not an object return it as it should be a colour string
            if(typeof colourObj !== 'object'){
                return colourObj;
            }else{
                //create diffrent grad depending on if it's linear or radial
                //add objects position to the relative grad position so the grad moves with the object
                if(colourObj.isRadial){
                    this.grad = this.bufferContext.createRadialGradient(colourObj.x + x, colourObj.y + y, colourObj.r, colourObj.x1 + x, colourObj.y1 + y, colourObj.r1);
                }else{
                    this.grad = this.bufferContext.createLinearGradient(colourObj.x + x, colourObj.y + y, colourObj.x1 + x, colourObj.y1 + y);
                }

                //add the colours and thier positions to the grad
                for(var i = 0; i < colourObj.colours.length; i++){
                    this.grad.addColorStop(colourObj.colours[i].pos, colourObj.colours[i].colour);
                }

                //returns the created grad
                return this.grad;
            }
        },

        /**
        * renders the diffrent graphics object which is attachted to each game Entity
        *
        * @method testgame.Canvas#renderObjects
        * @param { Array } array of all entities in the game
        */
        renderObjects = function(sets, entities){
            //console.log(objects);
            for(var i = 0; i < sets.length; i++){
                for(var j = 0; j < entities[sets[i]].entityNames.length; j++){
                    this.data = entities[sets[i]][entities[sets[i]].entityNames[j]];

                    if(!this.data.renders){
                        continue;
                    }

                    //captures each objects data
                    for(var n = 0;  n < this.data.shapes.length; n++){

                        this.shape = this.data.shapes[n];

                        if(this.shape.isReleativePos){
                            //the adjusted x coord of the graphics object relative to the Entites position
                            this.x = this.data.vec2.x + this.shape.point.x;

                            //the adjusted y coord of the graphics object relative to the Entites position
                            this.y = this.data.vec2.y + this.shape.point.y;
                        }else{
                            //the adjusted x coord of the graphics object relative to the Entites position
                            this.x = this.shape.point.x;

                            //the adjusted y coord of the graphics object relative to the Entites position
                            this.y = this.shape.point.y;
                        }

                        switch(this.shape.type){
                            case testgame.util.TYPE_REC:
                                renderRectangle.call(this);
                                break;
                            case testgame.util.TYPE_CIR:
                                renderCircle.call(this);
                                break;
                            case testgame.util.TYPE_RREC:
                                renderRoundRectangle.call(this);
                                break;
                            case testgame.util.TYPE_TEXT:
                                renderText.call(this);
                                break;
                        }
                    }
                }
            }
        },

        renderRectangle = function(){
            this.bufferContext.fillStyle = processColour.call(this, this.shape.colour, this.x, this.y);
            this.bufferContext.fillRect(this.x, this.y, this.shape.width, this.shape.height);
        },

        renderCircle = function(){
            this.bufferContext.beginPath();
            this.bufferContext.arc(this.x+this.shape.radius, this.y+this.shape.radius, this.shape.radius, 0, 2*Math.PI);
            this.bufferContext.closePath();
            this.bufferContext.fillStyle = processColour.call(this, this.shape.colour, this.x, this.y);
            this.bufferContext.fill();
        },

        renderRoundRectangle = function(){
            //Renders a rounded edge rectangle
            var rx = this.x;
            var ry = this.y;
            var width = this.shape.width;
            var height = this.shape.height;
            var radius = this.shape.radius;

            var maxRadius = Math.min(width, height) /2 | 0;
            radius = radius > maxRadius ? maxRadius : radius;

            this.bufferContext.beginPath();
            this.bufferContext.moveTo(rx, ry + radius);
            this.bufferContext.lineTo(rx, ry + height - radius);
            this.bufferContext.quadraticCurveTo(rx, ry + height, rx + radius, ry + height);
            this.bufferContext.lineTo(rx + width - radius, ry + height);
            this.bufferContext.quadraticCurveTo(rx + width, ry + height, rx + width, ry + height - radius);
            this.bufferContext.lineTo(rx + width, ry + radius);
            this.bufferContext.quadraticCurveTo(rx + width, ry, rx + width - radius, ry);
            this.bufferContext.lineTo(rx + radius, ry);
            this.bufferContext.quadraticCurveTo(rx, ry, rx, ry + radius);
            this.bufferContext.closePath();

            this.bufferContext.fillStyle = processColour.call(this, this.shape.colour, this.x, this.y);
            this.bufferContext.fill();
        },

        renderText = function(){
            this.bufferContext.font = this.shape.font;
            this.bufferContext.fillStyle = processColour.call(this, this.shape.colour, this.x, this.y);
            this.bufferContext.fillText(this.shape.textStr,this.x,this.y);
        };

        return{
            render: render
        };
    }());


    testgame.Canvas = Canvas;

}(testgame));

