import { ChakraProvider as ChakraUiProvider, extendTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { THEME_COLOR_SCHEME, THEME_CONFIG } from 'utils/config'
const gradient = {
  light: 'linear-gradient(45deg, #FFD700, #FF8C00, #FF4500)',
  dark: 'linear-gradient(45deg, #4B0082, #9400D3, #9932CC)',
}
const theme = extendTheme({
  ...THEME_CONFIG,
  styles: {
    global: (props: any) => ({
      body: {
        //
        bgGradient:
          props.colorMode === 'light' ? 'linear-gradient(45deg,  #2980b9, #6dd5fa, #ffffff)' : 'linear-gradient(45deg, #373b44, #4286f4, #000000)',
        color: props.colorMode === 'light' ? 'gray.800' : 'white',
      },
    }),
  },
})
interface Props {
  children: ReactNode
}

// const theme = extendTheme(withDefaultColorScheme({ colorScheme: THEME_COLOR_SCHEME }), {
//   ...THEME_CONFIG,
// })

export function ChakraProvider(props: Props) {
  return <ChakraUiProvider theme={theme}>{props.children}</ChakraUiProvider>
}
