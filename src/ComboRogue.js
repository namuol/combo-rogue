define([
  'cs!combo/cg'
], function (
  cg
) {

  var ComboRogue = cg.Scene.extend('ComboRogue', {
    constructor: function (properties) {
      this.super(properties);

      this.logo = this.addChild(new cg.SpriteActor({
        texture: 'logo',
        anchorX: 0.5,
        anchorY: 0.5,
        x: cg.width/2,
        y: cg.height/2
      }));
    },

    update: function () {
      this.super();

      this.logo.rotation += 0.02;
    }
  });

  return ComboRogue;
});
