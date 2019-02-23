import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../App.jsx';
import classNames from 'classnames';
import injectSheet from 'react-jss';

//styles
import styles from '../styles/components/MainMenu.js';

const MainMenu = ({ classes, className = {} }) => {
    const { dispatch } = useContext(Context);
    const [ isUserEdit, setIsUserEdit ] = useState(false);

    const [ isSendLeaderboard, setIsSendLeaderboard ] = useState( ( localStorage.getItem('isSendLeaderboard') === "false" )
        ? false
        : true
    );
    const [ inputNameValue, setInputNameValue ] = useState(localStorage.getItem('userName'));
    const [ inputNameEmail, setInputNameEmail ] = useState(localStorage.getItem('userEmail'));

    useEffect(() => {
        localStorage.setItem('isSendLeaderboard', isSendLeaderboard);
    }, [isSendLeaderboard]);

    const saveUser = () => {
        localStorage.setItem('userName', (inputNameValue !== null) ? inputNameValue : '');
        localStorage.setItem('userEmail', (inputNameEmail !== null) ? inputNameEmail : '');

        setIsUserEdit(false);
    };

    return (
        <div className={classNames(classes.root, className.root)}>
            <div
                width="600"
                height="600"
                className={classNames(classes.title, className.title)}
            >
                Space Trap
            </div>
            {!isUserEdit
                ? (
                    <div className={classNames(classes.userInfoContainer, className.userInfoContainer)}>
                        <div>
                            <div className={classNames(classes.userInfo, className.userInfo)}>
                                Player: {localStorage.getItem('userName')}
                            </div>
                            <div className={classNames(classes.userInfo, className.userInfo)}>
                                Email: {localStorage.getItem('userEmail')}
                            </div>
                        </div>
                        <button
                            onClick={() => setIsUserEdit(true)}
                        >
                            <span role="img" aria-label="edit">✎</span>
                        </button>
                    </div>
                )
                : (
                    <form onSubmit={saveUser} className={classNames(classes.userInfoContainer, className.userInfoContainer)}>
                        <input
                            type="text"
                            placeholder="minimum 3 symbols"
                            defaultValue={localStorage.getItem('userName') || ''}
                            pattern="[\S\s]{3,}"
                            className={classNames(classes.userInfo, className.userInfo)}
                            onChange={(e) => setInputNameValue(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="xxx@xxx.com"
                            defaultValue={localStorage.getItem('userEmail') || ''}
                            pattern="[\wА-яё_-]+@[\wА-яё_\-.]+\.[a-zA-ZА-яё]{2,6}"
                            className={classNames(classes.userInfo, className.userInfo)}
                            onChange={(e) => setInputNameEmail(e.target.value)}
                        />
                        <div>
                            <button type="submit">
                                <span role="img" aria-label="save">✔</span>
                            </button>
                            <button
                                onClick={() => setIsUserEdit(false)}
                            >
                                <span role="img" aria-label="notSave">❌</span>
                            </button>
                        </div>
                    </form>
                )
            }
            <div className={classNames(classes.leaderboardActivate, className.leaderboardActivate)}>
                <span>Do you want to get the <b>LEADERBOARD</b> in the end of the game?</span>
                <input
                    type="checkbox"
                    defaultChecked={isSendLeaderboard}
                    className={classNames(classes.leaderboardCheckbox, className.leaderboardCheckbox)}
                    onClick={() => setIsSendLeaderboard(!isSendLeaderboard)}
                />
            </div>
            <button
                onClick={() => dispatch({type: 'start'})}
                className={classNames(classes.score, className.score)}
            >
                START
            </button>
        </div>
    );
};

export default injectSheet(styles)(MainMenu);
