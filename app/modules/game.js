var testgame = testgame || {};

testgame.settings = {
	"canvasID": '',
	"width": 0,
	"height": 0,
	"clearClr": '#efefef'
};

testgame.game = (function(){

	var	entities = [];
	var	i = 0;
	var canvas = new testgame.Canvas();

	var	init = function(){
		var speed = 3;
		entities.push(new testgame.Entity(new testgame.util.Circle(25,550,25,'#821616'), speed));
		entities.push(new testgame.Entity(new testgame.util.Circle(67,543,25,'#821616'), speed));
		entities.push(new testgame.Entity(new testgame.util.Circle(63,73,25,'#821616'), speed));
		entities.push(new testgame.Entity(new testgame.util.Circle(125,123,25,'#821616'), speed));

		entities.push(new testgame.Entity(new testgame.util.Rectangle(225,410,50,50,'#821616'), speed));
		entities.push(new testgame.Entity(new testgame.util.Rectangle(350,354,50,50,'#821616'), speed));

		entities.push(new testgame.Entity(new testgame.util.RoundRectangle(75,432,50,50,10,'#821616'), speed));
		entities.push(new testgame.Entity(new testgame.util.RoundRectangle(140,200,50,50,10,'#821616'), speed));
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
