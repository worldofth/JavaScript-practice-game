(function(){
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
		};

		function clear(clr){
			if(!clr) clr = "#efefef";
			bctx.fillStyle = clr;
			bctx.beginPath();
			bctx.rect(0, 0, width, height);
			bctx.closePath();
			bctx.fill();
		};

		function draw(){
			ctx.drawImage(buffer, 0, 0);
		};

		function getbctx(){
			return bctx;
		}

		return {
			"setup": setup,
			"clear": clear,
			"draw": draw,
			"ctx": getbctx
		};
	}());

	var game = {
		fps: 60,
		x: 1,
		preupdate: function(){},

		postupdate:function(){},

		update: function(){
			this.preupdate();

			//update
			this.x+=5;

			this.postupdate();
		},

		draw: function(ctx){
			ctx.fillStyle = "#831616";
			ctx.beginPath();
			ctx.rect(this.x, 25, 50, 50);
			ctx.closePath();
			ctx.fill();
		},

		run:(function(){
			var loops = 0,
				skipTicks = 1000/ this.fps,
				maxFrameSkip = 10,
				nextGameTick = (new Date).getTime();
			return function(){
				loops = 0;

				while((new Date).getTime() > nextGameTick && loops < maxFrameSkip){
					game.update();
					nextGameTick += skipTicks;
					loops++;
				}
				canvas.clear();
				this.draw(canvas.ctx());
				canvas.draw();
			};
		}())
	};

	function init(){
		canvas.setup(200,200, 'canvas');
	}


	window.onload = function(){
		init();
		game.intervalId = setInterval(game.run(), 1000);
	}

}());
