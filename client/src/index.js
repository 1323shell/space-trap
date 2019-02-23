import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

//styles
import {ThemeProvider} from 'react-jss';
import theme from './styles/theme';

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
    , document.getElementById('root'));