define([
  'cs!combo/cg',
  'cs!combo/plugins/physics/Physical'
], function (
  cg,
  Physical
) {

  var Projectile = cg.SpriteActor.extend('Projectile', {
    constructor: function (properties) {
      this._super(properties);
      this.size = this.size || 4;

      this.body.v.set(this.v || new Vector2());

      this.anchorX = 0.5;
      this.anchorY = 0.5;

      this.body.width = this.size;
      this.body.height = this.size;
      this.body.offset.x = this.size/2;
      this.body.offset.y = this.size/2;
    },

    update: function () {
      this._super();
      this.rotation = this.body.v.angle();
    }
  });

  Projectile.plugin(Physical);

  return Projectile;
});
