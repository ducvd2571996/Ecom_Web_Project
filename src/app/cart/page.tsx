"use client";
import React, { useState } from 'react';
import {
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
  Box,
  Divider,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';

const CartPage = () => {
  const [quantities, setQuantities] = useState([1, 1]); // Trạng thái cho số lượng của từng sản phẩm
  const currentStep = 1;
  const totalSteps = 4;
  const pricePerItem = 1000000; // Giá sản phẩm
  const shippingFee = 20000; // Phí vận chuyển
  const coupon = 0; // Giảm giá (nếu có)

  // Tính subtotal và total cho mỗi sản phẩm
  const subtotal = quantities.reduce((acc, qty) => acc + pricePerItem * qty, 0); // Tính subtotal
  const total = subtotal + shippingFee - coupon; // Tổng

  // Hàm giảm số lượng cho một sản phẩm
  const handleDecrease = (index : number) => {
    setQuantities(prev => {
      const newQuantities = [...prev];
      if (newQuantities[index] > 1) {
        newQuantities[index] -= 1;
      }
      return newQuantities;
    });
  };

  // Hàm tăng số lượng cho một sản phẩm
  const handleIncrease = (index : number) => {
    setQuantities(prev => {
      const newQuantities = [...prev];
      newQuantities[index] += 1;
      return newQuantities;
    });
  };

  return (
    <Box sx={{ padding: '32px' }}>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
        gap: 4,
      }}>
        {/* Left Column (2/3 width) */}
        <Box flex={2}>
          {/* Progress Bar with Step Indicator */}
          <Box sx={{ marginBottom: '16px', width: '128.5%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
              {[...Array(totalSteps)].map((_, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <Box
                    sx={{
                      width: '35px',
                      height: '30px',
                      borderRadius: '50%',
                      backgroundColor: index + 1 === currentStep ? 'primary.main' : 'grey.300',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                    }}
                  >
                    {index + 1 === totalSteps ? <CheckIcon /> : index + 1}
                  </Box>
                  {index < totalSteps - 1 && (
                    <Box
                      sx={{
                        width: '100%',
                        height: '4px',
                        backgroundColor: index + 1 < currentStep ? 'primary.main' : 'grey.300',
                        marginLeft: '4px',
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f5f5f5' }}>
            <Box sx={{ flex: 2, display: 'flex', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Sản phẩm</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Giá</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Số lượng</Typography>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>Đơn giá</Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 2 }} />

          {/* Cart Products */}
          <Stack spacing={4}>
            {/* Product 1 */}
            <Box
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
                <img
                  src="https://m.media-amazon.com/images/I/71lRy65QcdL._AC_SY695_.jpg"
                  style={{ width: '100px', height: 'auto', marginRight: '16px' }}
                />
                <Typography variant="h6">Nike Airmax 270 React</Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {pricePerItem.toLocaleString()} VND
              </Typography>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleDecrease(0)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ margin: '0 16px' }}>{quantities[0]}</Typography>
                  <IconButton onClick={() => handleIncrease(0)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {(pricePerItem * quantities[0]).toLocaleString()} VND
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />

            {/* Product 2 */}
            <Box
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
                <img
                  src="https://m.media-amazon.com/images/I/71i+rKxv6pL._AC_SY695_.jpg"
                  style={{ width: '100px', height: 'auto', marginRight: '16px' }}
                />
                <Typography variant="h6">Designer Bag</Typography>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {pricePerItem.toLocaleString()} VND
              </Typography>
              <Box display="flex" alignItems="center" flexDirection="column">
                <Box display="flex" alignItems="center">
                  <IconButton onClick={() => handleDecrease(1)}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography sx={{ margin: '0 16px' }}>{quantities[1]}</Typography>
                  <IconButton onClick={() => handleIncrease(1)}>
                    <AddIcon />
                  </IconButton>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                {(pricePerItem * quantities[1]).toLocaleString()} VND
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
          </Stack>
        </Box>

        {/* Right Column (1/3 width) */}
        <Box flex={1} marginTop='30px'>
          {/* Voucher Code Section */}
          <Box display="flex" alignItems="center" marginBottom="32px">
            <TextField
              label="Voucher code"
              variant="outlined"
              size="small"
              sx={{ flexGrow: 1, marginRight: '16px' }}
            />
            <Button variant="contained" color="primary">
              Redeem
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
              <Typography variant="body1">Subtotal</Typography>
              <br />
              <Typography variant="body1">Shipping fee</Typography>
              <br />
              <Typography variant="body1">Coupon</Typography>
            </Box>
            <Divider />
            <Box>
              <Typography variant="body1">{subtotal.toLocaleString()} VND</Typography>
              <br />
              <Typography variant="body1">{shippingFee.toLocaleString()} VND</Typography>
              <br />
              <Typography variant="body1">{coupon > 0 ? `-${coupon.toLocaleString()}` : 'Không'}</Typography>
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
              TOTAL
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {total.toLocaleString()} VND
            </Typography>
          </Box>

          {/* Checkout Button */}
          <Box textAlign="center">
            <Button variant="contained" color="primary" sx={{ width: '100%' }}>
              Check out
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartPage;
