import React, { useReducer } from 'react';

import reducer from './reducer/reducer';

// styles
import injectSheet from 'react-jss';
import styles from './styles';

//components
import MainMenu from './components/MainMenu';

import Game from './components/Game';
import GameOver from './components/GameOver';

export const Context = React.createContext(null);

const App = () => {
  const [state, dispatch] = useReducer(reducer, {
    start: false,
    end: false,
    score: 0,
  });
  const store = { state, dispatch };

  return (
    <Context.Provider value={store}>
      <div>
        {!state.start ? <MainMenu /> : !state.end ? <Game /> : <GameOver />}
      </div>
    </Context.Provider>
  );
};

export default injectSheet(styles)(App);
