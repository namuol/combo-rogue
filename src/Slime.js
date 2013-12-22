define([
  'cs!combo/cg',
  'Enemy'
], function (
  cg,
  Enemy
) {

  var Slime = Enemy.extend('Slime', {
    constructor: function (properties) {
      this._super(properties);
      this.speed = 5 + 10/this.size;
      this.addClass('slimes');
      this.texture = 'slime';
      this.health = 1;
      if (this.size < 1) {
        this.scoreValue = 25;
      } else {
        this.scoreValue = 0;
      }
    },

    activate: function (callback) {
      this.size = this.size || 1;
      var scale = Math.sqrt(this.size),
          i;

      this.body.width = 8*scale;
      this.body.height = 8*scale;
      this.body.offset.x = -this.body.width/2;
      this.body.offset.y = -this.body.width/2;

      this.scale = 0;
      this.tween('scale', scale, 250, 'elastic.out').then(function () {
        callback.call(this);
      });
    },

    die: function () {
      if (this.size >= 1) {
        var spawn1, spawn2, split = new cg.math.Vector2;
        split.randomize(this.body.width*0.6);

        spawn1 = cg('#game').addChild(new Slime({
          size: this.size/2,
          x: this.x + split.x,
          y: this.y + split.y
        }));
        spawn2 = cg('#game').addChild(new Slime({
          size: this.size/2,
          x: this.x - split.x,
          y: this.y - split.y
        }));
      }
      this._super();
    },

    update: function () {
      if (this.active) {
        var player = cg('#player'),
            other,
            midPoint;

        this.body.v.$add(this.vecTo(player).mag(2));

        if (other = this.touches(cg('slimes'))) {
          midPoint = (new cg.math.Vector2).set(this).add(other).mul(0.5);

          cg('#game').addChild(new Slime({
            size: this.size + other.size,
            x: midPoint.x,
            y: midPoint.y
          }));

          other.destroy();
          this.destroy();
        }
      }

      // Note: We call _super *after* setting `this.body.v` because
      //  it automatically caps it at `this.speed`:
      this._super();
    }
  });

  return Slime;
});
