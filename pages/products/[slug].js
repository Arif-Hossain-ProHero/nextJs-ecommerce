import React, { useContext } from 'react';
import { useRouter } from 'next/router';
// import data from '../../utils/data';
import axios from 'axios';
import {
  Grid,
  Link,
  Typography,
  List,
  ListItem,
  Card,
  Button,
} from '@mui/material';
import Layout from '../../components/layout';
import Image from 'next/image';
import NextLink from 'next/link';
import useStyles from '../../utils/styles';
import db from '../../utils/db';
import Product from '../../models/Product';
import { Store } from '../../utils/store';

const Products = ({ product }) => {
  const router = useRouter();
  // const { slug } = router.query;
  const { state, dispatch } = useContext(Store);
  const classes = useStyles();
  if (!product) {
    return <h2>Product Not Found</h2>;
  }

  const addToCartHandler = async () => {
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
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back to home</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <div>
            <Image
              src={product.image}
              width={300}
              height={300}
              alt={product.name}
              layout="responsive"
            />
          </div>
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="heading">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Ratings: {product.rating} stars ({product.countInStock}) reviews
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'stock' : 'unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={addToCartHandler}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add to Cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  console.log(product);
  await db.disconnect();
  return {
    props: {
      product: db.covertDocToObj(product),
    },
  };
}

export default Products;
