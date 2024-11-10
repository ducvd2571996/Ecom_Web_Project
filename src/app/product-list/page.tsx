'use client'; // This makes the component a Client Component

import { Box } from '@mui/material';
import AdidasBanner from '../components/adidasBanner';
import ProductList from '../components/productList';
import ProductFilter from '../components/prouductFilter';
import { useState } from 'react';

export default function ProductListPage() {
  const [priceRange, setPriceRange] = useState<number[]>([0, 10000000]);
  return (
    <Box sx={{ marginY: 3 }}>
      <Box
        sx={{
          display: 'flex', // Default display flex for all devices
          flexDirection: { xs: 'column', sm: 'row' }, // Column on small devices (xs), row on larger devices (sm and up)
          paddingRight: { sm: 2 },
        }}
      >
        <Box
          width={{ xs: '100%', sm: '20%' }}
          sx={{ marginRight: { sm: 2 }, marginTop: 2 }}
        >
          <ProductFilter onPriceRangeChange={setPriceRange} />
        </Box>

        <Box
          width={{ xs: '100%', sm: '75%' }}
          alignItems={'center'}
          marginTop={2}
        >
          <AdidasBanner shoeRatio="30%" height={300} isHideButton />
          <ProductList priceRange={priceRange} />
        </Box>
      </Box>
    </Box>
  );
}
