import { createSlice } from '@reduxjs/toolkit'

export const tabIndexSlice = createSlice({
  name: 'tabIndex',
  initialState: 0,
  reducers: {
    setTabIndex: (state, action) => action.payload
  }
})

export const { setTabIndex } = tabIndexSlice.actions
export default tabIndexSlice.reducer