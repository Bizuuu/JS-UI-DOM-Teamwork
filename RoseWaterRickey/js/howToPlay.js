var Game = Game || {};

Game.HowToPlay = function (game) {};

Game.HowToPlay.prototype = (function () {
    var howToPlay = {
        preload: function () {
            this.game.load.image('menu', 'imgs/menu.png');
        },
        create: function () {
            this.game.add.button(370, 480, 'menu', this.returnToMenu, this.game, 1, 0, 2);
        },
        returnToMenu: function () {
            this.state.start('Menu');
        }
    };

    return howToPlay;
}());