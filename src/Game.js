define([
  'cs!combo/cg',
  'Player',
  'Slime'
], function (
  cg,
  Player,
  Slime
) {

  // We only have one kind of enemy right now, but we can
  //  easily add new ones.
  var ENEMY_TYPES = [
    Slime
  ];

  var EVENT_TYPES = [
    'enemy',
    'item'
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

      this.player.reset({
        x: cg.width/2,
        y: cg.height/2
      });

      this._score = 0;
      this.scoreText.string = '0';

      if (this.nextEvent) {
        this.nextEvent.stop();
      }

      this.nextEvent = this.delay(1000, this.newGameplayEvent);

      return this;
    },

    newGameplayEvent: function () {
      if (!this.player.alive) {
        return;
      }

      switch cg.rand.pick EVENT_TYPES {
        case 'enemy':
          this.spawnEnemy();
          break;
        case 'item':
          // We don't have any items to spawn yet.
          break;
      }

      this.nextEvent = this.delay(cg.rand(1000,3000), this.newGameplayEvent);
    },

    spawnEnemy: function () {
      // Let's make sure enemies don't spawn on top of
      //  or directly next to the player:
      var distance = cg.rand(20, cg.width/2),
          position = (new cg.math.Vector2).randomize(distance).add(this.player),
          enemyType = cg.rand.pick(ENEMY_TYPES);

      // Ensure the enemy's position is in the bounds of the game:
      position.x = cg.math.wrap(position.x, 0, cg.width);
      position.y = cg.math.wrap(position.y, 0, cg.height);

      this.entities.addChild(new enemyType({
        x: position.x,
        y: position.y
      }));
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
