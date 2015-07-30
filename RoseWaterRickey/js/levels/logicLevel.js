var Game = Game || {};

Game.LogicLevel = function (game) { };

Game.LogicLevel.prototype = (function () {

    var platform,
        block,
        platformCollisionGroup,
        blocksCollisionGroup,
        pointer,
        batmanKeys,
        supermanKeys,
        canCreateBlock = true,
        lastBlockCoords = { x: -1, y: -1 },
        player = 'batman',
        canUpdateResult = true,
        healthBars,
        music;

    function endGame() {
		music.stop();
        this.game.state.start('GameOver');
    }

    function switchPlayer() {
        player = (player === 'batman') ? 'superman' : 'batman';
    }

    function reactToBlockState() {
        if (block) {
            var blockX = round(block.body.x),
                blockY = round(block.body.y);

            if ((lastBlockCoords.x == blockX && lastBlockCoords.y == blockY) ||
                block.body.y > CONST.game.world.height) {
                if (canUpdateResult) {

                    if (block.body.y > CONST.game.world.height) {
                        stats[player].logic.score -= 50;
                        stats[player].logic.lives -= 1;
                        healthBars[player].frame += 1;

                        if (stats[player].logic.lives == 0) {
                            endGame();
                        }

                    } else {
                        stats[player].logic.score += 100;
                    }

                    block.body.setZeroVelocity();
                    canCreateBlock = true;
                    canUpdateResult = false;

                    console.log(player + '       score:' + stats[player].logic.score + '         lives:' + stats[player].logic.lives);
                    switchPlayer();
                }
            }

            lastBlockCoords.x = round(block.body.x);
            lastBlockCoords.y = round(block.body.y);
        }
    }

    function round(num) {
        return Math.round(num * 100) / 100;
    }

    function createCube(x) {
        block = game.add.sprite(x, 0, 'cube');
        game.physics.p2.enable(block);
        block.body.setCollisionGroup(blocksCollisionGroup);
        block.body.collides([platformCollisionGroup, blocksCollisionGroup]);
        block.body.mass = 100;
        block.body.gravity.y = 900;
        block.body.velocity.y = 400;
        block.body.bounce = 0;
        canCreateBlock = false;
        canUpdateResult = true;
    }

    function updatePointer(directionKeys) {
        pointer.body.setZeroVelocity();

        if (directionKeys.left.isDown) {
            if (pointer.body.x - pointer.width / 2 > 0) {
                pointer.body.velocity.x = -CONST.game.physics.playerXVelocity;
            }
        } else if (directionKeys.right.isDown) {
            if (pointer.body.x + pointer.width / 2 < CONST.game.world.width) {
                pointer.body.velocity.x = CONST.game.physics.playerXVelocity;
            }
        }

        if (directionKeys.fire.isDown) {
            if (canCreateBlock) {
                createCube(pointer.body.x);
            }
        }
    }

    var logicLevel = {
        preload : function() {
            this.game.load.image('platform', 'imgs/logicLevel/platform2.png');
            this.game.load.image('cube', 'imgs/logicLevel/block.png');
            this.game.load.image('background', 'imgs/logicLevel/logicLevelBackground.png');
            this.game.load.image('pointer', 'imgs/logicLevel/bold.png');
            this.game.load.audio('soundtrack', 'audio/logicLevelTheme.mp3');
            this.game.load.spritesheet('lives', 'imgs/verticalHealthBars.png', 31, 130, 6);
        },
        create: function () {
            CONST.currentLevel = 'Logic';

            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.gravity.y = CONST.game.physics.p2Gravity;

            music = this.game.add.audio('soundtrack');
            this.game.add.sprite(0, 0, 'background');

            healthBars = {
                batman: this.game.add.sprite(10, 100, 'lives', 0),
                superman: this.game.add.sprite(760, 100, 'lives', 0)
            };

            batmanKeys = getCursorKeys(this.game);
            supermanKeys = getWasdKeys(this.game);

            platformCollisionGroup = game.physics.p2.createCollisionGroup();
            blocksCollisionGroup = game.physics.p2.createCollisionGroup();

            platform = game.add.sprite(400, 500, 'platform');
            game.physics.p2.enable(platform);
            platform.body.setCollisionGroup(platformCollisionGroup);
            platform.body.collides([blocksCollisionGroup]);
            platform.body.static = true;

            pointer = game.add.sprite(380, 45, 'pointer');
            game.physics.p2.enable(pointer);
            pointer.body.kinematic = true;
            pointer.body.collideWorldBounds = true;

            music.play("", 0, 0.65, true, true);
            this.game.input.onDown.add(music.restart, this);
        },
        update: function () {
            updatePointer(player == 'superman' ? batmanKeys : supermanKeys);
            reactToBlockState();
        }
    };

    return logicLevel;
} ());
