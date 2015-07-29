var Game = Game || {};

Game.GameOver = function (game) { };

Game.GameOver.prototype = (function () {
    var music,
        winnerStampX;

    var gameOver = {

        preload: function () {
            this.game.load.image('background', 'imgs/menuImgs/menuBackground.png');
            this.game.load.image('winnerStamp', 'imgs/gameOver/winner.png');
            this.game.load.image('menu', 'imgs/gameOver/menuButton.png');
            this.game.load.image('batman', 'imgs/gameOver/batman.png');
            this.game.load.image('superman', 'imgs/gameOver/superman.png');
            this.game.load.image('gameOver', 'imgs/gameOver/gameOver.png');
            this.game.load.image('lightsDown', 'imgs/gameOver/lightsDown.png');
            this.game.load.image('texts', 'imgs/gameOver/texts.png');

            this.game.load.audio('stamp', ['audio/stamp.mp3']);
        },
        create: function () {
            var batmanGO;
            this.game.add.sprite(0, 0, 'background');
            batmanGO = this.game.add.sprite(0, 0, 'batman');
            batmanGO.scale.setTo(2, -2);
            music = this.game.add.audio('stamp');


            if (stats.batman.total < stats.superman.total) {
                winnerStampX = 450;
            } else {
                winnerStampX = 120;   //120
            }
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.announceWinner, this.game);
            this.game.add.button(270, 500, 'menu', this.returnToMenu, this.game);


        },
        announceWinner: function () {
            this.add.sprite(winnerStampX, 400, 'winnerStamp');
            music.play();
        },
        returnToMenu: function () {
            this.state.start('Menu');
        }
    };

    return gameOver;
} ());