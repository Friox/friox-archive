import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type PostNode = Queries.MainPageQuery['posts']['nodes']

interface PostFilterState {
  isMobileSearchActive: boolean
  query: string
  category: string
  filteredPosts: PostNode
  allPosts: PostNode
  allCategory: string[]
}

const initialState: PostFilterState = {
  isMobileSearchActive: false,
  query: '',
  category: '',
  filteredPosts: [],
  allPosts: [],
  allCategory: []
}

export const postFilterSlice = createSlice({
  name: 'postFilter',
  initialState,
  reducers: {
    setMobileSearchActive: (state, action: PayloadAction<boolean>) => { state.isMobileSearchActive = action.payload },
    toggleMobileSearchActive: (state) => { state.isMobileSearchActive = !state.isMobileSearchActive },
    setQuery: (state, action: PayloadAction<string>) => { state.query = action.payload },
    clearQuery: (state) => { state.query = '' },
    setCategory: (state, action: PayloadAction<string>) => { state.category = action.payload },
    clearCategory: (state) => { state.category = '' },
    setFilteredPosts: (state, action) => { state.filteredPosts = action.payload },
    setAllPosts: (state, action) => { state.allPosts = action.payload },
    setAllCategory: (state, action) => { state.allCategory = action.payload },
    clearFilter: (state) => { state.query = ''; state.category = ''}
  }
})

export const {
  setMobileSearchActive,
  toggleMobileSearchActive,
  setQuery, 
  clearQuery, 
  setCategory, 
  clearCategory, 
  setFilteredPosts, 
  setAllPosts,
  setAllCategory,
  clearFilter
} = postFilterSlice.actions
export default postFilterSlice.reducer