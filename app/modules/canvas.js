/* globals document */
var testgame = testgame || {};

testgame.Canvas = function(width, height, canvasID){
	'use strict';
	this.width = width || 800;
	this.height = height || 600;
	this.canvas = document.getElementById(canvasID || 'canvas');
	this.context = this.canvas.getContext('2d');
	this.canvas.width = this.width;
	this.canvas.height = this.height;

	this.buffer = document.createElement('canvas');
	this.bufferContext = this.buffer.getContext('2d');
	this.buffer.width = this.width;
	this.buffer.height = this.height;

	this.data = null;
	this.grad = null;
	this.x = 0;
	this.y = 0;
	this.i = 0;
};

//constructor
testgame.Canvas.prototype.constructor = testgame.Canvas;

testgame.Canvas.prototype.render = function(objects){
	'use strict';
	//clear
	this.bufferContext.fillStyle = testgame.settings.clearClr;
	this.bufferContext.fillRect(0, 0, this.width, this.height);

	//this.bufferContext.setTransform(1,0,0,1,0,0);

	//render basic objects
	this.renderObjects(objects);

	//render buffer
	this.context.drawImage(this.buffer, 0, 0);
};

testgame.Canvas.prototype.processColour = function(colourObj, x, y){
	'use strict';
	if(typeof colourObj !== 'object'){
		return colourObj;
	}else{

		if(colourObj.isRadial){
			this.grad = this.bufferContext.createRadialGradient(colourObj.x + x, colourObj.y + y, colourObj.r, colourObj.x1 + x, colourObj.y1 + y, colourObj.r1);
		}else{
			this.grad = this.bufferContext.createLinearGradient(colourObj.x + x, colourObj.y + y, colourObj.x1 + x, colourObj.y1 + y);
		}
		colourObj.colours.colLength = colourObj.colours.length;
		for(var i = 0; i < colourObj.colours.length; i++){
			this.grad.addColorStop(colourObj.colours[i].pos, colourObj.colours[i].colour);
		}
		return this.grad;
	}
};

testgame.Canvas.prototype.renderObjects = function(objects){
	'use strict';
	this.i = 0;
	for(; this.i < objects.length; this.i++){
		this.data = objects[this.i].graphicsObject;

		this.x = objects[this.i].vec2.x + this.data.x;
		this.y = objects[this.i].vec2.y + this.data.y;

		if(this.data.type === testgame.util.TYPE_REC){
			this.bufferContext.fillStyle = this.processColour(this.data.colour, this.x, this.y);
			this.bufferContext.fillRect(this.x, this.y, this.data.width, this.data.height);
		}else if(this.data.type === testgame.util.TYPE_CIR){
			this.bufferContext.beginPath();
			this.bufferContext.arc(this.x, this.y, this.data.radius, 0, 2*Math.PI);
			this.bufferContext.closePath();
			this.bufferContext.fillStyle = this.processColour(this.data.colour, this.x, this.y);
			this.bufferContext.fill();
		}
		else if(this.data.type === testgame.util.TYPE_RREC){
			var rx = this.x;
			var ry = this.y;
			var width = this.data.width;
			var height = this.data.height;
			var radius = this.data.radius;

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

			this.bufferContext.fillStyle = this.processColour(this.data.colour, this.x, this.y);
			this.bufferContext.fill();

		}
	}
};
