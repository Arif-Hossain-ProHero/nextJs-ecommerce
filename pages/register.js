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

const Register = () => {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const router = useRouter();
  const { redirect } = router.query; //login?redirect=/shipping
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (userInfo) {
      router.push('/');
    }
  }, []);
  //submitHandler
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      alert('password dont match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/register', {
        name,
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
    <Layout title="Register">
      <form onSubmit={submitHandler} className={classes.form}>
        <Typography component="h1" variant="heading">
          Register
        </Typography>
        <List>
          <ListItem>
            <TextField
              variant="outlined"
              fullWidth
              id="name"
              label="Name"
              onChange={(e) => setName(e.target.value)}
              InputProps={{
                type: 'text',
              }}
            ></TextField>
          </ListItem>
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
            <TextField
              variant="outlined"
              fullWidth
              InputProps={{
                type: 'password',
              }}
              id="confirm-password"
              label="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account. &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Register;
