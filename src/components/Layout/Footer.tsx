import React from 'react'
import { SystemStyleObject, Container, Stack, Text, Box, Link } from '@chakra-ui/react'
import { config } from '@/constants/config'

const footerWrapperStyle: SystemStyleObject = {
  borderTopWidth: '1px',
  height: '150px',
  justifyContent: 'center',
  alignContent: 'center'
}

const Footer: React.FC = () => {
  return (
    <Box css={footerWrapperStyle}>
      <Container maxW='6xl' direction='row'>
        <Stack justifyContent='space-between' direction='row'>
          <Stack>
            <Text fontSize='sm'>sitename, Powered by Gatsby and <Link variant='underline' href='https://github.com/Friox/gatsby-starter-friox'>gatsby-starter-friox</Link></Text>
            <Text fontSize='sm' color='fg.muted'>{config.footerCopyright}</Text>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Footer