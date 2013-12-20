define([
  'cs!combo/cg',
  'cs!combo/plugins/physics/Physical',
  'Projectile'
], function (
  cg,
  Physical,
  Projectile
) {

  var Player = cg.SpriteActor.extend('Player', {

    constructor: function (properties) {
      this._super(properties);

      this.texture = 'player';

      this.body.bounce = 0;

      this.body.width = this.width;
      this.body.height = this.height;

      this.controls = cg.input.controls.player;
      this.speed = 60;

      this.on('vx', function (value) {
        this.body.v.x = value * this.speed;
      });

      this.on('vy', function (value) {
        this.body.v.y = value * this.speed;
      });

      this.on(cg.input, 'mouseDown', this.shoot);
    },

    shoot: function () {
      cg('#game').addChild(new Projectile({
        x: this.x + 2,
        y: this.y + 2,
        v: this.vecToMouse().mag(150),
        texture: cg.sheets.projectiles[0],
        ttl: 750
      }));
    },

    update: function () {
      this._super();

      if (cg.input.mouse.x < this.x) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }
    }
  });

  Player.plugin(Physical);

  return Player;
});
