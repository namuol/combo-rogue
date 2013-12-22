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

      this.anchorX = 0.5;
      this.anchorY = 0.5;
      this.body.bounce = 0;
      this.body.width = 2;
      this.body.height = 2;
      this.body.offset.x = -1;
      this.body.offset.y = -1;

      this.controls = cg.input.controls.player;
      this.on('vx', function (value) {
        this.body.v.x = value * this.speed;
      });

      this.on('vy', function (value) {
        this.body.v.y = value * this.speed;
      });

      this.on(cg.input, 'mouseDown', this.shoot);

      this.reset();
    },

    reset: function (properties) {
      this._super(properties);

      this.speed = 60;
      this.alive = true;
      this.visible = true;
      this.body.v.zero();
      this.resume();
    },

    shoot: function () {
      cg('#game').addChild(new Projectile({
        className: 'playerBullets',
        x: this.x,
        y: this.y,
        v: this.vecToMouse().mag(150),
        texture: cg.sheets.projectiles[0],
        ttl: 750
      }));
    },

    die: function () {
      this.alive = false;
      this.visible = false;
      cg('#main').set('shake', 5).tween('shake', 0, 500);
      cg('#gameOver').splash();
      this.pause();
    },

    update: function () {
      this._super();

      if (!this.alive) {
        return;
      }

      if (cg.input.mouse.x < this.x) {
        this.flipX = true;
      } else {
        this.flipX = false;
      }

      var enemy;
      if (enemy = this.touches(cg('enemies'))) {
        this.die();
      }
    }
  });

  Player.plugin(Physical);

  return Player;
});
