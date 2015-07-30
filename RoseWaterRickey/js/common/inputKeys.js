//Whoever renamed the methods sure doesn't make difference between Superman and batman

function getCursorKeys (game) {
	return {
        up: game.input.keyboard.addKey(Phaser.Keyboard.UP),
        left: game.input.keyboard.addKey(Phaser.Keyboard.LEFT),
        right: game.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
        fire: game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    };
}

function getWasdKeys (game) {
    return {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        fire: game.input.keyboard.addKey(Phaser.Keyboard.S)
    };
}

module.exports = getWasdKeys();