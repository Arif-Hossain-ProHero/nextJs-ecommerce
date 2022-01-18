import {
  Typography,
  List,
  TextField,
  ListItem,
  Button,
  Link,
} from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';

const Login = () => {
  const classes = useStyles();
  return (
    <Layout title="Login">
      <form className={classes.form}>
        <Typography component="h1" variant="heading">
          Login
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="email"
              label="Email"
              InputProps={{
                type: 'email',
              }}
            ></TextField>
          </ListItem>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{
                type: 'password',
              }}
              id="password"
              label="Password"
            ></TextField>
          </ListItem>
          <ListItem>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontWeight: '600' }}
            >
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don't have an account. &nbsp;
            <NextLink href="/register" passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Login;
