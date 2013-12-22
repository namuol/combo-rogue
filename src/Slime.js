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
      this.speed = 20;
      this.addClass('slimes');
      this.texture = 'slime';
      this.health = this.size;
      if (this.size == 1) {
        this.scoreValue = 25;
      } else {
        this.scoreValue = 0;
      }
    },

    activate: function (callback) {
      this.size = this.size || 2;
      var scale = Math.max(0.75, this.size*0.5);

      this.body.width = 8*scale;
      this.body.height = 8*scale;

      this.scale = 0;
      this.tween('scale', scale, 250, 'elastic.out').then(function () {
        callback.call(this);
      });
    },

    die: function () {
      if (this.size > 1) {
        var spawn1, spawn2;
        spawn1 = cg('#game').addChild(new Slime({
          size: this.size-1,
          x: this.x + 2*this.size,
          y: this.y
        }));
        spawn2 = cg('#game').addChild(new Slime({
          size: this.size-1,
          x: this.x - 2*this.size,
          y: this.y
        }));
      }
      this._super();
    },

    update: function () {
      if (this.active) {
        var player = cg('#player');
        this.body.v.$add(this.vecTo(player).mag(2));
      }

      // Note: We call _super *after* setting `this.body.v` because
      //  it automatically caps it at `this.speed`:
      this._super();
    }
  });

  return Slime;
});
