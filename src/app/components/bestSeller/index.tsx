import { Box, Button, Grid } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import ProductItem from '../productItem';
import { getCateListHanlder } from '@/app/store/reducers';
import { RootState } from '@/app/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListHanlder } from '@/app/product-list/store/reducers/get-product';

const BestSeller = () => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const dispatch = useDispatch();

  // Only dispatch once for category list fetching (on mount)
  const { cateList } = useSelector((state: RootState) => state.cateList);

  const newCateList = useMemo(() => {
    return [{ id: 0, name: 'Tất cả' }, ...cateList];
  }, [cateList]);

  useEffect(() => {
    dispatch(getCateListHanlder());
  }, [dispatch]); // This effect runs only once on component mount

  const { productList } = useSelector((state: RootState) => state.productList);

  useEffect(() => {
    if (productList.length === 0) {
      // Only dispatch if product list is empty
      dispatch(getProductListHanlder({}));
    }
  }, [dispatch, productList.length]); // Run only once when productList is empty

  // Use useMemo to avoid recalculating filtered products on every render
  const filteredProducts = useMemo(() => {
    return selectedCategory === 0
      ? productList
      : productList.filter(
          (product) => product?.categoryId === selectedCategory
        );
  }, [selectedCategory, productList]); // Only re-filter when selectedCategory or productList changes

  const handleTabChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

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
            product={product}
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
  );
};

export default BestSeller;
