var garden;

// Initialize Garden
$(function () {
  var gardenCanvas = document.getElementById("garden");
  var gardenCtx = gardenCanvas.getContext("2d");
  gardenCanvas.width = $("#loveHeart").width();
  gardenCanvas.height = $("#loveHeart").height();

  window.offsetX = gardenCanvas.width / 2;
  window.offsetY = gardenCanvas.height / 2 - 55;

  garden = new Garden(gardenCtx, gardenCanvas);

  setInterval(function () {
    garden.render();
  }, Garden.options.growSpeed);

  // Start bloom burst after 1s
  setTimeout(startBloomBurst, 1000);

  // Countdown timer
  var newYear = new Date();
  newYear.setFullYear(2025, 0, 1);
  newYear.setHours(0,0,0,0);

  timeElapse(newYear);
  setInterval(function () { timeElapse(newYear); }, 500);
});

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
      removeBurstFlowers();
    }
  }, 40);
}

// REMOVE BLOOM BURST FLOWERS BEFORE HEART
function removeBurstFlowers() {
  garden.clear(); // remove all burst flowers
  setTimeout(startHeartAnimation, 500); // start heart after slight delay
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

// SHOW MESSAGES
function showMessages() {
  $("#messages").fadeIn(2000, function () {
    $("#loveu").fadeIn(2000);
  });
}

// COUNTDOWN TIMER
function timeElapse(date) {
  var current = new Date();
  var seconds = (Date.parse(current) - Date.parse(date)) / 1000;

  var days = Math.floor(seconds / (3600 * 24));
  seconds %= 3600*24;

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

// HEART POINTS
function getHeartPoint(angle) {
  var t = angle / Math.PI;
  var x = 19.5 * (16 * Math.pow(Math.sin(t), 3));
  var y = -20 * (13 * Math.cos(t) - 5*Math.cos(2*t) - 2*Math.cos(3*t) - Math.cos(4*t));
  return [offsetX + x, offsetY + y];
}
