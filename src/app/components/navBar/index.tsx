/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Toolbar, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleItemClick = (ref: string) => {
    window.location.href = `/${ref}`;
  };

  const handleMenuOpen = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        display: 'flex',
        justifyContent: { xs: 'space-between', md: 'center' },
        gap: { xs: 0, md: 10 },
        paddingY: 0.2,
        backgroundColor: 'white',
      }}
    >
      {/* Desktop buttons */}
      <Button
        onClick={() => handleItemClick('')}
        color="inherit"
        sx={{
          display: { xs: 'none', md: 'inline-flex' },
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      >
        Trang Chủ
      </Button>
      <Button
        color="inherit"
        sx={{
          display: { xs: 'none', md: 'inline-flex' },
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
        onClick={() => handleItemClick('product-list')}
      >
        Túi Xách
      </Button>
      <Button
        color="inherit"
        sx={{
          display: { xs: 'none', md: 'inline-flex' },
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
        onClick={() => handleItemClick('product-list')}
      >
        Sneaker
      </Button>
      <Button
        color="inherit"
        sx={{
          display: { xs: 'none', md: 'inline-flex' },
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
        onClick={() => handleItemClick('product-list')}
      >
        Phụ Kiện
      </Button>
      <Button
        onClick={() => handleItemClick('contact')}
        color="inherit"
        sx={{
          display: { xs: 'none', md: 'inline-flex' },
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      >
        Liên Hệ
      </Button>

      {/* Mobile menu button */}
      <IconButton
        edge="end"
        color="inherit"
        aria-label="menu"
        onClick={handleMenuOpen}
        sx={{ display: { xs: 'flex', md: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      {/* Mobile menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            handleItemClick('');
            handleMenuClose();
          }}
        >
          Trang Chủ
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleItemClick('product-list');
            handleMenuClose();
          }}
        >
          Túi Xách
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleItemClick('product-list');
            handleMenuClose();
          }}
        >
          Sneaker
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleItemClick('product-list');
            handleMenuClose();
          }}
        >
          Phụ Kiện
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleItemClick('contact');
            handleMenuClose();
          }}
        >
          Liên Hệ
        </MenuItem>
      </Menu>
    </Toolbar>
  );
};

export default NavBar;
