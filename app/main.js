/*global window*/
/*global document*/

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
		function Vec2(x,y){
			this.x = x;
			this.y = y;
			this.vx = 0;
			this.vy = 0;

			this.update = function(){
				this.x += this.vx;
				this.y += this.vy;
			};
		}

		var drawUtil = (function(){
			function Square(vec2, w, h, clr){
				this.w = w;
				this.h = h;

				this.vec2 = vec2;
				this.clr = clr;
				this.draw = function(context){
					context.fillStyle = this.clr;
					context.beginPath();
					context.rect(this.vec2.x, this.vec2.y, this.w, this.h);
					context.closePath();
					context.fill();
				};
			}

			function Circle(vec2, radius, clr){
				this.vec2 = vec2;
				this.radius = radius;
				this.clr = clr;

				this.draw = function(context){
					context.fillStyle = this.clr;
					context.beginPath();
					context.arc(this.vec2.x, this.vec2.y, this.radius, 2*Math.PI);
					context.closePath();
					context.fill();
				};
			}

			function renderText(ctx, string, font, color, vec2){
				ctx.fillStyle = color;
				ctx.font = font;
				ctx.fillText(string, vec2.x, vec2.y);
			}

			return {
				"Square": Square,
				"Circle": Circle,
				"renderText": renderText
			};
		}());

		return {
			"Vec2" : Vec2,
			"drawUtil": drawUtil
		};
	}());

	var Entity = function(x, y, w, h, speed){
		this.speed = speed;
		this.vec2 = new util.Vec2(x, y);
		this.vec2.vx = -speed;
		this.vec2.vy = speed;
		this.square = new util.drawUtil.Square(this.vec2, w, h, "#811616");

		this.preupdate = function(){
			if(this.vec2.x >= settings.width - this.square.w){
				this.vec2.vx = -this.speed;
			}
			if(this.vec2.x <= 0){
				this.vec2.vx = this.speed;
			}
			if(this.vec2.y >= settings.height - this.square.h){
				this.vec2.vy = -this.speed;
			}
			if(this.vec2.y <= 0){
				this.vec2.vy = this.speed;
			}
		};
		this.postupdate = function(){};
		this.update = function(){
			this.preupdate();

			this.vec2.update();

			this.postupdate();
		};

		this.draw = function(context){
			this.square.draw(context);
			util.drawUtil.renderText(context, "test", "20px arial", "#000", new util.Vec2(15,30));
		};
	};

	var game = (function(){
		var canvas = (function(){
			var can, ctx, buffer, bctx;
			function setup(){
				if(settings.canvasID === ''){
					throw Error("Canvas id is blank");
				};
				can = document.getElementById(settings.canvasID);

				ctx = can.getContext('2d');
				can.width = settings.width;
				can.height = settings.height;

				buffer = document.createElement('canvas');
				bctx = buffer.getContext('2d');
				buffer.width = settings.width;
				buffer.height = settings.height;
			}

			function clear(){
				bctx.fillStyle = settings.clearClr;
				bctx.beginPath();
				bctx.rect(0, 0, settings.width, settings.height);
				bctx.closePath();
				bctx.fill();
			}

			function draw(){
				ctx.drawImage(buffer, 0, 0);
			}

			function getBctx(){
				return bctx;
			}

			return {
				"setup": setup,
				"clear": clear,
				"draw": draw,
				"ctx": getBctx
			};
		}()),
			entities = [],
			i = 0,
			init = function(){
				canvas.setup();
				entities.push(new Entity(25,550,50,50, 3));
				entities.push(new Entity(67,543,50,50, 2));
				entities.push(new Entity(63,73,50,50, 4));
				entities.push(new Entity(125,123,50,50, 6));
				entities.push(new Entity(225,410,50,50, 1));
				entities.push(new Entity(350,354,50,50, 3));
				entities.push(new Entity(75,432,50,50, 8));
				entities.push(new Entity(140,200,50,50, 4));
			},
			update = function(){
				//update
				i=0;
				for(; i < entities.length; i++){
					entities[i].update();
				}
			},
			draw = function(context){
				canvas.clear();
				i = 0;
				for(; i < entities.length; i++){
					entities[i].draw(context);
				}
				canvas.draw();
			},
			run = (function(){
				var loops = 0,
					fps = 60,
					skipTicks = (1000 / fps),
					maxFrameSkip = 10,
					nextGameTick = (new Date()).getTime();

				return function(){
					loops = 0;
					while((new Date()).getTime() > nextGameTick && loops < maxFrameSkip){
						update();
						nextGameTick += skipTicks;
						loops++;
					}
					draw(canvas.ctx());
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
