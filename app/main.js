/*global window*/
var testgame = testgame || {};

window.onload = function(){
	'use strict';
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
