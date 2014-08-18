var testgame = testgame || {};

testgame.settings = {
	"canvasID": '',
	"width": 0,
	"height": 0,
	"clearClr": '#efefef'
};

testgame.game = (function(){
	'use strict';
	var	entities = [];
	var	i = 0;
	var focused = true;
	var canvas = new testgame.Canvas();
	var	init = function(){
		var speed = 3;
		var grad1 = new testgame.util.Gradient(0,0,50,50,10,10).addColour(0,'#821616').addColour(0.5, '#ffffff').addColour(1,'#821616'),
			grad2 = new testgame.util.Gradient(0,0,50,0).addColour(0,'#821616').addColour(0.5, '#ffffff').addColour(1,'#821616');
		entities.push(new testgame.Entity(25, 550, new testgame.util.Circle(0,10,25,grad1), speed));
		entities.push(new testgame.Entity(67, 543, new testgame.util.Circle(0,0,25,'#821616'), speed));
		entities.push(new testgame.Entity(63, 73, new testgame.util.Circle(0,0,25,'#821616'), speed));
		entities.push(new testgame.Entity(125, 123, new testgame.util.Circle(0,0,25,'#821616'), speed));

		entities.push(new testgame.Entity(225, 410, new testgame.util.Rectangle(0,25,50,50,grad2), speed));
		entities.push(new testgame.Entity(350, 345, new testgame.util.Rectangle(0,0,50,50,'#821616'), speed));

		entities.push(new testgame.Entity(75, 432, new testgame.util.RoundRectangle(0,0,50,50,10,'#821616'), speed));
		entities.push(new testgame.Entity(140, 200, new testgame.util.RoundRectangle(0,0,50,50,10,'#821616'), speed));
		console.log(entities);
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
				if(testgame.game.focused){
					preUpdate();
					update();
					postUpdate();
				}
				nextGameTick += skipTicks;
				loops++;
			}
			draw();
		};
	}());

	return {
		"run": run,
		"init": init,
		"focused": focused
	};
}());
