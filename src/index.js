import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import ListPage from './components/ListPage'

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffffff',
        },
        secondary: {
            main: '#c1c1c1',
        }
    },
})

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <ListPage />
    </ThemeProvider>,
    document.getElementById('root')
);