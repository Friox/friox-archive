import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const customConfig = defineConfig({
  globalCss: {
    "*": {
      // userSelect: 'none',
    },
    "*:not(span)": {
      fontFamily: 'IBM Plex Sans KR, Noto Sans KR',
    },
    "body": {
      overflowY: 'scroll'
    }
  },
  theme: {
    recipes: {
      text: {
        base: {
          fontFamily: 'IBM Plex Sans KR, Noto Sans KR'
        }
      },
      heading: {
        base: {
          fontFamily: 'IBM Plex Sans KR, Noto Sans KR'
        }
      }
    },
  }
})

export const system = createSystem(defaultConfig, customConfig)