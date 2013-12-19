define([
  'cs!combo/cg',
  'cs!combo/plugins/physics/Physical'
], function (
  cg,
  Physical
) {

  var Player = cg.SpriteActor.extend('Player', {

    constructor: function (properties) {
      this._super(properties);

      this.anchorX = 0.5;
      this.anchorY = 0.75;

      this.texture = 'player';

      this.controls = cg.input.controls.player;
      this.speed = 40;

      this.on('vx', function (value) {
        this.body.v.x = value * this.speed;
      });

      this.on('vy', function (value) {
        this.body.v.y = value * this.speed;
      });
    },

    update: function () {
      this._super();
    }
  });

  Player.plugin(Physical);

  return Player;
});
