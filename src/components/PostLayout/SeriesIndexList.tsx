import React from 'react'
import { Text, Stack, Icon, SystemStyleObject } from '@chakra-ui/react'
import { FaAngleDoubleRight } from 'react-icons/fa'

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
  return (
    <Stack css={wrapperStyle} gap='3'>
      <Text css={seriesTitleStyle}>Series: {fm.series}</Text>
      {seriesList.nodes.map(series => (
        <Stack key={series.frontmatter.slug} direction='row' alignItems='center'>
          <Icon as={FaAngleDoubleRight} color={fm.title == series.frontmatter.title ? 'teal.solid' : 'bg.emphasized'} />
          <Text
            css={seriesLinkStyle}
            color={fm.title == series.frontmatter.title ? 'fg' : 'fg.subtle'}
            onClick={fm.title != series.frontmatter.title ? () => location.href = `/post/${series.frontmatter.slug}` : () => {}}
          >{series.frontmatter.title}</Text>
        </Stack>
      ))}
    </Stack>
  )
}

export default SeriesIndexList