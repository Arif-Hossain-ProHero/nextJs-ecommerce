import {
  Typography,
  List,
  TextField,
  ListItem,
  Button,
  Link,
} from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
import { Store } from '../utils/store';
import Layout from '../components/Layout';
import useStyles from '../utils/styles';
import NextLink from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

const Login = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query; //login?redirect=/shipping
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  //submitHandler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/users/login', {
        email,
        password,
      });
      dispatch({ type: 'USER_LOGIN', payload: data });
      Cookies.set('userInfo', JSON.stringify(data));
      router.push(redirect || '/');
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <Layout title="Login">
      <form onSubmit={submitHandler} className={classes.form}>
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
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            ></TextField>
          </ListItem>
          <ListItem>
            <Button
              type="submit"
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
