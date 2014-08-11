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

		return {
			"setup": setup,
			"clear": clear,
			"draw": draw,
			"ctx": bctx
		};
	}());

	canvas.setup(200,200, 'canvas');

	function draw(){
		canvas.clear();
		canvas.draw();
	}

	window.onload = function(){
		draw();
	}

}());
