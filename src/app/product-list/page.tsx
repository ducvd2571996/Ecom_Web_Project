'use client'; // This makes the component a Client Component
import { Box } from '@mui/material';

import AdidasBanner from '../components/adidasBanner';
import ProductList from '../components/productList';
import ProductFilter from '../components/prouductFilter';

export default function ProductListPage() {
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
        <Box width={'20%'} sx={{ marginRight: 2 }}>
          <ProductFilter />
        </Box>
        <Box width={'75%'}>
          <ProductList />
        </Box>
      </Box>
    </Box>
  );
}
