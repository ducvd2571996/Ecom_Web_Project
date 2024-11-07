import { useState } from 'react';
import {
  Typography,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
} from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Login form submitted:', { email, password, rememberMe });
    // Xử lý đăng nhập, có thể gọi API hoặc điều hướng
  };

  return (
    <div className="flex items-center justify-between h-screen bg-gray-100">
      {/* Phần bên trái: Banner */}
      <div className="w-3/5 h-full bg-blue-500 relative">
        <img
          src="Ảnh" // Ảnh
          alt="Fashion Sale"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Phần bên phải: Form đăng nhập */}
      <div className="w-2/5 bg-white p-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <Typography variant="h5" component="h1" align="center" gutterBottom>
            Đăng nhập
          </Typography>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Phone input */}
            <TextField
              label="Email or phone number"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* Password input */}
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Remember me checkbox */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                />
              }
              label="Remember me"
            />

            {/* Nút đăng nhập */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Sign in
            </Button>
          </form>

          {/* Đăng nhập với Google */}
          <div className="mt-4 flex items-center justify-center">
            <Button
              variant="outlined"
              startIcon={
                <img
                  src="/path_to_google_icon/google.svg"
                  alt="Google Icon"
                  className="h-5 w-5"
                />
              }
              fullWidth
            >
              Or sign in with Google
            </Button>
          </div>

          {/* Đăng ký */}
          <div className="text-center mt-4">
            <Typography variant="body2">
              Don't have an account?{' '}
              <a href="#" style={{ color: '#1976d2' }}>
                Sign up now
              </a>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
