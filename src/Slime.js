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
      this.speed = 35;
      this.addClass('slimes');
      this.texture = 'slime';
      this.health = 3;
    },

    die: function () {
      this._super();
    },

    update: function () {
      if (!this.active) {
        return;
      }

      var player = cg('#player');
      if (player) {
        this.body.v.$add(this.vecTo(player).mag(2));
      }

      // Note: We call _super *after* setting `this.body.v` because
      //  it automatically caps it at `this.speed`:
      this._super();
    }
  });

  return Slime;
});
