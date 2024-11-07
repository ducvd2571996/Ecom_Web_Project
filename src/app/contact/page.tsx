/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import ContactBanner from '../public/asset/images/contact_banner.png'; // ảnh
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
  const [isContactSuccess, setContactSuccess] = useState(false);

  const handleNameChange = (event: any) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value);
  };

  const handleContactSubmit = () => {
    if (name && email && message) {
      setContactSuccess(true);
      setError(false); // Clear error if form is valid
    } else {
      setError(true);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Container cho cả Banner và Form */}
      <Box
        sx={{
          display: 'flex',
          width: '90%',
          maxWidth: '1200px',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden',
          flexDirection: { xs: 'column', md: 'row' },
          height: { xs: 'auto', md: '85vh' }, // Tăng chiều cao của khung bao quanh
        }}
      >
        {/* Left Banner */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: '100%', md: '70%' },
            height: '100%',
          }}
        >
          <Image
            src={ContactBanner}
            alt="Contact Support"
            layout="fill"
            objectFit="contain"  // Đảm bảo ảnh hiển thị đầy đủ mà không bị cắt
            quality={100}
          />
        </Box>

        {/* Right Contact Form */}
        <Box
          sx={{
            width: { xs: '100%', md: '30%' },
            p: 4,
            textAlign: 'center',
            backgroundColor: 'white',
          }}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            E-Comm
          </Typography>
          <Typography variant="h5" mb={3}>
            Liên Hệ
          </Typography>

          <TextField
            fullWidth
            label="Họ và Tên"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={handleNameChange}
            error={error && name === ''}
            helperText={error && name === '' ? 'Vui lòng nhập họ và tên' : ''}
          />

          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            error={error && email === ''}
            helperText={error && email === '' ? 'Vui lòng nhập email hợp lệ' : ''}
          />

          <TextField
            fullWidth
            label="Nội Dung"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            value={message}
            onChange={handleMessageChange}
            error={error && message === ''}
            helperText={error && message === '' ? 'Vui lòng nhập nội dung' : ''}
          />

          <Button
            onClick={handleContactSubmit}
            variant="contained"
            color="primary"
            size="large"
            sx={{
              mb: 2,
              marginTop: 2,
              width: 'auto', // Điều chỉnh chiều ngang của nút
              paddingX: 3, // Giảm độ rộng của nút
            }}
          >
            Gửi
          </Button>

          {/* Có thể thêm phần này nếu cần */}
          <Divider>Hoặc</Divider>

          <Typography variant="body2" mt={2}>
            Cần hỗ trợ thêm?{' '}
            <Typography
              component="a"
              color="primary"
              href="mailto:support@ecomm.com"
              fontWeight="bold"
            >
              Email chúng tôi
            </Typography>
          </Typography>

          {isContactSuccess && (
            <Typography variant="body2" color="green" mt={2}>
              Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
