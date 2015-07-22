var Superman = function() {
	Player.apply(this, arguments);
};
Superman.prototype = Object.create(Player.prototype);
Superman.prototype.getName = function() {
	return 'superman';
};
Superman.prototype.getInitialSpriteIndex = function() {
	return 2;
};
Superman.prototype.defineAnimations = function() {
	this.getGameObject().animations.add('moveLeft', [7, 8, 9, 10, 11, 12, 13], 10, true);
    this.getGameObject().animations.add('moveRight', [0, 1, 2, 3, 4, 5, 6], 10, true);

    this.getGameObject().animations.add('turnLeft', [13]);
    this.getGameObject().animations.add('turnRight', [0]);
};
Superman.prototype.getDirectionKeys = function() {
	return this.getGame().input.keyboard.createCursorKeys();
};