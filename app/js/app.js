// Create app namespace
var app = app || {};
window.app = app;

/**
 *  SpriteRec class
 */
function SpriteRec(options) {
	options = options || {};
	
	this.position = options.position || { x:0, y:0 };
	this.speed = options.speed || { x:0, y:0 };

	this.rotation = options.rotation || 0;
	this.color = options.color || 'rgb(' + Math.floor(256*Math.random()) + ', ' + Math.floor(256*Math.random()) + ', ' + Math.floor(256*Math.random()) + ')';

	this.care = options.care || 1;
	this.sight = options.sight || 1;
}

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
	// such render. many skill. wow.
	var size = 3;
	app.ctx.fillStyle = 'transparent';
	app.ctx.strokeStyle = sp.color;
	app.ctx.beginPath();
	app.ctx.moveTo(sp.position.x + Math.cos(sp.rotation)*size, sp.position.y + Math.sin(sp.rotation)*size);
	app.ctx.lineTo(sp.position.x + Math.cos(7*Math.PI/8 + sp.rotation)*size, sp.position.y + Math.sin(7*Math.PI/8 + sp.rotation)*size);
	app.ctx.lineTo(sp.position.x, sp.position.y);
	app.ctx.lineTo(sp.position.x + Math.cos(-7*Math.PI/8 + sp.rotation)*size, sp.position.y + Math.sin(-7*Math.PI/8 + sp.rotation)*size);
	app.ctx.closePath();
	app.ctx.stroke();
}

function NewSprite(face, xPos, yPos, xVel, yVel, care, sight) {

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
		rotation: 0,
		care: care,
		sight: sight
	});

	return sp;
}

function DrawBackground(color) {
	app.ctx.fillStyle = color || app.CLEAR_COLOR_FILL;
	app.ctx.fillRect(0, 0, app.canv.width, app.canv.height);
}

function SpriteBehavior() {
	// Lägg till din labbkod här. Det går bra att ändra var som helst i
	// koden i övrigt, men mycket kan samlas här. Du kan utgå från den
	// globala listroten, gSpriteRoot, för att kontrollera alla sprites
	// hastigheter och positioner, eller arbeta från egna globaler.

	// calculate stuff
	for(var i = 0; i < app.spriteList.length; i++) {
		var count = 0;
		var currentSprite = app.spriteList[i];
		app.averagePosition[i] = { x: 0, y: 0 };
		app.avoidanceVector[i] = { x: 0, y: 0 };
		app.speedDifference[i] = { x: 0, y: 0 };

		for(var j = 0; j < app.spriteList.length; j++) {
			var dist = {
				x: app.spriteList[j].position.x - currentSprite.position.x,
				y: app.spriteList[j].position.y - currentSprite.position.y
			};

			var distSquared = dist.x * dist.x + dist.y * dist.y;

			if(distSquared < (app.FLOCK_MAX_DISTANCE_SQUARED * currentSprite.sight)) {
				app.averagePosition[i].x += dist.x;
				app.averagePosition[i].y += dist.y;

				app.avoidanceVector[i].x -= dist.x / (distSquared == 0 ? 0.00001 : distSquared);
				app.avoidanceVector[i].y -= dist.y / (distSquared == 0 ? 0.00001 : distSquared);

				app.speedDifference[i].x += app.spriteList[j].speed.x - currentSprite.speed.x;
				app.speedDifference[i].y += app.spriteList[j].speed.y - currentSprite.speed.y;

				count++;
			}

		}

		if(count > 0) {
			app.averagePosition[i].x /= count;
			app.averagePosition[i].y /= count;

			app.avoidanceVector[i].x /= count;
			app.avoidanceVector[i].y /= count;

			app.speedDifference[i].x /= count;
			app.speedDifference[i].y /= count;
		}
	}

	// apply the stuff calculated above
	for(var i = 0; i < app.spriteList.length; i++) {

		app.spriteList[i].speed.x += app.averagePosition[i].x * app.FLOCK_COHESION_WEIGHT
									+ app.avoidanceVector[i].x * app.FLOCK_AVOIDANCE_WEIGHT
									+ app.speedDifference[i].x * app.FLOCK_ALIGNMENT_WEIGHT * app.spriteList[i].care;

		app.spriteList[i].speed.y += app.averagePosition[i].y * app.FLOCK_COHESION_WEIGHT
									+ app.avoidanceVector[i].y * app.FLOCK_AVOIDANCE_WEIGHT
									+ app.speedDifference[i].y * app.FLOCK_ALIGNMENT_WEIGHT * app.spriteList[i].care;

		app.spriteList[i].position.x += app.spriteList[i].speed.x * (Math.random() * 0.002 + 1);
		app.spriteList[i].position.y += app.spriteList[i].speed.y * (Math.random() * 0.002 + 1);
	}
}


/**
 *  Loop-based app structure
 */

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

	app.CLEAR_COLOR_FILL = '#1F0310';

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

	app.FLOCK_SIZE = 250;
	app.FLOCK_MAX_DISTANCE_SQUARED = 3000;
	app.FLOCK_COHESION_WEIGHT = 0.0065;
	app.FLOCK_AVOIDANCE_WEIGHT = 10;
	app.FLOCK_ALIGNMENT_WEIGHT = 0.03;

	app.averagePosition = new Array(app.FLOCK_SIZE);
	app.avoidanceVector = new Array(app.FLOCK_SIZE);
	app.speedDifference = new Array(app.FLOCK_SIZE);

	app.restart = function() {
		/**
		 *  Create sprites
		 */
		app.spriteList = new Array(app.FLOCK_SIZE);
		for (var i = 0; i < app.spriteList.length; i++) {
			var care = Math.random()*4;
			var sight = Math.random() * 0.6 + 0.7;
			app.spriteList[i] = NewSprite(
									null,  // graphics
									Math.random() * app.canv.width,  // x position
									Math.random() * app.canv.height,  // y position
									Math.random() * 2 - 1,  // x speed
									Math.random() * 2 - 1,  // y speed
									care,  // care
									sight  // sight
								);
		};
	};
	app.restart();
	
	/**
	 *  Setup GUI
	 */
	app.gui = new dat.GUI();
	app.gui.add(app, 'FLOCK_COHESION_WEIGHT', 0.0001, 0.05);
	app.gui.add(app, 'FLOCK_AVOIDANCE_WEIGHT', 0.0001, 20.0);
	app.gui.add(app, 'FLOCK_ALIGNMENT_WEIGHT', 0.0001, 1.0);
	app.gui.add(app, 'FLOCK_MAX_DISTANCE_SQUARED');
	app.gui.add(app, 'restart');
	app.gui.close();
}

init();
(function loop(time) {
	update(time);
	draw(time);
	window.requestAnimationFrame(loop);
})();