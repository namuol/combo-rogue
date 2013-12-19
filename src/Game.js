define([
  'cs!combo/cg'
], function (
  cg
) {

  var Game = cg.Scene.extend('Game', {
    constructor: function (properties) {
      this._super(properties);

      this.score = 0;

      this.scoreText = this.addChild(new cg.Text('0', {
        font: 'font',
        x: 2,
        y: 2
      }));

      this.on(cg.input, 'mouseDown', function () {
        this.score += cg.rand.i(1,50);
        this.scoreText.string = this.score.toString();
      });
    },

    update: function () {
      this._super();
    }
  });

  return Game;
});
