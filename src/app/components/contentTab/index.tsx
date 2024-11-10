'use client'; // Add this to ensure client-side rendering

import { Tabs, Tab, Box, Typography, TextField, Button, Avatar, Stack } from '@mui/material';
import { useState } from 'react';

interface Comment {
  id: number;
  user: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
}

const ProductContentTabs = ({ description }: { description: string }) => {
  const [value, setValue] = useState(0);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: 'Kim Hoa',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
      content: 'Chất lượng tuyệt vời.',
      timestamp: '23:14 | 06/03/2024',
    },
    {
      id: 2,
      user: 'Gia Kiệt',
      avatarUrl: 'https://i.pravatar.cc/150?img=3',
      content: 'Màu sắc đẹp, phù hợp.',
      timestamp: '12:58 | 24/01/2024',
    },
    {
      id: 3,
      user: 'Huỳnh Thị Thu Vân',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      content: 'Đóng gói sản phẩm kỹ lưỡng.',
      timestamp: '14:16 | 10/01/2024',
    },
  ]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(event.target.value);
  };

  const handleCommentSubmit = () => {
    if (commentInput.trim() === '') return;

    const newComment: Comment = {
      id: comments.length + 1,
      user: 'Khách hàng', // Thay bằng tên người dùng thực tế nếu có
      avatarUrl: 'https://i.pravatar.cc/150?img=9', // Avatar mặc định
      content: commentInput,
      timestamp: new Date().toLocaleTimeString() + ' | ' + new Date().toLocaleDateString(),
    };

    setComments([...comments, newComment]);
    setCommentInput('');
  };

  return (
    <Box
      sx={{
        marginY: 6,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Tabs value={value} onChange={handleTabChange} aria-label="product tabs">
        <Tab label="Mô tả" />
        <Tab label="Chính sách" />
        <Tab label="Bình luận" />
      </Tabs>

      {value === 0 && (
        <Box sx={{ padding: 2 }}>
          <Typography>{description}</Typography>
        </Box>
      )}

      {value === 1 && (
        <Box sx={{ padding: 2 }}>
          <Typography>
            Đối với sản phẩm kinh doanh TRỪ nhóm Gia dụng không điện, Phụ kiện không điện & Sản phẩm đã sử dụng, khách hàng chọn 1 trong các phương thức tuỳ sản phẩm:
            <br />
            - Bảo hành có cam kết trong 12 tháng
            <br />
            - Hư gì đổi nấy ngay và luôn
            <br />
            - Hoàn tiền: áp dụng cho sản phẩm lỗi và không lỗi
            <br />
            - Bao xài 1 tháng đầu tiên nếu sản phẩm lỗi kỹ thuật thì áp dụng bảo hành, nếu khách hàng muốn hoàn tiền thì thu phí 10% giá trị hóa đơn.
          </Typography>
        </Box>
      )}

      {value === 2 && (
        <Box sx={{ padding: 2, width: '100%', maxWidth: 600 }}>
          <Typography variant="h6">Bình luận</Typography>

          {/* Ô nhập bình luận */}
          <TextField
            fullWidth
            label="Nhập bình luận của bạn"
            variant="outlined"
            value={commentInput}
            onChange={handleCommentChange}
            sx={{ marginY: 2 }}
          />

          {/* Nút gửi bình luận */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCommentSubmit}
          >
            Gửi bình luận
          </Button>

          {/* Danh sách bình luận */}
          <Box sx={{ marginTop: 4 }}>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <Box
                  key={comment.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: 3,
                  }}
                >
                  {/* Avatar */}
                  <Avatar
                    src={comment.avatarUrl}
                    alt={comment.user}
                    sx={{ width: 48, height: 48, marginRight: 2 }}
                  />

                  {/* Nội dung bình luận */}
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{comment.user}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {comment.timestamp}
                    </Typography>
                    <Typography variant="body2" sx={{ marginTop: 1 }}>
                      {comment.content}
                    </Typography>
                  </Box>
                </Box>
              ))
            ) : (
              <Typography>Chưa có bình luận nào.</Typography>
            )}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductContentTabs;
