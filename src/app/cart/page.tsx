import React from 'react';

import {
  Typography,
  Button,
  IconButton,
  TextField,
  Stack,
  LinearProgress,
  Box,
} from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Check from '@mui/icons-material/Check';

const CartPage = () => {
  return (
    <Box sx={{ padding: '32px' }}>
      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4}>

        {/* Left Column (2/3 width) */}
        <Box flex={2}>
          {/* Step Indicator */}
          <Box display="flex" justifyContent="space-between" marginBottom="8px">
            <Typography variant="h6">1</Typography>
            <Typography variant="h6">2</Typography>
            <Typography variant="h6">3</Typography>
            <Check/>
          </Box>

          {/* Progress Bar */}
          <LinearProgress variant="determinate" value={33} sx={{ marginBottom: '32px', height: '8px', borderRadius: '4px' }} />

          {/* Cart Products */}
          <Stack spacing={4}>
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                padding: '16px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              <IconButton
                sx={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6">Nike Airmax 270</Typography>
              <Typography variant="body1">react</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '16px' }}>
                $99
              </Typography>
              <Box display="flex" alignItems="center" marginTop="16px">
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ margin: '0 16px' }}>8</Typography>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Thêm sản phẩm khác nếu có */}
            <Box
              sx={{
                border: '1px solid #e0e0e0',
                padding: '16px',
                borderRadius: '8px',
                position: 'relative',
              }}
            >
              <IconButton
                sx={{ position: 'absolute', top: '10px', right: '10px' }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography variant="h6">Nike Airmax 270</Typography>
              <Typography variant="body1">react</Typography>
              <Typography variant="body1" sx={{ fontWeight: 'bold', marginTop: '16px' }}>
                $99
              </Typography>
              <Box display="flex" alignItems="center" marginTop="16px">
                <IconButton>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ margin: '0 16px' }}>8</Typography>
                <IconButton>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* Right Column (1/3 width) */}
        <Box flex={1}>
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
              <Typography variant="body1">Shipping fee</Typography>
              <Typography variant="body1">Coupon</Typography>
            </Box>
            <Box>
              <Typography variant="body1">$998</Typography>
              <Typography variant="body1">$20</Typography>
              <Typography variant="body1">No</Typography>
            </Box>
          </Box>

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
              $118
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
