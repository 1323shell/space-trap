let audioBGC = new Audio("sources/audio/Rafael_Dyll_Caves_of_Iya.mp3");
audioBGC.load();

let audioExplosion = new Audio("https://www.myinstants.com/media/sounds/impact_explosion_03.mp3");
audioExplosion.load();

let audioGameOver = new Audio("https://www.myinstants.com/media/sounds/gameover_1.mp3");
audioGameOver.load();

//START
let scoreButton = document.querySelector('.score');

//GAME
let canvas = document.querySelector('#game');
let context = canvas.getContext('2d');
context.font = '50px Arial';
context.textAlign = 'center';
context.fillStyle = "#00b2ff";
context.fillRect(0, 0, 600, 600);
context.strokeText('Space trap', canvas.width/2, canvas.height/2);
/*let screenSaver = new Image();
screenSaver.src = 'sources/img/screen-saver.jpg';
context.drawImage(screenSaver, 0, 0, 851, 619, 0, 0, 600, 600);*/

let timer = 0;
let score = 0;
let shipDestroydTimer = null;
let livesArr = [
  {x: 10,y: 10},
  {x: 50,y: 10},
  {x: 90,y: 10}
];

let gameBackground = new Image();
gameBackground.src = 'sources/img/fon.jpg';

let gameOverImg = new Image();
gameOverImg.src = 'sources/img/game-over.jpg';

let asteroid = new Image();
asteroid.src = 'sources/img/astero.png';
let asteroidArr = [];

let shipImg = new Image();
shipImg.src = 'sources/img/ship.png';
let ship = {
  x: 275,
  y: 550,
  animX: 0,
  animY: 0
}

function shipMovement(e) {
    ship.x = e.offsetX-25;
    ship.y = e.offsetY-13;
}

shieldImg = new Image();
shieldImg.src = 'sources/img/shield.png';

let fireImg = new Image();
fireImg.src = 'sources/img/fire.png';
let fireArr = [];
function addFire(e) {
  fireArr.push({
        x: ship.x + 5,
        y: ship.y - 10,
        speedX: -0.5,
        speedY: -5
      }, {
        x: ship.x + 10,
        y: ship.y - 10,
        speedX: 0,
        speedY: -5
      }, {
        x: ship.x + 15,
        y: ship.y - 10,
        speedX: 0.5,
        speedY: -5
      }
    );
}

let explImg = new Image();
explImg.src = 'sources/img/expl.png';
let explArr = [];

let shipExplImg = new Image();
shipExplImg.src = 'sources/img/ship-expl.png';
let shipExpl = {
    animX: 0,
    animY: 0
  };

////приводим элементы игры к первоначальному состоянию
function reset() {
  timer = 0;
  ship = {x:275, y:550, animX:0, animY: 0};
  fireArr = [];
  explArr = [];
  asteroidArr = [{
    x: Math.random()*600,
    y: -50,
    speedX: Math.random()*2 - 1,
    speedY: 1 + Math.random()*5,
    del: 0,
    angle: 0,
    speedAngle: Math.random()*0.1
  }];  
}

//lanch the game
scoreButton.addEventListener('click', function() {
  canvas.style.cursor = 'none';
  scoreButton.style.display = 'none';

  //приводим элементы игры к первоначальному состоянию
  livesArr = [
    {x: 10,y: 10},
    {x: 50,y: 10},
    {x: 90,y: 10}
  ];

  reset();
  game();

  canvas.addEventListener('mousemove', shipMovement);
  canvas.addEventListener('click', addFire);

  audioBGC.load();
  audioBGC.play();
});

function game() {
  if (livesArr.length === 0) {
    cancelAnimationFrame(game);
    showScore();
    return;
  };

  update();
  render();
  requestAnimFrame(game);
}

