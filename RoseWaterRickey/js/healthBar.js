var HealthBar = function(x, y, game) {
	this.grayHealthbar = game.add.image(x, y, 'grayHealthbar');
	this.healthbar = game.add.image(x, y, 'healthbar');
	this.width = this.grayHealthbar.width;
	this.healthbar.cropRect = new Phaser.Rectangle(0, 0, this.healthbar.width, this.healthbar.height);
	this.healthbar.crop(this.healthbar.cropRect);
};

HealthBar.prototype.setHealth = function(health) {
	this.healthbar.cropRect.width = this.width * health;
	this.healthbar.updateCrop();
};