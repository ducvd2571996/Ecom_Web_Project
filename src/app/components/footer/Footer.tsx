import {
  Box,
  Typography,
  Link,
  Collapse,
  IconButton,
  useMediaQuery,
} from '@mui/material';
import { FC, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import HomeIcon from '@mui/icons-material/Home';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer: FC = () => {
  const [openSections, setOpenSections] = useState<string[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Detect if it's a mobile screen

  const handleToggle = (section: string) => {
    setOpenSections((prevState) =>
      prevState.includes(section)
        ? prevState.filter((s) => s !== section)
        : [...prevState, section]
    );
  };

  const isOpen = (section: string) => openSections.includes(section);

  return (
    <Box
      sx={{
        backgroundColor: '#c7e1ff',
        padding: { xs: '20px 10px', md: '40px 20px' },
      }}
    >
      <Box
        sx={{
          display: 'grid',
          justifyContent: 'center',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: '20px',
        }}
      >
        {/* Left Section */}
        <Box>
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              sx={{
                backgroundColor: '#58c9f3',
                borderRadius: '50%',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 3,
                marginLeft: '30px',
              }}
            >
              <Typography sx={{ color: 'white', fontSize: { xs: 18, md: 20 } }}>
                E
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.25rem', marginLeft: -8 },
              }}
            >
              E-Comm
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: {
                xs: '0.9rem',
                md: '0.9rem',
                paddingLeft: '30px',
                paddingRight: '30px',
                textAlign: 'justify',
              },
            }}
          >
            Ecomm - doanh nghiệp thời trang độc đáo, sáng tạo với giày dép, túi
            xách và phụ kiện, thành lập năm 2024.
            <p>
              Chúng tôi cung cấp sản phẩm thời trang độc đáo và sáng tạo, mang
              đến trải nghiệm mua sắm tuyệt vời cho khách hàng.
            </p>
          </Typography>
        </Box>

        {/* Center Section - Về chúng tôi */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', md: '1.25rem', paddingLeft: '20px' },
              mb: 2,
            }}
          >
            Về chúng tôi
          </Typography>
          <Link
            href="#"
            color="text.secondary"
            sx={{ display: 'block', mb: 1, paddingLeft: '20px' }}
          >
            Tài khoản
          </Link>
          <Link
            href="#"
            color="text.secondary"
            sx={{ display: 'block', mb: 1, paddingLeft: '20px' }}
          >
            Thông tin
          </Link>
          <Link
            href="#"
            color="text.secondary"
            sx={{ display: 'block', mb: 1, paddingLeft: '20px' }}
          >
            Chính sách bảo mật
          </Link>
          <Link
            href="#"
            color="text.secondary"
            sx={{ display: 'block', mb: 1, paddingLeft: '20px' }}
          >
            Điều khoản & Điều kiện
          </Link>
        </Box>

        {/* Right Section - Liên hệ với chúng tôi */}
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              fontSize: { xs: '1rem', md: '1.25rem', paddingLeft: '20px' },
              mb: 2,
            }}
          >
            Liên hệ với chúng tôi
          </Typography>

          <Box display="flex" alignItems="center" mb={0.5} paddingLeft="15px">
            <IconButton color="primary" sx={{ p: 0, mr: 1 }}>
              <HomeIcon />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.9rem', md: '0.9rem' } }}
            >
              279 Nguyen Tri Phuong, P5, Q10, TPHCM
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={0.5} paddingLeft="15px">
            <IconButton color="primary" sx={{ p: 0, mr: 1 }}>
              <PhoneIcon />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.9rem', md: '0.9rem' } }}
            >
              (+0) 908 023 032
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" mb={0.5} paddingLeft="15px">
            <IconButton color="primary" sx={{ p: 0, mr: 1 }}>
              <EmailIcon />
            </IconButton>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: '0.9rem', md: '0.9rem' } }}
            >
              ecomm.contact@gmail.com
            </Typography>
          </Box>

          <Box display="flex" gap={1} paddingLeft={4.5}>
            <IconButton href="#" color="primary">
              <FacebookIcon />
            </IconButton>
            <IconButton href="#" color="primary">
              <TwitterIcon />
            </IconButton>
            <IconButton href="#" color="primary">
              <InstagramIcon />
            </IconButton>
            <IconButton href="#" color="primary">
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Footer Bottom Section */}
      <Box
        sx={{
          display: 'block',
          width: '100%', // Đảm bảo footer chiếm toàn bộ chiều rộng
          textAlign: 'center', // Căn giữa văn bản
          marginTop: 5,
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.9rem', md: '0.9rem' }, textAlign: 'center' }}
        >
          © 2018 Ecommerce theme by www.bisenbaev.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
