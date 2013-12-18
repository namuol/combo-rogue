define([
  'cs!combo/cg'
], function (
  cg
) {

  var ComboRogue = cg.Scene.extend('ComboRogue', {
    constructor: function (properties) {
      this.super(properties);

      this.bg = this.addChild(new cg.SpriteActor({
        texture: 'bg'
      }));
    },

    update: function () {
      this.super();
    }
  });

  return ComboRogue;
});
