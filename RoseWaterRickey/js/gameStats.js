var PlayerStats = (function () {
    var JumpingStats = (function () {
        var jumpingStats = {
            init: function(){
                this.score = 0;
                this.lives = CONST.player.initialLives;

                return this;
            },
            get score(){
                return this._score;
            },
            set score(value){
                this._score = value;
            },
            get lives(){
                return this._lives;
            },
            set lives(value){
                this._lives = value;
            }
        };

        return jumpingStats;
    }()),
    LogicStats = (function () {
        var logicStats = {
            init: function(){
                this.score = 0;
                this.lives = CONST.player.initialLives;

                return this;
            },
            get score(){
                return this._score;
            },
            set score(value){
                this._score = value;
            },
            get lives(){
                return this._lives;
            },
            set lives(value){
                this._lives = value;
            }
        };

        return logicStats;
    }()),
        jumping = Object.create(JumpingStats).init(),
        logic = Object.create(LogicStats).init();



    var playerStats = {
        jumping: jumping,
        logic: logic,
        get total(){
            return this.jumping.score + this.logic.score;
        }
    };

    return playerStats;
}());

var GameStats = (function () {
    var superman = Object.create(PlayerStats);
    var batman = Object.create(PlayerStats);

    var gameStats = {
        superman: superman,
        batman: batman
    };

    return gameStats;
}());

