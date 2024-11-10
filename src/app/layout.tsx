'use client';
import Header from '@/app/components/header/Header';
import Footer from '@/app/components/footer/Footer';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Poppins } from 'next/font/google'; // Import Poppins instead of Roboto
import theme from '../theme';
import { Provider } from 'react-redux';
import './globals.css';
import store from './store/store';
import { usePathname } from 'next/navigation';
import NavBar from './components/navBar';
import { Box } from '@mui/material';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'], // Include desired weights
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins', // Update variable name if necessary
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname(); // Lấy đường dẫn hiện tại của ứng dụng.
  // Kiểm tra xem có phải là trang đăng nhập hoặc đăng ký không.
  const isLoginPage = pathname === '/login' || pathname === '/register';
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              {/* Nếu không phải là trang đăng nhập hoặc đăng ký thì hiển thị Header và NavBar */}
              {!isLoginPage && (
                <Box>
                  <Header />
                  <NavBar />
                </Box>
              )}
              <main>{children}</main>
              {/* Nếu không phải là trang đăng nhập hoặc đăng ký thì hiển thị Footer */}
              {!isLoginPage && <Footer />}
            </Provider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
