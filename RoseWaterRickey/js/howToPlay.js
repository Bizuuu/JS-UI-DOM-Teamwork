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
        var jumpingText = this.game.add.text(20, 320, 'JUMPING', {font: '60px Consolas', fill: '#ffffff'});
        layers.jumping.add(jumpingText);
    }

    function initializeAsteroidLevel () {
        layers.asteroid = this.game.add.group();
        var asteroidText = this.game.add.text(20, 320, 'ASTEROID', {font: '60px Consolas', fill: '#ffffff'});
        layers.asteroid.add(asteroidText);
    }

    function initializeLogicLevel () {
        layers.logic = this.game.add.group();
        var logicText = this.game.add.text(20, 320, 'LOGIC', {font: '60px Consolas', fill: '#ffffff'});
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
            this.game.load.image('jumping', 'imgs/one.png');
            this.game.load.image('asteroid', 'imgs/two.png');
            this.game.load.image('logic', 'imgs/three.png');
        },
        create: function () {
            this.game.add.button(370, 480, 'menu', this.returnToMenu, this.game, 1, 0, 2);

            intializeGroups();
            
            initializeButton(jumpingButton, 'jumping', 50, 50);
            initializeButton(asteroidButton, 'asteroid', 130, 50);
            initializeButton(logicButton, 'logic', 240, 50);

            currentLayer = 'jumping';
            showGroup(layers[currentLayer]);
        },
        returnToMenu: function () {
            this.state.start('Menu');
        }
    };

    return howToPlay;
}());