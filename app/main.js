/*global window, document*/

(function(){
	(function(){
		var onEachFrame;
		if(window.requestAnimationFrame){
			onEachFrame = function(cb){
				var _cb = function(){ cb(); window.requestAnimationFrame(_cb); };
				_cb();
			};
		}else if(window.webkitRequestAnimationFrame){
			onEachFrame = function(cb){
				var _cb = function(){ cb(); window.webkitRequestAnimationFrame(_cb); };
				_cb();
			};
		}else if(window.mozRequestAnimationFrame){
			onEachFrame = function(cb){
				var _cb = function(){ cb(); window.mozRequestAnimationFrame(_cb); };
				_cb();
			};
		}else{
			onEachFrame = function(cb){
				window.setInterval(cb, 0);
			};
		}

		window.onEachFrame = onEachFrame;
	}());

	var settings = {
		"canvasID": '',
		"width": 0,
		"height": 0,
		"clearClr": '#efefef'
	};

	var util = (function(){
		var Vec2 = function(x,y){
			this.x = x || 0;
			this.y = y || 0;
			this.vx = 0;
			this.vy = 0;
		};

		Vec2.prototype.update = function(){
			this.x += this.vx;
			this.y += this.vy;
		};

		Vec2.prototype.clone = function(){
			return new Vec2(this.x, this.y);
		};

		Vec2.prototype.constructor = Vec2;

		var Rectangle = function(x, y, width, height, colour){
			this.type = "Rectangle";
			this.colour = colour;
			this.x = x || 0;
			this.y = y || 0;
			this.width = width || 0;
			this.height = height || 0;
		};
		Rectangle.prototype.constructor = Rectangle;
		Rectangle.prototype.clone = function(){
			return new Rectangle(this.x, this.y, this.width, this.height, this.colour);
		};

		var Circle = function(x, y, radius, colour){
			this.type = "Circle";
			this.colour = colour;
			this.x = x || 0;
			this.y = y || 0;
			this.radius = radius || 0;
			this.width = this.radius;
			this.height = this.radius;
		};
		Circle.prototype.constructor = Circle;
		Circle.prototype.clone = function(){
			return new Circle(this.x, this.y, this.radius, this.colour);
		};

//		var RoundRectangle = function(x, y, width, height, radius, colour){
//			this.type = "RoundRectangle";
//			this.colour = colour;
//			this.x = x || 0;
//			this.y = y || 0;
//			this.width = width || 0;
//			this.height = height || 0;
//			this.radius = radius || 0;
//		};
//		RoundRectangle.prototype.constructor = RoundRectangle;
//		RoundRectangle.prototype.clone = function(){
//			return new RoundRectangle(this.x, this.y, this.width, this.height, this.radius, this.colour);
//		};


		return {
			//graphic object types
			"type_rec" 	: "Rectangle",
			"type_cir" 	: "Circle",
			"type_rrec" : "RoundRectangle",

			//objects
			"Vec2" 		: Vec2,
			"Rectangle"	: Rectangle,
			"Circle"	: Circle,
			//"RoundRectangle": RoundRectangle
		};
	}());

	var Entity = function(graphicsObject, speed){
		this.vx = -speed;
		this.vy = speed;
		this.speed = speed;
		this.graphicsObject = graphicsObject;
	};

	Entity.prototype.constructor = Entity;
	Entity.prototype.preUpdate = function(){
		if(this.graphicsObject.x >= settings.width - this.graphicsObject.width){
			this.vx = -this.speed;
		}
		if(this.graphicsObject.x <= 0){
			this.vx = this.speed;
		}
		if(this.graphicsObject.y >= settings.height - this.graphicsObject.height){
			this.vy = -this.speed;
		}
		if(this.graphicsObject.y <= 0){
			this.vy = this.speed;
		}
	};
	Entity.prototype.postUpdate = function(){

	};
	Entity.prototype.update = function(){
		this.graphicsObject.x += this.vx;
		this.graphicsObject.y += this.vy;
	};

	var game = (function(){

		var Canvas = function(width, height, canvasID){
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
		Canvas.prototype.constructor = Canvas;

		Canvas.prototype.render = function(objects){
			//clear
			this.bufferContext.fillStyle = settings.clearClr;
			this.bufferContext.fillRect(0, 0, this.width, this.height);

			//this.bufferContext.setTransform(1,0,0,1,0,0);

			//render basic objects
			this.renderObjects(objects);

			//render buffer
			this.context.drawImage(this.buffer, 0, 0);
		};

		Canvas.prototype.renderObjects = function(objects){
			this.i = 0;
			for(; this.i < objects.length; this.i++){
				this.data = objects[this.i].graphicsObject;

				if(this.data.type === util.type_rec){
					this.bufferContext.fillStyle = this.data.colour;
					this.bufferContext.fillRect(this.data.x, this.data.y, this.data.width, this.data.height);
				}else if(this.data.type === util.type_cir){
					this.bufferContext.beginPath();
					this.bufferContext.arc(this.data.x, this.data.y, this.data.radius, 0, 2*Math.PI);
            		this.bufferContext.closePath();
					this.bufferContext.fillStyle = this.data.colour;
					this.bufferContext.fill();
				}
//				else if(this.data.type === "RoundRectangle"){
//
//				}
			}
		};


		var	entities = [];
		var	i = 0;
		var canvas = new Canvas();

		var	init = function(){
			entities.push(new Entity(new util.Circle(25,550,25,'#821616'), 3));
			entities.push(new Entity(new util.Circle(67,543,25,'#821616'), 2));
			entities.push(new Entity(new util.Circle(63,73,25,'#821616'), 4));
			entities.push(new Entity(new util.Circle(125,123,25,'#821616'), 6));

			entities.push(new Entity(new util.Rectangle(225,410,50,50,'#821616'), 1));
			entities.push(new Entity(new util.Rectangle(350,354,50,50,'#821616'), 3));
			entities.push(new Entity(new util.Rectangle(75,432,50,50,'#821616'), 8));
			entities.push(new Entity(new util.Rectangle(140,200,50,50,'#821616'), 4));
		};

		var	preUpdate = function(){
			i=0;
			for(; i < entities.length; i++){
				entities[i].preUpdate();
			}
		};

		var update = function(){
			//update
			i=0;
			for(; i < entities.length; i++){
				entities[i].update();
			}
		};

		var	postUpdate = function(){
			i=0;
			for(; i < entities.length; i++){
				entities[i].postUpdate();
			}
		};

		var draw = function(){
			canvas.render(entities);
		};

		var run = (function(){
			var loops = 0,
				fps = 60,
				skipTicks = (1000 / fps),
				maxFrameSkip = 10,
				nextGameTick = Date.now();

			return function(){
				loops = 0;
				while(Date.now() > nextGameTick && loops < maxFrameSkip){
					preUpdate();
					update();
					postUpdate();
					nextGameTick += skipTicks;
					loops++;
				}
				draw();
			};
		}());

		return {
			"run": run,
			"init": init
		};
	}());

	window.onload = function(){
		settings.width = 800;
		settings.height = 600;
		settings.canvasID = 'canvas';
		game.init();
		window.onEachFrame(game.run);
	};

}());
