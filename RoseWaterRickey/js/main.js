(function() {
    var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
        preload: preload,
        create: createGame,
        update: update,
    });
    var platforms = null;
    var batman = null;
    var superman = null;

    function preload() {
        game.load.image('background', 'imgs/background.png');
        game.load.image('log', 'imgs/log.png');
        game.load.spritesheet('batman', 'imgs/batmanSprite.png', 53, 58);
        game.load.spritesheet('superman', 'imgs/supermanSprite.png', 53, 58);
    }

    function createGame() {
        initPlatforms();
        initPlayers();

        game.physics.startSystem(Phaser.Physics.ARCADE);
    }

    function update() {
        batman.update(platforms);
        superman.update(platforms);
    }

    function initPlatforms() {
        game.add.sprite(0, 0, 'background');

        platforms = game.add.group();
        platforms.enableBody = true;

        for (var i = 0, len = platformsCoordinates.length, coords; i < len; i += 1) {
            coords = platformsCoordinates[i];
            log = platforms.create(coords.x, coords.y, 'log');
            log.body.immovable = true;
        }
    }

    function initPlayers() {
        batman = new Batman(game, 50, 0);
        superman = new Superman(game, 700, 0);
    }
}());