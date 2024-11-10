import { RootState } from '@/app/store/store';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductListHanlder } from '../../product-list/store/reducers/get-product';
import ProductItem from '../productItem';
import ViewCompactSharpIcon from '@mui/icons-material/ViewCompactSharp';
import { Product } from '@/app/model';

interface ProductListProps {
  priceRange: number[];
}

const ProductList = ({ priceRange }: ProductListProps) => {
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<string>('name');
  const { productList, loading } = useSelector(
    (state: RootState) => state.productList
  );

  useEffect(() => {
    dispatch(getProductListHanlder({}));
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    const filtered = productList.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    switch (sortBy) {
      case 'desc-price':
        return filtered.sort((a, b) => b.price - a.price);
      case 'asc-price':
        return filtered.sort((a, b) => a.price - b.price);
      case 'name':
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
      case 'discount':
        return filtered.sort((a, b) => b.discount - a.discount);
      default:
        return filtered;
    }
  }, [productList, priceRange, sortBy]);

  if (loading) return <p>Đang tải...</p>;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px',
          marginTop: 5,
          marginBottom: 5,
          paddingRight: 2,
          backgroundColor: '#f7f7f7',
          borderRadius: '8px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography style={{ marginRight: '10px', fontWeight: 'bold' }}>
            Sắp xếp theo
          </Typography>
          <select
            style={{
              padding: '5px',
              borderRadius: '4px',
              borderColor: '#ccc',
            }}
            onChange={(e) => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="name">Tên</option>
            <option value="asc-price">Giá (Tăng dần)</option>
            <option value="desc-price">Giá (Giảm dần)</option>
            <option value="discount">Giảm giá</option>
          </select>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography marginRight={1}>
            {productList?.length} sản phẩm
          </Typography>
          <ViewCompactSharpIcon
            sx={{
              width: '20px',
              height: '20px',
              color: '#0099ff',
              cursor: 'pointer',
            }}
          />
        </Box>
      </Box>
      <Grid container spacing={5}>
        {filteredProducts.map((product: Product) => (
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
  );
};

export default ProductList;
