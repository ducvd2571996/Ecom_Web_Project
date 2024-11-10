'use client'; // This makes the component a Client Component
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material';

import { formatPrice } from '@/helper/formatString/format-price';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Product } from '../model/cart.model';
import { Order } from '../model/order.model';
import { RootState } from '../store/store';
import { useRouter } from 'next/navigation';
import { getOrderListHanlder } from '../payment/store/reducers/payment';

export default function OrderPage() {
  const [orders, setOrder] = useState<Order[]>([]);
  const dispatch = useDispatch();
  const { order } = useSelector((state: RootState) => state.payment);
  const cachedUser = useMemo(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }, []);

  const router = useRouter();

  useEffect(() => {
    setOrder(order);
    dispatch(getOrderListHanlder(cachedUser?.userInfo?.id));
  }, [order?.length]);

  const onNavigateDetail = (id: number) => {
    const url = `/product-detail?id=${id}`;
    router.push(url);
  };

  const TextComponent = ({
    title,
    value,
  }: {
    title: string;
    value: string;
  }) => {
    return (
      <Box marginX={2}>
        <Typography textAlign="center" fontWeight="bold">
          {title}
        </Typography>
        <Typography textAlign="center" marginBottom={2}>
          {value}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ marginTop: 2, paddingX: { xs: 2, md: 12 } }}>
      <Typography textAlign="center" variant="h5" fontWeight="bold" marginY={3}>
        Lịch sử đơn hàng
      </Typography>
      {orders?.map((order: Order) => (
        <Card key={order.id} sx={{ marginY: 4 }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              paddingY: 2,
              paddingX: 2,
              backgroundColor: '#F9FAFB',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <TextComponent title="Mã đơn hàng" value={`ORDER0${order?.id}`} />
            <TextComponent
              title="Ngày đặt"
              value={moment(order?.createdDate).format('DD-MM-YYYY')}
            />

            <TextComponent
              title="Tổng đơn"
              value={`đ${formatPrice(order?.totalPrice || 0)}`}
            />
          </Box>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: 1,
              marginLeft: 2,
              marginTop: 2,
            }}
          >
            {`Địa chỉ nhận hàng : ${order?.address}`}
          </Typography>
          {order?.products?.map((item: Product, idx: number) => {
            const discountPrice =
              item?.price - Math.round((item?.price * item?.discount) / 100);
            const isHaveDiscount = item?.discount && item?.discount !== 0;
            return (
              <Box key={idx}>
                <Box
                  onClick={() => {}}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    marginTop: 3,
                    alignItems: 'center',
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: { xs: '100%', sm: '120px' },
                      height: '120px',
                      objectFit: 'contain',
                      marginLeft: { xs: 0, sm: 2 },
                      marginBottom: { xs: 2, sm: 0 },
                    }}
                    image={item?.image}
                    alt={'Product Image'}
                  />
                  <CardContent
                    sx={{ flex: 1, textAlign: { xs: 'center', sm: 'left' } }}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        WebkitLineClamp: 1,
                      }}
                    >
                      {item?.name}
                    </Typography>
                    <Typography variant="body2">
                      đ
                      {formatPrice(
                        isHaveDiscount ? discountPrice : item?.price
                      )}
                      {isHaveDiscount ? (
                        <>
                          <Typography
                            color="#9098B1"
                            variant="body2"
                            component="span"
                            sx={{
                              textDecoration: 'line-through',
                              marginLeft: 1,
                            }}
                          >
                            đ{formatPrice(item?.price)}
                          </Typography>
                          <Typography
                            color="#FB7181"
                            variant="body2"
                            component="span"
                            fontWeight="700"
                            sx={{ marginLeft: 1 }}
                          >
                            {item?.discount}% Off
                          </Typography>
                        </>
                      ) : null}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontSize: 14, marginY: 1 }}
                    >
                      {`x ${item?.quantity}`}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      color="#40BFFF"
                      gutterBottom
                      onClick={() => onNavigateDetail(item?.id)}
                    >
                      {'Xem chi tiết sản phẩm'}
                    </Typography>
                  </CardContent>
                </Box>
                {idx === (order?.products?.length || 0) - 1 ? null : (
                  <Divider
                    sx={{ marginY: 1, height: 1, width: '100%', marginX: 3 }}
                  />
                )}
              </Box>
            );
          })}
        </Card>
      ))}
    </Box>
  );
}
