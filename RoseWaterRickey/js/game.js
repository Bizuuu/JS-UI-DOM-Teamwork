var game = new Phaser.Game(CONST.game.width, CONST.game.height, Phaser.AUTO, '', {
    preload: preload,
    create: createGame,
    update: update
});

function emitParticles(positionX, positionY, sprite, scale, count) {
    var emitter = game.add.emitter(positionX, positionY, 100);
    emitter.makeParticles(sprite);
    emitter.minParticleScale = scale;
    emitter.maxParticleScale = scale;
    emitter.gravity = 200;
    emitter.bounce.setTo(0.2, 0.2);
    emitter.angularDrag = 30;
    emitter.start(true, 2000, null, count);
}

function preload() {
    
}

function createGame() {
    game.state.add('Jumping', Game.JumpingLevel);
    game.state.add('Logic', Game.LogicLevel);
    game.state.add('Asteroid', Game.AsteroidLevel);
    game.state.add('About', Game.About);
    game.state.add('Menu', Game.Menu);
    game.state.add('GameOver', Game.GameOver);
    game.state.add('HowToPlay', Game.HowToPlay);
    game.state.add('Intermediate', Game.Intermediate);
    
    game.state.start('Menu');
}

function update() {
    /*

    Needs a lot of refactoring.

	 var pauseText;
	game.paused = false;
    window.onkeydown = function () {
        if (game.input.keyboard.event.keyCode == 80) { //button "P"
            if (!game.paused) {
                game.paused = true;
				pauseText = game.add.text(0, 0, 'Game is paused!', { fonts: '26px Calibri', fill: '#fff' });
            }
            else {
				game.paused = false;
				pauseText.destroy();
            }
        }
    }
    */
}