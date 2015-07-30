var Game = Game || {};

Game.AsteroidLevel = function (game) { };

/* globals HealthBar, Phaser, getBatmanKeys, getSupermanKeys, CONST, stats, Player */
Game.AsteroidLevel.prototype = (function () {
    var platforms,
        log,
        players,
        batmanKeys,
        supermanKeys,
        music,
        jump,
        run,
        asteroid,
        asteroids,
        healthBars,
        playerCollisionTime = 0,
        asteroidTime = 0;

    function playFx(action) {
        switch (action) {
            case 'jump':
                jump.play();
                break;

            case 'run':
                run.play("", 0, 1, false, false);
                break;
        }
    }

    function initPlatform() {
        var platformOffset = 5;
        log = platforms.create(1, game.world.height - platformOffset, '');
        log.scale.setTo(25, 0);
        log.body.immovable = true;
    }

    function createAsteroid() {
        asteroid = asteroids.create(game.world.randomX, 0, 'asteroid');
        asteroid.body.velocity.y = CONST.game.physics.asteroids.Velocity * (Math.random() + 1.1);
    }

    function generateAsteroids() {
        if (game.time.now > asteroidTime) {
            createAsteroid();
            createAsteroid();
            asteroidTime = game.time.now + CONST.game.physics.asteroids.GenerationFrequency;
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

        if (directionKeys.up.isDown && sprite.body.touching.down) {
            playFx('jump');
            sprite.body.velocity.y = -CONST.game.physics.playerYVelocity;
        }
    }

    function checkForWinner() {
        if (players.batman.health <= 0 || players.superman.health <= 0) {
            if(players.batman.health <= 0){
                stats.superman.asteroid.score += 700;
            } else {
                stats.batman.asteroid.score += 700;
            }
            music.stop();
            game.state.start('Intermediate');
        }
    }

    function detectCollisions() {
        this.game.physics.arcade.collide(players.batman.sprite, platforms);
        this.game.physics.arcade.collide(players.superman.sprite, platforms);
        this.game.physics.arcade.collide(asteroids, platforms, asteroidGroundCollisionHandler);

        this.game.physics.arcade.collide(players.batman.sprite, asteroids, asteroidPlayerCollisionHandler);
        this.game.physics.arcade.collide(players.superman.sprite, asteroids, asteroidPlayerCollisionHandler);
        this.game.physics.arcade.collide(players.batman.sprite, players.superman.sprite, playersCollisionHandler);
    }

    function asteroidPlayerCollisionHandler(player, asteroid) {             
        players[player.key].health -= 40;        
        healthBars[player.key].setHealth(players[player.key].health / CONST.player.maxHealth);  
        emitParticles(asteroid.position.x + 10, asteroid.position.y + 20, 'asteroidParticle', 0.55, 5);
        asteroid.kill();
    }

    function asteroidGroundCollisionHandler(asteroid, platform) {
        emitParticles(asteroid.position.x + 10, asteroid.position.y + 20, 'asteroidParticle', 0.55, 10);
        asteroid.kill();
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
            stats[jumpingPlayerToString].asteroid.score += 40;
            players[attackedPlayerToString].health -= 40;
            healthBars[attackedPlayerToString].setHealth(players[attackedPlayerToString].health / CONST.player.maxHealth);
            playerCollisionTime = game.time.now + 500;
        }
    }

    var asteroidLevel = {
        preload: function () {
            this.game.load.image('background', 'imgs/asteroidLevel/background.png');
            this.game.load.image('greenTexture', 'imgs/jumpingLevel/greenTexture.png');
            this.game.load.image('redTexture', 'imgs/jumpingLevel/redTexture.png');
            this.game.load.image('asteroid', 'imgs/asteroidLevel/asteroid.png');
            this.game.load.image('asteroidParticle', 'imgs/asteroidLevel/asteroidChunk.png');
            this.game.load.audio('levelMusic', ['audio/jumpingLevelTheme.mp3']);
            this.game.load.audio('jump', 'audio/jump.mp3');
            this.game.load.audio('running', 'audio/running.mp3');
            this.game.load.spritesheet('batman', 'imgs/jumpingLevel/batmanSprite.png', 53, 48);
            this.game.load.spritesheet('superman', 'imgs/jumpingLevel/supermanSprite.png', 53, 55);

        },
        create: function () {
            CONST.currentLevel = 'Asteroid';

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.add.sprite(0, 0, 'background');

            healthBars = {
                batman: new HealthBar(20, 20, game),
                superman: new HealthBar(540, 20, game)
            };

            music = this.game.add.audio('levelMusic');
            jump = this.game.add.audio('jump');
            run = this.game.add.audio('running');

            platforms = this.game.add.group();
            asteroids = this.game.add.group();
            players = this.game.add.group();
            platforms.enableBody = true;
            asteroids.enableBody = true;
            players.enableBody = true;

            players.batman = Object.create(Player)
                .init(this.game.add.sprite(20, CONST.game.world.height - CONST.game.world.playerSpawnOffset, 'batman', 0))
                .addPhysics(this, 0.2, 300, 280)
                .addAnimations([9, 10, 11, 12, 13, 14, 15, 16, 17], [0, 1, 2, 3, 4, 5, 6, 7, 8], [24, 25, 26, 27, 28, 29], [18, 19, 20, 21, 22, 23]);

            players.superman = Object.create(Player)
                .init(this.game.add.sprite(720, CONST.game.world.height - CONST.game.world.playerSpawnOffset, 'superman', 0))
                .addPhysics(this, 0.2, 300, 280)
                .addAnimations([7, 8, 9, 10, 11, 12, 13], [0, 1, 2, 3, 4, 5, 6], [20, 21, 22, 23, 24, 25], [14, 15, 16, 17, 18, 19]);

            batmanKeys = getBatmanKeys(this.game);
            supermanKeys = getSupermanKeys(this.game);
            this.game.input.onDown.add(music.restart, this);

            initPlatform();            
            music.play();
        },
        update: function () {
            generateAsteroids();
            detectCollisions();
            checkForWinner();

            reactToInput(players.batman, supermanKeys);
            reactToInput(players.superman, batmanKeys);
        }
    };

    return asteroidLevel;
} ());