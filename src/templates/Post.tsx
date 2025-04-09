import React from 'react'
import { graphql, HeadFC, PageProps } from 'gatsby'
import Layout from '@/components/Layout'
import { Container } from '@chakra-ui/react'
import PostLayout from '@/components/PostLayout'

const Post: React.FC<PageProps<Queries.BlogPostPageQuery>> = ({ data }) => {
  return (
    <Layout enableSearch={false}>
      <Container maxW='4xl'>
        <PostLayout post={data} />
      </Container>
    </Layout>
  )
}

export default Post

export const Head: HeadFC<Queries.BlogPostPageQuery> = ({ data, location }) => {
  if (!data.post) { return <></> }
  const siteUrl = data.site?.siteMetadata?.siteUrl
  const title = data.post.frontmatter.title
  const description = data.post.frontmatter.description
  return (
    <>
      <title>{title}</title>
      {description && <meta name='description' content={description} />}
      {siteUrl && <link rel='canonical' href={`${siteUrl}${location.pathname}`} />}
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {siteUrl && <meta property="og:url" content={`${siteUrl}${location.pathname}`} />}
      <meta property="og:type" content="article" />
    </>
  )
}

export const query = graphql`
  query BlogPostPage(
    $id: String!
    $series: String
  ) {
    post: markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200, truncate: true)
      html
      frontmatter {
        slug
        title
        description
        createAt(formatString: "YYYY. MM. DD.")
        updateAt(formatString: "YYYY. MM. DD. hh:mm")
        category
        tags
        series
      }
      tableOfContents
    }
    seriesList: allMarkdownRemark(
      sort: { frontmatter: { createAt: ASC } }
      filter: { frontmatter: { series: { eq: $series } } }
    ) {
      nodes {
        frontmatter {
          slug
          title
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`