var Game = Game || {};

Game.About = function (game) {};

Game.About.prototype = (function () {
    var teamMembersText = {},
        teamMembers = [
            { nickname: 'dentia', participated: 'participated' },
            { nickname: 'alara.kalama', participated: 'participated' },
            { nickname: 'Stev3n', participated: 'participated' },
            { nickname: 'Rodoteia.Yordanova', participated: 'participated' },
            { nickname: 'Bizuuu', participated: 'participated' },
            { nickname: 'ahansb', participated: 'participated' },
            { nickname: 'Boyan1912', participated: 'notParticipated' }
        ],
        music;

    function getRandom (max) {
        return Math.floor((Math.random() * max) + 1);
    }

    function addTeamMember (member) {
        var x = getRandom(CONST.game.world.width - 200),
            y = getRandom(CONST.game.world.height - 100);
        teamMembersText[member] = this.game.add.bitmapText(x, y, member.participated, member.nickname, 70);
        teamMembersText[member].inputEnabled = true;
        teamMembersText[member].input.enableDrag();
    }

    function loadMembers () {
        for(var ind = 0, len = teamMembers.length; ind < len; ind += 1){
            addTeamMember(teamMembers[ind]);
        }
    }

    var about = {
        preload: function () {
            this.game.load.image('github', 'imgs/github.png');
            this.game.load.image('menu', 'imgs/smallerMenu.png');
            this.game.load.bitmapFont('participated', 'fonts/participated_noStroke.png', 'fonts/participated_noStroke.fnt');
            this.game.load.bitmapFont('notParticipated', 'fonts/notParticipated_noStroke.png', 'fonts/notParticipated_noStroke.fnt');
            this.game.load.audio('helpMenuMusic', ['audio/menuHelpTheme.mp3']);
        },
        create: function () {
            music = this.game.add.audio('helpMenuMusic');
            music.play();
            this.game.add.button(5, 5, 'github', this.redirectToGithub, this.game, 1, 0, 2);
            this.game.add.button(350, 540, 'menu', this.returnToMenu, this.game, 1, 0, 2);

            loadMembers();
        },
        redirectToGithub: function(){
            console.log('github');
            window.open("https://github.com/RoseWaterRickey", "_blank");
        },
        returnToMenu: function () {
            music.stop();
            this.state.start('Menu');
        }
    };

    return about;
}());