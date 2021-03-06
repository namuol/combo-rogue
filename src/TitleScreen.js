define([
  'cs!combo/cg',
], function (
  cg
) {

  var TitleScreen = cg.Scene.extend('TitleScreen', {
    constructor: function (properties) {
      this._super(properties);

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
      this.resume().show();

      this.x = 0;
      this.y = 0;

      this.title.y = cg.height;
      this.title.scale = 0;
      this.title.alpha = 1;

      this.title.tween({
        values: {
          scale: 1,
          y: cg.height/2
        },
        easeFunc: 'elastic.out',
        duration: 1000
      });

      this.title.animate(
        ['alpha',   1, 2000],
        ['alpha', 0.6, 1000]
      );

      this.text.blink();

      this.once(cg.input, 'mouseDown', this.splashOut);
    },

    splashOut: function () {
      this.tween('y', cg.height, 1000).then(function () {
        this.emit('done');
        this.pause();
      });
    },

    update: function () {
      this._super();
    }
  });

  return TitleScreen;
});
