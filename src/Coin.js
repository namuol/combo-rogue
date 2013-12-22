define([
  'cs!combo/cg',
  'Item'
], function (
  cg,
  Item
) {

  var typeDistribution = [
    // Odds: 1/15
    'gold',

    // Odds: 4/15
    'silver',
    'silver',
    'silver',
    'silver',

    // Odds: 10/15
    'copper',
    'copper',
    'copper',
    'copper',
    'copper',
    'copper',
    'copper',
    'copper',
    'copper',
    'copper'
  ];

  var Coin = Item.extend('Coin', {
    constructor: function (properties) {
      this._super(properties);

      this.type = this.type || cg.rand(typeDistribution);

      switch(this.type) {
      case 'gold':
        this.texture = cg.sheets.coins[2];
        this.scoreValue = 1000;
        break;
      case 'silver':
        this.texture = cg.sheets.coins[1];
        this.scoreValue = 250;
        break;
      default: // copper
        this.texture = cg.sheets.coins[0];
        this.scoreValue = 100;
      }
    },

    update: function () {
      this._super();
    }
  });

  return Coin;
});
