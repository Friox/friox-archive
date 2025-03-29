import React from 'react'
import { Badge, Link, Stack } from '@chakra-ui/react'

type Props = {
  tags: readonly string[] | null
  onTagClick: (tag: string) => void
}

const TagList: React.FC<Props> = ({ tags, onTagClick }) => {
  if (!tags) return null
  
  const handleTagClick = (tag: string) => (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    onTagClick(tag)
  }

  return (
    <Stack direction='row' marginTop='24px'>
      {tags.map(tag => (
        <Badge key={tag} onClick={handleTagClick(tag)} fontSize='0.8em'>
          <Link>#{tag}</Link>
        </Badge>
      ))}
    </Stack>
  )
}

export default TagList