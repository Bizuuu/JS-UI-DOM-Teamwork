var stats = {
    batman: {
        jumping: {
            score: 0
        },
        logic: {
            score: 0,
            lives: CONST.player.initialLives
        },
        asteroid: {
            score: 0,
            lives: CONST.player.initialLives
        },
        get total() {
            return this.logic.score + this.jumping.score + this.asteroid.score;
        }
    },
    superman: {
        jumping: {
            score: 0
        },
        logic: {
            score: 0,
            lives: CONST.player.initialLives
        },
        asteroid: {
            score: 0,
            lives: CONST.player.initialLives
        },
        get total() {
            return this.logic.score + this.jumping.score + this.asteroid.score;
        }
    }
};