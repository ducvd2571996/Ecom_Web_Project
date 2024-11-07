'use client'; // Mark the component as client-side

import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useRouter, usePathname } from 'next/navigation'; // Use next/navigation
import { capitalize } from '@mui/material/utils';

const DynamicBreadcrumbs = () => {
  const router = useRouter(); // Next.js router for navigation
  const pathname = usePathname(); // Get the current pathname

  // Split pathname into individual segments
  const pathnames = pathname.split('/').filter((x) => x);
  console.log('pa', pathnames);

  return (
    <Box
      sx={{
        marginBottom: 10,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
        sx={{
          alignItems: 'center',
          display: 'flex',
          height: 51,
          justifyContent: 'center',
          backgroundColor: '#F6F7F8',
        }}
      >
        {/* Home link */}
        <Link
          underline="hover"
          color="#33A0FF"
          onClick={() => router.push('/')}
          sx={{ cursor: 'pointer' }}
        >
          Home
        </Link>

        {/* Dynamically generated breadcrumb links */}
        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return isLast ? (
            // If it's the last breadcrumb, display as plain text
            <Typography color="#262626" key={to}>
              {capitalize(decodeURIComponent(value))}
            </Typography>
          ) : (
            // If it's not the last, make it a clickable link
            <Link
              underline="hover"
              color="#33A0FF"
              onClick={() => router.push(to)}
              key={to}
              sx={{ cursor: 'pointer' }}
            >
              {capitalize(decodeURIComponent(value))}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default DynamicBreadcrumbs;
