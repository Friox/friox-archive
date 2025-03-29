import React, { useMemo, useState } from 'react'
import { Container, Box, Pagination, ButtonGroup, IconButton, EmptyState, SystemStyleObject } from '@chakra-ui/react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { ImFilesEmpty } from "react-icons/im";
import { calculatePaginatedPosts } from '@/utils/pagination'
import SeriesListItem from './SeriesListItem'

const pageSize = 5

const paginationWrapperStyle: SystemStyleObject = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '30px',
  marginBottom: 'calc(30px - 1rem)',
  md: {
    marginBottom: '0px'
  }
}

type Props = { data: Queries.MainPageQuery['series']['group'] }
const SeriesList: React.FC<Props> = ({ data }) => {
  const [ page, setPage ] = useState(1)
  
  const sorted = [...data].sort((a, b) => {
    const x = a.nodes[0].frontmatter.createAt
    const y = b.nodes[0].frontmatter.createAt
    if (x > y) return -1
    if (x < y) return 1
    return 0
  })

  const paginatedPosts = useMemo(() => calculatePaginatedPosts(sorted, page, pageSize), [sorted, page])

  if (paginatedPosts.length == 0) {
    return (
      <EmptyState.Root size='md'>
        <EmptyState.Content>
          <EmptyState.Indicator><ImFilesEmpty /></EmptyState.Indicator>
          <EmptyState.Title>시리즈 없음</EmptyState.Title>
          <EmptyState.Description>추가해볼까요?</EmptyState.Description>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <Container maxW='3xl'>
      <Box>
        {paginatedPosts.map(series => ( <SeriesListItem key={series.fieldValue} data={series}/> ))}
      </Box>
      <Box css={paginationWrapperStyle}>
        <Pagination.Root 
          count={data.length}
          pageSize={pageSize}
          page={page}
          onPageChange={(e) => {
            window.scrollTo(0, 0)
            setPage(e.page)
          }}
        >
          <ButtonGroup variant="ghost" size="sm">
            <Pagination.PrevTrigger asChild>
              <IconButton>
                <HiChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>
            <Pagination.Items
              render={(page) => (
                <IconButton variant={{ base: 'ghost', _selected: 'outline'}}>{page.value}</IconButton>
              )}
            />
            <Pagination.NextTrigger asChild>
              <IconButton>
                <HiChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      </Box>
    </Container>
  )
}

export default SeriesList