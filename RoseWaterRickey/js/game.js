var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: createGame,
    update: update
});


function preload() {
}

function createGame() {
    game.state.add('Jumping', Game.JumpingLevel);
    game.state.add('Menu', Game.Menu);
    game.state.start('Menu');
}


function update(){
}