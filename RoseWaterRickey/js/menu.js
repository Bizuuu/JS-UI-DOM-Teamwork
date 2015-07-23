
var Menu = {

    preload : function() {

        game.load.image('menu', 'imgs/menuBackground.png');
        game.load.spritesheet('button', 'imgs/buttonSprite.png', 274, 143);
        game.load.spritesheet('teamButton', 'imgs/teamButtonSprite.png', 118, 108 );
        game.load.spritesheet('howToButton', 'imgs/howToSprite.png', 118, 110);
    },

    create: function () {

        this.add.sprite(0, 0, 'menu');
        this.add.button(256, 318, 'button', this.start, this, 1, 0, 2);
        this.add.button(100, 425, 'teamButton', this.team, this, 1, 0, 2);
        this.add.button(550, 440, 'howToButton', this.howToPlay, this, 1, 0, 2);

    },

    start: function(){
        //this.state.start('');

    },

    team: function(){

    },

    howToPlay: function(){

    }

};