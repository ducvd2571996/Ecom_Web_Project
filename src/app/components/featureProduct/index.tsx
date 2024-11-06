import { Product } from '@/app/model';
import { getLatestProductHanlder } from '@/app/store/reducers';
import { RootState } from '@/app/store/store';
import { formatPrice } from '@/helper/formatString/format-price';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FeaturedProducts() {
  const { latestProduct } = useSelector(
    (state: RootState) => state.latestProduct
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLatestProductHanlder());
  }, [dispatch]);

  const productItem = (product: Product) => {
    const { price, discount } = product;
    const discountPrice = price - Math.round((price * discount) / 100);
    const isHaveDiscount = discount && discount !== 0;

    return (
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
            image={product.image}
            alt={product.name}
          />
          <CardContent>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                WebkitLineClamp: 1,
              }}
            >
              {product.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                marginBottom: 1,
              }}
            ></Box>
            <Typography variant="body2" color="#40BFFF">
              đ{formatPrice(isHaveDiscount ? discountPrice : price)}
              {isHaveDiscount ? (
                <>
                  <Typography
                    color="#9098B1"
                    variant="body2"
                    component="span"
                    sx={{ textDecoration: 'line-through', marginLeft: 1 }}
                  >
                    đ{formatPrice(price)}
                  </Typography>
                  <Typography
                    color="#FB7181"
                    variant="body2"
                    component="span"
                    fontWeight={'700'}
                    sx={{ marginLeft: 1 }}
                  >
                    {discount}%Off
                  </Typography>
                </>
              ) : null}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Box sx={{ marginY: 20 }}>
      <Typography variant="h5" gutterBottom align="center">
        SẢN PHẨM MỚI NHẤT
      </Typography>
      <Grid container spacing={3} justifyContent="center" marginTop={1}>
        {latestProduct?.map((product) => productItem(product))}
      </Grid>
    </Box>
  );
}
