import type { AppProps } from 'next/app';
import { NextUIProvider } from '@nextui-org/react';

import { darkThemes } from '../themes';

import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <NextUIProvider theme={darkThemes}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
