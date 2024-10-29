/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from '@/app/store/store';
import { Box, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListHanlder } from '../../product-list/store/reducers/get-product';
import ProductItem from '../productItem';

const ProductList = () => {
  const dispatch = useDispatch();

  const { productList, loading } = useSelector(
    (state: RootState) => state.productList
  );

  useEffect(() => {
    dispatch(getProductListHanlder());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;

  return (
    <Box>
      {/* Product Grid */}
      <Grid container spacing={5}>
        {productList?.map?.((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            discount={product.discount}
            imageUrl={product.image}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default ProductList;
