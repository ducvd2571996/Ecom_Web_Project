/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { formatPrice } from '@/helper/formatString/format-price';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import RemoveIcon from '@mui/icons-material/Remove';
import WarningIcon from '@mui/icons-material/Warning';
import {
  Box,
  Button,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateCartDTO, Product } from '../model/cart.model';
import { RootState } from '../store/store';
import {
  getCartHanlder,
  removeCartItemHanlder,
  updateCartHanlder,
} from './store/reducers/cart';

const CartPage = () => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [productIndex, setProductIndex] = useState<number | null>(null);
  const [localCart, setCart] = useState<any>({});
  const cachedUser = useMemo(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }, []);

  const dispatch = useDispatch();
  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getCartHanlder({ cart, userId: cachedUser?.userInfo?.id }));
  }, []);

  useEffect(() => {
    setCart(cart || {});
  }, [cart]);

  const updateCartQuantity = (
    index: number,
    action: 'increase' | 'decrease'
  ) => {
    setCart((prevCart: any) => {
      const updatedProducts = prevCart?.products?.map(
        (product: Product, i: number) => {
          if (i === index) {
            let newQuantity = product.quantity;

            if (action === 'increase') {
              newQuantity += 1;
            } else if (action === 'decrease') {
              newQuantity -= 1;
            }

            if (newQuantity > 0) {
              return { ...product, quantity: newQuantity };
            }

            // If quantity is 1 and decrease action, trigger removal confirmation
            setProductIndex(i);
            setOpenConfirm(true);
          }
          return product;
        }
      );

      if (
        JSON.stringify(prevCart?.products) !== JSON.stringify(updatedProducts)
      ) {
        const updatedCart = { ...prevCart, products: updatedProducts };
        onHandleUpdateCart(updatedCart); // Pass updated cart directly
        return updatedCart;
      }

      return prevCart; // No change, return the previous cart state
    });
  };

  const onHandleUpdateCart = (cartPayload: any) => {
    const userId = cachedUser?.userInfo?.id;
    if (userId) {
      const cart: CreateCartDTO = {
        products: cartPayload?.products,
        customerId: userId,
      };
      dispatch(
        updateCartHanlder({
          cart,
          userId,
        })
      );
    }
  };

  const handleRemove = (index: number) => {
    setProductIndex(index);
    setOpenConfirm(true);
  };

  const confirmRemove = () => {
    if (productIndex !== null) {
      setCart((prevCart: any) => {
        // Filter out the product to be removed by its index
        const updatedProducts = prevCart?.products?.filter(
          (_: any, i: number) => i !== productIndex
        );
        const product = prevCart?.products?.find(
          (_: any, i: number) => i === productIndex
        );
        const updatedCart = { ...prevCart, products: updatedProducts };
        dispatch(
          removeCartItemHanlder({
            item: {
              productId: product?.id,
              customerId: cachedUser?.userInfo?.id,
            },
            callback: (rs: any) => {
              console.log('response: ', rs);
            },
          })
        );
        return updatedCart;
      });
    }
    setOpenConfirm(false);
    setProductIndex(null);
  };

  // Điều hướng đến trang thanh toán
  const handleCheckoutClick = () => {
    const query = new URLSearchParams({
      cart: JSON.stringify({
        ...localCart,
        customerId: cachedUser?.userInfo?.id,
      }),
    }).toString();
    router.push(`/payment?${query}`);
  };

  const isHaveCart = localCart?.products?.length > 0;
  return (
    <>
      {isHaveCart ? (
        <Box sx={{ padding: '32px', minHeight: '55vh' }}>
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
                {localCart?.products?.map?.((item: Product, index: number) => {
                  const { price, discount } = item;
                  const discountPrice =
                    price - Math.round((price * discount) / 100);
                  const isHaveDiscount = discount && discount !== 0;
                  return (
                    <Box
                      key={item?.id}
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
                        <CardMedia
                          component="img"
                          sx={{
                            width: '100px',
                            height: '100px',
                            objectFit: 'contain',
                            marginRight: 2,
                          }}
                          image={item.image}
                          alt={item.name}
                        />
                        <Typography variant="h6">{item?.name}</Typography>
                      </Box>
                      <Box marginLeft={4}>
                        <Typography variant="body1" color="#40BFFF">
                          đ{formatPrice(isHaveDiscount ? discountPrice : price)}
                        </Typography>
                        {isHaveDiscount ? (
                          <>
                            <Typography
                              color="#9098B1"
                              variant="body2"
                              component="span"
                              sx={{ textDecoration: 'line-through' }}
                            >
                              đ{formatPrice(price)}
                            </Typography>
                          </>
                        ) : null}
                      </Box>
                      <Box display="flex" alignItems="center">
                        <IconButton
                          onClick={() => updateCartQuantity(index, 'decrease')}
                          sx={{ color: '#58c9f3' }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography sx={{ margin: '0 16px' }}>
                          {item?.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => updateCartQuantity(index, 'increase')}
                          sx={{ color: '#58c9f3' }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: 'bold', textAlign: 'center' }}
                      >
                        đ{formatPrice(discountPrice * item?.quantity)}
                      </Typography>
                    </Box>
                  );
                })}
              </Stack>

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

            <Box flex={1} marginTop="2px">
              {/* Voucher Code Section */}
              {/* <Box display="flex" alignItems="center" marginBottom="32px">
                <TextField
                  label="Nhập mã voucher"
                  variant="outlined"
                  size="small"
                  sx={{ flexGrow: 1, marginRight: '16px' }}
                />
                <Button variant="contained" color="primary">
                  Sử dụng
                </Button>
              </Box> */}

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
                    đ{formatPrice(localCart?.subTotal || 0)}
                  </Typography>
                  <br />
                  <Typography variant="body1">đ{0}</Typography>
                  <br />
                  <Typography variant="body1">
                    {(localCart?.discountTotal || 0) > 0
                      ? `-đ${formatPrice(localCart?.discountTotal || 0)}`
                      : 'Không'}
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
                  đ{formatPrice(localCart?.totalPrice || 0)}
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
      ) : (
        <Box
          sx={{
            minHeight: '60vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box textAlign="center" paddingTop={20}>
            <Typography variant="h6" marginBottom={10}>
              Bạn chưa có sản phẩm nào trong giỏ hàng
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ width: 300 }}
              onClick={() => router.push(`/`)}
            >
              Khám phá
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CartPage;
