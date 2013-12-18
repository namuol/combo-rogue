define([
  'cs!combo/cg',
  'TitleScreen'
], function (
  cg,
  TitleScreen
) {

  var ComboRogue = cg.Scene.extend('ComboRogue', {
    constructor: function (properties) {
      this.super(properties);

      this.bg = this.addChild(new cg.SpriteActor({
        texture: 'bg'
      }));

      this.title = this.addChild(new TitleScreen);
    },

    update: function () {
      this.super();
    }
  });

  return ComboRogue;
});
