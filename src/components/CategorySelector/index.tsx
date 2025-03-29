import React from 'react'
import { Box, Select, Portal, createListCollection } from '@chakra-ui/react'
import { ValueChangeDetails } from '@chakra-ui/react/dist/types/components/select/namespace'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import { setCategory } from '@/state/slices/postFilterSlice'

type Props = { isMobile: boolean }
const CategorySelector: React.FC<Props> = ({ isMobile }) => {
  const dispatch = useAppDispatch()
  const active = useAppSelector((state) => state.tabIndex)
  const { category, allCategory } = useAppSelector((state) => state.postFilter)
  const categoryCollection = createListCollection({
    items: allCategory.map((category, idx) => ({ label: category, value: category }))
  })
  type DetailsType<T> = ValueChangeDetails<T> & { value: string[] } // ValueChangeDetails 타입 보충
  const categoryHandler = <T extends {}>(details: DetailsType<T>) => {
    if (details.value.length) dispatch(setCategory(details.value[0]))
    else dispatch(setCategory(''))
  }
  return (
    <Box md={{ width: '250px' }} hideBelow={isMobile ? undefined : 'md'} css={{ display: active == 0 ? 'block' : 'none' }}>
      <Select.Root value={category === '' ? [] : [category]} collection={categoryCollection} onValueChange={categoryHandler}>
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="카테고리"/>
          </Select.Trigger>
          <Select.IndicatorGroup>
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {categoryCollection.items.map((category) => (
                <Select.Item item={category} key={category.value}>
                  {category.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Box>
  )
}

export default CategorySelector