import assets from '../../assets/assets';

const { gameBackground, asteroidImg, shipImg, shieldImg, fireImg, explImg } =
  assets;

const render = (
  screenWidth,
  screenHeigth,
  context,
  ship,
  score,
  fireArr,
  asteroidArr,
  explArr,
  livesArr,
  shipAlive,
) => {
  context.clearRect(0, 0, screenWidth, screenHeigth);
  context.drawImage(gameBackground, 0, 0, screenWidth, screenHeigth);

  //draw bullets
  fireArr.forEach((fire) => {
    context.drawImage(fireImg, fire.x, fire.y, 30, 30);
  });

  //draw asteroids
  asteroidArr.forEach((asteroid) => {
    context.save();
    context.translate(asteroid.x + 25, asteroid.y + 25);
    context.rotate(asteroid.angle);
    context.drawImage(asteroidImg, -25, -25, 50, 50);
    context.restore();
  });

  //draw explosion
  explArr.forEach((expl, i) => {
    context.drawImage(
      explImg,
      128 * Math.floor(expl.animX),
      128 * Math.floor(expl.animY),
      128,
      128,
      expl.x,
      expl.y,
      100,
      100,
    );
  });

  //draw lives
  livesArr.forEach((live) => {
    context.drawImage(shipImg, live.x, live.y, 40, 20);
  });

  //draw ship
  if (shipAlive) context.drawImage(shipImg, ship.x, ship.y);

  //draw shield
  if (livesArr.length > 1) {
    context.drawImage(
      shieldImg,
      192 * Math.floor(ship.animX),
      192 * Math.floor(ship.animY),
      192,
      192,
      ship.x - 25,
      ship.y - 25,
      100,
      100,
    );
  }

  //draw score
  context.font = '30px Impact';
  context.fillStyle = '#0099CC';
  context.textAlign = 'center';
  context.fillText(score, screenWidth - 80, 50);
};

export default render;
