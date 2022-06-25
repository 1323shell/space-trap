import assets from '../../assets/assets';

export default (theme) => ({
  '@keyframes showGameOver': {
    '0%': {
      opacity: 0,
      transform: 'scale(3)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
  '@keyframes showScore': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  root: {
    width: theme.screenWidth,
    height: '100vh',
    background: {
      image: `url(${assets.gameOverImg.src})`,
      repeat: 'no-repeat',
      position: 'center',
      size: 'contain',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '30px 0 50px',
  },
  gameOver: {
    fontSize: theme.size.largest * 2,
    color: '#f45c42',
    animation: 'showGameOver 1s',
  },
  score: {
    fontSize: theme.size.largest * 2,
    color: 'gold',
    textShadow:
      '0 0 10px #fff, 0 0 10px #fff, 0 0 15px #fff, 0 0 20px #ffd000, 0 0 35px #ffd000, 0 0 40px #ffd000, 0 0 50px #ffd000, 0 0 75px #ffd000',
    opacity: 1,
    animation: 'showScore 2s ease',
  },
  restart: {
    width: 'auto',
    height: 'auto',
    padding: theme.spacing * 2,
    borderRadius: '30px',
    backgroundColor: '#4286f4',
  },
});
