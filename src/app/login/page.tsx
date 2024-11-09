/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // This makes the component a Client Component
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import LoginBanner from '../public/asset/images/login_banner.png';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { loginHanlder } from './store/reducers/login';
import { isValidPassword, isValidPhone } from '@/helper/verifyInput';
import { Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isLoginSuccess, setLoginSuccess] = useState(false);
  const { loading } = useSelector((state: RootState) => state.register);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handlePasswordChange = (event: any) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setError(!isValidPassword(newPassword));
  };

  const handlePhoneNumberChange = (event: any) => {
    const newPhoneNumber = event.target.value;
    setPhoneNumber(newPhoneNumber);
    setPhoneError(!isValidPhone(newPhoneNumber));
  };

  const handleLogin = () => {
    dispatch(
      loginHanlder({
        user: { phone: phoneNumber, password: password },
        callback: (res: { status: number }) => {
          if (res?.status === 200) {
            router.push('/');
          }
        },
      })
    );
  };

  const gotoRegister = () => {
    router.push('/register');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' }, // Column cho mobile, row cho desktop
        height: '100vh',
      }}
    >
      {/* Left Banner */}
      <Box
        sx={{
          width: { xs: '100%', md: '70%' }, // Banner chiếm 100% trên mobile, 70% trên desktop
          height: { xs: '30%', md: '100%' }, // Chiều cao thay đổi trên mobile
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image
          src={LoginBanner}
          alt="Login Banner"
          objectFit="cover"
          quality={100}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Box>

      {/* Right Login Form */}
      <Box
        sx={{
          width: { xs: '100%', md: '30%' }, // Form chiếm 100% trên mobile, 30% trên desktop
          p: 4,
          borderRadius: '10px',
          textAlign: 'center',
          ml: { xs: 0, md: 3 },
        }}
      >
        <Typography variant="h4" fontWeight="bold" mb={2}>
          E-Comm
        </Typography>
        <Typography variant="h5" mb={3}>
          Đăng nhập
        </Typography>

        <TextField
          fullWidth
          label="Số điện thoại"
          variant="outlined"
          margin="normal"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          error={phoneError}
          helperText={phoneError ? 'Số điện thoại không đúng' : ''}
          inputProps={{
            inputMode: 'numeric',
            pattern: '[0-9]*',
          }}
        />

        <TextField
          fullWidth
          label="Nhập mật khẩu"
          type={showPassword ? 'text' : 'password'}
          variant="outlined"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          error={error}
          helperText={
            error
              ? 'Mật khẩu từ 8 ký tự trở lên bao gồm chữ hoa, ký tự đặc biệt và số'
              : ''
          }
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Box display="flex" alignItems="center">
            <Checkbox />
            <Typography variant="body2">Lưu đăng nhập</Typography>
          </Box>
        </Box>

        <Button
          onClick={handleLogin}
          variant="contained"
          fullWidth
          color="primary"
          size="large"
          sx={{ mb: 2, marginTop: 10 }}
          disabled={
            loading ||
            phoneError ||
            error ||
            phoneNumber === '' ||
            password === ''
          }
        >
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </Button>

        <Divider>Hoặc</Divider>

        <Typography variant="body2" mt={2}>
          Bạn chưa có tài khoản?{' '}
          <Typography
            onClick={gotoRegister}
            component="a"
            color="primary"
            href="#"
            fontWeight="bold"
          >
            Đăng ký
          </Typography>
        </Typography>

        {/* Admin login link */}
        <Typography
          variant="body2"
          color="primary"
          sx={{
            textDecoration: 'underline',
            cursor: 'pointer',
            mt: 2,
            '&:hover': {
              color: 'darkblue',
            },
          }}
          onClick={() => {
            // Thực hiện logic đăng nhập admin
          }}
        >
          Đăng nhập với tư cách quản trị viên
        </Typography>

        <Snackbar
          open={isLoginSuccess}
          autoHideDuration={2000}
          onClose={() => setLoginSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setLoginSuccess(false)} severity="error">
            Tài khoản đăng nhập không đúng. Vui lòng kiểm tra lại!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
