'use client'; // This makes the component a Client Component
import AdidasBanner from '@/app/components/adidasBanner';
import Banner from '@/app/components/banner/Banner';
import BestSeller from '@/app/components/bestSeller';
import FeaturedProducts from '@/app/components/featureProduct';
import Services from '@/app/components/services';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { getCartHanlder } from './cart/store/reducers/cart';
import { fetchUserRequest } from './store/reducers';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  const cachedUser = useMemo(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }, []);

  const gotoProductList = () => {
    router.push('/product-list');
  };

  useEffect(() => {
    if (cachedUser?.userInfo?.userId) {
      dispatch(getCartHanlder({ userId: cachedUser?.userInfo?.id }));
      dispatch(fetchUserRequest(cachedUser?.userInfo?.id));
    }
  }, [cachedUser?.userInfo?.userId, dispatch]);

  return (
    <Box>
      <Banner />
      <BestSeller />
      <Box sx={{ marginBottom: 10, marginTop: 5 }}>
        <Typography
          onClick={gotoProductList}
          sx={{
            color: '#33A0FF',
            textDecoration: 'underline',
            fontSize: 18,
            textAlign: 'center',
          }}
        >
          Xem tất cả
        </Typography>
      </Box>
      <AdidasBanner />
      <Services />
      <FeaturedProducts />
    </Box>
  );
}