function update() {
  timer++;

  if (timer%5 == 0) asteroidArr.push({
    x: Math.random()*600,
    y: -50,
    speedX: Math.random()*2 - 1,
    speedY: 1 + Math.random()*5,
    del: 0,
    angle: 0,
    speedAngle: Math.random()*0.1
  });

  for (var i = 0; i < asteroidArr.length; i++) {
    //phisics
    asteroidArr[i].x += asteroidArr[i].speedX;
    asteroidArr[i].y += asteroidArr[i].speedY;
    asteroidArr[i].angle += asteroidArr[i].speedAngle;

    //borders
    if (asteroidArr[i].x >= 550 || asteroidArr[i].x <= 0) asteroidArr[i].speedX = -asteroidArr[i].speedX;
    if (asteroidArr[i]) {
      if (asteroidArr[i].y >= 650) asteroidArr.splice(i, 1);
    }

    //minus one live
    if (Math.abs(asteroidArr[i].x+25 - ship.x-25) < 50 && Math.abs(asteroidArr[i].y - ship.y) < 25) {
      livesArr.pop();
      if (livesArr.length === 0) return;
      audioExplosion.load();
      audioExplosion.play();
      reset();
      return;
    }

    //asteroid destroyed
    for (var j = 0; j < fireArr.length; j++) {
      if (Math.abs(asteroidArr[i].x+25 - fireArr[j].x-15) < 50 && Math.abs(asteroidArr[i].y - fireArr[j].y) < 25) {
        explArr.push({
          x: asteroidArr[i].x - 25,
          y: asteroidArr[i].y - 25,
          animX: 0,
          animY: 0
        });

        fireArr.splice(j, 1);
        asteroidArr[i].del = 1;
        score++;        
        break;
      }
    }
    if (asteroidArr[i].del == 1) asteroidArr.splice(i, 1);
  }

  //bullets
  for (var i = 0; i < fireArr.length; i++) {
    fireArr[i].x += fireArr[i].speedX;
    fireArr[i].y += fireArr[i].speedY;
    
    if (fireArr[i].y < -30) fireArr.splice(i, 1);
    if (fireArr[i]) {
      if (fireArr[i].x < -30) fireArr.splice(i, 1);
    }    
  }

  //explosions
  for (var i = 0; i < explArr.length; i++) {
    explArr[i].animX += 0.5;
    if (explArr[i].animX > 3) {
      explArr[i].animX = 0;
      explArr[i].animY++;
    };
    if (explArr[i].animY > 3) explArr.splice(i, 1);
  }

  //ship borders
  if (ship.x < 0) ship.x = 0;
  if (ship.x >= 550) ship.x = 550;
  if (ship.y < 0) ship.y = 0;
  if (ship.y >= 570) ship.y = 570;

  //shield borders
 ship.animX++;
 if (ship.animX > 4) {
  ship.animX = 0;
  ship.animY++;
 }
 if (ship.animY > 3) ship.animX = ship.animY = 0;
}

function render() {
  context.clearRect(0, 0, 600, 600);
  context.drawImage(gameBackground, 0, 0, 600, 600);

  for (var i = 0; i < fireArr.length; i++) {
    context.drawImage(fireImg, fireArr[i].x, fireArr[i].y, 30, 30);
  }

  for (var i = 0; i < asteroidArr.length; i++) {
    //context.drawImage(asteroid, asteroidArr[i].x, asteroidArr[i].y, 50, 50);
    context.save();
    context.translate(asteroidArr[i].x + 25, asteroidArr[i].y + 25);
    context.rotate(asteroidArr[i].angle);
    context.drawImage(asteroid, -25, -25, 50, 50);
    context.restore();
  }

  for (var i = 0; i < explArr.length; i++) {
    context.drawImage(explImg, 128*Math.floor(explArr[i].animX), 128*Math.floor(explArr[i].animY), 128, 128, explArr[i].x, explArr[i].y, 100, 100);
  }

  for (var i = 0; i < livesArr.length; i++) {
    context.drawImage(shipImg, livesArr[i].x, livesArr[i].y, 40, 20);
  }

  if (!shipDestroydTimer) {
    context.drawImage(shipImg, ship.x, ship.y);
  }
  
  if (livesArr.length > 1) context.drawImage(shieldImg, 192*Math.floor(ship.animX), 192*Math.floor(ship.animY), 192, 192, ship.x - 25, ship.y - 25, 100, 100);

  context.font = "30px Impact";
  context.fillStyle = "#0099CC";
  context.textAlign = "center";
  context.fillText(score, 520, 50);
}

var requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 20);
        };
})();

function cancelAnimationFrame() {
  return window.cancelAnimationFrame || window.mozCancelAnimationFrame;;
}

function showScore() {
  canvas.removeEventListener('click', addFire);

  canvas.removeEventListener('mousemove', shipMovement);

  audioBGC.pause();
  audioExplosion.load();
  audioExplosion.play();

  shipDestroydTimer = setInterval(() => {
      render();
        shipExpl.animX++;
        if (shipExpl.animX > 5) {
          shipExpl.animX = 0;
          shipExpl.animY++;
        };

        context.drawImage(shipExplImg, 100*shipExpl.animX, 100*shipExpl.animY, 100, 100, ship.x - 25, ship.y - 25, 100, 100);

        if (shipExpl.animY > 5) {
          shipExpl.animX = 0;
          shipExpl.animY = 0;
          clearInterval(shipDestroydTimer);
          shipDestroydTimer = null;
        };
  }, 30);

  setTimeout(() => {
    context.clearRect(0, 0, 600, 600);
    context.drawImage(gameOverImg, 0, 0, 781, 600, 0, 0, 600, 600);
    canvas.style.cursor = 'default';

    context.font = "30px Impact";
    context.fillStyle = "#ffd400";
    context.textAlign = "center";
    context.fillText('Game over!', canvas.width/2, canvas.height/1.3);
    context.fillStyle = "#00ff9d";
    context.fillText('Score: ' + score, canvas.width/2, canvas.height/1.2);

    scoreButton.style.display = 'block';
    scoreButton.innerHTML = 'Restart';
    audioGameOver.play();
    score = 0;
  }, 1200);
}