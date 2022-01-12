import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import NextLink from 'next/link';
import Layout from '../components/layout';
// import data from '../utils/data';
import Product from '../models/Product';
import db from '../utils/db';
import axios from 'axios';
import { Store } from '../utils/store';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

export default function Home(props) {
  const { products } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();
  //add cart handler
  const addToCartHandler = async (product) => {
    const { data } = await axios.get(`/api/products/${product._id}`);
    const existItem = state.cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (data.countInStock < quantity) {
      window.alert('Sorry, product is out of stock');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <h1>Products</h1>
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item md={4} sm={6} xs={12} key={product.name}>
                <Card style={{ maxWidth: 400 }}>
                  <NextLink href={`/products/${product.slug}`}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        image={product.image}
                        title={product.name}
                        width="300"
                        height="400"
                      ></CardMedia>
                      <CardContent>
                        <Typography>{product.name}</Typography>
                      </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>${product.price}</Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={() => addToCartHandler(product)}
                    >
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connect();
  const products = await Product.find({}).lean();
  console.log(products);
  await db.disconnect();
  return {
    props: {
      products: products.map(db.covertDocToObj),
    },
  };
}
