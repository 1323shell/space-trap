import React, { useReducer } from 'react';
import reducer from './reducer/reducer.js';
//import classNames from 'classnames';
import injectSheet from 'react-jss';
import styles from './styles';

//components
import MainMenu from './components/MainMenu.jsx';
import Game from './components/Game.jsx';
import GameOver from './components/GameOver.jsx';

export const Context = React.createContext(null);

const App = () => {
    const [state, dispatch] = useReducer(reducer, {
        start: false,
        end: false,
        score: 0,
    });
    const store = {state, dispatch};

    return (
        <Context.Provider value={store}>
            <div>
                {!state.start
                    ? (
                        <MainMenu/>
                    )
                    : !state.end
                        ? (
                            <Game/>
                        )
                        : (
                            <GameOver/>
                        )
                }
            </div>
        </Context.Provider>
    );
};

export default injectSheet(styles)(App);