'use client';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  MenuItem,
  Select,
  Divider,
  IconButton,
  CardMedia,
} from '@mui/material';
import { useState } from 'react';
import ProductContentTabs from '../components/contentTab';
import { useSearchParams } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const ProductDetailPage = () => {
  const [size, setSize] = useState('XS');
  const [quantity, setQuantity] = useState(2);
  const [isFavorite, setIsFavorite] = useState(false);

  const searchParams = useSearchParams();

  const link = searchParams.get('link'); // Get the 'link' query parameter

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSizeChange = (event: any) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  return (
    <Box>
      <Container sx={{ marginTop: 4 }}>
        <Grid container spacing={4}>
          <Box sx={{ maxWidth: 500, margin: 5 }}>
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
              image={link || ''}
            />
          </Box>
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h4">
              Nike Airmax 270 React
            </Typography>
            <Divider
              sx={{
                width: { xs: '100%', sm: '600px' }, // Full width on small screens, 600px on larger screens
                marginY: 3,
                backgroundColor: '#F6F7F8',
              }}
            />
            <Typography
              variant="h5"
              color="#40BFFF"
              sx={{ marginTop: 2, fontWeight: 'bold' }}
            >
              đ1.000.000{' '}
              <Typography
                color="#9098B1"
                variant="body2"
                component="span"
                sx={{ textDecoration: 'line-through', marginLeft: 1 }}
              >
                đ{'1.000.000'}
              </Typography>
              <Typography
                color="#FB7181"
                variant="body2"
                component="span"
                fontWeight={'700'}
                sx={{ marginLeft: 1 }}
              >
                ({'25% Off'})
              </Typography>
            </Typography>
            <Box
              sx={{
                display: 'flex',
                marginY: 3,
              }}
            >
              <Typography>Loại sản phẩm:</Typography>
              <Typography sx={{ marginLeft: 3, fontWeight: 'bold' }}>
                Sneakers
              </Typography>
            </Box>

            <Typography>Miễn phí giao hàng</Typography>

            {/* Size Selector */}

            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 300,
              }}
            >
              <Typography>Size</Typography>
              <Select
                sx={{ width: 150, alignItems: 'center', height: 35 }}
                value={size}
                onChange={handleSizeChange}
              >
                <MenuItem value="XS">XS</MenuItem>
                <MenuItem value="S">S</MenuItem>
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="L">L</MenuItem>
                <MenuItem value="XL">XL</MenuItem>
              </Select>
            </Box>

            {/* Quantity Selector */}
            <Divider
              sx={{
                width: { xs: '100%', sm: '600px' }, // Full width on small screens, 600px on larger screens
                marginY: 3,
                backgroundColor: '#F6F7F8',
              }}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#F6F7F8',
                width: 'fit-content',
              }}
            >
              <Button onClick={() => handleQuantityChange(-1)}>-</Button>
              <Typography>{quantity}</Typography>
              <Button onClick={() => handleQuantityChange(1)}>+</Button>
            </Box>
            <Divider
              sx={{
                width: { xs: '100%', sm: '600px' },
                marginY: 3,
                backgroundColor: '#F6F7F8',
              }}
            />
            <Box sx={{ display: 'flex', height: 48 }}>
              <Button variant="contained" color="primary">
                Thêm vào giỏ hàng
              </Button>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 5,
                  paddingX: 2,
                  borderRadius: 2,
                  border: '1px solid #33A0FF',
                }}
              >
                <IconButton onClick={handleFavoriteToggle}>
                  {isFavorite ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: '#33A0FF' }} />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ProductContentTabs />
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
