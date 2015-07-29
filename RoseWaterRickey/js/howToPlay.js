var Game = Game || {};

Game.HowToPlay = function (game) {};

Game.HowToPlay.prototype = (function () {
    var layers = {},
        currentLayer,
        jumpingButton,
        asteroidButton,
        logicButton;
    
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
        var sampleText = this.game.add.text(50, 310, 'sample text', {font: '20px Consolas', fill: '#ffffff'});
        layers.jumping.add(jumpingText);
        layers.jumping.add(sampleText);

    }

    function initializeAsteroidLevel () {
        layers.asteroid = this.game.add.group();
        var asteroidText = this.game.add.text(50, 220, 'ASTEROID', {font: '60px Consolas', fill: '#ffffff'});
        layers.asteroid.add(asteroidText);
    }

    function initializeLogicLevel () {
        layers.logic = this.game.add.group();
        var logicText = this.game.add.text(50, 220, 'LOGIC', {font: '60px Consolas', fill: '#ffffff'});
        layers.logic.add(logicText);
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
            this.game.load.image('menu', 'imgs/menu.png');
            this.game.load.image('jumping', 'imgs/howToPlay/jumpLevel.png');
            this.game.load.image('asteroid', 'imgs/howToPlay/asteroidLevel.png');
            this.game.load.image('logic', 'imgs/howToPlay/logicLevel.png');
            this.game.load.image('arrows', 'imgs/howToPlay/arrowKeys.png')
        },
        create: function () {
            this.game.add.button(370, 480, 'menu', this.returnToMenu, this.game);
            //location for wasd image 400(or 450), 200
            this.game.add.sprite(550, 200, 'arrows');

            intializeGroups();
            
            initializeButton(jumpingButton, 'jumping', 50, 50);
            initializeButton(asteroidButton, 'asteroid', 150, 50);
            initializeButton(logicButton, 'logic', 250, 50);


            currentLayer = 'jumping';
            showGroup(layers[currentLayer]);
        },
        returnToMenu: function () {
            this.state.start('Menu');
        }
    };

    return howToPlay;
}());