import React, { useCallback } from 'react'
import { SystemStyleObject, Text, Stack, Card, Heading } from '@chakra-ui/react'
import { useAppDispatch } from '@/state/hooks'
import { setQuery } from '@/state/slices/postFilterSlice'
import TagList from '@/components/PostList/PostListItem/TagList'

const cardStyle: SystemStyleObject = {
  base: {
    marginTop: '4',
    flexDirection: 'row',
    transition: 'background-color 0.1s linear'
  },
  md: {
    marginTop: '30px',
  },
  _hover: {
    cursor: 'pointer',
    backgroundColor: 'bg.muted'
  }
}

const postTitleStyle: SystemStyleObject = {
  width: 'fit-content',
  fontWeight: 'medium',
  fontSize: 'xl',
  lineHeight: '1.4',
  marginTop: '18px',
  md: {
    fontSize: '2xl',
    lineHeight: '1.3',
  }
}

const postDateStyle: SystemStyleObject = {
  fontSize: 'sm',
  color: 'fg.muted',
  marginTop: '6px',
  md: {
    fontSize: 'md'
  }
}

const postSummaryStyle: SystemStyleObject = {
  marginTop: '18px',
  color: 'fg.muted',
  fontSize: 'sm',
  lineHeight: 1.6,
  md: {
    fontSize: 'md'
  }
}

type Props = { data: Queries.MainPageQuery['posts']['nodes'][number] }
const PostListItem: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch()
  const fm = data.frontmatter
  
  const handlePostClick = useCallback(() => {
    location.href = `/post/${fm.slug}`
  }, [fm.slug])

  const handleTagClick = useCallback((tag: string) => {
    dispatch(setQuery(`#${tag}`))
  }, [])

  return (
    <Card.Root onClick={handlePostClick} css={cardStyle} variant='elevated'>
      <Card.Body>
        <Stack direction='row'>
          <Stack gap='0'>
            <Text fontWeight='500' fontSize='sm' color='teal.solid'>{fm.category ?? '미분류'}</Text>
            <Heading css={postTitleStyle}>{fm.title}</Heading>
            <Text css={postDateStyle}>{fm.createAt}</Text>
            <Text lineClamp='3' css={postSummaryStyle} overflowWrap='break-word'>{fm.description ? fm.description : data.excerpt}</Text>
            <TagList tags={fm.tags} onTagClick={handleTagClick}/>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>
  )
}

export default PostListItem