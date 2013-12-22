define([
  'cs!combo/cg'
], function (
  cg
) {

  var GameOver = cg.Scene.extend('GameOver', {
    constructor: function (properties) {
      this._super(properties);

      this.bg = this.addChild(new cg.rendering.Graphics);
      this.bg.clear();
      this.bg.beginFill(0x000000, 0.5);
        this.bg.drawRect(0,0, cg.width, cg.height);
      this.bg.endFill();

      this.gameOverText = this.addChild(new cg.Text('GAME OVER', {
        align: 'center',
        x: cg.width/2,
        scale: 2
      }));

      this.scoreText = this.addChild(new cg.Text('high score: 0\nyour score: 0', {
        align: 'center',
        x: cg.width/2,
        y: cg.height/2
      }));

      this.clickToPlay = this.addChild(new cg.Text('click to play again', {
        align: 'center',
        x: cg.width/2,
      }));

      this.clickToPlay.top = this.scoreText.bottom + 10;
    },

    splash: function () {
      this.resume().show();

      this.scoreText.string =
        'high score: ' + cg('#game').highScore + '\n' +
        'your score: ' + cg('#game').score();

      this.gameOverText.bottom = 0;
      this.gameOverText.tween('bottom', this.scoreText.top - 10, 1000, 'bounce.out');

      // We add a small delay here to prevent the player from accidentally
      //  restarting before they have a chance to review their score.
      this.delay(500, function () {
        this.once(cg.input, 'mouseDown', this.splashOut);
      });

      this.clickToPlay.blink();

    },

    splashOut: function () {
      this.emit('done');
      this.pause().hide();
    },

    update: function () {
      this._super();
    }
  });

  return GameOver;
});
