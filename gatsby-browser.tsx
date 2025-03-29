import React from 'react'
import type { GatsbyBrowser } from 'gatsby'
import { ColorModeProvider } from '@/components/ui/color-mode'
import { ChakraProvider } from '@chakra-ui/react'
import { system } from '@/components/theme'
import store from '@/state/store'
import { Provider } from 'react-redux'

export const shouldUpdateScroll: GatsbyBrowser['shouldUpdateScroll'] = ({ routerProps }) => {
  if (routerProps?.location?.pathname.includes('/post/')) return false
  return true
}

export const wrapRootElement: GatsbyBrowser["wrapRootElement"] = ({ element }) => {
  return (
    <Provider store={store}>
      <ChakraProvider value={system}>
        <ColorModeProvider>{element}</ColorModeProvider>
      </ChakraProvider>
    </Provider>
  )
}