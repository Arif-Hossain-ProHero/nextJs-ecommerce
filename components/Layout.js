import React from 'react';
import Head from 'next/head';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
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
          <Typography>Amazona</Typography>
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
