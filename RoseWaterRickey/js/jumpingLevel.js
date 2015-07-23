var Game = Game || {};

Game.JumpingLevel = function(){};

Game.JumpingLevel.prototype = (function () {
    var platforms,
        log,
        players,
        cursorKeys,
        wasdKeys;

    function initPlatforms (game) {
        platforms = game.add.group();
        platforms.enableBody = true;

        for (var i = 0, len = platformsCoordinates.length, coords; i < len; i += 1) {
            coords = platformsCoordinates[i];
            log = platforms.create(coords.x, coords.y, 'log');
            log.body.immovable = true;
        }
    }

    function reactToInput(player, directionKeys) {
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
    }

    var jumpingLevel = {
        preload: function(){
            this.load.image('background', 'imgs/background.png');
            this.load.image('log', 'imgs/log.png');
            this.load.spritesheet('batman', 'imgs/batmanSprite.png', 53, 48);
            this.load.spritesheet('superman', 'imgs/supermanSprite.png', 53, 55);
        },
        create: function(){
            this.add.sprite(0, 0, 'background');

            this.physics.startSystem(Phaser.Physics.ARCADE);
            initPlatforms(this);

            cursorKeys = this.input.keyboard.createCursorKeys();
            wasdKeys = {
                up: this.input.keyboard.addKey(Phaser.Keyboard.W),
                down: this.input.keyboard.addKey(Phaser.Keyboard.S),
                left: this.input.keyboard.addKey(Phaser.Keyboard.A),
                right: this.input.keyboard.addKey(Phaser.Keyboard.D)
            };

            players = {};
            players.batman = Object.create(Player)
                .init(this.add.sprite(20, 0, 'batman'))
                .addPhysics(this, 0.2, 300, 280)
                .addAnimations([9, 10, 11, 12, 13, 14, 15, 16, 17], [0, 1, 2, 3, 4, 5, 6, 7, 8], 13, 0);

            players.superman = Object.create(Player)
                .init(this.add.sprite(720, 0, 'superman'))
                .addPhysics(this, 0.2, 300, 280)
                .addAnimations([7, 8, 9, 10, 11, 12, 13], [0, 1, 2, 3, 4, 5, 6], 13, 0);
        },
        update: function(){
            this.physics.arcade.collide(players.batman.sprite, platforms);
            this.physics.arcade.collide(players.superman.sprite, platforms);

            reactToInput(players.batman.sprite, wasdKeys);
            reactToInput(players.superman.sprite, cursorKeys);
        }
    };

    return jumpingLevel;
}());