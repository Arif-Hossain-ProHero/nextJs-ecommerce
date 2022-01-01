import React from 'react';
import Head from 'next/head';
import NextLink from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Link,
  CssBaseline,
} from '@mui/material';
import useStyles from '../utils/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Layout = ({ children, title, description }) => {
  //initialize styles
  const classes = useStyles();
  //mui theme
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
      type: 'light',
      primary: {
        main: '#f0c000',
      },
    },
  });
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
