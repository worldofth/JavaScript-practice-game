window.onload = function(){
	prog.run();
};

var prog = (function(m1, m2){
	return {
		run: function(){
			console.log("test");
			m1.run();
			m2.run();
		}
	};
}(mod1, mod2));
