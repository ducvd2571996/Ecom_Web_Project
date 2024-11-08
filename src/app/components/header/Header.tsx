import React, { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Link,
  Toolbar,
  Typography,
  InputBase,
  Paper,
  Divider,
  Menu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';

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
  const [searchOpen, setSearchOpen] = useState(false); // State to toggle search bar visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [searchResults, setSearchResults] = useState<string[]>([]); // State for search results
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    // Navigate to profile details or perform profile-related actions
    router.push('/profile'); // Điều hướng đến trang ProfilePage
    handleClose();
  };

  // Sample data
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
    const userData = localStorage.getItem('user');
    const user = userData ? JSON.parse(userData) : null;
    setUser(user?.userInfo);
  }, []);

  const handleCartClick = () => {
    window.location.href = '/cart'; // Redirect to the cart page
  };

  const router = useRouter();

  const gotoRegister = () => {
    router.push('/register');
  };

  const gotoLogin = () => {
    router.push('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    handleClose();
    window.location.reload();
  };

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen); // Toggle the search bar
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the sample data based on the search query
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
            // Adjust for mobile view
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
                <MenuItem>
                  <ListItemIcon>
                    <FavoriteIcon fontSize="small" />
                  </ListItemIcon>
                  Sản phẩm yêu thích
                </MenuItem>
                {/* <MenuItem>
                  <ListItemIcon>
                    <ShoppingCartIcon fontSize="small" />
                  </ListItemIcon>
                  Đơn hàng
                </MenuItem> */}
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
            <Badge badgeContent={2} color="secondary">
              <ShoppingCartIcon />
            </Badge>
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
              {/* Search Results */}
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
                        setSearchResults([]); // Clear results after selection
                        // Handle the search result click here (e.g., redirect to a product page)
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
          width: { xs: '100%' }, // Full width on small screens, 600px on larger screens
          backgroundColor: '#F6F7F8',
        }}
      />
    </AppBar>
  );
};

export default Header;
