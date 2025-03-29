import React from 'react'
import type { GatsbySSR } from 'gatsby'
import { ColorModeProvider } from '@/components/ui/color-mode'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@/components/theme'
import store from '@/state/store'
import { Provider } from 'react-redux'

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return (
    <Provider store={store}>
      <ChakraProvider value={system}>
        <ColorModeProvider>{element}</ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}