import { RootState } from '@/app/store/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import OrderIcon from '@mui/icons-material/ListAlt';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import {
  AppBar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputBase,
  Link,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
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
  const [user, setUser] = useState(null);
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

  useEffect(() => {
    setUser(cachedUser?.userInfo);
  }, [cachedUser?.userInfo]);

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

  const handleContactClick = () => {
    window.location.href = '/contact';
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
          {!user ? (
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
            <Badge badgeContent={localAmount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          <IconButton onClick={handleContactClick}>
            <ContactMailIcon color="primary" />
          </IconButton>

          {/* Search Icon Button */}
          <IconButton sx={{ marginRight: -5 }} onClick={handleSearchClick}>
            <SearchIcon />
          </IconButton>

          {/* Search Bar */}
          {searchOpen && (
            <Search>
              <SearchInput
                placeholder="Tìm kiếm..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchResults.length > 0 && (
                <ResultsList>
                  {searchResults.map((result, index) => (
                    <Typography
                      key={index}
                      sx={{
                        padding: 1,
                        cursor: 'pointer',
                        '&:hover': { backgroundColor: '#f0f0f0' },
                      }}
                      onClick={() => {
                        setSearchQuery(result);
                        setSearchResults([]);
                      }}
                    >
                      {result}
                    </Typography>
                  ))}
                </ResultsList>
              )}
            </Search>
          )}
        </Box>
      </Toolbar>

      <Divider
        sx={{
          width: { xs: '100%' },
          backgroundColor: '#F6F7F8',
        }}
      />
    </AppBar>
  );
};

export default Header;
