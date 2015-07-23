
// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 300;
canvas.height = 480;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "img/background.png";

// cat image
var catReady = false;
var catImage = new Image();
catImage.onload = function () {
	catReady = true;
};
catImage.src = "img/cat.png";

// yuanbao image
var yuanbaoReady = false;
var yuanbaoImage = new Image();
yuanbaoImage.onload = function () {
	yuanbaoReady = true;
};
yuanbaoImage.src = "img/yuanbao.png";


// Game objects
var cat = {
	speed: 256 // movement in pixels per second
};
var yuanbao = {};
var yuanbaosCaught = 0;
var Time=60;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a yuanbao
var reset = function () {
	cat.x = 110;
	cat.y = 380;

	// Throw the yuanbao somewhere on the screen randomly
	yuanbao.x = 32 + (Math.random() * (canvas.width - 64));
	yuanbao.y=0;
	//yuanbao.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		cat.y -= cat.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		cat.y += cat.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		cat.x -= cat.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		cat.x += cat.speed * modifier;
	}

	// Are they touching?
	if (
		cat.x <= (yuanbao.x + 32)
		&& yuanbao.x <= (cat.x + 32)
		&& cat.y <= (yuanbao.y + 32)
		&& yuanbao.y <= (cat.y + 32)
	) {
		++yuanbaosCaught;
		reset();
	}
};

//计时器
var s = 60;
	function run() {
    	if(s == 0) {
		clearTimeout(timer);
        alert("Game is over!");
        //s = 60;
		return ;
    }
    s--;
    var timer = setTimeout("run()",1000);
};
run();
/*
var s = 60;
	function run() {
		ctx.fillText("时间: " + s, 210 ,16);
    	if(s == 0) {
        return false;
    }
    s = s * 1 - 1;
    var Time = setTimeout("run()",2000);
};
*/
// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (catReady) {
		ctx.drawImage(catImage, cat.x, cat.y);
	}

	if (yuanbaoReady) {
		ctx.drawImage(yuanbaoImage, yuanbao.x, yuanbao.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "12px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("得分: " + yuanbaosCaught, 15, 16);
	ctx.fillText("时间: " + s, 210 ,16);
	/*
var s = 60;
	setInterval(function() {
    	if(s == 0) {
        return false;
    }
    ctx.fillText("时间: " + s, 210, 16);
    s = s * 1 - 1;
},1000);*/
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
	
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();