/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { RootState } from '@/app/store/store';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Product } from '@/app/model';
import ProductItem from '../components/productItem';
import { getProductListHanlder } from '../product-list/store/reducers/get-product';
import { getWishList } from './store/reducers/wish-list';

const WishListPage = () => {
  const dispatch = useDispatch();

  const { productList, loading } = useSelector(
    (state: RootState) => state.productList
  );

  const { wishList } = useSelector((state: RootState) => state.wishList);

  useEffect(() => {
    dispatch(getProductListHanlder({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWishList());
  }, [dispatch, wishList?.length]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box marginBottom={10}>
      <Box marginX={10}>
        <Box display={'flex'} paddingY={3} marginY={3} alignItems={'center'}>
          <Box
            height={40}
            width={15}
            borderRadius={3}
            marginRight={1}
            sx={{ backgroundColor: '#40BFFF' }}
          />
          <Typography fontWeight={'bold'} fontSize={18}>
            Sản phẩm yêu thích
          </Typography>
        </Box>
        <Box marginX={3}>
          {!wishList?.length ? (
            <Box>
              <Typography>Bạn chưa có sản phẩm yêu thích</Typography>
            </Box>
          ) : (
            <Grid container spacing={5}>
              {wishList?.map?.((product: Product) => (
                <ProductItem
                  product={product}
                  length={productList?.length}
                  key={product.productId}
                  id={product.productId}
                  name={product.name}
                  price={product.price}
                  discount={product.discount}
                  imageUrl={product.image}
                />
              ))}
            </Grid>
          )}
        </Box>
      </Box>

      <Box marginX={10}>
        <Box display={'flex'} paddingY={3} marginY={3} alignItems={'center'}>
          <Box
            height={40}
            width={15}
            borderRadius={3}
            marginRight={1}
            sx={{ backgroundColor: '#40BFFF' }}
          />
          <Typography fontWeight={'bold'} fontSize={18}>
            Có thể bạn quan tâm
          </Typography>
        </Box>
        <Box marginX={3}>
          <Grid container spacing={5}>
            {productList?.slice(0, 4)?.map?.((product: Product) => (
              <ProductItem
                product={product}
                length={productList?.length}
                key={product.productId}
                id={product.productId}
                name={product.name}
                price={product.price}
                discount={product.discount}
                imageUrl={product.image}
              />
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default WishListPage;
