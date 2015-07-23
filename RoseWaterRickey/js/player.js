var Player = (function () {
    var player = {
        init: function(sprite){
            this.sprite = sprite;

            return this;
        },
        addPhysics: function(game, bounceY, gravityY, accelerationY){
            game.physics.arcade.enable(this.sprite);
            this.sprite.body.bounce.y = bounceY;
            this.sprite.body.gravity.y = gravityY;
            this.sprite.body.acceleration.y = accelerationY;
            this.sprite.body.collideWorldBounds = true;

            return this;
        },
        addAnimations: function(leftFrames, rightFrames, turnLeft, turnRight){
            this.sprite.animations.add('moveLeft', leftFrames, 10, true);
            this.sprite.animations.add('moveRight', rightFrames, 10, true);
            this.sprite.animations.add('turnLeft', [turnLeft]);
            this.sprite.animations.add('turnRight', [turnRight]);

            return this;
        },
        get sprite(){
            return this._sprite;
        },
        set sprite(value){
            this._sprite = value;
        }
    };
    
    return player;
}());
