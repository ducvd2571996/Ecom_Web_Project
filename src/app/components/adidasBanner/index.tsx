import * as React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import Image from 'next/image'; // Import Next.js Image component
import adidasImg from '../../public/asset/images/shoes_bg.png';

const AdidasBanner = ({
  isHideButton,
  height,
  shoeRatio,
}: {
  isHideButton?: boolean;
  height?: number;
  shoeRatio?: string;
}) => {
  return (
    <Box
      sx={{
        height: height || '400px', // Adjust height as needed
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#40BFFF',
      }}
    >
      <Container maxWidth="md">
        <Typography variant="h3" color="white" fontWeight="bold">
          Giày thể thao Adidas cho nam.
        </Typography>
        <Typography variant="body1" color="white" marginBottom={2}>
          Thiết kế đỉnh chóp. Đưa bạn đến giới hạn tối đa.
        </Typography>
        {isHideButton ? null : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{
              borderRadius: 3,
              padding: '12px 24px',
              textTransform: 'none',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Mua Ngay
          </Button>
        )}
      </Container>

      <Image
        src={adidasImg}
        alt="Adidas Men Running Sneakers"
        objectFit="cover"
        quality={100}
        style={{
          width: shoeRatio || '40%', // Make the image width responsive
          height: 'auto', // Maintain aspect ratio
          marginTop: 150,
        }}
      />
    </Box>
  );
};

export default AdidasBanner;
