import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../App.js';
import classNames from 'classnames';
import injectSheet from 'react-jss';

//styles
import styles from '../styles/components/Game';

//assets
import assets from '../assets/assets';

//engine functions
import addFire from './engine/addFire';
import shipMovement from './engine/shipMovement';
import render from './engine/render';
import update from './engine/update';
import reset from './engine/reset';
import shipDestruction from './engine/shipDestruction';

const { REACT_APP_BACKEND_URL } = process.env;

const Game = ({ classes, className = {} }) => {
  const { dispatch } = useContext(Context);
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const isSendLeaderboard =
    localStorage.getItem('isSendLeaderboard') === 'false' ? false : true;

  let screenWidth = window.innerWidth;
  const screenHeigth = window.innerHeight;
  screenWidth = window.matchMedia('(min-width: 900px)').matches
    ? 900
    : window.innerWidth;

  const { audioBGC } = assets;

  let shipAlive = true;
  let livesArr = [
    { x: 10, y: 10 },
    { x: 50, y: 10 },
    { x: 90, y: 10 },
  ];

  let timer = 0;
  let score = 0;
  let fireArr = [];
  let explArr = [];
  let asteroidArr = [];
  let ship = {
    x: (screenWidth - 50) / 2,
    y: screenHeigth - 50,
    animX: 0,
    animY: 0,
  };

  let context = null;
  const canvas = useRef();

  const bullets = () => addFire(fireArr, ship);
  const movement = (e) => shipMovement(e, ship);

  useEffect(() => {
    context = canvas.current.getContext('2d');
    canvas.current.style.cursor = 'none';

    [timer, ship, fireArr, explArr, asteroidArr] = reset(
      screenWidth,
      screenHeigth,
      timer,
      ship,
      fireArr,
      explArr,
      asteroidArr,
    );
    game();
    audioBGC.play();

    canvas.current.addEventListener('mousemove', movement);
    canvas.current.addEventListener('click', bullets);

    return () => {
      if (isSendLeaderboard && userName && userEmail) {
        fetch(`${REACT_APP_BACKEND_URL}/api/score`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score,
            name: userName,
            email: userEmail,
          }),
        });
      }
    };
  }, []);

  const game = () => {
    if (livesArr.length === 0) {
      cancelAnimationFrame(game);
      canvas.current.removeEventListener('click', bullets);
      canvas.current.removeEventListener('mousemove', movement);

      shipDestruction(
        screenWidth,
        screenHeigth,
        dispatch,
        requestAnimFrame,
        cancelAnimationFrame,
        context,
        ship,
        score,
        fireArr,
        asteroidArr,
        explArr,
        livesArr,
        shipAlive,
      );
      return;
    }

    [timer, score, ship, asteroidArr, livesArr, fireArr, explArr] = update(
      screenWidth,
      screenHeigth,
      timer,
      score,
      ship,
      asteroidArr,
      livesArr,
      fireArr,
      explArr,
    );

    render(
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
    );
    requestAnimFrame(game);
  };

  const requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 20);
      }
    );
  })();

  const cancelAnimationFrame = () => {
    return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
  };

  return (
    <div className={classNames(classes.root, className.root)}>
      <canvas width={screenWidth} height={screenHeigth} ref={canvas}>
        Элемент не поддерживается
      </canvas>
    </div>
  );
};

export default injectSheet(styles)(Game);
