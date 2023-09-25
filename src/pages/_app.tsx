import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { Web3Provider } from 'providers/Web3'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import '../assets/icons/fonts.css'
import { extendTheme, CSSReset, Box, useColorMode } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'
import { THEME_CONFIG, THEME_INITIAL_COLOR } from '../utils/config'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()

  return (
    <ChakraProvider>
      <Seo />
      <Web3Provider>
        <CSSReset />
        <ColorModeScript initialColorMode={THEME_INITIAL_COLOR} />
        {isMounted && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Web3Provider>
    </ChakraProvider>
  )
}
