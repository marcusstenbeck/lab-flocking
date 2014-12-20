require([
	'lib/SpriteRec'
], function (
	SpriteRec
) {
	var clearColor = '#004';

	/**
	 *  Original lab-like functions
	 */
	function HandleSprite(sp) {
		// Move by speed, bounce off screen edges.
		sp.position.x += sp.speed.x;
		sp.position.y += sp.speed.y;
		if (sp.position.x < 0)
		{
			sp.speed.x = Math.abs(sp.speed.x);
			sp.position.x = 0;
		}
		if (sp.position.y < 0)
		{
			sp.speed.y = Math.abs(sp.speed.y);
			sp.position.y = 0;
		}
		if (sp.position.x > app.canv.width)
		{
			sp.speed.x = -Math.abs(sp.speed.x);
			sp.position.x = app.canv.width;
		}
		if (sp.position.y > app.canv.height)
		{
			sp.speed.y = -Math.abs(sp.speed.y);
			sp.position.y = app.canv.height;
		}
		
		sp.rotation = Math.atan2(sp.speed.y, sp.speed.x);
	}

	function DrawSprite(sp) {
		app.ctx.fillStyle = 'transparent';
		app.ctx.strokeStyle = '#ff0';
		app.ctx.beginPath();
		app.ctx.arc(sp.position.x, sp.position.y, 10, sp.rotation, sp.rotation + 2*Math.PI);
		app.ctx.lineTo(sp.position.x, sp.position.y);
		app.ctx.closePath();
		app.ctx.stroke();
	}

	function NewSprite(face, xPos, yPos, xVel, yVel) {

		var sp = new SpriteRec({
			position: {
				x: xPos,
				y: yPos
			},
			speed: {
				x: xVel,
				y: yVel
			},
			face: face,
			rotation: 0
		});

		console.log('created new sprite', sp);

		return sp;
	}

	function DrawBackground() {
		app.ctx.fillStyle = clearColor;
		app.ctx.fillRect(0, 0, app.canv.width, app.canv.height);
	}

	function SpriteBehavior() {
		// Lägg till din labbkod här. Det går bra att ändra var som helst i
		// koden i övrigt, men mycket kan samlas här. Du kan utgå från den
		// globala listroten, gSpriteRoot, för att kontrollera alla sprites
		// hastigheter och positioner, eller arbeta från egna globaler.
	}


	/**
	 *  Loop-based app structure
	 */

	// Create app namespace
	var app = app || {};
	window.app = app;

	function draw() {
		DrawBackground();
		
		SpriteBehavior(); // Din kod!
		
		/** 
		 *  Loop though all sprites. (Several loops in real engine.)
		 */
		var sp;
		for(var i = 0; i < app.spriteList.length; i++) {
			sp = app.spriteList[i];
			HandleSprite(sp);
			DrawSprite(sp);
		}
	}

	function update() {

	}

	function init() {
		/**
		 *  Init canvas and add to app
		 */
		app.canv = document.body.appendChild(document.createElement('canvas'));
		app.canv.setAttribute('id', 'app-canvas');
		app.canv.setAttribute('width', window.innerWidth);
		app.canv.setAttribute('height', window.innerHeight);
		app.canv.style.setProperty('position', 'absolute');
		app.canv.style.setProperty('top', '0');
		app.canv.style.setProperty('left', '0');
		app.canv.style.setProperty('right', '0');
		app.canv.style.setProperty('bottom', '0');
		app.canv.style.setProperty('width', '100%');
		app.canv.style.setProperty('height', '100%');
		app.ctx = app.canv.getContext('2d');

		/**
		 *  Load texture data
		 */
		// TextureData *sheepFace, *blackFace, *dogFace, *foodFace;
		// LoadTGATextureSimple("bilder/leaves.tga", &backgroundTexID); // Bakgrund
		// sheepFace = GetFace("bilder/sheep.tga"); // Ett får
		var sheepFace = 'this should be an Image instead';
		// blackFace = GetFace("bilder/blackie.tga"); // Ett svart får
		// dogFace = GetFace("bilder/dog.tga"); // En hund
		// foodFace = GetFace("bilder/mat.tga"); // Mat

		/**
		 *  Create sprites
		 */
		app.spriteList = [];
		app.spriteList.push(NewSprite(sheepFace, 100, 200, 1, 1));
		app.spriteList.push(NewSprite(sheepFace, 200, 100, 1.5, -1));
		app.spriteList.push(NewSprite(sheepFace, 250, 200, -1, 1.5));
	}

	init();
	(function loop(time) {
		update(time);
		draw(time);
		window.requestAnimationFrame(loop);
	})();
})