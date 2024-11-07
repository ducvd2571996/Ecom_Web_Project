import { formatPrice } from '@/helper/formatString/format-price';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

export default function FeaturedProducts() {
  const products = [
    {
      id: 1,
      name: 'Blue Swade Nike Sneakers',
      imageUrl:
        'https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg', // replace with your image URL
      price: 1000000,
      oldPrice: 1500000,
    },
    {
      id: 2,
      name: 'Blue Swade Nike Sneakers',
      imageUrl:
        'https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg', // replace with your image URL
      price: 1000000,
      oldPrice: 1500000,
    },
    {
      id: 3,
      name: 'Blue Swade Nike Sneakers',
      imageUrl:
        'https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg', // replace with your image URL
      price: 1000000,
      oldPrice: 1500000,
    },
  ];

  return (
    <Box sx={{ marginY: 20 }}>
      <Typography variant="h5" gutterBottom align="center">
        SẢN PHẨM MỚI
      </Typography>

      <Grid container spacing={3} justifyContent="center" marginTop={1}>
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card sx={{ display: 'flex' }}>
              <CardMedia
                component="img"
                sx={{
                  width: '100px',
                  height: '100px',
                  objectFit: 'contain',
                  marginLeft: 2,
                }}
                image={product.imageUrl}
                alt={product.name}
              />
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {product.name}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    marginBottom: 1,
                  }}
                ></Box>
                <Typography variant="h6" color="error">
                  đ{formatPrice(product.price)}
                  <Typography
                    variant="body2"
                    component="span"
                    sx={{
                      textDecoration: 'line-through',
                      marginLeft: 1,
                      color: 'text.secondary',
                    }}
                  >
                    đ{formatPrice(product.oldPrice)}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
