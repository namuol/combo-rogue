define([
  'cs!combo/cg',
  'cs!combo/plugins/physics/Physical'
], function (
  cg,
  Physical
) {

  var Enemy = cg.SpriteActor.extend('Enemy', {
    constructor: function (properties) {
      this._super(properties);
      this.health = this.health || 1;
      this.speed = this.speed || 0;
      this.scoreValue = this.scoreValue || 50;

      this.anchorX = 0.5;
      this.anchorY = 0.5;
      this.body.width = 8;
      this.body.height = 8;
      this.body.offset.x = -4;
      this.body.offset.y = -4;

      this.activate(function () {
        this.active = true;
        this.addClass('enemies');
      });
    },

    activate: function (callback) {
      this.scale = 0;
      this.tween('scale', 1, 250).then(function () {
        callback.call(this);
      });
    },

    hitBy: function (bullet) {
      this.body.v.set(bullet.v.mul(0.8));

      var scale;
      if (bullet.power !== 0) {
        this.health -= bullet.power;
        this.scale = this.scale*1.5;
        this.tween('scale', this.scale/1.5, 200, 'elastic.out');
      }

      if (this.health <= 0) {
        this.die();
        this.active = false;
        cg('#game').score(this.scoreValue, this.x, this.y);
      }
      bullet.hit(this);
    },

    die: function () {
      this.destroy();
    },

    update: function () {
      this._super();

      this.body.v.limit(this.speed);

      if (this.body.v.x > 0) {
        this.flipX = false;
      } else {
        this.flipX = true;
      }

      var bullet;
      if (bullet = this.touches(cg('playerBullets'))) {
        this.hitBy(bullet);
      }
    }
  });

  Enemy.plugin(Physical);

  return Enemy;
});
