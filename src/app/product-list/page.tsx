'use client'; // This makes the component a Client Component
import { Box } from '@mui/material';

import AdidasBanner from '../components/adidasBanner';
import ProductList from '../components/productList';
import ProductFilter from '../components/prouductFilter';

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
        <Box width={'30%'} sx={{ marginRight: 2 }}>
          <ProductFilter />
        </Box>
        <ProductList />
      </Box>
    </Box>
  );
}
