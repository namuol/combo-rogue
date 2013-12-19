define([
  'cs!combo/cg',
  'cs!combo/plugins/physics/Physical'
], function (
  cg,
  Physical
) {

  var Player = cg.SpriteActor.extend('Player', {
    anchorX: 0.5,
    anchorY: 0.75,
    texture: 'player',
    constructor: function (properties) {
      this._super(properties);
    },

    update: function () {
      this._super();
    }
  });

  Player.plugin(Physical);

  return Player;
});
