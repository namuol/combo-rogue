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

      this.body.bounce = 0;
      this.body.width = this.width;
      this.body.height = this.height;

      this.texture = 'player';

      this.controls = cg.input.controls.player;
      this.speed = 60;

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
