require([
	'lib/SpriteRec'
], function (
	SpriteRec
) {

	function draw() {
		// SpritePtr sp;
		// glClearColor(0, 0, 0.2, 1);
		// glClear(GL_COLOR_BUFFER_BIT+GL_DEPTH_BUFFER_BIT);
		// glEnable(GL_TEXTURE_2D);
		// glEnable(GL_BLEND);
		// glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
		// DrawBackground();
		// SpriteBehavior(); // Din kod!
		// // Loop though all sprites. (Several loops in real engine.)
		// sp = gSpriteRoot;
		// do
		// {
		// HandleSprite(sp); // Callback in a real engine
		// DrawSprite(sp);
		// sp = sp->next;
		// } while (sp != NULL);
		// glutSwapBuffers();
	}

	function update() {

	}

	function init() {
		// TextureData *sheepFace, *blackFace, *dogFace, *foodFace;
		// LoadTGATextureSimple("bilder/leaves.tga", &backgroundTexID); // Bakgrund
		// sheepFace = GetFace("bilder/sheep.tga"); // Ett fŒr
		// blackFace = GetFace("bilder/blackie.tga"); // Ett svart fŒr
		// dogFace = GetFace("bilder/dog.tga"); // En hund
		// foodFace = GetFace("bilder/mat.tga"); // Mat
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