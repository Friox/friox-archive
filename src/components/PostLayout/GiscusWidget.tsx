import React from 'react'
import { Box } from '@chakra-ui/react'
import { useColorMode } from '../ui/color-mode'
import Giscus from '@giscus/react'

const GiscusWidget = () => {
  const { colorMode } = useColorMode()
  return (
    <Box>
      <Giscus
        repo="Friox/friox-archive-comments"
        repoId="R_kgDOOQG5Xg"
        category="Announcements"
        category-id="DIC_kwDOOQG5Xs4Coiil"
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