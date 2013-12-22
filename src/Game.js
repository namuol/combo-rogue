define([
  'cs!combo/cg',
  'Player',
  'Slime',
  'Coin'
], function (
  cg,
  Player,
  Slime,
  Coin
) {

  // We only have one kind of enemy right now, but we can
  //  easily add new ones.
  var ENEMY_TYPES = [
    Slime
  ];

  var ITEM_TYPES = [
    Coin
  ];

  var Game = cg.Scene.extend('Game', {
    constructor: function (properties) {
      this._super(properties);

      this.highScore = 0;

      // Think of this like a "layer" for the player and enemies:
      this.entities = this.addChild(new cg.Actor);

      this.player = this.entities.addChild(new Player({
        id: 'player',
        x: cg.width/2,
        y: cg.height/2
      }));

      this.scoreText = this.addChild(new cg.Text('0', {
        font: 'font',
        x: 2,
        y: 2
      }));
    },

    restart: function () {
      // Clear all enemies:
      cg('enemies').destroy();

      // Clear all items:
      cg('items').destroy();

      this.player.reset({
        x: cg.width/2,
        y: cg.height/2
      });

      this._score = 0;
      this.scoreText.string = '0';

      if (this.nextEnemyEvent) {
        this.nextEnemyEvent.stop();
      }
      this.nextEnemyEvent = this.delay(1000, this.spawnEnemy);

      if (this.nextItemEvent) {
        this.nextItemEvent.stop();
      }
      this.nextItemEvent = this.delay(cg.rand(1000,10000), this.spawnItem);

      return this;
    },

    randomPosition: function (minDistance, maxDistance) {
      // Let's make sure enemies don't spawn on top of
      //  or directly next to the player:
      var distance = cg.rand(minDistance, maxDistance),
          position = (new cg.math.Vector2).randomize(distance).add(this.player);

      // Ensure the enemy's position is in the bounds of the game
      //  (and also add 8px of padding on each side):
      position.x = cg.math.wrap(position.x, 8, cg.width-16);
      position.y = cg.math.wrap(position.y, 8, cg.height-16);
      return position;
    },

    spawnEnemy: function () {
      if (!this.player.alive) {
        return;
      }

      var position = this.randomPosition(30, cg.width/2),
          enemyType = cg.rand.pick(ENEMY_TYPES);

      this.entities.addChild(new enemyType({
        x: position.x,
        y: position.y
      }));
      this.nextEnemyEvent = this.delay(cg.rand(500,3000), this.spawnEnemy);
    },

    spawnItem: function () {
      if (!this.player.alive) {
        return;
      }

      var position = this.randomPosition(20, cg.width/2),
          itemType = cg.rand.pick(ITEM_TYPES);

      this.entities.addChild(new itemType({
        x: position.x,
        y: position.y
      })).dropIn();
      this.nextItemEvent = this.delay(cg.rand(1000,10000), this.spawnItem);
    },

    score: function (amount) {
      if (arguments.length == 0) {
        return this._score;
      }

      this._score += amount;

      if (this._score > this.highScore) {
        this.highScore = this._score;
      }

      this.scoreText.string = this._score.toString();
      return this._score;
    },

    update: function () {
      this._super();
    }
  });

  return Game;
});
