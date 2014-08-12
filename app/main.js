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

			return {
				"point" : point
			};
		}());

		var point = new util.point(25,73);

		var init = function(w,h){
			canvas.setup(w,h, 'canvas');
		};

		var preupdate = function(){
			if(point.x >= canvas.width()){
				point.vx = -1;
			}
			if(point.x <= 0){
				point.vx = 1;
			}
			if(point.y >= canvas.height()){
				point.vy = -1;
			}
			if(point.y <= 0){
				point.vy = 1;
			}
		};
		var postupdate = function(){};

		var update = function(){
			preupdate();

			//update
			point.update();

			postupdate();
		};


		var draw = function(){
			canvas.clear();
			canvas.ctx().fillStyle = "#831616";
			canvas.ctx().beginPath();
			canvas.ctx().rect(point.x, point.y, 50, 50);
			canvas.ctx().closePath();
			canvas.ctx().fill();
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
				draw();
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
