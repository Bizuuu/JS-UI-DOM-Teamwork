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
            var batmanGO,
                supermanGO,
                texts;
            //this.game.add.sprite(0, 0, 'background');
            this.game.add.sprite(85, -10, 'gameOver');

            texts = this.game.add.sprite(40, 150, 'texts');
            texts.scale.setTo(0.9, 0.9);
            //animate the yoyo effect
            this.game.add.tween(texts).to({y: 200}, 500, Phaser.Easing.Cubic.InOut, true, 100, 2, true);

            //rotating figures
            batmanGO = this.game.add.sprite(80, 460, 'batman');
            batmanGO.anchor.setTo(0, 0.9);
            batmanGO.angle = -50;
            this.game.add.tween(batmanGO).to({angle: 0}, 100, Phaser.Easing.Linear.None, true);
            this.game.add.tween(batmanGO.scale).to({x: 0.95, y: 0.95}, 100, Phaser.Easing.Linear.None, true);
            supermanGO = this.game.add.sprite(670, 450, 'superman');
            supermanGO.anchor.setTo(0.9, 0.9);
            supermanGO.angle = 50;
            this.game.add.tween(supermanGO).to({angle: 0}, 100, Phaser.Easing.Linear.None, true);


            music = this.game.add.audio('stamp');


            if (stats.batman.total < stats.superman.total) {
                winnerStampX = 450;
            } else {
                winnerStampX = 120;   //120
            }
            this.game.time.events.add(Phaser.Timer.SECOND * 0.5, this.announceWinner, this.game);
            this.game.add.sprite(-10, 348, 'lightsDown');
            //lights.scale.setTo(0.8, 0.8);

            this.game.add.button(260, 480, 'menu', this.returnToMenu, this.game).scale.setTo(0.75, 0.75);


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