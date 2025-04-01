import React from 'react'
import { Box, Text, SystemStyleObject } from '@chakra-ui/react'

const tocWrapperStyle: SystemStyleObject = {
  position: 'absolute',
  height: '100%',
  left: '100%',
  marginLeft: '48px'
}

const tocStyle: SystemStyleObject = {
  whiteSpace: 'nowrap',
  "& ul": {
    paddingInlineStart: 0,
    marginBlockStart: 0
  },
  "& li": {
    marginLeft: '24px',
  },
  "& a": {
    lineHeight: '1.8',
    color: 'fg.subtle',
    transition: 'color 0.1s linear',
    fontSize: 'sm'
  },
  "& a:hover": {
    color: 'fg'
  },
  "& a.visible": {
    color: 'fg'
  }
}

type Props = { toc: NonNullable<NonNullable<Queries.BlogPostPageQuery['post']>['tableOfContents']>}
const TOC: React.FC<Props> = ({ toc }) => {
  return (
    <Box css={tocWrapperStyle} hideBelow='xl'>
      <Box position='sticky' top='110px'>
        <Box>
          <Text marginLeft='24px'>목차</Text>
        </Box>
        <Box id='toc-wrapper' css={tocStyle} dangerouslySetInnerHTML={{__html: toc}} />
      </Box>
    </Box>
  )
}

export default TOC