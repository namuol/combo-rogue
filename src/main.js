define([
  'cs!combo/cg',
  'cs!combo/plugins/ui/UI',
  'cs!combo/plugins/physics/Physics',
  'ComboRogue'
], function(
  cg,
  UI,
  Physics,
  ComboRogue
) {

  // The main function must be *returned*, not executed directly:
  return function() {

    var loadingScreen;

    // App-wide plugins need to be loaded before `cg.init` is called:
    cg.plugin(UI);
    cg.plugin(Physics);

    // This will set up graphics, sound, input, data, plugins, and start our game loop:
    cg.init({
      name: 'Combo-Rogue',
      width: 1280,
      height: 720,
      backgroundColor: 0x222222,
      forceCanvas: !!parseInt(cg.env.getParameterByName('forceCanvas'))
    });

    loadingScreen = cg.stage.addChild(new cg.extras.LoadingScreen);
    loadingScreen.begin();

    cg.assets.loadJSON('assets.json').then(function(pack) {
      cg.assets.preload(pack, {
        error: function(src) {
          cg.error('Failed to load asset ' + src);
        },
        progress: function(src, data, loaded, count) {
          cg.log("Loaded '" + src + "'");
          loadingScreen.setProgress(loaded / count);
        },
        complete: function() {
          loadingScreen.complete().then(function() {
            loadingScreen.destroy();
            cg.stage.addChild(new ComboRogue({
              id: 'main'
            }));
          });
        }
      });
    }, function(err) {
      throw new Error('Failed to load assets.json: ' + err.message);
    });

    // Hide the pre-pre loading "Please Wait..." message:
    document.getElementById('pleasewait').style.display = 'none';

    // Show our game container:
    document.getElementById('combo-game').style.display = 'inherit';
  };
});
