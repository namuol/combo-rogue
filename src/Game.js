define([
  'cs!combo/cg',
  'Player',
  'Slime'
], function (
  cg,
  Player,
  Slime
) {

  var Game = cg.Scene.extend('Game', {
    constructor: function (properties) {
      this._super(properties);

      this._score = 0;

      // Think of this like the "layer" our enemies reside on.
      this.enemies = this.addChild(new cg.Actor);

      this.player = this.addChild(new Player({
        id: 'player',
        x: cg.width/2,
        y: cg.height/2
      }));

      this.scoreText = this.addChild(new cg.Text('0', {
        font: 'font',
        x: 2,
        y: 2
      }));

      this.repeat(2000, function () {
        this.enemies.addChild(new Slime({
          x: cg.rand(cg.width),
          y: cg.rand(cg.height)
        }));
      });
    },

    score: function (amount) {
      this._score += amount;
      this.scoreText.string = this._score.toString();
    },

    update: function () {
      this._super();
    }
  });

  return Game;
});
