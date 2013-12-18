define([
  'cs!combo/cg',
], function (
  cg
) {

  var TitleScreen = cg.Scene.extend('TitleScreen', {
    constructor: function (properties) {
      this.super(properties);

      this.title = this.addChild(new cg.SpriteActor({
        id: 'title',
        texture: 'title',
        anchorX: 0.5,
        anchorY: 0.5,
        x: cg.width/2,
        y: cg.height/2
      }));

      this.addChild(new cg.Text('click to play', {
        align: 'center',
        font: 'font',
        x: cg.width/2,
        y: cg.height - 30
      }));
    },

    update: function () {
      this.super();
    }
  });

  return TitleScreen;
});
