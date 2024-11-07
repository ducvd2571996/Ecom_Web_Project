import { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (recaptchaVerified && agreeTerms) {
      console.log('Sign up form submitted:', { email, password, agreeTerms, subscribeNewsletter });
      // Xử lý đăng ký, có thể gọi API hoặc điều hướng
    } else {
      console.log('Please verify reCAPTCHA and agree to the terms.');
    }
  };

  return (
    <div className="flex items-center justify-between h-screen bg-gray-100">
      {/* Phần bên trái: Banner */}
      <div className="w-3/5 h-full bg-blue-500 relative">
        <img
          src="Ảnh"
          alt="Fashion Sale"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Phần bên phải: Form đăng ký */}
      <div className="w-2/5 bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Đăng Ký
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary" paragraph>
            Đăng ký miễn phí để truy cập các sản phẩm của chúng tôi
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email input */}
            <TextField
              label="Địa chỉ Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password input */}
            <TextField
              label="Mật khẩu"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              helperText="Sử dụng 8 ký tự trở lên với sự kết hợp của chữ cái, số & ký tự đặc biệt."
            />

            {/* Agree terms checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={agreeTerms}
                  onChange={() => setAgreeTerms(!agreeTerms)}
                  required
                />
              }
              label={
                <span>
                  Tôi đồng ý với <a href="#" style={{ color: '#1976d2' }}>Điều khoản sử dụng</a> và <a href="#" style={{ color: '#1976d2' }}>Chính sách bảo mật</a>
                </span>
              }
            />

            {/* Newsletter subscription checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={subscribeNewsletter}
                  onChange={() => setSubscribeNewsletter(!subscribeNewsletter)}
                />
              }
              label="Đăng ký nhận bản tin hàng tháng"
            />

            {/* reCAPTCHA (giả lập) */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={recaptchaVerified}
                  onChange={() => setRecaptchaVerified(!recaptchaVerified)}
                />
              }
              label="Tôi không phải là robot"
            />

            {/* Nút đăng ký */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Đăng Ký
            </Button>
          </form>

          {/* Đăng nhập */}
          <div className="text-center mt-4">
            <Typography variant="body2">
              Đã có tài khoản? <a href="#" style={{ color: '#1976d2' }}>Đăng Nhập</a>
            </Typography>
          </div>

          {/* Nút đăng nhập với Google */}
          <div className="mt-4 flex items-center justify-center">
            <Button variant="outlined" startIcon={<img src="/path_to_google_icon/google.svg" alt="Google Icon" className="h-5 w-5" />}>
              Hoặc đăng nhập bằng Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
