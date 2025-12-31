var garden, gardenCtx, gardenCanvas;

$(function () {

	var $loveHeart = $("#loveHeart");
	var offsetX = $loveHeart.width() / 2;
	var offsetY = $loveHeart.height() / 2;

	gardenCanvas = $("#garden")[0];
	gardenCanvas.width = $loveHeart.width();
	gardenCanvas.height = $loveHeart.height();

	gardenCtx = gardenCanvas.getContext("2d");
	gardenCtx.globalCompositeOperation = "lighter";

	garden = new Garden(gardenCtx, gardenCanvas);

	setInterval(function () {
		garden.render();
	}, Garden.options.growSpeed);

	adjustCodePosition();
	$("#code").typewriter();

	setTimeout(startNewYearSequence, 3000);

});

/* -------- TYPEWRITER -------- */

(function ($) {
	$.fn.typewriter = function () {
		this.each(function () {
			var $el = $(this),
				text = $el.html(),
				progress = 0;
			$el.html("");
			var timer = setInterval(function () {
				var char = text.substr(progress, 1);
				if (char === "<") progress = text.indexOf(">", progress) + 1;
				else progress++;
				$el.html(text.substring(0, progress) + (progress & 1 ? "_" : ""));
				if (progress >= text.length) clearInterval(timer);
			}, 75);
		});
		return this;
	};
})(jQuery);

/* -------- NEW YEAR ANIMATION -------- */

function startNewYearSequence() {
	let count = 5;
	$("#messages").show().text(count);

	let timer = setInterval(function () {
		$("#messages").text(count--);
		if (count < 0) {
			clearInterval(timer);
			$("#messages").html("🎉 HAPPY NEW YEAR 🎉");
			flash();
			bloomBurst(centerX(), centerY(), 4);
			skyBurst(10);
			$("#loveu").fadeIn(4000);
		}
	}, 1000);
}

function bloomBurst(x, y, layers) {
	for (let l = 0; l < layers; l++) {
		setTimeout(() => {
			for (let i = 0; i < Garden.randomInt(20, 35); i++) {
				let a = Math.random() * Math.PI * 2;
				let r = Garden.random(20, 140);
				garden.createRandomBloom(
					x + Math.cos(a) * r,
					y + Math.sin(a) * r
				);
			}
		}, l * 200);
	}
}

function skyBurst(times) {
	for (let i = 0; i < times; i++) {
		setTimeout(() => {
			bloomBurst(
				Garden.random(80, gardenCanvas.width - 80),
				Garden.random(80, gardenCanvas.height - 80),
				3
			);
		}, i * 450);
	}
}

function flash() {
	gardenCtx.fillStyle = "rgba(255,255,255,0.15)";
	gardenCtx.fillRect(0, 0, gardenCanvas.width, gardenCanvas.height);
}

function centerX() { return gardenCanvas.width / 2; }
function centerY() { return gardenCanvas.height / 2; }

/* -------- LAYOUT -------- */

function adjustCodePosition() {
	$("#code").css("margin-top",
		($("#garden").height() - $("#code").height()) / 2
	);
}
