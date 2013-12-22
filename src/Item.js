define([
  'cs!combo/cg',
  'cs!combo/plugins/physics/Physical'
], function (
  cg,
  Physical
) {

  var Item = cg.SpriteActor.extend('Item', {
    constructor: function (properties) {
      this._super(properties);
      this.scoreValue = this.scoreValue || 0;
      this.ttl = this.ttl || 5000;
      this.gracePeriod = this.gracePeriod || 1500;

      this.active = true;
      this.addClass('items');

      this.anchorX = 0.5;
      this.anchorY = 0.5;
      this.body.width = 13;
      this.body.height = 13;
      this.body.offset.x = -6.5;
      this.body.offset.y = -6.5;

      this.delay(this.ttl-this.gracePeriod).then(function () {
        this.blink(100);
        this.delay(this.gracePeriod, function () {
          this.blink(false);
          this.tween('scale', 0, 250, 'back.in').then(function () {
            this.destroy();
          });
        });
      });
    },

    dropIn: function () {
      this.scale = 0;
      this.tween('scale', 1, 250);

      var y = this.y;
      this.y -= 16;
      this.tween('y', y, 800, 'bounce.out');
      this.tween('x', this.x+cg.rand(-10,10), 800, 'quad.out');
    },

    collect: function (player) {
      if (!player.alive) {
        return;
      }

      cg('#game').score(this.scoreValue, this.x, this.y);
      this.scale = 1.5;
      this.active = false;
      this.blink(false);
      this.tween('scale', 0, 100, 'quad.out').then(function () {
        this.destroy();
      });
    },

    update: function () {
      this._super();
      if (!this.active) {
        return;
      }

      var player;
      if ( player = this.touches(cg('#player')) ) {
        this.collect(player);
      }
    }
  });

  Item.plugin(Physical);


  return Item;
});
