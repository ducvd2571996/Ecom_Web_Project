import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Box,
  IconButton,
  Tooltip,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import the Visibility icon
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatPrice } from '@/helper/formatString/format-price';

interface ProductItemProps {
  id: number;
  name: string;
  price: number;
  discount: number;
  imageUrl: string;
  length?: number;
}

const ProductItem = ({
  id,
  name,
  price,
  discount,
  imageUrl,
}: ProductItemProps) => {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteToggle = () => {
    setIsFavorite((prev) => !prev);
  };

  const onNavigateDetail = () => {
    const url = `/product-detail?link=${imageUrl}`;
    router.push(url);
  };

  const discountPrice = price - Math.round((price * discount) / 100);
  const isHaveDiscount = discount && discount !== 0;

  return (
    <Grid item xs={12} sm={6} md={3} key={id}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative', // Important for positioning hover icons
          transition: '0.3s', // Smooth transition for hover effects
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Box sx={{ maxWidth: 300, margin: 5 }}>
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
            image={imageUrl}
            alt={name}
          />
        </Box>

        <CardContent style={{ alignItems: 'center' }}>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="#40BFFF">
            đ{formatPrice(isHaveDiscount ? discountPrice : price)}
            {isHaveDiscount ? (
              <>
                <Typography
                  color="#9098B1"
                  variant="body2"
                  component="span"
                  sx={{ textDecoration: 'line-through', marginLeft: 1 }}
                >
                  đ{formatPrice(price)}
                </Typography>
                <Typography
                  color="#FB7181"
                  variant="body2"
                  component="span"
                  fontWeight={'700'}
                  sx={{ marginLeft: 1 }}
                >
                  {discount}%Off
                </Typography>
              </>
            ) : null}
          </Typography>
        </CardContent>

        {/* Icons container */}
        {hovered && (
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              display: 'flex',
              backgroundColor: '#F1F3F4',
              width: '80%',
              height: '80%',
              gap: 1,
              transform: 'translate(-50%, -50%)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Tooltip title={isFavorite ? 'Bỏ thích' : 'Yêu thích'}>
              <IconButton onClick={handleFavoriteToggle}>
                {isFavorite ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon sx={{ color: '#33A0FF' }} />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip title="Thêm giỏ hàng">
              <IconButton sx={{ color: '#40BFFF' }}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip>
            <Tooltip onClick={onNavigateDetail} title="Xem chi tiết">
              <IconButton sx={{ color: '#40BFFF' }}>
                <VisibilityIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Card>
    </Grid>
  );
};

export default ProductItem;
