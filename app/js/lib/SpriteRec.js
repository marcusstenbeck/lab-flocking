define([], function () {

	function SpriteRec(options) {
		this.position = options.position || {};
		this.position.x = options.position.x || 0;
		this.position.y = options.position.y || 0;

		this.speed = options.speed || {};
		this.speed.x = options.speed.x || 0;
		this.speed.y = options.speed.y || 0;

		this.rotation = options.rotation || 0;
		this.textureData = options.textureData || '';
	};

	return SpriteRec;
})