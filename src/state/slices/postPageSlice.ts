import { createSlice } from '@reduxjs/toolkit'

export const postPageSlice = createSlice({
  name: 'postPage',
  initialState: 1,
  reducers: {
    setPostPage: (state, action) => action.payload,
    clearPostPage: () => 1
  }
})

export const { setPostPage, clearPostPage } = postPageSlice.actions
export default postPageSlice.reducer