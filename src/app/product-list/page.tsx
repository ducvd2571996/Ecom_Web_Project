'use client'; // This makes the component a Client Component
import { Box } from '@mui/material';

import BestSeller from '@/app/components/bestSeller';
import ProductList from '../components/productList';
import AdidasBanner from '../components/adidasBanner';
import ProductFilter from '../components/prouductFilter';
import { Margin } from '@mui/icons-material';

export default function Home() {
  return (
    <Box sx={{ marginTop: 2 }}>
      <AdidasBanner shoeRatio="30%" height={300} isHideButton />
      <Box
        sx={{
          display: 'flex',
          marginTop: 15,
          marginBottom: 10,
          paddingRight: 2,
        }}
      >
        <Box width={'40%'} sx={{ marginRight: 2 }}>
          <ProductFilter />
        </Box>
        <ProductList />
      </Box>
    </Box>
  );
}
