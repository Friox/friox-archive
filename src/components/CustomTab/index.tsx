import React from 'react'
import { SystemStyleObject, Container, Button, Text, Stack } from '@chakra-ui/react'
import { useAppSelector, useAppDispatch } from '@/state/hooks'
import { setTabIndex } from '@/state/slices/tabIndexSlice'
import CategorySelector from '@/components/CategorySelector'

const tabContainerStyle: SystemStyleObject = {
  base: { justifyContent: 'center' },
  md: { justifyContent: 'space-between' },
}

const tabButtonStyle: SystemStyleObject = {
  borderRadius: 'full',
  gap: '8px',
  _hover: {
    borderColor: 'colorPalette.focusRing'
  }
}

const tabTitleStyle: SystemStyleObject = {
  textTransform: 'uppercase',
  lineHeight: 1
}

type Props = { seriesCount: number }
const CustomTab: React.FC<Props> = ({ seriesCount }) => {
  const dispatch = useAppDispatch()
  const active = useAppSelector((state) => state.tabIndex)
  const postCnt = useAppSelector((state) => state.postFilter.filteredPosts.length)
  return (
    <Container maxW='3xl' borderBottomWidth='1px' marginTop='30px' paddingBottom='4' md={{ marginTop: '12px', padding: '24px' }}>
      <Stack css={tabContainerStyle} flexDirection='row'>
        <Stack direction='row' justifyContent='center' gap='18px' width='fit-content'>
          <Button css={tabButtonStyle} variant={ active == 0 ? 'solid' : 'outline' } onClick={() => dispatch(setTabIndex(0))}>
            <Text css={tabTitleStyle}>게시물</Text>
            <Text>({postCnt})</Text>
          </Button>
          <Button css={tabButtonStyle} variant={ active == 1 ? 'solid' : 'outline' } onClick={() => dispatch(setTabIndex(1))}>
            <Text css={tabTitleStyle}>시리즈</Text>
            <Text>({seriesCount})</Text>
          </Button>
          <Button css={tabButtonStyle} variant={ active == 2 ? 'solid' : 'outline' } onClick={() => dispatch(setTabIndex(2))}>
            <Text css={tabTitleStyle}>ABOUT</Text>
          </Button>
        </Stack>
        <CategorySelector isMobile={false}/>
      </Stack>
    </Container>
  )
}

export default CustomTab