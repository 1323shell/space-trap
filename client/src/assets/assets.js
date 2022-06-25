let gameBackground = new Image();
let gameOverImg = new Image();
let asteroidImg = new Image();
let shipImg = new Image();
let shieldImg = new Image();
let fireImg = new Image();
let explImg = new Image();
let shipExplImg = new Image();

gameBackground.src = 'img/fon.jpg';
gameOverImg.src = 'img/game-over.jpg';
asteroidImg.src = 'img/astero.png';
shipImg.src = 'img/ship.png';
shieldImg.src = 'img/shield.png';
fireImg.src = 'img/fire.png';
explImg.src = 'img/expl.png';
shipExplImg.src = 'img/ship-expl.png';

const assets = {
  audioBGC: new Audio('audio/Rafael_Dyll_Caves_of_Iya.mp3'),
  audioExplosion: new Audio(
    'https://www.myinstants.com/media/sounds/impact_explosion_03.mp3'
  ),
  audioGameOver: new Audio(
    'https://www.myinstants.com/media/sounds/gameover_1.mp3'
  ),
  gameBackground: gameBackground,
  gameOverImg: gameOverImg,
  asteroidImg: asteroidImg,
  shipImg: shipImg,
  shieldImg: shieldImg,
  fireImg: fireImg,
  explImg: explImg,
  shipExplImg: shipExplImg,
};

export default assets;
