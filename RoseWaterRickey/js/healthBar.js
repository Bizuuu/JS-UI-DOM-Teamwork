var HealthBar = function(x, y, game) {
	this.redHealthRectangle = game.add.image(x, y, 'redTexture');
	this.greenHealthRectangle = game.add.image(x, y, 'greenTexture');
	this.width = this.redHealthRectangle.width;
	this.x = x;
};

HealthBar.prototype.setHealth = function(health) {
	this.greenHealthRectangle.width = this.width * health;
	this.greenHealthRectangle.x = this.x + this.width * (1 - health);
};