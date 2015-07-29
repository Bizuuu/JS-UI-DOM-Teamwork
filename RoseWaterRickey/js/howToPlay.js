var Game = Game || {};

Game.HowToPlay = function (game) {};

Game.HowToPlay.prototype = (function () {
    var layers = {},
        currentLayer,
        jumpingButton,
        asteroidButton,
        logicButton,
        controlsText,
        music;
    
    function intializeGroups () {
        initializeJumpingLevel();
        initializeAsteroidLevel();
        initializeLogicLevel();

        hideGroup(layers.jumping);
        hideGroup(layers.asteroid);
        hideGroup(layers.logic);
    }

    function hideGroup (group) {
        for(var ind = 0, len = group.children.length; ind < len; ind += 1){
            group.children[ind].visible = false;
        }
    }

    function showGroup (group) {
        for(var ind = 0, len = group.children.length; ind < len; ind += 1){
            group.children[ind].visible = true;
        }
    }

    function initializeJumpingLevel () {
        layers.jumping = this.game.add.group();
        var jumpingText = this.game.add.text(50, 220, 'JUMPING', {font: '60px Consolas', fill: '#ffffff'});
        var jumpInstructions = this.game.add.text(50, 310, 'Shoot your enemy as many\ntimes as needed to kill him.', {font: '20px Consolas', fill: '#ffffff'});
        var jumpControlsText = this.game.add.text(400, 300, 'Use A/D & left/right arrows to move, W/up to jump, S/down to shoot.', {font: '10px Consolas', fill: '#ffffff'});
        layers.jumping.add(jumpingText);
        layers.jumping.add(jumpInstructions);
        layers.jumping.add(jumpControlsText);

    }

    function initializeAsteroidLevel () {
        layers.asteroid = this.game.add.group();
        var asteroidText = this.game.add.text(50, 220, 'ASTEROID', {font: '60px Consolas', fill: '#ffffff'});
        var astroInstructions = this.game.add.text(50, 310, 'Avoid asteroids.\nBe better than your enemy!', {font: '20px Consolas', fill: '#ffffff'});
        var astroControlsText = this.game.add.text(400, 300, 'Use A/D & left/right arrows to move, W/up to jump, S/down to shoot.', {font: '10px Consolas', fill: '#ffffff'});
        layers.asteroid.add(asteroidText);
        layers.asteroid.add(astroInstructions);
        layers.asteroid.add(astroControlsText);
    }

    function initializeLogicLevel () {
        layers.logic = this.game.add.group();
        var logicText = this.game.add.text(50, 220, 'LOGIC', {font: '60px Consolas', fill: '#ffffff'});
        var logicInstructions = this.game.add.text(50, 310, 'Take turns droping blocks on\nthe platform. If you loose 5\nblocks you DIEEEE!', {font: '20px Consolas', fill: '#ffffff'});
        var logicControlsText = this.game.add.text(400, 300, 'Use A/D & left/right arrows to move, S/down to drop block.', {font: '10px Consolas', fill: '#ffffff'});
        layers.logic.add(logicText);
        layers.logic.add(logicInstructions);
        layers.logic.add(logicControlsText);
    }

    function initializeButton (button, key, x, y) {
        button = this.game.add.sprite(x, y, key);
        button.variable = key;
        button.inputEnabled = true;
        button.events.onInputDown.add(showLevel, this.game);
    }

    function showLevel (level) {
        hideGroup(layers[currentLayer]);
        currentLayer = level.variable;
        showGroup(layers[currentLayer]);
    }

    var howToPlay = {
        preload: function () {
            //this.game.load.image('menu', 'imgs/menu.png');
            this.game.load.image('jumping', 'imgs/howToPlay/jumpLevel.png');
            this.game.load.image('asteroid', 'imgs/howToPlay/asteroidLevel.png');
            this.game.load.image('logic', 'imgs/howToPlay/logicLevel.png');
            this.game.load.image('arrows', 'imgs/howToPlay/arrowKeys.png');
            this.game.load.image('wasd', 'imgs/howToPlay/wasdKeys.png');
            this.game.load.image('heroes', 'imgs/howToPlay/heroes.png');
            this.game.load.image('lightsDown', 'imgs/gameOver/lightsDown.png');
            this.game.load.image('menu', 'imgs/gameOver/menuButton.png');
            this.game.load.audio('helpMenuMusic', ['audio/menuHelpTheme.mp3']);
        },
        create: function () {
            music = this.game.add.audio('helpMenuMusic');
            music.play();

            this.game.add.sprite(-10, 348, 'lightsDown');
            this.game.add.button(260, 480, 'menu', this.returnToMenu, this.game).scale.setTo(0.75, 0.75);
            this.game.add.sprite(450, 100, 'heroes');
            this.game.add.sprite(600, 200, 'arrows');
            this.game.add.sprite(400, 200, 'wasd');



            intializeGroups();
            
            initializeButton(jumpingButton, 'jumping', 50, 50);
            initializeButton(asteroidButton, 'asteroid', 150, 50);
            initializeButton(logicButton, 'logic', 250, 50);


            currentLayer = 'jumping';
            showGroup(layers[currentLayer]);
        },
        returnToMenu: function () {
            music.stop();
            this.state.start('Menu');
        }
    };

    return howToPlay;
}());