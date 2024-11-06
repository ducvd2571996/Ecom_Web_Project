/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // This makes the component a Client Component
import { isValidPassword, isValidPhone } from '@/helper/verifyInput';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Alert,
  Box,
  Button,
  Checkbox,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoginBanner from '../public/asset/images/login_banner.png';
import { RootState } from '../store/store';
import { registerHanlder } from './store/reducers/register';

export default function RegisterPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isAgree, setIsAgree] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [isSuccess, setRegisterSuccess] = useState(false);
  const [isFailure, setRegisterFailure] = useState(false);
  const { loading } = useSelector((state: RootState) => state.register);

  const dispatch = useDispatch();
  const router = useRouter();

  const gotoLogin = () => {
    router.push('/login');
  };

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

  const handleRegister = () => {
    dispatch(
      registerHanlder({
        user: { phone: phoneNumber, password: password },
        callback: (res: { status: number }) => {
          if (res?.status === 200) {
            setRegisterSuccess(true);
          } else {
            setRegisterFailure(true);
          }
        },
      })
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
      }}
    >
      <Image
        src={LoginBanner}
        alt="Adidas Men Running Sneakers"
        objectFit="cover"
        quality={100}
        style={{
          width: '70%', // Make the image width responsive
          height: '100%', // Maintain aspect ratio
        }}
      />
      <Box
        sx={{
          width: '30%',
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
          Đăng Ký
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

        <Box display="flex" alignItems="center">
          <Checkbox
            checked={isAgree}
            onChange={() => setIsAgree((prev) => !prev)}
            color="default"
          />
          <Typography variant="body2">
            Đồng ý với{' '}
            <Typography variant="body2" color="primary" component="a" href="#">
              điều khoản sử dụng{' '}
            </Typography>
            và{' '}
            <Typography variant="body2" color="primary" component="a" href="#">
              chính sách bảo mật
            </Typography>
          </Typography>
        </Box>

        <Box display="flex" alignItems="center">
          <Checkbox color="default" />
          <Typography variant="body2">
            Đăng ký nhận bản tin hàng tháng của chúng tôi
          </Typography>
        </Box>

        <Button
          onClick={handleRegister}
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
            password === '' ||
            !isAgree
          }
        >
          {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
        </Button>

        <Typography variant="body2" mt={2}>
          Bạn đã có tài khoản?{' '}
          <Typography
            onClick={gotoLogin}
            component="a"
            color="primary"
            href="#"
            fontWeight="bold"
          >
            Đăng nhập
          </Typography>
        </Typography>
        <Snackbar
          open={isSuccess}
          autoHideDuration={2000}
          onClose={() => setRegisterSuccess(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setRegisterSuccess(false)} severity="success">
            Đăng ký thành công!
          </Alert>
        </Snackbar>

        <Snackbar
          open={isFailure}
          autoHideDuration={2000}
          onClose={() => setRegisterFailure(false)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={() => setRegisterFailure(false)} severity="error">
            Số điện thoại đã tồn tại. Đăng ký thất bại!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
}
