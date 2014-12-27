lab-flocking
============

WebGL AI lab in the course [TSBK03](http://www.computer-graphics.se/TSBK03.html) at Linköping University (converted from original OpenGL lab).


## Svar på labbfrågor

### Flocking steg 1: Cohesion

*Fråga: Hur gjorde du för att söka igenom alla boids?*

Jag gjorde en väldigt enkel loop som först söker igenom alla individer och samlar in den påverkan individer inom kort nog avstånd orsakar. Sedan loopar jag igenom individerna igen och applicerar påverkan från de andra individerna. I min algoritm kommer den egna individen titta på sig själv, men inte bli påverkad. Strategin liknar den som nämns i *So how can we make them scream?*.

```
function SpriteBehavior() {
	for(var i = 0; i < app.spriteList.length; i++) {
		var count = 0;
		var currentSprite = app.spriteList[i];
		app.averagePosition[i] = { x: 0, y: 0 };

		for(var j = 0; j < app.spriteList.length; j++) {
			var dist = {
				x: app.spriteList[j].position.x - currentSprite.position.x,
				y: app.spriteList[j].position.y - currentSprite.position.y
			};

			var distSquared = dist.x * dist.x + dist.y * dist.y;

			if(distSquared < app.FLOCK_MAX_DISTANCE_SQUARED) {
				app.averagePosition[i].x += dist.x;
				app.averagePosition[i].y += dist.y;

				count++;
			}
		}

		if(count > 0) {
			// Dela på antal individer
		}
	}

	// apply the stuff calculated above
	for(var i = 0; i < app.spriteList.length; i++) {
		app.spriteList[i].speed.x += app.averagePosition[i].x * app.FLOCK_COHESION_WEIGHT;
		app.spriteList[i].speed.y += app.averagePosition[i].y * app.FLOCK_COHESION_WEIGHT;

		app.spriteList[i].position.x += app.spriteList[i].speed.x;
		app.spriteList[i].position.y += app.spriteList[i].speed.y;
	}
}
```


### Flocking steg 2: Separation

*Fråga: Vilken funktion valde du för den bortstötande kraften?*

Jag implementerar i `SpriteBehavior()` motsatsen till den metod som användes för cohesion. Jag subtraherar alltså en liten del av avståndsvektorn, men med storleken omvänt proportionell till kvadraten av avståndets magnitud.


*Fråga: Är din separation bra eller kan du tänka dig finjusteringar?*

Jag tycker att det i detta steg börjar se lite mer ut som ett stim knott, men inte som djur som rör sig som en flock. Det är alltså för mycket kaos. Jag märkte också att det är viktigt att se till att konstanten för separation inte orsakar så att individerna inte vill åka tillbaka till "flockens centrum".


### Flocking steg 3: Alignment

*Fråga: Vilken vikt lade du på alignment? Hur mycket rätar de upp sig efter varandra per iteration?*

Jag upptäckte att ett för högt värde av alignment resulterade i att individerna rätade upp sig alldeles för fort. Det blev lite tråkigt, så jag beslöt att justera konstanten i `app.FLOCK_ALIGNMENT_WEIGHT` tills individen inte omedelbart "rättar till sig" men inte heller "struntar" för mycket i flocken. Efter alignment så ser det väldigt mycket mer ut som en flock, men dock hamnar den i en rätt tråkigt "stabilt" läge efter en kort tid.


### Tillför brus och personlighet

*Fråga: Hur håller du reda på ditt "svarta får"?*

Jag införde inte ett "svart får", utan jag införde olika grad av personlighet till varje individ i flocken. Istället införde jag två variabler för varje individ som påverkar beteendet. `care` justerar hur stor inverkan alignment har, alltså hur mycket individen "bryr sig om" vart de andra är på väg. `sight` påverkar hur långt individen "kan se". Dessa variationer, samt justering av cohesion, avoidance och alignment producerar till slut en mycket intressant simulering.

Utöver dessa personlighetsdrag så kan man se på [rad 172 i app.js](https://github.com/marcusstenbeck/lab-flocking/blob/master/app/js/app.js#L172) att jag inför en slumpmässig variation i hur mycket individen förflyttar sig i sin hastighet.

Jag ska inte sticka under stolen med att jag har suttit många minuter i sträck och beundrat beteendet i detta "akvarium".

```
// från funktionen som initialiserar simulering
	for (var i = 0; i < app.spriteList.length; i++) {
		
		var care = Math.random()*4;  // 0-4

		var sight = Math.random() * 0.6 + 0.7;  // 0.7-1.3
		
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
```


*Fråga: Är ditt svarta får en "ledare" eller en "busig flockmedlem". Hur skulle du ha gjort för att göra den andra av dessa två?*

Sättet jag introducerade brus i flocken är snarare något som liknas vid en busig flockmedlem. Ifall jag hade viljat göra med "självständiga" individer till ledare så hade jag använt individens personlighetsvärden för att vikta hur mycket den påverkade andra individer.


### Bättre flocking

Jag valde att göra en kombination av 5a och 5c, alltså skapa något som attraherar och skingrar flocken. Runt muspekaren finns ett område som lockar individerna mot muspekarens position, och om vänster musknapp är nedtryckt så har området motsatt effekt, individerna vill fly.

Musens påverkar är enligt samma sätt som de andra individera, och kan ses på [rad 126 i app.js](https://github.com/marcusstenbeck/lab-flocking/blob/master/app/js/app.js#L126).