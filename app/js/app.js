require([
	'lib/SpriteRec'
], function (
	SpriteRec
) {

	function draw() {
		// DrawBackground();
		
		// SpriteBehavior(); // Din kod!
		
		/** 
		 *  Loop though all sprites. (Several loops in real engine.)
		 *    HandleSprite(sp);
		 *    DrawSprite(sp);
		 */
	}

	function update() {

	}

	function init() {
		/**
		 *  Load texture data
		 */
		// TextureData *sheepFace, *blackFace, *dogFace, *foodFace;
		// LoadTGATextureSimple("bilder/leaves.tga", &backgroundTexID); // Bakgrund
		// sheepFace = GetFace("bilder/sheep.tga"); // Ett fŒr
		// blackFace = GetFace("bilder/blackie.tga"); // Ett svart fŒr
		// dogFace = GetFace("bilder/dog.tga"); // En hund
		// foodFace = GetFace("bilder/mat.tga"); // Mat

		/**
		 *  Create sprites
		 */
		// NewSprite(sheepFace, 100, 200, 1, 1);
		// NewSprite(sheepFace, 200, 100, 1.5, -1);
		// NewSprite(sheepFace, 250, 200, -1, 1.5);
	}

	init();
	(function loop(time) {
		update(time);
		draw(time);
		window.requestAnimationFrame(loop);
	})();
})