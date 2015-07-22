var Batman = function() {
	Player.apply(this, arguments);
};
Batman.prototype = Object.create(Player.prototype);
Batman.prototype.getName = function() {
	return 'batman';
};
Batman.prototype.getInitialSpriteIndex = function() {
	return 2;
};
Batman.prototype.defineAnimations = function() {
	this.getGameObject().animations.add('moveLeft', [9, 10, 11, 12, 13, 14, 15, 16, 17], 10, true);
	this.getGameObject().animations.add('moveRight', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, true);

	this.getGameObject().animations.add('turnLeft', [13]);
	this.getGameObject().animations.add('turnRight', [0]);
};
Batman.prototype.getDirectionKeys = function() {
	var game = this.getGame();
	return {
		up: game.input.keyboard.addKey(Phaser.Keyboard.W),
		down: game.input.keyboard.addKey(Phaser.Keyboard.S),
		left: game.input.keyboard.addKey(Phaser.Keyboard.A),
		right: game.input.keyboard.addKey(Phaser.Keyboard.D),
	};
};