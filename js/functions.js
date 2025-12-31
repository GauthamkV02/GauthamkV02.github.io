// BLOOM BURST
function startBloomBurst() {
  var blooms = 0;
  var burst = setInterval(function () {
    var x = Math.random() * $("#loveHeart").width();
    var y = Math.random() * $("#loveHeart").height();
    garden.createRandomBloom(x, y);
    blooms++;

    if (blooms > 120) {
      clearInterval(burst);
      // Fade out burst flowers completely
      removeBurstFlowers();
    }
  }, 40);
}

// REMOVE BLOOM BURST FLOWERS
function removeBurstFlowers() {
  var fade = setInterval(function () {
    garden.clear(); // Remove all blooms
    clearInterval(fade);
    startHeartAnimation(); // Start drawing the heart blooms
  }, 500); // Slight delay to make a smooth transition
}

// HEART BLOOM
function startHeartAnimation() {
  var angle = 10;
  var heart = [];
  var maxAngle = 50;

  var animationTimer = setInterval(function () {
    var bloom = getHeartPoint(angle);
    var draw = true;

    for (var i = 0; i < heart.length; i++) {
      var p = heart[i];
      var distance = Math.sqrt(Math.pow(p[0] - bloom[0], 2) + Math.pow(p[1] - bloom[1], 2));
      if (distance < Garden.options.bloomRadius.max * 1.3) {
        draw = false;
        break;
      }
    }

    if (draw) {
      heart.push(bloom);
      garden.createRandomBloom(bloom[0], bloom[1]);
    }

    if (angle >= maxAngle) {
      clearInterval(animationTimer);
      showMessages();
    } else {
      angle += 0.3;
    }
  }, 30);
}
