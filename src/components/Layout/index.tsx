import React from 'react'
import { SystemStyleObject, Box } from '@chakra-ui/react'
import { useAppSelector } from '@/state/hooks'
import MobileSearchBox from '@/components/mobile/MobileSearchBox'
import Header from './Header'
import Body from './Body'
import Footer from './Footer'

const mainWrapperStyle: SystemStyleObject = {
  base: {
    backgroundColor: 'white',
    scrollBehavior: 'smooth',
  },
  _dark: {
    backgroundColor: 'gray.950'
  }
}

type Props = { children: React.ReactNode, enableSearch: boolean }
const Layout: React.FC<Props> = ({ children, enableSearch }) => {
  const activeTab = useAppSelector((state) => state.tabIndex)
  return (
    <Box css={mainWrapperStyle}>
      <Header enableSearch={enableSearch} />
      {enableSearch && activeTab == 0 && <MobileSearchBox />}
      <Body>{children}</Body>
      <Footer />
    </Box>
  )
}

export default Layout