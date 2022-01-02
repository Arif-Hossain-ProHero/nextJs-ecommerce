import React, { useContext } from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  CssBaseline,
  Switch,
} from '@mui/material';
import useStyles from '../utils/styles';
import { Store } from '../utils/store';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cookies from 'js-cookie';

const Layout = ({ children, title, description }) => {
  const { state, dispatch } = useContext(Store);
  const { darkMode } = state;
  //initialize styles
  const classes = useStyles();
  //-------------mui theme
  const theme = createTheme({
    typography: {
      fontFamily: "'Poppins', sans-serif",
      heading: {
        fontSize: '1.6rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
      h2: {
        fontSize: '1.4rem',
        fontWeight: 400,
        margin: '1rem 0',
      },
    },
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#f0c000',
      },
    },
  });
  //-------dark mode change handler
  const darkModeHandleChange = () => {
    dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    const newDarkMode = !darkMode;
    console.log(newDarkMode);
    Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title}-Next Amazona}` : 'Next Amazona'}</title>
        {description ? (
          <meta name="description" content={description}></meta>
        ) : (
          <meta name="description" content="Amazona"></meta>
        )}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar
          // style={{ background: '#2E3B55' }}
          position="static"
          className={classes.navbar}
        >
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>Amazona</Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onClick={darkModeHandleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              ></Switch>
              <NextLink href="/cart" passHref>
                <Link>cart</Link>
              </NextLink>
              <NextLink href="/login" passHref>
                <Link>login</Link>
              </NextLink>
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <h3>All Rights Reserved. Next Amazona.</h3>
        </footer>
      </ThemeProvider>
    </div>
  );
};

export default Layout;
