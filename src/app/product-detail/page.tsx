/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useEffect, useState } from 'react';
import ProductContentTabs from '../components/contentTab';
import { useRouter, useSearchParams } from 'next/navigation';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetailHanlder } from './store/reducers/get-product-detail';
import { RootState } from '../store/store';
import { formatPrice } from '@/helper/formatString/format-price';
import { CreateCartDTO } from '../model/cart.model';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  createCartHanlder,
  getCartHanlder,
  updateCartHanlder,
} from '../cart/store/reducers/cart';
import { Rating } from '@mui/material';
import {
  getWishList,
  updateWishList,
} from '../wish-list/store/reducers/wish-list';

const ProductDetailPage = () => {
  const [size, setSize] = useState('XS');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const router = useRouter();
  const [rating, setRating] = useState<number | null>(null); // Thay giá trị mặc định là null để khi render lại sẽ lấy từ storage

  const searchParams = useSearchParams();
  const id = searchParams.get('id'); // Get the 'id' query parameter

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetailHanlder(id));

    // Kiểm tra xem rating đã được lưu trong localStorage chưa
    const storedRating = localStorage.getItem(`rating-${id}`);
    if (storedRating) {
      setRating(Number(storedRating)); // Nếu có, đặt giá trị rating từ localStorage
    }
  }, [id]);

  const { productDetail } = useSelector(
    (state: RootState) => state.productDetail
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSizeChange = (event: any) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const { wishList } = useSelector((state: RootState) => state.wishList);
  const isInWishList = wishList?.find(
    (product) => product?.productId === productDetail?.productId
  );

  const handleFavoriteToggle = () => {
    if (productDetail) {
      console.log('pro', productDetail, isInWishList, wishList);

      dispatch(updateWishList(productDetail));
    }
  };

  // Hàm xử lý khi người dùng thay đổi rating
  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    newRating: number | null
  ) => {
    if (newRating !== null) {
      setRating(newRating);
      // Lưu rating vào localStorage để duy trì giá trị khi người dùng quay lại
      localStorage.setItem(`rating-${id}`, String(newRating));
    }
  };
  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch, wishList?.length]);

  const price = productDetail?.price || 0;
  const discount = productDetail?.discount || 0;
  const discountPrice = price - Math.round((price * discount) / 100);
  const isHaveDiscount = discount && discount !== 0;

  const onHandleAddToCart = () => {
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    if (user?.userInfo) {
      const userId = user?.userInfo?.id;
      if (user?.userInfo?.id) {
        const product = {
          id: productDetail?.productId,
          name: productDetail?.name,
          image: productDetail?.image,
          tax: 0,
          discount,
          price,
          quantity,
          note: '',
        } as any;
        const cart: CreateCartDTO = {
          products: [product],
          customerId: userId,
          isAddToCart: true,
        };
        dispatch(
          getCartHanlder({
            userId,
            callback: (rs: any) => {
              if (rs?.data) {
                dispatch(
                  updateCartHanlder({
                    cart,
                  })
                );
              } else {
                dispatch(
                  createCartHanlder({
                    cart,
                  })
                );
              }
            },
          })
        );
      }
    } else {
      const url = `/login`;
      router.push(url);
    }
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
              image={productDetail?.image || ''}
            />
          </Box>
          {/* Product Details */}
          <Grid item xs={12} md={6}>
            <Typography sx={{ fontWeight: 'bold' }} variant="h4">
              {productDetail?.name}
            </Typography>

            {/* Icons container */}
            <Box sx={{ display: 'flex', alignItems: 'center', marginY: 1 }}>
              <Rating
                name="product-rating"
                value={rating || 5} // Hiển thị giá trị rating đã lưu hoặc mặc định là 5
                precision={0.5}
                onChange={handleRatingChange}
                sx={{ fontSize: 22 }} // Thay đổi kích thước của các sao
              />
            </Box>

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
              <Typography>Kích cỡ</Typography>
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
              <Button
                onClick={onHandleAddToCart}
                variant="contained"
                sx={{ 
                  backgroundColor: '#ebf6ff', 
                  color: '#3baafd',
                  textTransform: 'none',
                  fontSize: '16px'
                }}
                startIcon={<ShoppingCartIcon />}
              >
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
                  backgroundColor: '#ebf6ff',
                  variant: 'contained'
                }}
              >
                <IconButton onClick={handleFavoriteToggle}>
                  {isInWishList ? (
                    <FavoriteIcon color="error" />
                  ) : (
                    <FavoriteBorderIcon sx={{ color: '#3baafd' }} />
                  )}
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <ProductContentTabs description={productDetail?.description || ''} />
      </Container>
    </Box>
  );
};

export default ProductDetailPage;
