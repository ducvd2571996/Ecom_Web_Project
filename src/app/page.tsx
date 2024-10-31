'use client'; // This makes the component a Client Component
import AdidasBanner from '@/app/components/adidasBanner';
import Banner from '@/app/components/banner/Banner';
import BestSeller from '@/app/components/bestSeller';
import FeaturedProducts from '@/app/components/featureProduct';
import Services from '@/app/components/services';
import { Box, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCateListHanlder } from './store/reducers';
import { getBrandsHanlder } from './product-list/store/reducers/get-brands';

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const gotoProductList = () => {
    router.push('/product-list');
  };

  useEffect(() => {
    dispatch(getCateListHanlder());
    dispatch(getBrandsHanlder());
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
