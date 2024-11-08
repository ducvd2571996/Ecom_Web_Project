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
  Divider, // Giữ nguyên import Divider
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

// Tạo các styled components cho thanh tìm kiếm
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
  const [searchOpen, setSearchOpen] = useState(false); // Kiểm soát việc mở/đóng thanh tìm kiếm
  const [searchQuery, setSearchQuery] = useState(''); // Lưu trữ từ khóa tìm kiếm
  const [searchResults, setSearchResults] = useState<string[]>([]); // Lưu trữ kết quả tìm kiếm
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
  const gotoDetail = () => {
    window.location.href = '/product-detail';
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

  // Hàm kiểm soát việc mở hoặc đóng thanh tìm kiếm
  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event?.target?.value;
    setSearchQuery(query);

    // Lọc danh sách sản phẩm theo từ khóa tìm kiếm
    const filteredResults = items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults); // Cập nhật kết quả tìm kiếm
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

        {/* Phần bên phải - Profile, Cart, Search */}
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
    </AppBar>
  );
};

export default Header;
