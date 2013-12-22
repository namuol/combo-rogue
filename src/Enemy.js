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

      this.activate(function () {
        this.active = true;
        this.addClass('enemies');
      });

      this.anchorX = 0.5;
      this.anchorY = 0.5;
      this.body.width = 8;
      this.body.height = 8;
      this.body.offset.x = -4;
      this.body.offset.y = -4;
    },

    activate: function (callback) {
      this.scale = 0;
      this.tween('scale', 1, 250).then(function () {
        callback.call(this);
      });
    },

    hitBy: function (bullet) {
      this.body.v.set(bullet.v.mul(0.8));

      this.health -= bullet.power;
      if (this.health <= 0) {
        this.die();
        this.active = false;
        cg('#game').score(this.scoreValue);
      }
      bullet.hit(this);
    },

    die: function () {
      this.destroy();
    },

    update: function () {
      if (!this.active) {
        return;
      }

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
