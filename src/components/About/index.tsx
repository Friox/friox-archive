import React from 'react'
import { Container } from '@chakra-ui/react'
import MarkdownStyle from '@/components/MarkdownStyle'
import AboutCustom from './AboutCustom'

type Props = { post: Queries.MainPageQuery['about'] }
const About: React.FC<Props> = ({ post }) => {
  const html = post?.html
  if (html) {
    return (
      <Container maxW='3xl'>
        <MarkdownStyle dangerouslySetInnerHTML={{ __html: html }} />
      </Container>
    )
  } else {
    return (<AboutCustom />)
  }
}

export default About