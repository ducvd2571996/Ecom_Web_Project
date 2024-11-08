/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { formatPrice } from '@/helper/formatString/format-price';
import {
  Box,
  Button,
  CardMedia,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slide,
  TextField,
  Typography,
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation'; // Sử dụng useSearchParams từ next/navigation
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../model/cart.model';
import { Order } from '../model/order.model';
import { RootState } from '../store/store';
import { createOrdertHanlder } from './store/reducers/payment';
import { makeStyles } from '@mui/styles';
import { getCartHanlder } from '../cart/store/reducers/cart';

const useStyles = makeStyles((theme: any) => ({
  dialogPaper: {
    background: 'linear-gradient(135deg, #03A9F4, #FB7181)', // Beautiful gradient background
    borderRadius: 20,
    padding: theme.spacing(3),
  },
  dialogTitle: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  dialogContent: {
    textAlign: 'center',
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    color: '#FF7E5F',
    fontSize: '1rem',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#feb47b',
      color: '#fff',
    },
    borderRadius: '50px',
    padding: '10px 30px',
  },
}));

const Payment = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  // Define the shape of your form values
  interface FormValues {
    name: string;
    address: string;
    phone: string;
    email: string;
  }

  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    address: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({}); // Update the type for errors
  const [success, setSuccess] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const classes = useStyles();
  const { loading } = useSelector((state: RootState) => state.payment);
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
      'address',
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
      // setSuccess(true);
      const order: Order = {
        cartId: parsedCart?.id,
        customerId: parsedCart?.customerId,
        orderStatus: 'NEW',
        paymentMethod: '1',
        name: formValues?.name,
        address: formValues?.address,
        email: formValues?.email,
        phoneNumber: formValues?.phone,
        totalPrice: parsedCart?.totalPrice,
        subTotal: parsedCart?.subTotal,
        discountTotal: parsedCart?.discountTotal,
        products: parsedCart?.products,
      };
      dispatch(
        createOrdertHanlder({
          order,
          callback: () => {
            dispatch(getCartHanlder({ userId: parsedCart?.customerId }));
            setOpenDialog(true);
          },
        })
      );

      // Quay về trang chủ sau 2 giây
      // setTimeout(() => {
      //   router.push('/'); // Điều hướng về trang chủ
      // }, 2000);
    } else {
      // Reset success state if there are errors
      setSuccess(false);
    }
  };

  const handleContinueShopping = () => {
    setOpenDialog(false); // Close the dialog
    router.push('/'); // Navigate to the homepage or product list
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
            { label: 'Địa chỉ', name: 'address' },
            { label: 'Số điện thoại', name: 'phone' },
            { label: 'Địa chỉ email', name: 'email' },
          ].map(({ label, name }, index) => {
            const isRequired = [
              'Họ tên',
              'Địa chỉ',
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
            disabled={loading}
            variant="contained"
            color="primary"
            sx={{ marginTop: 2, width: '200px', fontSize: '1.0rem' }} // Điều chỉnh chiều rộng
            onClick={handleOrder}
          >
            {loading ? ' Đang đặt hàng...' : 'Đặt hàng'}
          </Button>
        </Box>
      </Box>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        TransitionComponent={(props) => <Slide direction="up" {...props} />}
        PaperProps={{
          className: classes.dialogPaper,
        }}
      >
        <DialogTitle className={classes.dialogTitle}>
          Thanh toán thành công!
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" className={classes.dialogContent}>
              Cảm ơn bạn đã mua sắm tại cửa hàng chúng tôi. Đơn hàng của bạn đã
              được xác nhận thành công!
            </Typography>
            <Button
              sx={{ marginTop: 3 }}
              className={classes.button}
              onClick={handleContinueShopping}
            >
              Tiếp tục mua sắm
            </Button>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          {/* Optionally you can add more actions */}
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Payment;
