import { Box, CardMedia } from '@mui/material';
import { useEffect, useState } from 'react';

const Banner = () => {
  const images = [
    'https://drake.vn/image/catalog/H%C3%ACnh%20content/sale%207-11.11/web-sale-7-den-11-11-21.jpg',
    'https://www.bizzbuzz.news/h-upload/2024/02/16/1863834-nike-incbanner.jpg',
    'https://file.hstatic.net/200000410665/collection/banner-flash-sale-_web_2_c78501d033764e1dac648de41aebf819.jpg',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change images every 5 seconds   
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <Box sx={{ position: 'relative'}}>
      <CardMedia
        component="img"
        sx={{
          width: '100%',
          height: '85%',
        }}
        image={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
      />
    </Box>
  );
};

export default Banner;
