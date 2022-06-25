const reset = (
  screenWidth,
  screenHeigth,
  timer,
  ship,
  fireArr,
  explArr,
  asteroidArr
) => {
  timer = 0;
  ship = {
    x: (screenWidth - 50) / 2,
    y: screenHeigth - 50,
    animX: 0,
    animY: 0,
  };
  fireArr = [];
  explArr = [];
  asteroidArr = [
    {
      x: Math.random() * screenWidth,
      y: -50,
      speedX: Math.random() * 2 - 1,
      speedY: 1 + Math.random() * 5,
      del: 0,
      angle: 0,
      speedAngle: Math.random() * 0.1,
    },
  ];

  return [timer, ship, fireArr, explArr, asteroidArr];
};

export default reset;
