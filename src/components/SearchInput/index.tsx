import React, { useEffect, useRef, useState } from 'react'
import { CloseButton, Input, InputGroup } from '@chakra-ui/react'
import { FaSearch } from 'react-icons/fa'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { setQuery } from '@/state/slices/postFilterSlice'

type Props = { isMobile: boolean }
const SearchInput: React.FC<Props> = ({ isMobile }) => {
  const dispatch = useAppDispatch()
  const searchValue = useAppSelector((state) => state.postFilter.query)
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

  const endElement = inputValue ? (
    <CloseButton 
      size='xs'
      onClick={() => {
        setInputValue('')
        inputRef.current?.blur()
      }}
      me="-2"
    />
  ) : undefined

  return (
    <InputGroup md={{ maxW: 'md' }} hideBelow={isMobile ? undefined : 'md'} startElement={<FaSearch />} endElement={endElement}>
      <Input fontSize='16px' ref={inputRef} placeholder="게시물 검색" background='bg.muted' borderColor='transparent' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
    </InputGroup>
  )
}

export default SearchInput