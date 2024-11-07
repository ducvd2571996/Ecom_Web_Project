import React, { useState } from 'react';
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

const ProductFilter: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000000]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  const brands = ['Nike', 'Adidas', 'Siemens'];

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
                    color={selectedBrand === brand ? 'primary' : 'inherit'}
                    onClick={() => setSelectedBrand(brand)}
                    sx={{
                      fontWeight: selectedBrand === brand ? 'bold' : 'normal',
                    }}
                  >
                    {brand}
                  </Link>
                }
              />
              <Typography
                color={selectedBrand === brand ? 'primary' : 'text.secondary'}
              >
                99
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default ProductFilter;
