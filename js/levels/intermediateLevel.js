var Game = Game || {};

Game.Intermediate = function (game) {};

Game.Intermediate.prototype = (function () {
    var intermediate;

    intermediate = {
        preload: function () {
            this.game.load.spritesheet('continue', 'imgs/continueSprite.png', 274, 143);
            this.game.load.bitmapFont('greenFont', 'fonts/greenBitmap_noStroke.png', 'fonts/greenBitmap_noStroke.fnt');
            this.game.load.bitmapFont('redFont', 'fonts/redBitmap_noStroke.png', 'fonts/redBitmap_noStroke.fnt');
        },
        create: function () {
            this.game.add.bitmapText(20, 10, 'redFont', 'BATMAN', 110);
            this.game.add.bitmapText(20, 100, 'greenFont', 'score     ' + stats.batman.total, 70);

            this.game.add.bitmapText(470, 10, 'redFont', 'SUPERMAN', 110);
            this.game.add.bitmapText(480, 100, 'greenFont', 'score     ' + stats.superman.total, 70);

            this.game.add.button(256, 450, 'continue', this.continue, this.game, 1, 0, 2);
        },

        continue: function () {
            if(CONST.currentLevel == 'Jumping'){
                CONST.currentLevel = 'Asteroid';
            } else if(CONST.currentLevel == 'Asteroid'){
                CONST.currentLevel = 'Logic';
            }

            this.state.start(CONST.currentLevel);
        }
    };

    return intermediate;
}());
