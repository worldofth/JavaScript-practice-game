/*global window*/
(function(){
	'use strict';
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

var testgame = testgame || {};

window.onload = function(){
	'use strict';
	testgame.settings.width = 800;
	testgame.settings.height = 600;
	testgame.settings.canvasID = 'canvas';
	testgame.game.init();
	window.onEachFrame(testgame.game.run);
};


window.addEventListener("focus", function() {
	'use strict';
	testgame.game.focused = true;
}, false);
window.addEventListener("blur", function() {
	'use strict';
	testgame.game.focused = false;
}, false);
