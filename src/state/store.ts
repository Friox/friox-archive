import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit'
import postFilterReducer from './slices/postFilterSlice'
import postPageReducer from './slices/postPageSlice'
import tabIndexReducer from './slices/tabIndexSlice'
import { filterMiddleware } from './middleware/filterMiddleware'

const rootReducer = combineReducers({
  postFilter: postFilterReducer,
  postPage: postPageReducer,
  tabIndex: tabIndexReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(filterMiddleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export default store