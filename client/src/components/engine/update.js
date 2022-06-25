import reset from './reset';
import assets from '../../assets/assets';

const { audioExplosion } = assets;

const update = (
  screenWidth,
  screenHeigth,
  timer,
  score,
  ship,
  asteroidArr,
  livesArr,
  fireArr,
  explArr,
) => {
  timer++;

  //add new asteroid
  if (timer % 5 === 0)
    asteroidArr.push({
      x: Math.random() * screenWidth,
      y: -50,
      speedX: Math.random() * 2 - 1,
      speedY: 1 + Math.random() * 5,
      del: 0,
      angle: 0,
      speedAngle: Math.random() * 0.1,
    });

  //asteroid life-cycle
  asteroidArr.forEach((asteroid, i) => {
    //phisics
    asteroid.x += asteroid.speedX;
    asteroid.y += asteroid.speedY;
    asteroid.angle += asteroid.speedAngle;

    //borders
    if (asteroid.x >= screenWidth - 50 || asteroid.x <= 0)
      asteroid.speedX = -asteroid.speedX;
    if (asteroid) {
      if (asteroid.y >= screenHeigth + 50) asteroidArr.splice(i, 1);
    }

    //minus one live
    if (
      Math.abs(asteroid.x + 25 - ship.x - 25) < 50 &&
      Math.abs(asteroid.y - ship.y) < 25
    ) {
      livesArr.pop();
      if (livesArr.length === 0) return;
      audioExplosion.load();
      audioExplosion.play();
      [timer, ship, fireArr, explArr, asteroidArr] = reset(
        screenWidth,
        screenHeigth,
        timer,
        ship,
        fireArr,
        explArr,
        asteroidArr,
      );
      return;
    }

    //asteroid destroyed
    for (let j = 0; j < fireArr.length; j++) {
      if (
        Math.abs(asteroid.x + 25 - fireArr[j].x - 15) < 50 &&
        Math.abs(asteroid.y - fireArr[j].y) < 25
      ) {
        explArr.push({
          x: asteroid.x - 25,
          y: asteroid.y - 25,
          animX: 0,
          animY: 0,
        });

        fireArr.splice(j, 1);
        asteroid.del = 1;
        score++;
        break;
      }
    }

    if (asteroid.del === 1) asteroidArr.splice(i, 1);
  });

  //bullets
  fireArr.forEach((fire, i) => {
    fire.x += fire.speedX;
    fire.y += fire.speedY;

    if (fire.y < -30) fireArr.splice(i, 1);
    if (fire) {
      if (fire.x < -30) fireArr.splice(i, 1);
    }
  });

  //explosions
  explArr.forEach((expl, i) => {
    expl.animX += 0.5;

    if (expl.animX > 3) {
      expl.animX = 0;
      expl.animY++;
    }

    if (expl.animY > 3) explArr.splice(i, 1);
  });

  //ship borders
  if (ship.x < 0) ship.x = 0;
  if (ship.x >= screenWidth - 50) ship.x = screenWidth - 50;
  if (ship.y < 0) ship.y = 0;
  if (ship.y >= screenHeigth - 30) ship.y = screenHeigth - 30;

  //shield borders
  ship.animX++;
  if (ship.animX > 4) {
    ship.animX = 0;
    ship.animY++;
  }
  if (ship.animY > 3) ship.animX = ship.animY = 0;

  return [timer, score, ship, asteroidArr, livesArr, fireArr, explArr];
};

export default update;
