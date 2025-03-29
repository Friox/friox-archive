import React from 'react'
import { SystemStyleObject, Box } from '@chakra-ui/react'

const bodyWrapperStyle: SystemStyleObject = {
  base: {
    paddingTop: '80px',
    paddingBottom: '4',
    minHeight: 'calc(100vh - 150px)',
  },
  md: {
    paddingTop: '110px',
    paddingBottom: '30px',
  }
}

type Props = { children: React.ReactNode }
const Body: React.FC<Props> = ({ children }) => {
  return (
    <Box css={bodyWrapperStyle}>
      {children}
    </Box>
  )
}

export default Body