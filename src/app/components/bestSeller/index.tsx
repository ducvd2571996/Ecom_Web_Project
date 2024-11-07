/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import ProductItem from '../productItem';

const products = [
  {
    id: 1,
    name: 'Nike Air Max 270 React',
    category: 'Sneakers',
    price: '1.000.000',
    oldPrice: '1.700.000',
    discount: '24% Off',
    imageUrl: 'https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg', // Replace with actual image paths
    rating: 4,
  },
  {
    id: 2,
    name: 'Designer Bag',
    category: 'Bags',
    price: '1.200.000',
    oldPrice: '1.500.000',
    discount: '33% Off',
    imageUrl: 'https://m.media-amazon.com/images/I/71i+rKxv6pL._AC_SY695_.jpg', // Replace with actual image paths
    rating: 5,
  },
  {
    id: 3,
    name: 'Nike Air Max 270 React',
    category: 'Sneakers',
    price: '1.000.000',
    oldPrice: '1.700.000',
    discount: '24% Off',
    imageUrl: 'https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg', // Replace with actual image paths
    rating: 4,
  },
  {
    id: 4,
    name: 'Designer Bag',
    category: 'Bags',
    price: '1.200.000',
    oldPrice: '1.500.000',
    discount: '33% Off',
    imageUrl: 'https://m.media-amazon.com/images/I/71i+rKxv6pL._AC_SY695_.jpg', // Replace with actual image paths
    rating: 5,
  },
  {
    id: 5,
    name: 'Nike Air Max 270 React',
    category: 'Sneakers',
    price: '1.000.000',
    oldPrice: '1.700.000',
    discount: '24% Off',
    imageUrl: 'https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg', // Replace with actual image paths
    rating: 4,
  },
  {
    id: 6,
    name: 'Designer Bag',
    category: 'Bags',
    price: '1.200.000',
    oldPrice: '1.500.000',
    discount: '33% Off',
    imageUrl: 'https://m.media-amazon.com/images/I/71i+rKxv6pL._AC_SY695_.jpg', // Replace with actual image paths
    rating: 5,
  },
  // Add more products for each category
];

const cate = [
  { categoryName: 'Tất cả', categoryCode: 'All' },
  { categoryName: 'Túi xách', categoryCode: 'Bags' },
  { categoryName: 'Sneakers', categoryCode: 'Sneakers' },
  { categoryName: 'Dây nịch', categoryCode: 'Belt' },
  { categoryName: 'Mắt kính', categoryCode: 'Glass' },
];

const BestSeller = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleTabChange = (category: any) => {
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <Box sx={{ paddingX: 12, paddingTop: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
          marginBottom: 5,
        }}
      >
        {cate.map((category) => (
          <Button
            key={category.categoryCode}
            variant={
              selectedCategory === category.categoryCode ? 'contained' : 'text'
            }
            onClick={() => handleTabChange(category.categoryCode)}
            sx={{ mx: 1 }}
          >
            {category.categoryName}
          </Button>
        ))}
      </Box>

      {/* Product Grid */}
      <Grid container spacing={5}>
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            oldPrice={product.oldPrice}
            price={product.price}
            discount={product.discount}
            imageUrl={product.imageUrl}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default BestSeller;
