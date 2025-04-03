import React, { useEffect, useMemo, useState } from 'react'
import { Text, Stack, Icon, SystemStyleObject, HStack, IconButton, Show } from '@chakra-ui/react'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { calculatePaginatedPosts } from '@/utils/pagination'
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const wrapperStyle: SystemStyleObject = {
  border: '1px solid',
  borderColor: 'border',
  padding: '12px',
  fontSize: 'sm',
  lineHeight: 1,
  md: {
    fontSize: 'md'
  }
}

const seriesTitleStyle: SystemStyleObject = {
  fontWeight: 'bold',
  backgroundColor: 'bg.inverted',
  color: 'fg.inverted',
  width: 'fit-content',
  padding: '4px 6px'
}

const seriesLinkStyle: SystemStyleObject = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: 'inline-block',
  cursor: 'pointer',
  transition: 'color 0.1s linear',
  _hover: {
    color: 'fg'
  }
}

type Props = {
  fm: NonNullable<Queries.BlogPostPageQuery['post']>['frontmatter']
  seriesList: Queries.BlogPostPageQuery['seriesList']
}

const SeriesIndexList: React.FC<Props> = ({ fm, seriesList }) => {

  const pageSize = 5
  const allPage = Math.ceil(seriesList.nodes.length / pageSize)
  const [ page, setPage ] = useState(1)

  const paginatedPosts = useMemo(() => calculatePaginatedPosts([...seriesList.nodes], page, pageSize), [seriesList, page])

  useEffect(() => {
    for (let i = 0; i < seriesList.nodes.length; i++) {
      if (fm.slug == seriesList.nodes[i].frontmatter.slug) {
        setPage(Math.floor(i / pageSize) + 1)
        break
      }
    }
  }, [])

  return (
    <Stack css={wrapperStyle} gap='3'>
      <Text css={seriesTitleStyle}>Series: {fm.series}</Text>
      {paginatedPosts.map(series => (
        <Stack key={series.frontmatter.slug} direction='row' alignItems='center'>
          <Icon as={FaAngleDoubleRight} color={fm.title == series.frontmatter.title ? 'teal.solid' : 'bg.emphasized'} />
          <Text
            css={seriesLinkStyle}
            color={fm.title == series.frontmatter.title ? 'fg' : 'fg.subtle'}
            onClick={fm.title != series.frontmatter.title ? () => location.href = `/post/${series.frontmatter.slug}` : () => {}}
          >{series.frontmatter.title}</Text>
        </Stack>
      ))}
      <Show when={ allPage > 1 }>
        <HStack justifyContent='end'>
          <Text color='fg.muted' fontSize='xs' md={{ fontSize: 'sm' }}>{page} / {allPage}</Text>
          <IconButton size='xs' rounded='full' variant='outline' onClick={() => setPage(page - 1 < 1 ? 1 : page - 1)}>
            <FaArrowLeft />
          </IconButton>
          <IconButton size='xs' rounded='full' variant='outline' onClick={() => setPage(page + 1 > allPage ? allPage : page + 1)}>
            <FaArrowRight />
          </IconButton>
        </HStack>
      </Show>
    </Stack>
  )
}

export default SeriesIndexList