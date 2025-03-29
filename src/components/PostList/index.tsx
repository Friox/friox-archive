import React, { useMemo } from 'react'
import { Container, Stack, Pagination, ButtonGroup, IconButton, Box, EmptyState, SystemStyleObject } from '@chakra-ui/react'
import { HiChevronLeft, HiChevronRight } from "react-icons/hi"
import { ImFilesEmpty } from "react-icons/im";
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { setPostPage } from '@/state/slices/postPageSlice'
import { calculatePaginatedPosts } from '@/utils/pagination'
import MobileIndicator from '@/components/mobile/MobileIndicator'
import PostListItem from './PostListItem'

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

type Props = { data: Queries.MainPageQuery['posts']['nodes'] }
const PostList: React.FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch()
  const page = useAppSelector((state) => state.postPage)
  const query = useAppSelector((state) => state.postFilter.query)
  const category = useAppSelector((state) => state.postFilter.category)

  const paginatedPosts = useMemo(() => calculatePaginatedPosts([...data], page, pageSize), [data, page])
  
  if (paginatedPosts.length == 0) {
    return (
      <EmptyState.Root size='md'>
        <EmptyState.Content>
          <EmptyState.Indicator><ImFilesEmpty /></EmptyState.Indicator>
          <EmptyState.Title>게시물 없음</EmptyState.Title>
          <EmptyState.Description>어디갔지?...</EmptyState.Description>
        </EmptyState.Content>
      </EmptyState.Root>
    )
  }

  return (
    <>
      {(query || category) && <MobileIndicator />}
      <Container maxW='3xl'>
        <Stack gap='0'>
          <Box>
            {paginatedPosts.map((post) => (
              <PostListItem key={post.id} data={post} />
            ))}
          </Box>
          <Box css={paginationWrapperStyle}>
            <Pagination.Root 
              count={data.length}
              pageSize={pageSize}
              page={page}
              onPageChange={(e) => {
                window.scrollTo(0, 0)
                dispatch(setPostPage(e.page))
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
        </Stack>
      </Container>
    </>
  )
}

export default PostList