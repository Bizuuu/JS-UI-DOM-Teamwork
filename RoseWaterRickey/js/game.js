var stats = Object.create(GameStats);

var game = new Phaser.Game(CONST.game.width, CONST.game.height, Phaser.AUTO, '', {
    preload: preload,
    create: createGame,
    update: update
});


function preload() {
}

function createGame() {
    game.state.add('Jumping', Game.JumpingLevel);
    game.state.add('Logic', Game.LogicLevel);
    game.state.add('Menu', Game.Menu);
    game.state.start('Jumping');
}


function update(){
}