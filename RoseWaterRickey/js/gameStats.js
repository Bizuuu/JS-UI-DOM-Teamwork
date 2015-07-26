var stats = {
    batman: {
        jumping: {
            score: 0,
            lives: CONST.player.initialLives
        },
        logic: {
            score: 0,
            lives: CONST.player.initialLives
        },
        get total(){
            return this.logic.score + this.jumping.score;
        }
    },
    superman: {
        jumping: {
            score: 0,
            lives: CONST.player.initialLives
        },
        logic: {
            score: 0,
            lives: CONST.player.initialLives
        },
        get total(){
            return this.logic.score + this.jumping.score;
        }
    }
};