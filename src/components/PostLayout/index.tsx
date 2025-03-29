import React from 'react'
import { Separator, Box } from '@chakra-ui/react'
import { usePostScrollSpy } from '@/hooks/useScrollSpy'
import Profile from '@/components/Profile'
import MarkdownStyle from '@/components/MarkdownStyle'
import PostHeader from './PostHeader'
import SeriesIndexList from './SeriesIndexList'
import TOC from './TOC'
import GiscusWidget from './GiscusWidget'

type Props = { post: Queries.BlogPostPageQuery }
const PostLayout: React.FC<Props> = ({ post: data }) => {
  const { post, seriesList } = data
  if (!post) return(<></>)
  const { html, frontmatter, tableOfContents } = post
  usePostScrollSpy()
  return (
    <Box >
      <PostHeader frontmatter={frontmatter} />
      <Separator marginY='18px'/>
      {frontmatter.series && <SeriesIndexList fm={frontmatter} seriesList={seriesList}/>}
      <Box id='post-wrapper' position='relative'>
        {tableOfContents && (<TOC toc={tableOfContents}/>)}
        <MarkdownStyle dangerouslySetInnerHTML={{__html: html!}}></MarkdownStyle>
      </Box>
      <Separator marginY='36px'/>
      <Profile />
      <Separator marginY='36px'/>
      <GiscusWidget />
    </Box>
  )
}

export default PostLayout