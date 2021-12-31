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
} from '@mui/material';
import useStyles from '../utils/styles';

const Layout = ({ children }) => {
  const classes = useStyles();
  return (
    <div>
      <Head>
        <title>Next-Amazona</title>
      </Head>
      <AppBar
        style={{ margin: 0 }}
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
    </div>
  );
};

export default Layout;
