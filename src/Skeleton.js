define([
  'cs!combo/cg',
  'Enemy',
  'Projectile',
  'Coin'
], function (
  cg,
  Enemy,
  Projectile,
  Coin
) {

  var SwordSwing = Projectile.extend('SwordSwing', {
    constructor: function (properties) {
      this.size = 4;
      this.ttl = 150;
      this._super(properties);

      this.texture = cg.sheets.projectiles[2];

      this.scaleX = 0;
      this.animate(
        ['scaleX', 1, 75],
        ['scaleX', 0, 75]
      );
    }
  });

  var Skeleton = Enemy.extend('Skeleton', {
    constructor: function (properties) {
      this._super(properties);
      this.speed = 15;
      this.addClass('skeletons');
      this.type = this.type || cg.rand([0,1,2]);

      // Skeletons drop coins, instead:
      this.scoreValue = 0;

      switch(this.type) {
      default:
        this.type = 0;
        this.shielded = false;
        this.health = 3;
        break;
      case 1:
        this.shielded = true;
        this.health = 4;
        break;
      case 2:
        this.shielded = true;
        this.health = 8;
      }

      this.sheet = cg.sheets['skeleton'+this.type];
      this.textures = {
        normal: this.sheet[0],
        drawn: this.sheet[1],
        swung: this.sheet[2]
      }
      this.texture = this.textures.normal;

      this.following = true;
      this.range = 30;

      // Make sure we don't magically swing after we've been destroyed:
      this.on('destroy', function () {
        this.swingCanceled = true;
        if (this.sword) {
          this.sword.destroy();
        }
        if (this.swingDelay) {
          this.swingDelay.stop();
        }
      });
    },

    hitBy: function (bullet) {
      if (bullet === this.sword) {
        return;
      }

      if (this.shielded) {
        bullet.power = 0;
        this._super(bullet);
        this.body.v.zero();
        cg.sounds.shielded.play()
      } else {
        this.swingCanceled = true;
        this.following = true;
        this._super(bullet);
      }
    },

    die: function () {
      var coinType;

      switch (this.type) {
      default:
        coinType = 'copper';
        break;
      case 1:
        coinType = 'silver';
        break;
      case 2:
        coinType = 'gold';
        break;
      }

      cg('#game').addChild(new Coin({
        x: this.x,
        y: this.y+8,
        type: coinType
      })).dropIn();

      this._super();
    },

    swing: function () {
      this.texture = this.textures.drawn;
      this.following = false;
      this.shielded = false;
      this.swingCanceled = false;
      this.body.v.zero();
      this.blink(50, 10, 250);

      var toPlayer = this.vecTo(cg('#player')).norm();
      cg.sounds.windup.play(0.5);
      this.swingDelay = this.delay(500, function () {

        if (!this.swingCanceled) {
          this.texture = this.textures.swung;
          this.sword = cg('#game').addChild(new SwordSwing({
            className: 'enemies playerBullets',
            x: this.x + toPlayer.x * 3,
            y: this.y + toPlayer.y * 3,
            v: toPlayer.mul(200)
          }));
        }

        this.delay(250, function () {
          this.shielded = true;
          this.following = true;
          this.texture = this.textures.normal;
        });
        cg.sounds.swordSwing.play(cg.rand(0.4,0.8));
      });
    },

    update: function () {
      if (!this.active) {
        return;
      }

      if (this.following) {
        var player = cg('#player'),
            toPlayer = this.vecTo(player);

        if (this.shielded && toPlayer.len() < this.range) {
          this.swing(toPlayer);
        }

        this.body.v.$add(toPlayer.mag(2));
      }

      this._super();
    }
  });

  return Skeleton;
});
