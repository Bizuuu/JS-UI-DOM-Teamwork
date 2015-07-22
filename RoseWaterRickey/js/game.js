var platforms, log, superman, batman, cursorKeys, wasdKeys, players;

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
    preload: preload,
    create: createGame,
    update: update
});

function preload() {
    game.load.image('background', 'imgs/background.png');
    game.load.image('log', 'imgs/log.png');
    game.load.image('log2', 'imgs/log2.png');
    game.load.spritesheet('dude', 'imgs/dude.png', 32, 48);
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

    superman = game.add.sprite(20, 20, 'dude', 4);
    superman = addPlayerPhysics(superman);
    batman = game.add.sprite(740, 20, 'dude', 4);
    batman = addPlayerPhysics(batman);

    players = {
      superman: superman,
        batman: batman
    };

    cursorKeys = game.input.keyboard.createCursorKeys();
    wasdKeys = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D)
    };

    function addPlayerPhysics (player) {
        game.physics.arcade.enable(player);

        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;
        player.body.acceleration.y = 280;

        player.animations.add('moveLeft', [0, 1, 2, 3], 10, true);
        player.animations.add('moveRight', [5, 6, 7, 8], 10, true);

        player.animations.add('turnLeft', [0]);
        player.animations.add('turnRight', [8]);

        return player;
    }
}

function update() {

    for(var player in players){
        game.physics.arcade.collide(players[player], platforms);
    }

    reactToInput(players.superman, wasdKeys);
    reactToInput(players.batman, cursorKeys);
}

function reactToInput(player, keys) {

   player.body.velocity.x = 0;

    if (keys.left.isDown) {
        player.body.velocity.x = -200;

        if (player.body.touching.down) {
            player.animations.play('moveLeft');
        } else {
            player.animations.play('turnLeft');
        }
    } else if (keys.right.isDown) {
        player.body.velocity.x = 200;
        if (player.body.touching.down) {
            player.animations.play('moveRight');
        } else {
            player.animations.play('turnRight');
        }
    } else {
        player.animations.stop();
    }

    if (keys.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -350;
    }
}