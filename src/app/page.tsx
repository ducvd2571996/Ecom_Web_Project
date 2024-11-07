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
import { getBrandsHanlder } from './product-list/store/reducers/get-brands';
import { fetchUserRequest, getCateListHanlder } from './store/reducers';
import { getCartHanlder } from './cart/store/reducers/cart';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();

  // Memoizing user data fetched from localStorage to avoid re-parsing on each render
  const cachedUser = useMemo(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }, []); // Empty dependency array ensures this only runs once on mount

  const gotoProductList = () => {
    router.push('/product-list');
  };

  // Dispatching actions only if userId exists and is different to prevent repeated API calls
  useEffect(() => {
    if (cachedUser?.userInfo?.userId) {
      dispatch(getCartHanlder({ userId: cachedUser?.userInfo?.id }));
      dispatch(fetchUserRequest(cachedUser?.userInfo?.userId));
    }
  }, [cachedUser?.userInfo?.userId, dispatch]); // Only re-run if userId changes

  // Dispatch category and brand handlers only once on mount
  // useEffect(() => {
  //   dispatch(getCateListHanlder());
  //   dispatch(getBrandsHanlder());
  // }, [dispatch]);

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
