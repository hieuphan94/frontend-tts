import { Toast } from '@/components/common/Toast';
import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import Providers from './providers';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'IMA Workspace',
  description: 'Tour Management System',
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
};


export default function RootLayout({ children }) {

  return (
    <html lang="vi" className="light" suppressHydrationWarning>
      <body className={`${inter.className} relative min-h-screen`} suppressHydrationWarning>
        <Providers>
          <ToastContainer />
          <Toast />
          {children}
        </Providers>
      </body>
    </html>
  );
}
