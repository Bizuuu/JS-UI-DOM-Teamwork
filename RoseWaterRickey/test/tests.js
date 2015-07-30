var assert = require("assert");
CONST = require("../js/common/constants.js");
var obj = require("../js/common/gameStats.js");

describe('Game stats', function() {
    describe('batman', function () {
        it('total should return 0 when no values set', function () {
            assert.equal(obj.batman.total, '0');
        });

        it('total should return 50 when only first level has score of 50', function () {
            obj.batman.jumping.score += 50;
            assert.equal(obj.batman.total, '50');
        });

        it('first level should return score correctly', function () {
            assert.equal(obj.batman.jumping.score, '50');
        });

        it('total should return 150 when each level has score of 50', function () {
            obj.batman.logic.score += 50;
            obj.batman.asteroid.score += 50;
            assert.equal(obj.batman.total, '150');
        });
    });
    describe('superman', function () {
        it('total should return 0 when no values set', function () {
            assert.equal(obj.superman.total, '0');
        });

        it('total should return 50 when only first level has score of 50', function () {
            obj.superman.jumping.score += 50;
            assert.equal(obj.superman.total, '50');
        });

        it('total should return 150 when each level has score of 50', function () {
            obj.superman.logic.score += 50;
            obj.superman.asteroid.score += 50;
            assert.equal(obj.superman.total, '150');
        });

        it('third level should return score correctly', function () {
            assert.equal(obj.superman.logic.score, '50');
        });
    });
});

describe('CONST', function() {
    it('world height must be greater than 0', function () {
        assert.equal(CONST.game.world.height > 0, true);
    });

    it('world width must be greater than 0', function () {
        assert.equal(CONST.game.world.width > 0, true);
    });

    it('world height must be less than width', function () {
        assert.equal(CONST.game.world.width > CONST.game.world.height, true);
    });

    it('player\'s initial lives should be equal to 5' , function () {
        assert.equal(CONST.player.initialLives, 5);
    });

    it('direction.left returns right value', function () {
        assert.equal(CONST.direction.left, 'left');
    });

    it('direction.right returns right value', function () {
        assert.equal(CONST.direction.right, 'right');
    });
});