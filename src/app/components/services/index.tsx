import AttachMoneyIcon from '@mui/icons-material/AttachMoney'; // Refund icon
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Free shipping icon
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Support icon
import { Box, Typography } from '@mui/material';

export default function Services() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingX: { xs: 2, sm: 4, md: 10, lg: 15, xl: 30 },
        marginTop: 15,
      }}
    >
      <Box
        sx={{
          width: 190,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LocalShippingIcon sx={{ fontSize: 60, color: '#ff6b6b' }} />
        <Typography variant="h6" gutterBottom>
          MIỄN SHIP
        </Typography>
        <Typography textAlign={'center'} variant="body1" color="textSecondary">
          Miễn ship toàn quốc với đơn có giá trị trên 1 triệu đồng
        </Typography>
      </Box>

      <Box
        sx={{
          width: 190,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <AttachMoneyIcon sx={{ fontSize: 60, color: '#ff6b6b' }} />
        <Typography variant="h6" gutterBottom>
          HOÀN TIỀN 100%
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Bạn sẽ không lo việc hàng lỗi khi hỗ trợ hoàn tiền lên đến 100%
        </Typography>
      </Box>

      {/* Support 24/7 */}
      <Box
        sx={{
          width: 190,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SupportAgentIcon sx={{ fontSize: 60, color: '#ff6b6b' }} />
        <Typography variant="h6" gutterBottom>
          HỖ TRỢ 24/7
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Đội ngũ nhân viên hoạt động 24h hỗ trợ tận tình
        </Typography>
      </Box>
    </Box>
  );
}
