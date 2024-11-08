'use client'; // This makes the component a Client Component

import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

import AdidasBanner from '../components/adidasBanner';
import ProductList from '../components/productList';
import ProductFilter from '../components/prouductFilter';
import ViewCompactSharpIcon from '@mui/icons-material/ViewCompactSharp';

export default function ProductListPage() {
  const [productCount, setProductCount] = useState(13);
  return (
    <Box sx={{ marginY: 5}}>
      <Box
        sx={{
          display: 'flex',
          paddingRight: 2,
        }}
      >
        <Box width={'20%'} sx={{ marginRight: 2 }}>
          <ProductFilter />
        </Box>

        <Box width={'75%'}>
          <AdidasBanner shoeRatio="30%" height={300} isHideButton />

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              marginTop: 5,
              marginBottom: 5,
              paddingRight: 2,
              backgroundColor: '#f7f7f7',
              borderRadius: '8px',
            }}>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Sắp xếp theo</span>
              <select style={{ padding: '5px', borderRadius: '4px', borderColor: '#ccc' }}>
                <option>Tên</option>
                <option>Giá</option>
                <option>Đánh giá</option>
              </select>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography marginRight={1} >{productCount} sản phẩm</Typography> {/* Hiển thị số lượng sản phẩm */}
              {/* Thêm biểu tượng ViewCompactSharp */}
              <ViewCompactSharpIcon
                sx={{
                  width: '20px',
                  height: '20px',
                  color: '#0099ff',
                  cursor: 'pointer',
                }}
              />
            </Box>
          </Box>
          <ProductList />
        </Box>
      </Box>
    </Box>
  );
}
