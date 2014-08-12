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

	var game = (function(){
		var canvas = (function(){
			var width, height, can, ctx, buffer, bctx;

			function setup(w,h,c){
				width = w;
				height = h;
				can = document.getElementById(c);

				ctx = can.getContext('2d');
				can.width = width;
				can.height = height;

				buffer = document.createElement('canvas');
				bctx = buffer.getContext('2d');
				buffer.width = width;
				buffer.height = height;
			}

			function clear(clr){
				if(!clr){ clr = "#efefef";}
				bctx.fillStyle = clr;
				bctx.beginPath();
				bctx.rect(0, 0, width, height);
				bctx.closePath();
				bctx.fill();
			}

			function draw(){
				ctx.drawImage(buffer, 0, 0);
			}

			return {
				"setup": setup,
				"clear": clear,
				"draw": draw,
				"ctx": function(){return bctx;},
				"width": function(){return width;},
				"height": function(){return height;}
			};
		}());

		var util = (function(){
			var point = function(x,y){
				var self = this;

				self.x = x ? x : 0;
				self.y = y ? y : 0;
				self.vx = -1;
				self.vy = 1;

				self.update = function(){
					self.x += self.vx;
					self.y += self.vy;
				};
			};

			var square = function(point, w, h, clr){
				var self = this;
				self.w = w;
				self.h = h;

				self.point = point;
				self.clr = clr;
				self.draw = function(context){
					context.fillStyle = self.clr;
					context.beginPath();
					context.rect(self.point.x, self.point.y, self.w, self.h);
					context.closePath();
					context.fill();
				};
			};

			return {
				"point" : point,
				"square": square
			};
		}());

		var entity = function(x, y, w, h){
			var self = this;

			self.point = new util.point(x, y);
			self.square = new util.square(self.point, w, h, "#811616");
			self.preupdate = function(){
				if(self.point.x >= canvas.width() - self.square.w){
					self.point.vx = -1;
				}
				if(self.point.x <= 0){
					self.point.vx = 1;
				}
				if(self.point.y >= canvas.height() - self.square.h){
					self.point.vy = -1;
				}
				if(self.point.y <= 0){
					self.point.vy = 1;
				}
			};
			self.postupdate = function(){};
			self.update = function(){
				self.preupdate();

				self.point.update();

				self.postupdate();
			};

			self.draw = function(context){
				self.square.draw(context);
			};
		};

		var entities = [];
		entities.push(new entity(25,73,50,50));
		entities.push(new entity(10,200,50,50));

		var init = function(w,h){
			canvas.setup(w,h, 'canvas');
		};

		var update = function(){
			//update
			for(var i = 0; i < entities.length; i++){
				entities[i].update();
			}
		};


		var draw = function(context){
			canvas.clear();

			for(var i = 0; i < entities.length; i++){
				entities[i].draw(context);
			}

			canvas.draw();
		};

		var run = (function(){
			var loops = 0;
			var fps = 60;
			var skipTicks = (1000 / fps);
			var maxFrameSkip = 10;
			var nextGameTick = (new Date()).getTime();

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

	function init(w,h){
		game.init(w,h);
	}


	window.onload = function(){
		init(400,400);
		window.onEachFrame(game.run);
	};

}());
