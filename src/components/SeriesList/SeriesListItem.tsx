import React, { useCallback } from 'react'
import { SystemStyleObject, Text, Stack, Card, Heading, HStack, Badge } from '@chakra-ui/react'

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

const seriesTitleStyle: SystemStyleObject = {
  width: 'fit-content',
  fontWeight: 'medium',
  fontSize: 'xl',
  lineHeight: '1.3',
  marginTop: '18px',
  md: {
    fontSize: '2xl'
  }
}

const seriesDateStyle: SystemStyleObject = {
  fontSize: 'sm',
  color: 'fg.muted',
  marginTop: '6px',
  md: {
    fontSize: 'md'
  }
}

const seriesLinkStyle: SystemStyleObject = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'inline-block',
  color: 'fg.muted',
  fontSize: 'sm',
  md: {
    fontSize: 'md'
  }
}

type Props = { data: Queries.MainPageQuery['series']['group'][number] }
const SeriesListItem: React.FC<Props> = ({ data }) => {
  const postCount = data.totalCount
  const seriesTitle = data.fieldValue!
  const { createAt, title, slug } = data.nodes[0].frontmatter

  const handlePostClick = useCallback(() => {
    location.href = `/post/${slug}`
  }, [])

  return (
    <Card.Root onClick={handlePostClick} css={cardStyle} variant='elevated'>
      <Card.Body minWidth='0'>
        <Stack direction='row'>
          <Stack gap='0' minWidth='0'>
            <Text fontWeight='bold' fontSize='sm' padding='4px 6px' backgroundColor='bg.inverted' lineHeight='1' width='fit-content' color='fg.inverted'>Series</Text>
            <Heading css={seriesTitleStyle}>{seriesTitle}</Heading>
            <Text css={seriesDateStyle}>{postCount}개의 포스트, 최근 업데이트 : {createAt}</Text>
            <HStack marginTop='18px'>
              <Badge colorPalette='green'>RECENT</Badge>
              <Text css={seriesLinkStyle}>{title}</Text>
            </HStack>
          </Stack>
        </Stack>
      </Card.Body>
    </Card.Root>    
  )
}

export default SeriesListItem