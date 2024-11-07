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
                mr: 2,
              }}
            >
              <Typography sx={{ color: 'white', fontSize: { xs: 18, md: 24 } }}>
                E
              </Typography>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              E-Comm
            </Typography>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry standard dummy text
            since the 1500s.
          </Typography>
        </Box>

        {/* Collapsible Sections for Mobile Only */}
        {['Follow Us', 'Contact Us'].map((section) => (
          <Box key={section}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              onClick={() => handleToggle(section)}
              sx={{ cursor: 'pointer', mb: 2 }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: { xs: '1rem', md: '1.25rem' },
                }}
              >
                {section}
              </Typography>
              {isMobile && (
                <IconButton size="small">
                  <ExpandMoreIcon
                    sx={{
                      transform: isOpen(section)
                        ? 'rotate(180deg)'
                        : 'rotate(0deg)',
                    }}
                  />
                </IconButton>
              )}
            </Box>

            {/* Collapse Content - Only collapse on mobile */}
            <Collapse
              in={isOpen(section) || !isMobile} // No collapse on large screens
              timeout="auto"
              unmountOnExit
            >
              {section === 'Follow Us' && (
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                  >
                    Since the 1500s, when an unknown printer took a galley of
                    type and scrambled.
                  </Typography>
                  <Link href="#" sx={{ color: '#58c9f3', mr: 2 }}>
                    Facebook
                  </Link>
                  <Link href="#" sx={{ color: '#58c9f3' }}>
                    Twitter
                  </Link>
                </Box>
              )}

              {section === 'Contact Us' && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.8rem', md: '0.875rem' } }}
                >
                  E-Comm, 4578 Marmora Road, Glasgow D04 89GR
                </Typography>
              )}
            </Collapse>
          </Box>
        ))}
      </Box>

      {/* Footer Bottom Section */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ fontSize: { xs: '0.7rem', md: '0.875rem' } }}
        >
          © 2018 Ecommerce theme by www.bisenbaev.com
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
