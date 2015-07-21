var platforms, log, sq,
    platformsCoordinates = [
    {x: 0, y: 365}, {x: 28, y: 365}, {x: 78, y: 260},
    {x: 128, y: 260}, {x: 146, y: 260}, {x: 196, y: 330},
    {x: 246, y: 330}, {x: 256, y: 192}, {x: 291, y: 192},
    {x: 341, y: 436}, {x: 361, y: 436}, {x: 399, y: 343},
    {x: 409, y: 343}, {x: 452, y: 285}, {x: 472, y: 285},
    {x: 511, y: 244}, {x: 561, y: 244}, {x: 581, y: 244},
    {x: 612, y: 244}, {x: 662, y: 338}, {x: 692, y: 338},
    {x: 727, y: 148}, {x: 757, y: 148}
];
var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: createGame, update: update });

function preload() {
    game.load.image('background', 'imgs/background.png');
    game.load.image('log', 'imgs/log.png');
    game.load.image('log2', 'imgs/log2.png');
    game.load.image('sq', 'imgs/sq.png');
}

function createGame() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    platforms = game.add.group();
    platforms.enableBody = true;

    for(var ind = 0, len = platformsCoordinates.length, coords; ind < len; ind += 1){
        coords = platformsCoordinates[ind];
        log = platforms.create(coords.x, coords.y, 'log');
        log.body.immovable = true;
    }

    sq = game.add.sprite(0, 0, 'sq');

    game.physics.arcade.enable(sq);

    sq.body.bounce.y = 0.2;
    sq.body.gravity.y = 300;
    sq.body.collideWorldBounds = true;
}

function update() {
    game.physics.arcade.collide(sq, platforms);
}