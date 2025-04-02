import type { GatsbyConfig } from "gatsby"
import { config as _config } from './src/constants/config'

const config: GatsbyConfig = {
  siteMetadata: {
    title: _config.siteTitle,
    siteUrl: _config.siteUrl
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    `gatsby-plugin-tsconfig-paths`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sitemap`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        policy: [{userAgent: '*', allow: '/'}]
      }
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Noto Sans KR\:300,400,500,700,900`,
          `IBM Plex Sans KR\:100,200,300,400,500,600,700`,
          `IBM Plex Mono\:400`
        ],
        display: 'swap'
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/contents/posts`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about`,
        path: `${__dirname}/contents/about`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        footnotes: true,
        gfm: true,
        plugins: [
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {}
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              strict: `ignore`
            }
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: "language-",
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: true,
              languageExtensions: [
                {
                  language: "superscript",
                  extend: "javascript",
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              prompt: {
                user: "root",
                host: "localhost",
                global: false,
              },
              escapeEntities: {},
            },
          }, 
          {
            resolve: `gatsby-remark-images`,
            options: {
              showCaptions: true,
            }
          },
          {
            resolve: `gatsby-remark-figure-caption`,
            options: {figureClassName: ''},
          }
        ],
      }
    }
  ],
}

export default config
