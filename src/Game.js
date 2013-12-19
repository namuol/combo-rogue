define([
  'cs!combo/cg',
  'Player'
], function (
  cg,
  Player
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

      this.player = this.addChild(new Player({
        id: 'player',
        x: cg.width/2,
        y: cg.height/2
      }));

      this.scoreText.bringToFront();
    },

    update: function () {
      this._super();
    }
  });

  return Game;
});
