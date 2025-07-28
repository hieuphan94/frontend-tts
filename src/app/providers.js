'use client';

import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { useEffect, useState } from 'react';
import { Toast } from '@/components/common/Toast';


export default function Providers({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
            <NextUIProvider>
              {children}
              <Toast />
            </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}
