require([
	'lib/SpriteRec'
], function (
	SpriteRec
) {

	function draw() {
		
	}

	function update() {
		
	}

	function init() {
		
	}

	init();
	(function loop(time) {
		update(time);
		draw(time);
		window.requestAnimationFrame(loop);
	})();
})