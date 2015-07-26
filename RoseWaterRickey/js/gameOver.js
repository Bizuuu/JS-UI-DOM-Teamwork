var Game = Game || {};

Game.GameOver = function (game) {};

Game.GameOver.prototype = (function () {
    var music,
        winnerStampX;

    var gameOver = {
        preload: function () {
            this.game.load.image('background', 'imgs/batmanVsSuperman.jpg');
            this.game.load.image('winnerStamp', 'imgs/winner.png');
            this.game.load.image('menu', 'imgs/menu.png');
            this.game.load.audio('stamp', ['audio/stamp.mp3']);
        },
        create: function () {
            this.game.add.sprite(0, 0, 'background');
            music = this.game.add.audio('stamp');


            if(stats.batman.total < stats.superman.total){
                winnerStampX = 520;
            } else {
                winnerStampX = 50;
            }
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.announceWinner, this.game);
            this.game.add.button(380, 480, 'menu', this.returnToMenu, this.game, 1, 0, 2);

        },
        announceWinner: function () {
            this.add.sprite(winnerStampX, 150, 'winnerStamp');
            music.play();
        },
        returnToMenu: function(){
            this.state.start('Menu');
        }
    };

    return gameOver;
}());