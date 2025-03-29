import React, { useState, useEffect, useRef } from 'react'
import { Box, Container, Text, Code, Stack, IconButton, SystemStyleObject } from '@chakra-ui/react'
import { useColorMode } from '@/components/ui/color-mode'
import { FaSun, FaMoon, FaFilter } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '@/state/hooks'
import { setQuery, toggleMobileSearchActive } from '@/state/slices/postFilterSlice'
import { config } from '@/constants/config'
import SearchInput from '@/components/SearchInput'

const headerWrapperStyle: SystemStyleObject = {
  backgroundColor: 'white',
  borderBottomWidth: '1px',
  position: 'fixed',
  zIndex: '2000',
  width: '100%',
  height: '50px',
  alignContent: 'center',
  md: {
    height: '80px',
  },
  _dark: {
    backgroundColor: 'gray.950'
  }
}

const siteTitleStyle: SystemStyleObject = {
  width: 'fit-content',
  fontSize: '24px',
  textTransform: 'uppercase',
  fontWeight: 'black',
  lineHeight: '1',
  _hover: {
    cursor: 'pointer',
    _after: {
      transform: 'scaleX(1)'
    }
  },
  _after: {
    display: 'block',
    content: '""',
    borderBottom: '2px solid black',
    transform: 'scaleX(0)',
    transition: 'transform 125ms ease-in-out',
    transformOrigin: '0% 50%',
  },
  _dark: {
    _after: {
      borderBottomColor: 'white'
    }
  },
}

type Props = { enableSearch: boolean }
const Header: React.FC<Props> = ({ enableSearch }) => {
  const dispatch = useAppDispatch()
  const activeTab = useAppSelector((state) => state.tabIndex)
  const searchValue = useAppSelector((state) => state.postFilter.query)
  const { colorMode, toggleColorMode } = useColorMode()
  const [ inputValue, setInputValue ] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const inputLock = useRef(true)
  const searchLock = useRef(true)

  useEffect(() => {
    if (inputLock.current) {
      inputLock.current = false
      return
    }
    const delayId = setTimeout(() => dispatch(setQuery(inputValue)), 300);
    return () => clearTimeout(delayId);
  }, [inputValue])

  useEffect(() => {
    if (searchLock.current) {
      searchLock.current = false
      return
    }
    setInputValue(searchValue)
  }, [searchValue]);

  return (
    <Box css={headerWrapperStyle}>
      <Container maxW='6xl'>
        <Stack direction='row' justify='space-between' align='center'>
          <Stack gap='4px'>
            <Text css={siteTitleStyle} onClick={() => { location.href='/'}}>{config.siteTitle}</Text>
            <Code fontSize='14px' colorPalette='green' hideBelow='md'>{config.siteDescription}</Code>
          </Stack>
          {enableSearch && <SearchInput isMobile={false}/>}
          <Stack direction='row' align='center' gap='8px' md={{gap: '16px'}}>
            {activeTab == 0 && enableSearch && (<IconButton onClick={() => dispatch(toggleMobileSearchActive())} variant='ghost' hideFrom='md'><FaFilter /></IconButton>)}
            <IconButton onClick={toggleColorMode} variant='ghost'>{colorMode === 'light' ? <FaMoon /> : <FaSun />}</IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Header