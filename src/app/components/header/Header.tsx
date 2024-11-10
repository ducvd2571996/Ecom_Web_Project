import { Product } from '@/app/model';
import { RootState } from '@/app/store/store';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';
import OrderIcon from '@mui/icons-material/ListAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {
  AppBar,
  Badge,
  Box, // Giữ nguyên import Divider
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

// Tạo các styled components cho thanh tìm kiếm
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
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
  const [searchOpen, setSearchOpen] = useState(false); // Kiểm soát việc mở/đóng thanh tìm kiếm
  const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ từ khóa tìm kiếm
  const [searchResults, setSearchResults] = useState<Product[]>([]); // Lưu trữ kết quả tìm kiếm
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Lưu trữ phần tử gốc cho Menu
  const [localAmount, setLocalAmount] = useState(0); // Lưu trữ số lượng sản phẩm trong giỏ hàng
  const amount = useSelector((state: RootState) => state.cart?.amount); // Lấy số lượng sản phẩm từ Redux store
  const userData = localStorage.getItem('user'); // Lấy dữ liệu người dùng từ localStorage
  const cachedUser = userData ? JSON.parse(userData) : null; // Kiểm tra nếu có người dùng thì parse dữ liệu
  const router = useRouter(); // Hook điều hướng từ Next.js

  // Hàm mở menu khi người dùng nhấn vào biểu tượng tài khoản
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (event?.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  };

  // Hàm đóng menu
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Hàm điều hướng tới trang thông tin cá nhân
  const handleProfileClick = () => {
    router.push('/profile');
    handleClose();
  };

  useEffect(() => {
    setLocalAmount(amount);
  }, [amount]);

  // Hàm điều hướng tới trang giỏ hàng
  const handleCartClick = () => {
    window.location.href = '/cart';
  };

  // Các hàm điều hướng khác (đăng ký, đăng nhập, đơn hàng, danh sách yêu thích)
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

  // Hàm đăng xuất, xóa thông tin người dùng khỏi localStorage và reload trang
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('wishList');
    handleClose();
    window.location.reload(); // Reload lại trang sau khi đăng xuất
  };

  const searchItems = useSelector(
    (state: RootState) => state.productList.productList
  );

  // Hàm kiểm soát việc tìm hiếm khi nhấn biểu tượng tìm kiếm
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredResults = searchItems.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  const handleSearchResultClick = (result: Product) => {
    setSearchQuery('');
    setSearchResults([]);
    const url = `/product-detail?id=${result?.productId}`;
    router.push(url);
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

        {/* Phần bên phải - Profile, Cart, Search */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0, sm: 6 },
            marginRight: { xs: 0, sm: 12 },
            '@media (max-width: 600px)': {
              gap: 2,
            },
          }}
        >
          {/* Kiểm tra nếu người dùng đã đăng nhập */}
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
            <Box>
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
            </Box>
          )}
          {/* Giỏ hàng */}
          <IconButton onClick={handleCartClick}>
            <Badge badgeContent={localAmount} color="primary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {/* Tìm kiếm */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Search>
              <IconButton type="button">
                <SearchIcon />
              </IconButton>
              <SearchInput
                placeholder="Tìm kiếm sản phẩm..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchResults.length > 0 && (
                <ResultsList>
                  {searchResults.map((result, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleSearchResultClick(result)}
                    >
                      <Typography>{result?.name}</Typography>
                    </MenuItem>
                  ))}
                </ResultsList>
              )}
            </Search>
          </Box>
        </Box>
      </Toolbar>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          mt: 1,
        }}
      >
        <Search sx={{ width: '90%' }}>
          <IconButton type="button">
            <SearchIcon />
          </IconButton>
          <SearchInput
            sx={{ width: '80%' }}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={handleSearchChange}
            onClick={handleSearchClick}
          />

          {searchResults.length > 0 && (
            <ResultsList>
              {searchResults.map((result, index) => (
                <Typography
                  onClick={() => handleSearchResultClick(result)}
                  key={index}
                  sx={{ padding: 1 }}
                >
                  {result?.name}
                </Typography>
              ))}
            </ResultsList>
          )}
        </Search>
      </Box>
    </AppBar>
  );
};

export default Header;
