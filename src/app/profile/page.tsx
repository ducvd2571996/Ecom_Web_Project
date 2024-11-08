'use client';

import React from 'react';
import { Box, Avatar, Typography, Paper, Grid, Button } from '@mui/material';

const ProfilePage = () => {
  // Thông tin người dùng mẫu
  const user = {
    name: 'Dominic Ovo',
    username: '@dominic_ovo',
    gender: 'Nam',
    dob: '12-12-2000',
    address: 'TP.Hồ Chí Minh',
    email: 'rex4dom@gmail.com',
    phone: '(307) 555-0133',
    password: '********',
    avatar: 'https://saigoncomputer.vn/uploads/hinh-nen-may-tinh-cuc-dep(4).jpg', // Thay bằng đường dẫn ảnh đại diện của bạn
    coverImage: 'https://www.didongmy.com/vnt_upload/news/03_2024/hinh-nen-4k-la-gi-Didongmy.jpg', // Thay bằng đường dẫn ảnh nền của bạn
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', my: 4 }}>
      {/* Ảnh bìa */}
      <Box
        sx={{
          position: 'relative',
          height: 250,
          backgroundImage: `url(${user.coverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '8px 8px 0 0',
        }}
      >
        {/* Avatar */}
        <Avatar
          src={user.avatar}
          alt="Avatar"
          sx={{
            width: 120,
            height: 120,
            position: 'absolute',
            bottom: -60,
            left: '50%',
            transform: 'translateX(-50%)',
            border: '4px solid white',
          }}
        />
      </Box>

      {/* Thông tin cá nhân */}
      <Paper sx={{ p: 3, mt: 6 }}>
        {/* Name and Edit Button */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          flexDirection: 'column',
          
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user.username}
          </Typography>
        </Box>
        {/* Nút Edit ở góc phải */}
        <Box sx={{ position: 'absolute', top: 5, right: 16 }}>
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        </Box>
      </Box>

        {/* Grid chứa các thông tin */}
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Giới tính
            </Typography>
            <Typography variant="subtitle1">{user.gender}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Ngày sinh
            </Typography>
            <Typography variant="subtitle1">{user.dob}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Địa chỉ
            </Typography>
            <Typography variant="subtitle1">{user.address}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Email
            </Typography>
            <Typography variant="subtitle1">{user.email}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Số điện thoại
            </Typography>
            <Typography variant="subtitle1">{user.phone}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Mật khẩu
            </Typography>
            <Typography variant="subtitle1">{user.password}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
