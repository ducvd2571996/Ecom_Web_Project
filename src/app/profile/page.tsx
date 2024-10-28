import React, { useState } from 'react';
import { Container, Grid, Typography, Button, TextField } from '@mui/material';
import './Profile.css';

const ProfilePage: React.FC = () => {
  // State lưu trữ các thông tin người dùng
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Dominic Ovo");
  const [handle, setHandle] = useState("@dominic_ovo");
  const [gender, setGender] = useState("Nam");
  const [dob, setDob] = useState("12-12-2000");
  const [address, setAddress] = useState("TP. Hồ Chí Minh");
  const [email, setEmail] = useState("rex4dom@gmail.com");
  const [phone, setPhone] = useState("(307) 555-0133");
  const [password, setPassword] = useState("**********");

  const handleSave = () => {
    setIsEditing(false);
    // Gửi thông tin cập nhật đến backend API nếu cần
  };

  return (
    <div>
      {/* Banner */}
      <div
        className="profile-banner"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/landscape.jpg)`, // Đặt ảnh banner
          height: '200px',
          backgroundSize: 'cover',
          position: 'relative',
        }}
      >
        <div
          className="profile-avatar"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '5px solid white',
            position: 'absolute',
            bottom: '-60px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/avatar.jpg`} // Đặt ảnh avatar
            alt="User Avatar"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      {/* Profile Info */}
      <Container style={{ marginTop: '80px', textAlign: 'center' }}>
        {isEditing ? (
          <TextField 
            label="Tên người dùng" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            fullWidth 
          />
        ) : (
          <Typography variant="h5" className="user-name">{name}</Typography>
        )}
        
        <Typography variant="subtitle1" className="user-handle">{handle}</Typography>
        <Button 
          variant="contained" 
          color="primary" 
          className="edit-btn" 
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Container>

      {/* User Information */}
      <Container className="profile-info" style={{ marginTop: '20px' }}>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <TextField
              label="Giới tính"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Ngày sinh"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              fullWidth
              disabled={!isEditing}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProfilePage;
