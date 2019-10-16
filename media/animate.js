// Adapted from: https://codepen.io/davidhartley/pen/seEki?editors=0010

var width = window.innerWidth;
var height = window.innerHeight;
var renderer = new PIXI.autoDetectRenderer(width, height, {
  view: document.getElementById("smoke-animation")
});

var stage = new PIXI.Container(); // The stage is the root container that will hold everything in our scene

// Init smoke shader variables
var uniforms = {
  resolution: { type: "v2", value: [width, height] },
  shift: { type: "1f", value: 1.6 },
  time: { type: "1f", value: 0 },
  speed: { type: "v2", value: [0.5, 0.4] }
};

var shaderCode = document.getElementById("fragShader").innerHTML;
var smokeShader = new PIXI.Filter("", shaderCode, uniforms);

var sprite = new PIXI.Sprite();
sprite.width = width;
sprite.height = height;
sprite.filters = [smokeShader];
stage.addChild(sprite);

// Change canvas size with window
window.onresize = function(e) {
  // Get new width and height
  width = window.innerWidth;
  height = window.innerHeight;

  // Update uniform
  smokeShader.uniforms.resolution[0] = width;
  smokeShader.uniforms.resolution[1] = height;

  // Full screen sprite
  sprite.width = width;
  sprite.height = height;

  // Resize renderer
  renderer.resize(width, height);
};

function animate() {
  // Start the timer for the next animation loop
  requestAnimationFrame(animate);

  smokeShader.uniforms.time += 0.01;

  // This is the main render call that makes pixi draw your container and its children
  renderer.render(stage);
}

requestAnimationFrame(animate);
