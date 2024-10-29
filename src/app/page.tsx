'use client'; // This makes the component a Client Component
import Banner from '@/app/components/banner/Banner';
import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserRequest } from './store/reducers/user';
import { RootState } from './store/store';
import BestSeller from '@/app/components/bestSeller';
import Services from '@/app/components/services';
import FeaturedProducts from '@/app/components/featureProduct';
import AdidasBanner from '@/app/components/adidasBanner';
import { useRouter } from 'next/navigation';
import { getCateListHanlder } from './store/reducers';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const gotoProductList = () => {
    router.push('/product-list');
  };

  const { cateList, loading } = useSelector(
    (state: RootState) => state.cateList
  );

  useEffect(() => {
    dispatch(getCateListHanlder());
  }, [dispatch]);
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
