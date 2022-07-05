// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from "@chakra-ui/react";

function MyApp({ Component, pageProps }) {

  const theme = extendTheme({
    styles: {
      global: (props) => ({
        body: {
          bg: 'black',
        }
      })
    },
  })

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp