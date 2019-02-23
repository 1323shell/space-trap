import render from './render.js';
import assets from '../../assets/assets.js';

const {
    audioBGC,
    audioExplosion,
    shipExplImg,
} = assets;

let shipExpl = {
    animX: 0,
    animY: 0
};

const shipDestruction = (screenWidth, screenHeigth, dispatch, requestAnimFrame, cancelAnimationFrame, context, ship, score, fireArr, asteroidArr, explArr, livesArr, shipAlive) => {
    audioBGC.pause();
    audioExplosion.load();
    audioExplosion.play();

    const shipDestructionAnimation = () => {
        render(screenWidth, screenHeigth, context, ship, score, fireArr, asteroidArr, explArr, livesArr, shipAlive);

        shipExpl.animX++;

        if (shipExpl.animX > 8) {
            shipExpl.animX = 0;
            shipExpl.animY++;
        }

        //draw shipExpl
        context.drawImage(
            shipExplImg,
            100*shipExpl.animX,
            100*shipExpl.animY,
            100,
            100,
            ship.x - 25,
            ship.y - 25,
            100,
            100
        );

        if (shipAlive) shipAlive = false;

        if (shipExpl.animY > 8) {
            shipExpl.animX = 0;
            shipExpl.animY = 0;

            cancelAnimationFrame(shipDestructionAnimation);
            dispatch({ type: 'end', payload: score });
            return;
        }

        requestAnimFrame(shipDestructionAnimation);
    };

    shipDestructionAnimation();
};

export default shipDestruction;