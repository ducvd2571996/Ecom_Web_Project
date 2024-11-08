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
  Rating,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function FeaturedProducts() {
  const { latestProduct } = useSelector(
    (state: RootState) => state.latestProduct
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const [ratings, setRatings] = useState<{ [key: number]: number | null }>({}); // Store ratings for each product

  useEffect(() => {
    dispatch(getLatestProductHanlder());
  }, [dispatch]);

  const onNavigateDetail = (id: number) => {
    const url = `/product-detail?id=${id}`;
    router.push(url);
  };

  const productItem = (product: Product) => {
    const { price, discount, productId } = product;
    const discountPrice = price - Math.round((price * discount) / 100);
    const isHaveDiscount = discount && discount !== 0;

    const initialRating = ratings[productId] || 0; // Default rating if none exists

    return (
      <Grid item xs={12} sm={6} md={3} key={product.productId}>
        <Card
          onClick={() => onNavigateDetail(productId)}
          sx={{ display: 'flex' }}
        >
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
            <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1, justifyContent: 'center' }}>
              <Rating
                name={`product-rating-${product.productId}`}
                value={ratings[product.productId] || initialRating} // Display the saved rating or the default
                precision={0.5}
                onChange={(event, newRating) => handleRatingChange(product.productId, newRating)}
                sx={{ fontSize: 16 }} // Adjust the font size of the stars
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  // Hàm xử lý khi người dùng thay đổi rating
  const handleRatingChange = (productId: number, newRating: number | null) => {
    if (newRating !== null) {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [productId]: newRating, // Store the rating for the specific product
      }));
      // Lưu rating vào localStorage để duy trì giá trị khi người dùng quay lại
      localStorage.setItem(`rating-${productId}`, String(newRating));
    }
  };

  return (
    <Box sx={{ marginY: 20 }}>
      <Typography variant="h5" gutterBottom align="center">
        SẢN PHẨM MỚI NHẤT
      </Typography>
      <Grid container spacing={3} justifyContent="center" marginTop={1}>
        {latestProduct?.map((product) => productItem(product))}
      </Grid>{/* Rating Section */}

    </Box>
  );
}
