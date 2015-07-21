var platforms, log, sq;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: createGame,
    update: update
});

function preload() {
    game.load.image('background', 'imgs/background.png');
    game.load.image('log', 'imgs/log.png');
    game.load.image('log2', 'imgs/log2.png');
    game.load.spritesheet('sq', 'imgs/dude.png', 32, 48);
}

function createGame() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'background');

    platforms = game.add.group();
    platforms.enableBody = true;

    for (var ind = 0, len = platformsCoordinates.length, coords; ind < len; ind += 1) {
        coords = platformsCoordinates[ind];
        log = platforms.create(coords.x, coords.y, 'log');
        log.body.immovable = true;
    }

    sq = game.add.sprite(20, 20, 'sq', 4);

    game.physics.arcade.enable(sq);

    sq.body.bounce.y = 0.2;
    sq.body.gravity.y = 300;
    sq.body.collideWorldBounds = true;

    sq.animations.add('moveLeft', [0, 1, 2, 3], 10, true);
    sq.animations.add('moveRight', [5, 6, 7, 8], 10, true);

    sq.animations.add('turnLeft', [0]);
    sq.animations.add('turnRight', [8]);

    key = game.input.keyboard.createCursorKeys();
}

function update() {
    game.physics.arcade.collide(sq, platforms);

    reactToUserInput();
}

function reactToUserInput() {
    sq.body.velocity.x = 0;

    if (key.left.isDown) {
        sq.body.velocity.x = -200;

        if (sq.body.touching.down) {
            sq.animations.play('moveLeft');
        } else {
            sq.animations.play('turnLeft');
        }
    } else if (key.right.isDown) {
        sq.body.velocity.x = 200;
        if (sq.body.touching.down) {
            sq.animations.play('moveRight');
        } else {
            sq.animations.play('turnRight');
        }
    } else {
        sq.animations.stop();
    }

    if (key.up.isDown && sq.body.touching.down) {
        sq.body.velocity.y = -350;
    }
}