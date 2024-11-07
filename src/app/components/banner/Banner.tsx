import { Box, Container } from '@mui/material';
import Image from 'next/image'; // Importing Next.js Image
import { useEffect, useState } from 'react';

const Banner = () => {
  const images = [
    'https://packmojo.com/blog/images/size/w1000/2021/06/shoes-bg.jpg',
    'https://boathousestores.com/cdn/shop/collections/WSALE_d33c277f-068b-4120-99fa-b5656522e7b2.png', // Use local images if necessary
    'https://packmojo.com/blog/images/size/w1000/2021/06/shoes-bg.jpg',
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
    <Box sx={{ position: 'relative', width: '100%', height: '400px' }}>
      {/* Using Next.js Image for optimized loading */}
      <Image
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        layout="fill" // Ensures it takes the entire container
        objectFit="cover" // Maintains aspect ratio while covering the container
        priority // For loading priority
      />
    </Box>
  );
};

export default Banner;
