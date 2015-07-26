function getBatmanKeys (game) {
	var keys = game.input.keyboard.createCursorKeys();
	keys.fire = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	return keys;
}

function getSupermanKeys (game) {
    return {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        fire: game.input.keyboard.addKey(Phaser.Keyboard.M)
    };
}
