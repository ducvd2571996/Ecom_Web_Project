'use client';

import React, { useState } from 'react';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
  Box,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/navigation';
import WarningIcon from '@mui/icons-material/Warning';

const CartPage = () => {
  const router = useRouter();
  const [quantities, setQuantities] = useState([1, 1]); // Trạng thái cho số lượng của từng sản phẩm
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productIndex, setProductIndex] = useState<number | null>(null);
  const currentStep = 1;
  const totalSteps = 4;
  const pricePerItem = 1000000; // Giá sản phẩm
  const shippingFee = 20000; // Phí vận chuyển
  const coupon = 0; // Giảm giá (nếu có)

  // Tính subtotal và total cho mỗi sản phẩm
  const subtotal = quantities.reduce((acc, qty) => acc + pricePerItem * qty, 0); // Tính subtotal
  const total = subtotal + shippingFee - coupon; // Tổng

  // Hàm giảm số lượng cho một sản phẩm
  const handleDecrease = (index: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      if (newQuantities[index] === 1) {
        // Nếu số lượng đã là 1, mở hộp thoại xác nhận xóa thay vì giảm thêm
        setProductIndex(index);
        setOpenConfirm(true);
      } else {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  // Hàm tăng số lượng cho một sản phẩm
  const handleIncrease = (index: number) => {
    setQuantities((prev) => {
      const newQuantities = [...prev];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  // Hàm xóa sản phẩm
  const handleRemove = (index: number) => {
    setProductIndex(index);
    setOpenConfirm(true);
  };

  const confirmRemove = () => {
    if (productIndex !== null) {
      setQuantities((prevQuantities) => {
        const newQuantities = [...prevQuantities];
        newQuantities.splice(productIndex, 1);
        return newQuantities;
      });
    }
    setOpenConfirm(false);
    setProductIndex(null);
  };

  // Điều hướng đến trang thanh toán
  const handleCheckoutClick = () => {
    const query = new URLSearchParams({
      quantities: JSON.stringify(quantities),
      pricePerItem: pricePerItem.toString(),
      shippingFee: shippingFee.toString(),
      coupon: coupon.toString(),
    }).toString();
    router.push(`/payment?${query}`);
  };

  return (
    <Box sx={{ padding: '32px' }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, // Cấu trúc 2 cột cho màn hình lớn
          gap: 5,
        }}
      >
        {/* Left Column (2/3 width) */}
        <Box flex={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px',
              backgroundColor: '#f5f5f5',
            }}
          >
            <Box sx={{ flex: 2, display: 'flex', alignItems: 'center' }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', marginLeft: '35px' }}
              >
                Sản phẩm
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                Đơn giá
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                Số lượng
              </Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="body1"
                sx={{ fontWeight: 'bold', textAlign: 'center' }}
              >
                Thành tiền
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 1 }} />

          {/* Cart Products */}
          <Stack spacing={4}>
            {/* Product 1 */}
            {quantities.map((qty, index) => (
              <Box
                key={index}
                sx={{
                  border: '1px solid #e0e0e0',
                  padding: '16px',
                  borderRadius: '8px',
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr 1fr',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton
                    onClick={() => handleRemove(index)}
                    sx={{ color: 'red', left: '-12px' }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <img
                    src={
                      index === 0
                        ? 'https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg'
                        : 'https://m.media-amazon.com/images/I/71i+rKxv6pL._AC_SY695_.jpg'
                    }
                    alt={`Product ${index + 1}`}
                    style={{
                      width: '100px',
                      height: 'auto',
                      marginLeft: '-5px',
                      marginRight: '16px',
                    }}
                  />
                  <Typography variant="h6">
                    {index === 0 ? 'Nike Airmax 270 React' : 'Designer Bag'}
                  </Typography>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  {pricePerItem.toLocaleString()} VND
                </Typography>
                <Box display="flex" alignItems="center">
                  <IconButton
                    onClick={() => handleDecrease(index)}
                    sx={{ color: '#58c9f3' }}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ margin: '0 16px' }}>{qty}</Typography>
                  <IconButton
                    onClick={() => handleIncrease(index)}
                    sx={{ color: '#58c9f3' }}
                  >
                    <AddIcon />
                  </IconButton>
                </Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  {(pricePerItem * qty).toLocaleString()} VND
                </Typography>
              </Box>
            ))}
          </Stack>

          {/* Remove Product Confirmation Dialog */}
          <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
            <DialogTitle>
              <Box display="flex" alignItems="center">
                <WarningIcon color="error" style={{ marginRight: 8 }} />
                Xóa sản phẩm
              </Box>
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Bạn có muốn xóa sản phẩm đang chọn?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={confirmRemove} color="secondary">
                Xác nhận
              </Button>
              <Button
                onClick={() => setOpenConfirm(false)}
                color="primary"
                autoFocus
              >
                Hủy
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        {/* Right Column (1/3 width) */}
        <Box flex={1} marginTop="2px">
          {/* Voucher Code Section */}
          <Box display="flex" alignItems="center" marginBottom="32px">
            <TextField
              label="Nhập mã voucher"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, marginRight: '16px' }}
            />
            <Button variant="contained" color="primary">
              Sử dụng
            </Button>
          </Box>

          {/* Summary Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              marginBottom: '16px',
            }}
          >
            <Box>
              <Typography variant="body1">Tổng tiền hàng</Typography>
              <br />
              <Typography variant="body1">Phí vận chuyển</Typography>
              <br />
              <Typography variant="body1">Khuyến mãi</Typography>
            </Box>
            <Divider />

            <Box>
              <Typography variant="body1">
                {subtotal.toLocaleString()} VND
              </Typography>
              <br />
              <Typography variant="body1">
                {shippingFee.toLocaleString()} VND
              </Typography>
              <br />
              <Typography variant="body1">
                {coupon > 0 ? `-${coupon.toLocaleString()}` : 'Không'}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <br />

          {/* Total Section */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '16px',
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              backgroundColor: '#f5f5f5',
              marginBottom: '32px',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Tổng thanh toán
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {total.toLocaleString()} VND
            </Typography>
          </Box>

          {/* Checkout Button */}
          <Box textAlign="center">
            <Button
              variant="contained"
              color="primary"
              sx={{ width: '100%' }}
              onClick={handleCheckoutClick}
            >
              Mua hàng
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
