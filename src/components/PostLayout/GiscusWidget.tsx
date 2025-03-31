import React from 'react'
import { Box } from '@chakra-ui/react'
import { useColorMode } from '../ui/color-mode'
import Giscus from '@giscus/react'

const GiscusWidget = () => {
  const { colorMode } = useColorMode()
  return (
    <Box>
      <Giscus
        repo="Friox/friox-archive"
        repoId="R_kgDOORNENA"
        category="Comments"
        category-id="DIC_kwDOORNENM4ConHm"
        mapping="pathname"
        strict="0"
        reactions-enabled="1"
        emit-metadata="0"
        input-position="top"
        theme={colorMode}
        lang="ko"
        loading="eager"
      />
      <Box className='giscus'/>
    </Box>
  )
}

export default GiscusWidget