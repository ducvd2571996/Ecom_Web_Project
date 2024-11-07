'use client'; // Add this to ensure client-side rendering

import { Tabs, Tab, Box, Typography } from '@mui/material';
import { useState } from 'react';

const ProductContentTabs = () => {
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
          <Typography>
            Chất lượng tốt: độ bền đế ngoài, độ êm đế giữa, độ mềm lót trong tất
            cả đều hoàn hảo với 1 đôi giày dành cho chạy ổn định với tốc độ từ
            trung bình đến cao (tiệm cận mức cao thôi, cao quá thì lại hơi
            nặng). Độ rộng toe box được cải thiện: thay vì form chân narrow fit
            như các mẫu trước, mẫu này có độ rộng toe box cực chuẩn và phù hợp
            với form chân người Việt (hơi bè). Độ co giãn và thoải mái của upper
            hoàn hảo: mềm mại, ôm sát, thoáng khí, thông hơi cực tốt, upper
            thoải mái nhất trong tất cả các dòng giày của Kiprun tính đến hiện
            tại. Cực hài lòng!
          </Typography>
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
