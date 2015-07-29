var Game = Game || {};

Game.Menu = function (game) {};

Game.Menu.prototype = (function () {
    var music;
    var menu = {
        preload: function () {

            this.game.load.image('menu', 'imgs/menuBackground.png');
            this.game.load.spritesheet('playButton', 'imgs/buttonSprite.png', 274, 143);
            this.game.load.spritesheet('teamButton', 'imgs/teamButtonSprite.png', 118, 108);
            this.game.load.spritesheet('howToButton', 'imgs/howToSprite.png', 118, 110);
            this.game.load.audio('menuMusic', ['audio/mainTheme.mp3']);
        },
        create: function () {
            music = this.game.add.audio('menuMusic');
            music.play();
            this.game.add.sprite(0, 0, 'menu');
            this.game.add.button(256, 318, 'playButton', this.startGame, this.game, 1, 0, 2);
            this.game.add.button(100, 425, 'teamButton', this.showTeam, this.game, 1, 0, 2);
            this.game.add.button(550, 440, 'howToButton', this.showGameInfo, this.game, 1, 0, 2);

        },
        startGame: function () {
            music.stop();
            this.state.start('Jumping');
        },
        showTeam: function () {

        },
        showGameInfo: function () {

        }
    };

    return menu;
}());