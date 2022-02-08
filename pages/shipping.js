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
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard';
import Box from '@mui/material/Box';

const Shipping = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const {
    userInfo,
    cart: { shippingAddress },
  } = state;
  const router = useRouter();
  const { redirect } = router.query; //login?redirect=/shipping
  const classes = useStyles();

  useEffect(() => {
    if (!userInfo) {
      router.push('/login?redirect=/shipping');
    }
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, []);
  //submitHandler
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        country,
      })
    );
    router.push('/payment');
  };
  return (
    <Layout title="Shipping Address">
      <Box sx={{ mt: 5 }}>
        <CheckoutWizard activeStep={1}></CheckoutWizard>
      </Box>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Typography component="h1" variant="heading">
          Shipping Address
        </Typography>
        <List>
          {/* name */}
          <ListItem>
            <Controller
              name="fullName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === 'minLength'
                        ? 'Name Must be At least 3 characters'
                        : 'Name is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          {/* Address */}
          <ListItem>
            <Controller
              name="address"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === 'minLength'
                        ? 'Address Must be At least 3 characters'
                        : 'Address is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          {/* city */}
          <ListItem>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="city"
                  label="city"
                  error={Boolean(errors.city)}
                  helperText={
                    errors.city
                      ? errors.city.type === 'minLength'
                        ? 'City Must be At least 3 characters'
                        : 'City is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          {/* postalCode */}
          <ListItem>
            <Controller
              name="postalCode"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  error={Boolean(errors.postalCode)}
                  helperText={
                    errors.postalCode
                      ? errors.postalCode.type === 'minLength'
                        ? 'Postal Code Must be At least 3 characters'
                        : 'Postal Code is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          {/* country */}
          <ListItem>
            <Controller
              name="country"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 3,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="country"
                  label="Country"
                  error={Boolean(errors.country)}
                  helperText={
                    errors.country
                      ? errors.country.type === 'minLength'
                        ? 'Country Must be At least 3 characters'
                        : 'Country is required'
                      : ''
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ fontWeight: '600' }}
            >
              Continue
            </Button>
          </ListItem>
        </List>
      </form>
    </Layout>
  );
};

export default Shipping;
