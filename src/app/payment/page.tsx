'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
  CardMedia,
} from '@mui/material';
import { useSearchParams } from 'next/navigation'; // Sử dụng useSearchParams từ next/navigation
import { useRouter } from 'next/navigation'; // Import useRouter
import { formatPrice } from '@/helper/formatString/format-price';
import { Product } from '../model/cart.model';

const Payment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Define the shape of your form values
  interface FormValues {
    name: string;
    companyName: string;
    street: string;
    houseNumber: string;
    city: string;
    phone: string;
    email: string;
  }

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    companyName: '',
    street: '',
    houseNumber: '',
    city: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({}); // Update the type for errors
  const [success, setSuccess] = useState(false);

  // Lấy tham số từ URL
  const cart = searchParams.get('cart');

  const parsedCart = cart ? JSON.parse(cart) : {};

  // Tính toán tổng tiền hàng và tổng
  const subtotal = parsedCart?.subTotal;
  const total = parsedCart?.totalPrice;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOrder = () => {
    const requiredFields: Array<keyof FormValues> = [
      'name',
      'street',
      'city',
      'phone',
      'email',
    ];
    const newErrors: Record<keyof FormValues, boolean> = {} as Record<
      keyof FormValues,
      boolean
    >; // Định nghĩa kiểu cho newErrors

    requiredFields.forEach((field) => {
      if (!formValues[field]) {
        newErrors[field] = true; // Đánh dấu trường thiếu
      }
    });

    // Kiểm tra định dạng số điện thoại
    const phoneNumber = formValues.phone;
    if (phoneNumber && isNaN(Number(phoneNumber))) {
      newErrors.phone = true; // Đánh dấu lỗi nếu số điện thoại không phải là số
    }

    setErrors(newErrors); // Cập nhật trạng thái lỗi

    if (Object.keys(newErrors).length === 0) {
      // Nếu không có lỗi, thực hiện đặt hàng
      setSuccess(true);
      console.log('Đặt hàng thành công');
      // Quay về trang chủ sau 2 giây
      setTimeout(() => {
        router.push('/'); // Điều hướng về trang chủ
      }, 2000);
    } else {
      // Reset success state if there are errors
      setSuccess(false);
    }
  };

  return (
    <Box sx={{ padding: 6 }}>
      <Typography variant="h5" gutterBottom align="center">
        THANH TOÁN
      </Typography>
      <br></br>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'center',
          gap: 3,
        }}
      >
        {/* Left side: User Information */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Thông tin khách hàng
          </Typography>

          {/* User Information Fields */}
          {[
            { label: 'Họ tên', name: 'name' },
            { label: 'Tên đường', name: 'street' },
            { label: 'Số nhà, tên tòa nhà,...', name: 'houseNumber' },
            { label: 'Tỉnh/Thành phố', name: 'city' },
            { label: 'Số điện thoại', name: 'phone' },
            { label: 'Địa chỉ email', name: 'email' },
          ].map(({ label, name }, index) => {
            const isRequired = [
              'Họ tên',
              'Tên đường',
              'Tỉnh/Thành phố',
              'Số điện thoại',
              'Địa chỉ email',
            ].includes(label);
            return (
              <TextField
                key={index}
                label={
                  <span>
                    {label}{' '}
                    {isRequired && <span style={{ color: 'red' }}>*</span>}
                  </span>
                }
                variant="outlined"
                fullWidth
                margin="normal"
                required={isRequired}
                name={name}
                value={formValues[name as keyof FormValues]}
                onChange={handleInputChange}
                error={!!errors[name as keyof FormValues]} // Đánh dấu lỗi nếu có
                helperText={
                  errors[name as keyof FormValues]
                    ? name === 'phone'
                      ? 'Số điện thoại không hợp lệ!'
                      : 'Trường này là bắt buộc!'
                    : ''
                }
                InputLabelProps={{
                  shrink: true,
                  sx: {
                    fontSize: '1.2rem',
                    '& .MuiFormLabel-asterisk': { display: 'none' }, // Hide the default asterisk
                  },
                }}
                InputProps={{
                  sx: { fontSize: '1.2rem' },
                  style: {
                    borderColor: errors[name as keyof FormValues] ? 'red' : '', // Thay đổi màu viền nếu có lỗi
                  },
                }}
                autoComplete="off"
              />
            );
          })}

          {/* Save Info for Future Orders */}
          <FormControlLabel
            control={<Checkbox />}
            label="Lưu thông tin thanh toán cho những đơn hàng sau"
            sx={{ marginTop: 1 }}
          />
        </Box>

        {/* Right side: Order Summary */}
        <Box
          sx={{
            flex: 1,
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: '#f9f9f9',
          }}
        >
          <Typography variant="h6" gutterBottom>
            Đơn hàng
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            {parsedCart?.products?.map((item: Product, index: number) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'contain',
                    marginRight: 2,
                  }}
                  image={item?.image}
                  alt={item?.name}
                />
                <Typography variant="body1">{item?.name}</Typography>
                <Typography variant="body2" sx={{ marginLeft: 'auto' }}>
                  {item?.quantity} x đ{formatPrice(Math.round(item?.price))}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Total Price */}
          <Divider sx={{ marginY: 2 }} />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginY: 1,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              Tổng tiền hàng
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              đ{formatPrice(subtotal)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginY: 1,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              Phí vận chuyển
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              đ{0}
            </Typography>
          </Box>

          {parsedCart?.discountTotal > 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginY: 1,
              }}
            >
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                Khuyến mãi
              </Typography>
              <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
                đ{formatPrice(parsedCart?.discountTotal)}
              </Typography>
              {/* Sửa từ parsedShippingFee thành parsedCoupon */}
            </Box>
          ) : null}
          <Divider sx={{ marginY: 2 }} />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              fontWeight: 'bold',
              marginTop: 1,
            }}
          >
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              TỔNG
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.2rem' }}>
              đ{formatPrice(total)}
            </Typography>
          </Box>

          <Divider sx={{ marginY: 2 }} />

          {/* Payment Options */}
          <RadioGroup defaultValue="cash">
            <FormControlLabel
              value="visa"
              control={<Radio />}
              label={
                <Typography sx={{ fontSize: '1.2rem' }}>
                  Thanh toán bằng thẻ VISA
                </Typography>
              }
            />
            <FormControlLabel
              value="cash"
              control={<Radio />}
              label={
                <Typography sx={{ fontSize: '1.2rem' }}>
                  Thanh toán bằng tiền mặt
                </Typography>
              }
            />
          </RadioGroup>

          {/* Order Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, width: '130px', fontSize: '1.0rem' }} // Điều chỉnh chiều rộng
            onClick={handleOrder}
          >
            Đặt hàng
          </Button>
          {/* Display success message */}
          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Đặt hàng thành công!
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Payment;
