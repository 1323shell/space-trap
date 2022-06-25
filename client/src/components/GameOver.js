import React, { useEffect, useContext } from 'react';
import { Context } from '../App.js';
import classNames from 'classnames';
import injectSheet from 'react-jss';

//styles

import styles from '../styles/components/GameOver.js';

//assets
import assets from '../assets/assets.js';

const GameOver = ({ classes, className = {} }) => {
  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    assets.audioGameOver.play();
  }, []);

  return (
    <div className={classNames(classes.root, className.root)}>
      <div width='600' height='600'>
        <div className={classNames(classes.gameOver, className.gameOver)}>
          GAME OVER
        </div>
        <div className={classNames(classes.score, className.score)}>
          SCORE: {state.score}
        </div>
      </div>
      <button
        onClick={() => dispatch({ type: 'start' })}
        className={classNames(classes.restart, className.restart)}
      >
        RESTART
      </button>
    </div>
  );
};

export default injectSheet(styles)(GameOver);
