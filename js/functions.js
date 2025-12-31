var gardenCtx, gardenCanvas, garden;

$(function () {
  var $loveHeart = $("#loveHeart");
  gardenCanvas = document.getElementById("garden");
  gardenCanvas.width = $loveHeart.width();
  gardenCanvas.height = $loveHeart.height();
  gardenCtx = gardenCanvas.getContext("2d");
  gardenCtx.globalCompositeOperation = "lighter";
  garden = new Garden(gardenCtx, gardenCanvas);

  setInterval(function () {
    garden.render();
  }, Garden.options.growSpeed);
});

/* BLOOM BURST */

function startBloomBurst() {
  var blooms = 0;
  var burst = setInterval(function () {
    var x = Math.random() * gardenCanvas.width;
    var y = Math.random() * gardenCanvas.height;
    garden.createRandomBloom(x, y);
    blooms++;

    if (blooms > 120) {
      clearInterval(burst);
      transitionToHeart();
    }
  }, 40);
}

/* TRANSITION TO HEART */

function transitionToHeart() {
  fadeOutBlooms();              // fade random blooms
  setTimeout(startHeartAnimation, 1200); // heart blooms along original shape
}

/* HEART BLOOM FROM ORIGINAL ANIMATION */

function startHeartAnimation() {
  var interval = 50;
  var angle = 10;
  var heart = [];

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

    if (angle >= 30) { // full heart
      clearInterval(animationTimer);
      showMessages(); // show New Year message
    } else {
      angle += 0.2;
    }
  }, interval);
}

/* FADE BLOOMS */

function fadeOutBlooms() {
  var alpha = 1;
  var fade = setInterval(function () {
    alpha -= 0.02;
    gardenCtx.globalAlpha = alpha;
    if (alpha <= 0.05) {
      clearInterval(fade);
      gardenCtx.globalAlpha = 1;
    }
  }, 50);
}

/* SHOW MESSAGES */

function showMessages() {
  $("#messages").fadeIn(2000, function () {
    $("#loveu").fadeIn(2000);
  });
}

/* TIMER */

function timeElapse(date) {
  var current = Date();
  var seconds = (Date.parse(current) - Date.parse(date)) / 1000;

  var days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600 * 24;

  var hours = Math.floor(seconds / 3600);
  seconds %= 3600;

  var minutes = Math.floor(seconds / 60);
  seconds %= 60;

  $("#elapseClock").html(
    "<span class='digit'>" + days + "</span> days " +
    "<span class='digit'>" + hours + "</span> hrs " +
    "<span class='digit'>" + minutes + "</span> mins " +
    "<span class='digit'>" + Math.floor(seconds) + "</span> secs"
  );
}
