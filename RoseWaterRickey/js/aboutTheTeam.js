var Game = Game || {};

Game.About = function (game) {};

Game.About.prototype = (function () {
    var about = {
        preload: function () {
            this.game.load.image('github', 'imgs/github.png');
            this.game.load.image('menu', 'imgs/menu.png');
        },
        create: function () {
            this.game.add.button(350, 80, 'github', this.redirectToGithub, this.game, 1, 0, 2);
            this.game.add.text(300, 50, 'Check us on GitHub', {font: '30px Consolas', fill: "#ffffff"});
            this.game.add.button(370, 480, 'menu', this.returnToMenu, this.game, 1, 0, 2);
        },
        redirectToGithub: function(){
            console.log('github');
            window.open("https://github.com/RoseWaterRickey", "_blank");
        },
        returnToMenu: function () {
            this.state.start('Menu');
        }
    };

    return about;
}());