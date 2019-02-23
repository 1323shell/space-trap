import React, { useContext, useEffect, useRef } from 'react';
import { Context } from '../App.jsx';
import classNames from 'classnames';
import injectSheet from 'react-jss';

//styles
import styles from '../styles/components/Game.js';

//assets
import assets from '../assets/assets.js';

//engine functions
import addFire from './engine/addFire.js';
import shipMovement from './engine/shipMovement.js';
import render from './engine/render.js';
import update from './engine/update.js';
import reset from './engine/reset.js';
import shipDestruction from './engine/shipDestruction.js';

const Game = ({ classes, className = {} }) => {
    const { dispatch } = useContext(Context);
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const isSendLeaderboard = ( localStorage.getItem('isSendLeaderboard') === "false" )
        ? false
        : true;

    let screenWidth = window.innerWidth;
    const screenHeigth = window.innerHeight;
    screenWidth = (window.matchMedia("(min-width: 900px)").matches)
        ? 900
        : window.innerWidth;

    const { audioBGC } = assets;

    let shipAlive = true;
    let livesArr = [
        {x: 10, y: 10},
        {x: 50, y: 10},
        {x: 90, y: 10}
    ];

    let timer = 0;
    let score = 0;
    let fireArr = [];
    let explArr = [];
    let asteroidArr = [];
    let ship = {
        x: (screenWidth - 50)/2,
        y: screenHeigth - 50,
        animX: 0,
        animY: 0
    };

    let context = null;
    const canvas = useRef();

    const bullets = () => addFire(fireArr, ship);
    const movement = (e) => shipMovement(e, ship);

    useEffect(() => {
        context = canvas.current.getContext('2d');
        canvas.current.style.cursor = 'none';

        [timer, ship, fireArr, explArr, asteroidArr] = reset(screenWidth, screenHeigth, timer, ship, fireArr, explArr, asteroidArr);
        game();
        audioBGC.play();

        canvas.current.addEventListener('mousemove', movement);
        canvas.current.addEventListener('click', bullets);

        if (isSendLeaderboard && userName && userEmail) {
            return () => {
                fetch('/api/score', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        score: score,
                        name: userName,
                        email: userEmail,
                    }),
                });
            };
        }
    }, []);

    const game = () =>{
        if (livesArr.length === 0) {
            cancelAnimationFrame(game);
            canvas.current.removeEventListener('click', bullets);
            canvas.current.removeEventListener('mousemove', movement);

            shipDestruction(screenWidth, screenHeigth, dispatch, requestAnimFrame, cancelAnimationFrame, context, ship, score, fireArr, asteroidArr, explArr, livesArr, shipAlive);
            return;
        }

        [
            timer,
            score, ship,
            asteroidArr,
            livesArr,
            fireArr,
            explArr
        ] = update(screenWidth, screenHeigth, timer, score, ship, asteroidArr, livesArr, fireArr, explArr);

        render(screenWidth, screenHeigth, context, ship, score, fireArr, asteroidArr, explArr, livesArr, shipAlive);
        requestAnimFrame(game);
    };

    const requestAnimFrame = (function(){
        return window.requestAnimationFrame    ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 20);
            };
    })();

    const cancelAnimationFrame = () => {
        return window.cancelAnimationFrame || window.mozCancelAnimationFrame;
    };

    return(
        <div className={classNames(classes.root, className.root)}>
            <canvas
                width={screenWidth}
                height={screenHeigth}
                ref={canvas}
            >
                Элемент не поддерживается
            </canvas>
        </div>
    )
};

export default injectSheet(styles)(Game);