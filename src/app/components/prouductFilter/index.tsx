import React, { useEffect, useState } from 'react';
import {
  Box,
  Slider,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Link,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import { getCateListHanlder } from '@/app/store/reducers';
import { getBrandsHanlder } from '@/app/product-list/store/reducers/get-brands';
import { getProductListHanlder } from '@/app/product-list/store/reducers/get-product';

const ProductFilter: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedBrand, setSelectedBrand] = useState<number | null>(null);
  const [selectedCate, setSelectedCate] = useState<number | null>(null);
  const dispatch = useDispatch();
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  useEffect(() => {
    dispatch(getCateListHanlder());
    dispatch(getBrandsHanlder());
  }, []);

  const { cateList } = useSelector((state: RootState) => state.cateList);

  const { brands } = useSelector((state: RootState) => state.brands);

  return (
    <Box sx={{ paddingX: 2 }}>
      {/* Price Range Section */}
      <Paper sx={{ padding: 2, marginBottom: 3, backgroundColor: '#F6F7F8' }}>
        <Typography variant="h6" gutterBottom>
          Giá tiền
        </Typography>
        <Typography variant="body1">
          Khoảng giá: ${priceRange[0]} - ${priceRange[1]}
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceChange}
          min={0}
          max={10000000}
          valueLabelDisplay="auto"
          sx={{ marginTop: 2 }}
        />
      </Paper>

      {/* Brand Section */}
      <Paper sx={{ padding: 2, backgroundColor: '#F6F7F8' }}>
        <Typography variant="h6" gutterBottom>
          Thương hiệu
        </Typography>
        <List>
          {brands.map((brand, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={
                  <Link
                    href="#"
                    underline="none"
                    color={selectedBrand === brand.id ? 'primary' : 'inherit'}
                    onClick={() => {
                      dispatch(getProductListHanlder({ brand: brand?.id }));
                      setSelectedBrand(brand.id);
                    }}
                    sx={{
                      fontWeight:
                        selectedBrand === brand.id ? 'bold' : 'normal',
                    }}
                  >
                    {brand.name}
                  </Link>
                }
              />
              <Typography
                color={
                  selectedBrand === brand.id ? 'primary' : 'text.secondary'
                }
              >
                {brand?.productCount}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      <Paper sx={{ padding: 2, backgroundColor: '#F6F7F8', marginTop: 3 }}>
        <Typography variant="h6" gutterBottom>
          Mặt hàng
        </Typography>
        <List>
          {cateList.map((cate, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText
                primary={
                  <Link
                    href="#"
                    underline="none"
                    color={selectedCate === cate?.id ? 'primary' : 'inherit'}
                    onClick={() => setSelectedCate(cate?.id)}
                    sx={{
                      fontWeight: selectedCate === cate?.id ? 'bold' : 'normal',
                    }}
                  >
                    {cate?.name}
                  </Link>
                }
              />
              <Typography
                color={selectedCate === cate?.id ? 'primary' : 'text.secondary'}
              >
                {cate?.productCount}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ProductFilter;
