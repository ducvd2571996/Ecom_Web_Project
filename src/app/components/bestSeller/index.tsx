/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ProductItem from '../productItem';
import { getCateListHanlder } from '@/app/store/reducers';
import { RootState } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListHanlder } from '@/app/product-list/store/reducers/get-product';

const BestSeller = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);

  const handleTabChange = (category: any) => {
    setSelectedCategory(category);
  };

  const dispatch = useDispatch();

  const { cateList } = useSelector((state: RootState) => state.cateList);

  const newCateList = [{ id: 0, name: 'Tất cả' }, ...cateList];

  useEffect(() => {
    dispatch(getCateListHanlder());
  }, [dispatch]);

  const { productList } = useSelector((state: RootState) => state.productList);

  useEffect(() => {
    dispatch(getProductListHanlder());
  }, [dispatch]);

  // Filter products based on the selected category
  const filteredProducts =
    selectedCategory === 0
      ? productList
      : productList.filter(
          (product) => product?.categoryId === selectedCategory
        );

  return (
    <Box sx={{ paddingX: 12, paddingTop: 10 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3,
          marginBottom: 5,
        }}
      >
        {newCateList?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category.id ? 'contained' : 'text'}
            onClick={() => handleTabChange(category.id)}
            sx={{ mx: 1 }}
          >
            {category.name}
          </Button>
        ))}
      </Box>

      {/* Product Grid */}
      <Grid container spacing={5}>
        {filteredProducts.map((product) => (
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

export default BestSeller;
