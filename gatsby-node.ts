import path from 'path'
import { type GatsbyNode, PageProps } from 'gatsby'

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/Post.tsx`)
  // Query for markdown nodes to use in creating pages.
  // You can query for whatever data you want to create pages for e.g.
  // products, portfolio items, landing pages, etc.
  // Variables can be added as the second function parameter

  const result = await graphql(`
    query CreatePage {
      allMarkdownRemark (sort: { frontmatter: { createAt: DESC } }) {
        nodes {
          id
          frontmatter {
            slug
            series
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`blog posts error`, result.errors)
    return
  }

  const resultData = (result as PageProps<Queries.CreatePageQuery>).data
  const posts = resultData.allMarkdownRemark.nodes
  posts.forEach((post, idx) => {
    createPage({
      path: `/post/${post.frontmatter.slug!}`,
      component: blogPostTemplate,
      context: {
        id: post.id,
        series: post.frontmatter.series,
      }
    })
  })
}

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }
    type Frontmatter {
      slug: String!
      title: String!
      description: String
      createAt: Date! @dateformat
      updateAt: Date @dateformat
      category: String
      tags: [String!]
      series: String
    }
  `)
}