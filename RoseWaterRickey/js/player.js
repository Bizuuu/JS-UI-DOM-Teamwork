var Player = function(game, x, y) {
	this.game = game;
	this.gameObject = game.add.sprite(x, y, this.getName(), this.getInitialSpriteIndex());
	game.physics.arcade.enable(this.gameObject);
	this.gameObject.body.bounce.y = 0.2;
	this.gameObject.body.gravity.y = 300;
	this.gameObject.body.collideWorldBounds = true;
	this.gameObject.body.acceleration.y = 280;
	this.defineAnimations();
};
Player.prototype.getGame = function() {
	return this.game;
}
Player.prototype.getGameObject = function() {
	return this.gameObject;
};
Player.prototype.update = function(platforms) {
	this.getGame().physics.arcade.collide(this.getGameObject(), platforms);
	this.reactToKeyboardInput();
};
Player.prototype.reactToKeyboardInput = function() {
	var directionKeys = this.getDirectionKeys();
	var player = this.getGameObject();
	player.body.velocity.x = 0;

	if (directionKeys.left.isDown) {
		player.body.velocity.x = -200;

		if (player.body.touching.down) {
			player.animations.play('moveLeft');
		} else {
			player.animations.play('turnLeft');
		}
	} else if (directionKeys.right.isDown) {
		player.body.velocity.x = 200;
		if (player.body.touching.down) {
			player.animations.play('moveRight');
		} else {
			player.animations.play('turnRight');
		}
	} else {
		player.animations.stop();
	}

	if (directionKeys.up.isDown && player.body.touching.down) {
		player.body.velocity.y = -350;
	}
};
Player.prototype.getName = function() {
	throw new Error('Not implemented');
};
Player.prototype.getInitialSpriteIndex = function() {
	throw new Error('Not implemented');
};
Player.prototype.defineAnimations = function() {
	throw new Error('Not implemented');
};
Player.prototype.getDirectionKeys = function() {
	throw new Error('Not implemented');
};