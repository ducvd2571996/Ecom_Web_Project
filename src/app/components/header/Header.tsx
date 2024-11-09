import { RootState } from '@/app/store/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OrderIcon from '@mui/icons-material/ListAlt';
import {
  AppBar,
  Badge,
  Box,
  Divider,  // Giữ nguyên import Divider
  IconButton,
  InputBase,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(2),
    width: 'auto',
  },
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    width: '100%',
  },
}));

const ResultsList = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  zIndex: 1,
  marginTop: theme.spacing(1),
  width: '100%',
  maxHeight: 200,
  overflowY: 'auto',
}));

const Header: React.FC = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [localAmount, setLocalAmount] = useState(0);
  const amount = useSelector((state: RootState) => state.cart?.amount);
  const userData = localStorage.getItem('user');
  const cachedUser = userData ? JSON.parse(userData) : null;
  const router = useRouter();
  
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProductlistClick = () => {
    router.push('/product-list');
    handleClose();
  };

  const handleProfileClick = () => {
    router.push('/profile');
    handleClose();
  };

  useEffect(() => {
    setLocalAmount(amount);
  }, [amount]);

  const items = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Pineapple',
    'Strawberry',
    'Grapes',
    'Blueberry',
    'Raspberry',
  ];

  const handleCartClick = () => {
    window.location.href = '/cart';
  };

  const gotoRegister = () => {
    window.location.href = '/register';
  };

  const gotoLogin = () => {
    window.location.href = '/login';
  };

  const gotoOrder = () => {
    window.location.href = '/order';
  };

  const gotoWishList = () => {
    window.location.href = '/wish-list';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('wishList');
    handleClose();
    window.location.reload();
  };

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredResults = items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 2,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          underline="none"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: '#58c9f3',
              borderRadius: '50%',
              width: 40,
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 1,
            }}
          >
            <Typography sx={{ color: 'white', fontSize: 20 }}>E</Typography>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            E-Comm
          </Typography>
        </Link>

        {/* Right Section - Profile, Cart, Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginRight: 12,
            '@media (max-width: 600px)': {
              gap: 2,
              marginRight: 2,
            },
          }}
        >
          {!cachedUser ? (
            <Box display={'flex'}>
              <Typography
                onClick={gotoRegister}
                component="a"
                color="primary"
                href="#"
                fontWeight="bold"
              >
                Đăng Ký
              </Typography>
              <Typography
                onClick={gotoLogin}
                marginLeft={5}
                component="a"
                color="primary"
                href="#"
                fontWeight="bold"
              >
                Đăng nhập
              </Typography>
            </Box>
          ) : (
            <>
              <IconButton onClick={handleOpen}>
                <AccountCircleIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
              >
                <MenuItem onClick={handleProfileClick}>
                  <ListItemIcon>
                    <InfoIcon fontSize="small" />
                  </ListItemIcon>
                  Thông tin cá nhân
                </MenuItem>
                
                {/* Divider để phân tách các mục menu */}
                <Divider />

                <MenuItem onClick={gotoWishList}>
                  <ListItemIcon>
                    <FavoriteIcon fontSize="small" />
                  </ListItemIcon>
                  Sản phẩm yêu thích
                </MenuItem>
                <MenuItem onClick={gotoOrder}>
                  <ListItemIcon>
                    <OrderIcon fontSize="small" />
                  </ListItemIcon>
                  Đơn hàng
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  Đăng xuất
                </MenuItem>
              </Menu>
            </>
          )}

          <IconButton onClick={handleCartClick}>
            <Badge badgeContent={localAmount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <Search>
            <SearchInput
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={handleSearchChange}
              onClick={handleSearchClick}
            />
            <IconButton
              type="button"
              sx={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
              }}
            >
              <SearchIcon />
            </IconButton>
            {searchResults.length > 0 && (
              <ResultsList>
                {searchResults.map((result, index) => (
                  <Typography key={index} sx={{ padding: 1 }}>
                    {result}
                  </Typography>
                ))}
              </ResultsList>
            )}
          </Search>
        </Box>
      </Toolbar>

      {/* Navigation Buttons */}
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 10,  //  khoảng cách giữa các nút
          paddingY: 0.2,  // padding dọc 
          backgroundColor: 'white',
        }}
      >
        <Button
          component={Link}
          href="/"
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Trang Chủ
        </Button>
        <Button
          component={Link}
          href="/tui-xach"
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
          onClick={handleProductlistClick}
        >
          Túi Xách
        </Button>
        <Button
          component={Link}
          href="/sneaker"
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Sneaker
        </Button>
        <Button
          component={Link}
          href="/phu-kien"
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Phụ Kiện
        </Button>
        <Button
          component={Link}
          href="/contact"
          color="inherit"
          sx={{
            fontWeight: 'bold',
            fontSize: '1.1rem',
          }}
        >
          Liên Hệ
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
