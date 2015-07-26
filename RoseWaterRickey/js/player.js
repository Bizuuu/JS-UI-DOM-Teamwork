var Player = (function() {
    var player = {
        init: function(sprite) {
            this.sprite = sprite;
            return this;
        },
        addPhysics: function(game, bounceY, gravityY, accelerationY) {
            game.physics.arcade.enable(this.sprite);
            this.sprite.body.bounce.y = bounceY;
            this.sprite.body.gravity.y = gravityY;
            this.sprite.body.acceleration.y = accelerationY;
            this.sprite.body.collideWorldBounds = true;

            return this;
        },
        addAnimations: function(leftFrames, rightFrames, jumpLeftFrames, jumpRightFrames) {
            this.sprite.animations.add('moveLeft', leftFrames, 15, true);
            this.sprite.animations.add('moveRight', rightFrames, 15, true);
            this.sprite.animations.add('jumpLeft', jumpLeftFrames, 5, true);
            this.sprite.animations.add('jumpRight', jumpRightFrames, 5, true);

            this.framesWithLeftDirection = [];
            for (var i = 0; i < leftFrames.length; i++) {
                this.framesWithLeftDirection.push(leftFrames[i]);
            }
            for (var i = 0; i < jumpLeftFrames.length; i++) {
                this.framesWithLeftDirection.push(jumpLeftFrames[i]);
            }

            return this;
        },
        addBullet: function() {
            var bullet;
            if (this.direction === CONST.direction.right) {
                bullet = game.add.sprite(this.sprite.x + this.sprite.width, this.sprite.y + 25, 'bullet');
                game.physics.arcade.enable(bullet);
                bullet.body.velocity.x = CONST.game.physics.bulletVelocity;
            } else {
                bullet = game.add.sprite(this.sprite.x, this.sprite.y + 25, 'bullet');
                game.physics.arcade.enable(bullet);
                bullet.body.velocity.x = -CONST.game.physics.bulletVelocity;
            }

            this.bullets.push(bullet);
        },
        removeBullet: function(bullet) {
            this.bullets.splice(this.bullets.indexOf(bullet), 1);
        },
        get bullets() {
            this._bullets = this._bullets || [];
            return this._bullets;
        },
        get direction() {
            if (this.framesWithLeftDirection.indexOf(this.sprite.animations.frame) !== -1) {
                return CONST.direction.left;
            }
            return CONST.direction.right;
        },
        get sprite() {
            return this._sprite;
        },
        set sprite(value) {
            this._sprite = value;
        }
    };

    return player;
}());