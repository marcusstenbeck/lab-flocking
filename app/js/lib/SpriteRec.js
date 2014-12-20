define([], function () {

	function SpriteRec() {
		this.position = { x: 0, y: 0 };
		this.speed = { x: 0, y: 0 };
		this.rotation = 0;
		this.textureData = '';
	};

	return SpriteRec;
})