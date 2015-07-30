var Game = Game || {};

Game.JumpingLevel = function (game) { };

/* globals HealthBar, Phaser, getBatmanKeys, getSupermanKeys, CONST, stats, Player, platformsCoordinates */
Game.JumpingLevel.prototype = (function () {
    var platforms,
        log,
        players,
        batmanKeys,
        supermanKeys,
        music,
        jump,
        run,
        fire,
        bullets,
        bulletTime = 0,
        healthBars,
        playerCollisionTime = 0;

    function playFx(action) {

        switch (action) {
            case 'jump':
                jump.play("", 0, 0.25, false, false);
                break;

            case 'run':
                run.play("", 0, 0.35, false, false);
                break;
            case 'fire':
                fire.play("", 0, 0.3);
                break;
        }

    }

    function initPlatforms() {
        platforms = this.game.add.group();
        platforms.enableBody = true;

        for (var i = 0, len = platformsCoordinates.length, coords; i < len; i += 1) {
            coords = platformsCoordinates[i];
            log = platforms.create(coords.x, coords.y, 'log');
            log.body.immovable = true;
        }
    }

    function reactToInput(player, directionKeys) {
        var sprite = player.sprite;
        sprite.body.velocity.x = 0;

        if (directionKeys.left.isDown) {
            sprite.body.velocity.x = -CONST.game.physics.playerXVelocity;

            if (sprite.body.touching.down) {
                sprite.animations.play('moveLeft');
                playFx('run');
            } else {
                sprite.animations.play('jumpLeft');
            }
        } else if (directionKeys.right.isDown) {
            sprite.body.velocity.x = CONST.game.physics.playerXVelocity;

            if (sprite.body.touching.down) {
                sprite.animations.play('moveRight');
                playFx('run');
            } else {
                sprite.animations.play('jumpRight');
            }
        } else {
            sprite.animations.stop();
        }

        if (directionKeys.fire.isDown && (game.time.now > bulletTime)) {
            playFx('fire');
            createBullet(player);
            bulletTime = game.time.now + 250;
        }

        if (directionKeys.up.isDown && sprite.body.touching.down) {
            playFx('jump');
            sprite.body.velocity.y = -CONST.game.physics.playerYVelocity;
        }
    }

    function createBullet(player) {
        var bullet;
        if (player.direction === CONST.direction.right) {
            bullet = bullets.create(player.sprite.x + player.sprite.width / 2, player.sprite.y + 25, 'bullet');
            bullet.body.velocity.x = CONST.game.physics.bulletVelocity;
        } else {
            bullet = bullets.create(player.sprite.x, player.sprite.y + 25, 'bullet');
            bullet.body.velocity.x = -CONST.game.physics.bulletVelocity;
        }
    }

    function checkForWinner() {
        if (players.batman.health <= 0 || players.superman.health <= 0) {
            music.stop();
            game.state.start('Intermediate');
        }
    }

    function playerAndBulletCollisionHandler(player, bullet) {
        var attackingPlayer, shotPlayer;

        if (player.key === 'batman') {
            shotPlayer = 'batman';
            attackingPlayer = 'superman';
        } else {
            shotPlayer = 'superman';
            attackingPlayer = 'batman';
        }

        bullet.kill();
        stats[attackingPlayer].jumping.score += 150;
        players[shotPlayer].health -= 20;
        healthBars[shotPlayer].setHealth(players[shotPlayer].health / CONST.player.maxHealth);
        emitParticles(bullet.position.x + 5, bullet.position.y + 5, 'bullet', 0.3, 10);
    }

    function playersCollisionHandler() {
        var jumpingPlayer, attackedPlayer;
        var batmanY = players.batman.sprite.y;
        var supermanY = players.superman.sprite.y;
        if (batmanY === supermanY + players.superman.sprite.height) {
            jumpingPlayer = players.superman;
            attackedPlayer = players.batman;
        } else if (supermanY === batmanY + players.batman.sprite.height) {
            jumpingPlayer = players.batman;
            attackedPlayer = players.superman;
        } else {
            return;
        }

        var jumpingPlayerToString = jumpingPlayer === players.batman ? 'batman' : 'superman';
        var attackedPlayerToString = attackedPlayer === players.batman ? 'batman' : 'superman';
        if (game.time.now > playerCollisionTime) {
            stats[jumpingPlayerToString].jumping.score += 40;
            players[attackedPlayerToString].health -= 40;
            healthBars[attackedPlayerToString].setHealth(players[attackedPlayerToString].health / CONST.player.maxHealth);
            playerCollisionTime = game.time.now + 500;
        }
    }

    function detectBulletCollisions() {
        this.game.physics.arcade.collide(players.batman.sprite, bullets, playerAndBulletCollisionHandler);
        this.game.physics.arcade.collide(players.superman.sprite, bullets, playerAndBulletCollisionHandler);
        this.game.physics.arcade.collide(platforms, bullets, function (platform, bullet) {
            emitParticles(bullet.position.x + 5, bullet.position.y + 5, 'bullet', 0.3, 10);
            bullet.kill();
        }, null, this);
    }

    function detectPlayerCollisions() {
        this.game.physics.arcade.collide(players.batman.sprite, platforms);
        this.game.physics.arcade.collide(players.superman.sprite, platforms);
        this.game.physics.arcade.collide(players.batman.sprite, players.superman.sprite, playersCollisionHandler);
    }

    function restartStats () {
        stats.batman.jumping.score = 0;
        stats.superman.jumping.score = 0;

        stats.batman.logic.score = 0;
        stats.superman.logic.score = 0;
        stats.batman.logic.lives = CONST.player.initialLives;
        stats.superman.logic.lives = CONST.player.initialLives;

        stats.batman.asteroid.score = 0;
        stats.superman.asteroid.score = 0;
        stats.batman.asteroid.lives = CONST.player.initialLives;
        stats.superman.asteroid.lives = CONST.player.initialLives;
    }

    var jumpingLevel = {
        preload: function () {
            this.game.load.image('background', 'imgs/jumpingLevel/background.png');
            this.game.load.image('log', 'imgs/jumpingLevel/log.png');
            this.game.load.image('healthbar', 'imgs/jumpingLevel/healthbar.png');
            this.game.load.image('grayHealthbar', 'imgs/jumpingLevel/grayHealthbar.png');
            this.game.load.audio('levelMusic', ['audio/jumpingLevelTheme.mp3']);
            this.game.load.audio('jump', 'audio/jump.mp3');
            this.game.load.audio('running', 'audio/running.mp3');
            this.game.load.audio('fire', 'audio/LaserSoundEffect.mp3');
            this.game.load.spritesheet('batman', 'imgs/jumpingLevel/batmanSprite.png', 53, 48);
            this.game.load.spritesheet('superman', 'imgs/jumpingLevel/supermanSprite.png', 53, 55);
            this.game.load.spritesheet('bullet', 'imgs/jumpingLevel/EnemyBullet.png', 60, 60);

        },
        create: function () {
            CONST.currentLevel = 'Jumping';
            restartStats();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(0, 0, 'background');
            music = this.game.add.audio('levelMusic');
            jump = this.game.add.audio('jump');
            run = this.game.add.audio('running');
            fire = this.game.add.audio('fire');

            healthBars = {
                batman: new HealthBar(20, 20, game),
                superman: new HealthBar(540, 20, game),
            };

            batmanKeys = getBatmanKeys(this.game);
            supermanKeys = getSupermanKeys(this.game);

            players = this.game.add.group();
            bullets = this.game.add.group();
            players.enableBody = true;
            bullets.enableBody = true;

            players.batman = Object.create(Player)
                .init(this.game.add.sprite(100, 140, 'batman', 0))
                .addPhysics(this, 0.2, 300, 280)
                .addAnimations([9, 10, 11, 12, 13, 14, 15, 16, 17], [0, 1, 2, 3, 4, 5, 6, 7, 8], [24, 25, 26, 27, 28, 29], [18, 19, 20, 21, 22, 23]);

            players.superman = Object.create(Player)
                .init(this.game.add.sprite(720, 20, 'superman', 12))
                .addPhysics(this, 0.2, 300, 280)
                .addAnimations([7, 8, 9, 10, 11, 12, 13], [0, 1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 25], [14, 15, 16, 17, 18, 19]);

            initPlatforms(this);
            music.play("", 0, 0.65, true, true);
            this.game.input.onDown.add(music.restart, this);
        },
        update: function () {
            detectPlayerCollisions();
            detectBulletCollisions();
            checkForWinner();

            reactToInput(players.batman, supermanKeys);
            reactToInput(players.superman, batmanKeys);
        }
    };

    return jumpingLevel;
} ());
