import { chakra, SystemStyleObject } from '@chakra-ui/react'
require(`katex/dist/katex.min.css`)
const style: SystemStyleObject = {
  base: {
    "&": {
      fontSize: 'sm',
      lineHeight: 1.9,
      wordBreak: 'keep-all',
      md: {
        fontSize: 'initial'
      }
    },
    "& h1, h2, h3": {
      fontWeight: '600',
      lineHeight: 1.4,
      marginBottom: '8px',
      width: 'fit-content',
      paddingBottom: '4px',
      borderBottom: '1px solid',
      borderColor: 'border.emphasized',
      scrollMarginTop: '110px',
      md: {
        lineHeight: 1.2
      }
    },
    "& h1": {
      fontSize: '2xl',
      marginTop: '50px',
      marginBottom: '25px',
      md: {
        fontSize: '3xl',
      }
    },
    "& h2": {
      fontSize: 'xl',
      marginTop: '40px',
      marginBottom: '20px',
      md: {
        fontSize: '2xl',
      }
    },
    "& h3": {
      fontSize: 'lg',
      marginTop: '30px',
      marginBottom: '15px',
      md: {
        fontSize: 'xl',
      }
    },
    "& ol, ul": {
      marginLeft: '32px',
    },
    "& ol": {
      listStyleType: 'decimal'
    },
    "& ul": {
      listStyleType: 'disc'
    },
    "& table": {
      borderWidth: 2,
      fontSize: 'sm',
      marginTop: '12px'
    },
    "& table, th, td": {
      border: '1px solid',
      borderColor: 'border.emphasized'
    },
    "& th": {
      backgroundColor: 'gray.muted',
      fontWeight: 'bold'
    },
    "& th, td": {
      padding: '6px 12px'
    },
    "& blockquote": {
      padding: '12px 18px',
      border: '1px solid',
      borderLeft: '5px solid',
      borderColor: 'gray.muted',
      borderRadius: 'l2',
      marginY: '12px',
      md: {
        padding: '18px 24px',
      }
    },
    "& code:not([class])": {
      colorPalette: 'red',
      color: 'colorPalette.fg',
      background: 'colorPalette.subtle',
      marginX: '0.5',
      paddingX: '1',
      paddingY: '0.5',
      borderRadius: 'l2',
      fontFamily: 'mono',
      boxShadow: 'inset 0 0 0px 1px var(--shadow-color)',
      boxShadowColor: 'colorPalette.muted'
    },
    "& code[class*='language-'], pre[class*='language-']": {
      color: '#ccc',
      background: 'none',
      fontFamily: 'mono',
      fontSize: 'xs',
      textAlign: 'left',
      whiteSpace: 'pre',
      wordSpacing: 'normal',
      wordBreak: 'normal',
      wordWrap: 'normal',
      lineHeight: 1.6,
      borderRadius: 'l3',
      md: {
        fontSize: 'sm'
      }
    },
    "& pre[class*='language-']": {
      padding: '1em',
      margin: '.5em 0',
      overflow: 'auto'
    },
    "& :not(pre) > code[class*='language-'], pre[class*='language-']": {
      background: '#2d2d2d',
    },
    "& :not(pre) > code[class*='language-']": {
      padding: '.1em',
      borderRadius: '.3em',
      whiteSpace: 'normal'
    },
    "& .token.comment, .token.block-comment, .token.prolog, .token.doctype, .token.cdata": {
      color: '#999'
    },
    "& .token.punctuation": {
      color: '#ccc'
    },
    "& .token.tag, .token.attr-name, .token.namespace, .token.deleted": {
      color: '#e2777a'
    },
    "& .token.function-name": {
      color: '#f08d49'
    },
    "& .token.boolean, .token.number, .token.function": {
      color: '#f08d49'
    },
    "& .token.property, .token.class-name, .token.constant, .token.symbol": {
      color: '#f8c555'
    },
    "& .token.selector, .token.important, .token.atrule, .token.keyword, .token.builtin": {
      color: '#cc99cd'
    },
    "& .token.string, .token.char, .token.attr-value, .token.regex, .token.variable": {
      color: '#7ec699'
    },
    "& .token.operator, .token.entity, .token.url": {
      color: '#67cdcc'
    },
    "& .token.important, .token.bold": {
      fontWeight: 'bold'
    },
    "& .token.italic": {
      fontStyle: 'italic',
    },
    "& .token.entity": {
      cursor: 'help'
    },
    "& .token.inserted": {
      color: 'green'
    },
    "& .gatsby-highlight-code-line": {
      backgroundColor: 'gray.600',
      display: 'block',
      marginX: '-1em',
      paddingLeft: '0.75em',
      paddingRight: '1em',
      borderLeft: '0.25em solid #f99'
    },
    "& .gatsby-highlight": {
      background: '#2d2d2d',
      borderRadius: 'l3',
      margin: '0.5em 0',
      padding: '1em',
      overflow: 'auto'
    },
    "& .gatsby-highlight pre[class*='language-']": {
      backgroundColor: 'transparent',
      margin: '0',
      padding: '0',
      overflow: 'initial',
      float: 'left',
      minWidth: '100%'
    },
    "& figure, p > span.gatsby-resp-image-wrapper, p > img": {
      marginY: '24px'
    },
    "& figure:not([class]) > img": {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    "& figcaption": {
      marginTop: '12px',
      textAlign: 'center',
      color: 'fg.muted',
      fontSize: 'xs',
      lineHeight: 1,
      md: {
        fontSize: 'sm'
      }
    },
    "& figcaption::before": {
      content: '"- "'
    },
    "& figcaption::after": {
      content: '" -"'
    },
    "& p > img": {
      marginX: 'auto',
    },
    "& a.anchor.before": {
      display: 'none'
    },
    "& hr": {
      marginBlock: '48px'
    }
  },
}

const MarkdownStyle = chakra('div', style)

export default MarkdownStyle