import React from 'react'
import { Box, Heading, SystemStyleObject, Text, Stack } from '@chakra-ui/react'

const postTitleStyle: SystemStyleObject = {
  fontSize: '3xl',
  wordBreak: 'keep-all',
  marginTop: '18px',
  lineHeight: 'short',
  md: {
    fontSize: '4xl',
    lineHeight: 'shorter'
  }
}

const postDateStyle: SystemStyleObject = {
  fontSize: 'sm',
  marginTop: '18px',
  color: 'fg.muted',
  md: {
    fontSize: 'md'
  }
}

type Props = { frontmatter: NonNullable<Queries.BlogPostPageQuery['post']>['frontmatter'] }
const PostHeader: React.FC<Props> = ({ frontmatter: fm }) => {
  return (
    <Box>
      <Text fontWeight='bold' color='teal.solid'>{fm.category}</Text>
      <Heading css={postTitleStyle}>{fm.title}</Heading>
      <Stack css={postDateStyle} direction='row'>
        <Text>{fm.createAt}</Text>
        {fm.updateAt && (<Text>(편집됨: {fm.updateAt})</Text>)}
      </Stack>
    </Box>
  )
}

export default PostHeader