var platforms, log, batman, superman;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: createGame,
    update: update
});

function preload() {
    game.load.image('background', 'imgs/background.png');
    game.load.image('log', 'imgs/log.png');
    game.load.image('log2', 'imgs/log2.png');
    game.load.spritesheet('batman', 'imgs/batmanSprite.png', 53, 58);
    game.load.spritesheet('superman', 'imgs/supermanSprite.png', 53, 58);
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

    batman = game.add.sprite(720, 20, 'batman', 4);
    superman = game.add.sprite(20, 30, 'superman', 4);


    addPhysicsToPlayer(batman);
    addPhysicsToPlayer(superman);
    addMovementAnimationToPlayer(batman, [9, 10, 11, 12, 13, 14, 15, 16, 17], [0, 1, 2, 3, 4, 5, 6, 7, 8], [13], [0]);
    addMovementAnimationToPlayer(superman, [7, 8, 9, 10, 11, 12, 13], [0, 1, 2, 3, 4, 5, 6], [13], [0]);

    function addPhysicsToPlayer (player) {
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        player.body.acceleration.y = 280;
    }

    function addMovementAnimationToPlayer (player, leftMovementFrames, rightMovementFrames, turnLeftFrames, turnRightFrames) {
        player.animations.add('moveLeft', leftMovementFrames, 10, true);
        player.animations.add('moveRight', rightMovementFrames, 10, true);
        player.animations.add('turnLeft', turnLeftFrames);
        player.animations.add('turnRight', turnRightFrames);
    }
}

function update() {
    game.physics.arcade.collide(batman, platforms);
    game.physics.arcade.collide(superman, platforms);
    
    var wasd = {
                up: game.input.keyboard.addKey(Phaser.Keyboard.W),
                down: game.input.keyboard.addKey(Phaser.Keyboard.S),
                left: game.input.keyboard.addKey(Phaser.Keyboard.A),
                right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            };
    var key = game.input.keyboard.createCursorKeys();

    reactToUserInput(batman, key);
    reactToUserInput(superman, wasd);
}

function reactToUserInput(player, command) {

    player.body.velocity.x = 0;

    if (command.left.isDown) {
        player.body.velocity.x = -200;

        if (player.body.touching.down ) {
            player.animations.play('moveLeft');
        } else {
            player.animations.play('turnLeft');
        }
    } else if (command.right.isDown) {
        player.body.velocity.x = 200;
        if (player.body.touching.down) {
            player.animations.play('moveRight');
        } else {
            player.animations.play('turnRight');
        }
    } else {
        player.animations.stop();
    }

    if (command.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}