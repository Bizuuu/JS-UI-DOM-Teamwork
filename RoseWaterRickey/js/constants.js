var CONST = {
    direction: {
        left: 'left',
        right: 'right'
    },
    player: {
        initialLives: 5,
        maxHealth: 240,
    },
    game: {
        world: {
            width: 800,
            height: 600,
            playerSpawnOffset: 110
        },
        physics: {
            playerXVelocity: 200,
            playerYVelocity: 350,
            p2Gravity: 200,
            bulletVelocity: 250,
            asteroids: {
                Velocity: 140,
                GenerationFrequency: 500
            }
        },
        counterGame:{
            count: 1,
            levelNumber: 3
        }
    }
};
