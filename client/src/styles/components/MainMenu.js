export default (theme) => ({
  root: {
    width: '900px',
    height: '100vh',
    margin: '0 auto',
    padding: '5% 0',
    backgroundColor: theme.mainBgc,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontSize: theme.size.largest * 2,
  },
  userInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userInfo: {
    minWidth: '263px',
    backgroundColor: '#9198E5',
    fontSize: theme.size.normal,
    textAlign: 'left',
    padding: theme.spacing,
    marginBottom: theme.spacing,
    border: '1px solid black',
  },
  leaderboardActivate: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardCheckbox: {
    width: '20px',
    height: '20px',
    margin: 0,
    marginLeft: theme.spacing,
    cursor: 'pointer',
  },
  score: {
    width: 'auto',
    height: 'auto',
    padding: theme.spacing * 2,
    backgroundColor: 'lightblue',
    borderRadius: '30px',
  },
  '@media (max-width: 900px)': {
    root: {
      width: '100%',
    },
  },
  '@media (max-height: 600px)': {
    root: {
      padding: '2% 0',
    },
  },
  '@media (max-height: 400px)': {
    root: {
      padding: 0,
    },
  },
});
