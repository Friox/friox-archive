import React, { useEffect } from "react"
import { graphql, type HeadFC, type PageProps } from "gatsby"
import { Container } from "@chakra-ui/react"
import { useAppSelector, useAppDispatch } from '@/state/hooks'
import { setAllPosts, setQuery } from "@/state/slices/postFilterSlice"
import { config } from '@/constants/config'
import About from "@/components/About"
import Layout from '@/components/Layout'
import Profile from '@/components/Profile'
import CustomTab from '@/components/CustomTab'
import PostList from "@/components/PostList"
import SeriesList from "@/components/SeriesList"

const IndexPage: React.FC<PageProps<Queries.MainPageQuery>> = ({ data }) => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.tabIndex)
  const filteredPosts = useAppSelector((state) => state.postFilter.filteredPosts)
  const filterQuery = useAppSelector((state) => state.postFilter.query)

  const posts = data.posts.nodes
  const seriesList = data.series.group
  
  useEffect(() => {
    dispatch(setAllPosts(posts))
    dispatch(setQuery(filterQuery))
  }, [posts])
  
  return (
    <Layout enableSearch={true}>
      <Container maxW='3xl'><Profile /></Container>
      <CustomTab seriesCount={seriesList.length}/>
      {activeTab === 0 && <PostList data={filteredPosts}/>}
      {activeTab === 1 && <SeriesList data={seriesList}/>}
      {activeTab === 2 && <About post={data.about}/>}
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC<Queries.MainPageQuery> = ({ data }) => {
  const siteUrl = data.site?.siteMetadata?.siteUrl
  return (
    <>
      <title>{config.siteTitle}</title>
      <meta name="description" content={config.siteDescription} />
      {siteUrl && <link rel="canonical" href={siteUrl} />}
      <meta property="og:title" content={config.siteTitle} />
      <meta property="og:type" content="website" />
      <meta property="og:description" content={config.siteDescription} />
      {siteUrl && <meta property="og:url" content={siteUrl} />}
    </>
  )
}

export const pageQuery = graphql`
  query MainPage {
    posts: allMarkdownRemark(
      sort: {frontmatter: {createAt: DESC}}
      filter: {frontmatter: {slug: {ne: "about"}}}
    ) {
      nodes {
        id
        excerpt(pruneLength: 200, truncate: true)
        frontmatter {
          slug
          category
          createAt(formatString: "YYYY. MM. DD")
          title
          description
          tags
        }
      }
    }
    series: allMarkdownRemark(
      sort: {frontmatter: {createAt: DESC}}
    ) {
      group(field: {frontmatter: {series: SELECT}}, limit: 1) {
        totalCount
        fieldValue
        nodes {
          frontmatter {
            slug
            createAt(formatString: "YYYY. MM. DD")
            title
          }
        }
      }
    }
    about: markdownRemark (frontmatter: {slug: {eq: "about"}}) {
      html
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`