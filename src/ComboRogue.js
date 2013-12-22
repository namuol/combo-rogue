define([
  'cs!combo/cg',
  'TitleScreen',
  'Game',
  'GameOver'
], function (
  cg,
  TitleScreen,
  Game,
  GameOver
) {

  var ComboRogue = cg.Scene.extend('ComboRogue', {
    constructor: function (properties) {
      this._super(properties);

      cg.Text.defaults.font = 'font';

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
        this.game.resume().restart().show();
      });

      this.gameOver = this.addChild(new GameOver({
        id: 'gameOver'
      }));

      this.on(this.gameOver, 'done', function () {
        this.game.resume().restart().show();
      });

      this.gameOver.pause().hide();

      this.shake = 0;
    },

    update: function () {
      this._super();

      if (this.shake > 0) {
        this.x = cg.rand.normal() * this.shake;
        this.y = cg.rand.normal() * this.shake;
      }
    }
  });

  return ComboRogue;
});
