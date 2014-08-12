/*global window*/
/*global document*/

(function(){
	(function(){
		var onEachFrame;
		if(window.webkitRequestAnimationFrame){
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
				if(!clr) clr = "#efefef";
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
				"ctx": function(){return bctx;}
			};
		}());

		var x = 1;
		var y = 1;

		var init = function(w,h){
			canvas.setup(w,h, 'canvas');
		};

		var preupdate = function(){};
		var postupdate = function(){};

		var update = function(){
			preupdate();
			//update
			x+=1;
			y+=1;

			postupdate();
		};


		var draw = function(){
			canvas.ctx().fillStyle = "#831616";
			canvas.ctx().beginPath();
			canvas.ctx().rect(x, y, 50, 50);
			canvas.ctx().closePath();
			canvas.ctx().fill();
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

				canvas.clear();
				draw();
				canvas.draw();
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
