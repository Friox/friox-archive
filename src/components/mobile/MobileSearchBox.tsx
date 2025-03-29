import React from 'react'
import { Box, Container, Stack, SystemStyleObject } from '@chakra-ui/react'
import { useAppSelector } from '@/state/hooks'
import SearchInput from '@/components/SearchInput'
import CategorySelector from '@/components/CategorySelector';

const headerWrapperStyle: SystemStyleObject = {
  backgroundColor: 'white',
  borderBottomWidth: '1px',
  position: 'fixed',
  top: 0,
  justifyContent: 'end',
  paddingTop: '66px',
  paddingBottom: '16px',
  zIndex: 1000,
  width: '100%',
  alignContent: 'center',
  _dark: {
    backgroundColor: 'gray.950'
  }
}

const MobileSearchBox: React.FC = () => {
  const isMobileSearchActive = useAppSelector((state) => state.postFilter.isMobileSearchActive)
  return (
    <Box css={headerWrapperStyle} hideFrom='md' visibility={isMobileSearchActive ? 'visible' : 'hidden'}>
      <Container maxW='6xl'>
        <Stack gap='16px'>
          <SearchInput isMobile={true}/>
          <CategorySelector isMobile={true}/>
        </Stack>
      </Container>
    </Box>
  )
}

export default MobileSearchBox