var canvas = function(){
	var width, height, canvas, ctx, buffer, bctx;

	function setup(w,h,c){
		width = w;
		height = h;
		canvas = c;

		ctx = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

		buffer = document.createElement('canvas');
		bctx = buffer.getContext('2d');
		buffer.width = width;
		buffer.height = height;
	}

	function clear(){
		//if(!clr) clr = "#fefefe";
		bctx.fillStyle = '#aaa';
		bctx.beginPath();
		bctx.rect(0, 0, width, height);
		bctx.endPath();
		bctx.fill();
	}

	function draw(){
		ctx.drawImage(buffer, 0, 0);
	}

};
