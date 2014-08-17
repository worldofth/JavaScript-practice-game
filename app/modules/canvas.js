/* globals document */
var testgame = testgame || {};

testgame.Canvas = function(width, height, canvasID){
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
	this.i = 0;
};

//constructor
testgame.Canvas.prototype.constructor = testgame.Canvas;

testgame.Canvas.prototype.render = function(objects){
	//clear
	this.bufferContext.fillStyle = testgame.settings.clearClr;
	this.bufferContext.fillRect(0, 0, this.width, this.height);

	//this.bufferContext.setTransform(1,0,0,1,0,0);

	//render basic objects
	this.renderObjects(objects);

	//render buffer
	this.context.drawImage(this.buffer, 0, 0);
};

testgame.Canvas.prototype.renderObjects = function(objects){
	this.i = 0;
	for(; this.i < objects.length; this.i++){
		this.data = objects[this.i].graphicsObject;

		if(this.data.type === testgame.util.type_rec){
			this.bufferContext.fillStyle = this.data.colour;
			this.bufferContext.fillRect(this.data.x, this.data.y, this.data.width, this.data.height);
		}else if(this.data.type === testgame.util.type_cir){
			this.bufferContext.beginPath();
			this.bufferContext.arc(this.data.x, this.data.y, this.data.radius, 0, 2*Math.PI);
			this.bufferContext.closePath();
			this.bufferContext.fillStyle = this.data.colour;
			this.bufferContext.fill();
		}
		else if(this.data.type === testgame.util.type_rrec){
			var rx = this.data.x;
			var ry = this.data.y;
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

			this.bufferContext.fillStyle = this.data.colour;
			this.bufferContext.fill();

		}
	}
};
