'use client'; // Add this to ensure client-side rendering

import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useState } from 'react';

const ProductContentTabs = ({ description }: { description: string }) => {
  const [value, setValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        marginY: 6,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Tabs value={value} onChange={handleTabChange} aria-label="product tabs">
        <Tab label="Mô tả" />
        <Tab label="Chính sách" />
      </Tabs>
      {value === 0 && (
        <Box sx={{ padding: 2 }}>
          <Typography>{description}</Typography>
        </Box>
      )}
      {value === 1 && (
        <Box sx={{ padding: 2 }}>
          <Typography>
            {
              'Đối với sản phẩm kinh doanh TRỪ nhóm Gia dụng không điện, Phụ kiện không điện & Sản phẩm đã sử dụng, khách hàng chọn 1 trong các phương thức tuỳ sản phẩm:'
            }
            <br />
            - Bảo hành có cam kết trong 12 tháng
            <br />
            - Hư gì đổi nấy ngay và luôn
            <br />
            - Hoàn tiền: áp dụng cho sản phẩm lỗi và không lỗi
            <br />- Bao xài 1 tháng đầu tiên nếu sản phẩm lỗi kỹ thuật thì áp
            dụng bảo hành, nếu khách hàng muốn hoàn tiền thì thu phí 10% giá trị
            hóa đơn.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductContentTabs;
