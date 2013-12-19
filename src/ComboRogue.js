define([
  'cs!combo/cg',
  'TitleScreen',
  'Game'
], function (
  cg,
  TitleScreen,
  Game
) {

  var ComboRogue = cg.Scene.extend('ComboRogue', {
    constructor: function (properties) {
      this._super(properties);

      cg.physics.gravity.zero();

      cg.input.map('player', {
        vx: ['a/d', 'left/right'],
        vy: ['w/s', 'up/down']
      });

      this.bg = this.addChild(new cg.SpriteActor({
        texture: 'bg'
      }));

      this.title = this.addChild(new TitleScreen({
        id: 'titlescreen'
      }));
      this.title.splash();

      this.game = this.addChild(new Game({
        id: 'game'
      }));

      this.game.pause().hide();

      this.on(this.title, 'done', function () {
        this.game.resume().show();
      });
    },

    update: function () {
      this._super();
    }
  });

  return ComboRogue;
});
