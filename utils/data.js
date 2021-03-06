import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'arif',
      email: 'arif@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'ashraf',
      email: 'ashraf@gmail.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Boys Shirt',
      slug: 'boys-shirt-1',
      category: 'Shirts',
      image: '/images/shirt-1.png',
      price: 60,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 31,
      countInStock: 22,
      description: 'A fantastic Boys Shirt',
    },
    {
      name: 'Boys Shirt 2',
      slug: 'boys-shirt-2',
      category: 'Shirts',
      image: '/images/shirt-2.png',
      price: 70,
      brand: 'Adidas',
      rating: 4.1,
      numReviews: 11,
      countInStock: 32,
      description: 'A beautiful Boys Shirt',
    },
    {
      name: 'Boys Shirt 3',
      slug: 'boys-shirt-3',
      category: 'Shirts',
      image: '/images/shirt-1.png',
      price: 60,
      brand: 'Lotto',
      rating: 3.5,
      numReviews: 15,
      countInStock: 42,
      description: 'A Nice Boys Shirt',
    },
    {
      name: 'Boys Pant 1',
      slug: 'boys-pant-1',
      category: 'Pants',
      image: '/images/pant-1.png',
      price: 90,
      brand: 'Armani',
      rating: 3.5,
      numReviews: 15,
      countInStock: 42,
      description: 'A Nice Boys pant',
    },
    {
      name: 'Boys Pant 2',
      slug: 'boys-pant-2',
      category: 'Pants',
      image: '/images/pant-2.png',
      price: 90,
      brand: 'Armani',
      rating: 3.5,
      numReviews: 15,
      countInStock: 42,
      description: 'A Nice Boys pant',
    },
    {
      name: 'Boys Pant 3',
      slug: 'boys-pant-3',
      category: 'Pants',
      image: '/images/pant-1.png',
      price: 90,
      brand: 'Armani',
      rating: 3.5,
      numReviews: 15,
      countInStock: 42,
      description: 'A Nice Boys pant',
    },
  ],
};

export default data;
