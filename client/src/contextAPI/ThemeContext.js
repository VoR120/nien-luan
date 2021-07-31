
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import React from 'react';

const theme = createTheme({
    palette: {
        primary: {
            main: '#212121',
            dark: '#000',
            light: '#424242' //text
        },
        secondary: {
            main: '#fff',
            light: '#fff',
            dark: '#F5F5F5' //background
        },
    },
    typography: {
        h1: {
            fontSize: '2rem'
        },
        h2: {
            fontSize: '1.75rem'
        },
        h3: {
            fontSize: '1.5rem'
        },
        h4: {
            fontSize: '1.25rem'
        },
        h5: {
            fontSize: '1rem'
        },
        h6: {
            fontSize: '0.75rem'
        },
    }
})

const ThemeContextProvider = (props) => {
    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    );
};

export default ThemeContextProvider;