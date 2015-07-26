var Game = Game || {};

Game.LogicLevel = function(game){};

Game.LogicLevel.prototype = (function () {

var platform, platformCG, cubesCG, cube, pointer, cursorKeys, wasdKeys, canCreate = true, cube, lastCubeCoord = {x: -1, y: -1};

    function createCube (x) {
        cube = game.add.sprite(x, 0, 'cube');
        game.physics.p2.enable(cube);
        cube.body.setCollisionGroup(cubesCG);
        cube.body.collides([platformCG, cubesCG]);
        cube.body.mass = 100;
        cube.body.gravity.y = 900;
        cube.body.velocity.y = 400;
        cube.body.bounce = 0;
        canCreate = false;
    }

    function moveTriangle () {
        pointer.body.setZeroVelocity();

        if (cursorKeys.left.isDown ||wasdKeys.left.isDown) {
            if(pointer.body.x - pointer.width/2 > 0)
            pointer.body.velocity.x = -CONST.game.physics.xVelocity;
        } else if (cursorKeys.right.isDown ||wasdKeys.right.isDown) {
            if(pointer.body.x + pointer.width/2 < CONST.game.world.width)
            pointer.body.velocity.x = CONST.game.physics.xVelocity;
        }

        if (cursorKeys.down.isDown ||wasdKeys.down.isDown) {
            if(canCreate)
            createCube(pointer.body.x);
        }
    }



    var logicLevel = {
        preload : function() {
            this.game.load.image('platform', 'imgs/platform.png');
            this.game.load.image('cube', 'imgs/cube.png');
            this.game.load.image('background', 'imgs/logicLevelBackground.png');
            this.game.load.image('pointer', 'imgs/triangle.png');
        },
        create: function () {
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this. game.physics.p2.gravity.y = CONST.game.physics.p2Gravity;

            cursorKeys = getCursorKeys(this.game);
            wasdKeys = getWasdKeys(this.game);


            this.game.add.sprite(0, 0, 'background');

            platformCG = game.physics.p2.createCollisionGroup();
            cubesCG = game.physics.p2.createCollisionGroup();

            platform = game.add.sprite(400, 500, 'platform');
            game.physics.p2.enable(platform);
            platform.body.setCollisionGroup(platformCG);
            platform.body.collides([cubesCG]);
            platform.body.static = true;

            pointer = game.add.sprite(380, 0, 'pointer');
            game.physics.p2.enable(pointer);
            pointer.body.kinematic  = true;
            pointer.body.collideWorldBounds = true;
        },
        update: function(){
            moveTriangle();

            

            if(cube){
                if(
                    Math.round(lastCubeCoord.x * 100) / 100
                     == Math.round(cube.body.x * 100) / 100 &&
                    Math.round(lastCubeCoord.y * 100) / 100
                    == Math.round(cube.body.y * 100) / 100
                || cube.body.y > CONST.game.world.height
                ){
                    cube.body.setZeroVelocity();
                    canCreate = true;
                }


                lastCubeCoord.x = cube.body.x;
                lastCubeCoord.y = cube.body.y;

            }
        }
    };

    return logicLevel;
}());
