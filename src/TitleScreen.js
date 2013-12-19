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
        x: cg.width/2
      }));

      this.text = this.addChild(new cg.Text('click to play', {
        align: 'center',
        font: 'font',
        x: cg.width/2,
        y: cg.height - 30
      }));
    },

    splash: function () {
      this.title.y = cg.height;
      this.title.scale = 0;

      this.title.tween({
        values: {
          scale: 1,
          y: cg.height/2
        },
        easeFunc: 'elastic.out',
        duration: 1000
      });

      this.title.animate(
        ['alpha', '-0.2', 250],
        ['alpha', '+0.2', 250]
      );

      this.text.blink();
    },

    update: function () {
      this.super();
    }
  });

  return TitleScreen;
});
