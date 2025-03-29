import React from 'react'
import { Badge, Box, Container, Text } from '@chakra-ui/react'
import { useAppDispatch } from '@/state/hooks'
import { clearFilter } from '@/state/slices/postFilterSlice'

const MobileIndicator = () => {
  const dispatch = useAppDispatch()
  return (
    <Box borderBottomWidth='1px' hideFrom='md'>
      <Container maxW='3xl' paddingY='4px'>
        <Text fontSize='sm' fontWeight='bold' color='fg.subtle'>
          필터가 적용되어 있습니다
          <Badge colorPalette='purple' marginLeft='6px' onClick={() => dispatch(clearFilter())}>초기화</Badge>
        </Text>
      </Container>
    </Box>
  )
}

export default MobileIndicator