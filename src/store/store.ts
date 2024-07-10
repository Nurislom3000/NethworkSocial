import { configureStore } from '@reduxjs/toolkit'
import PostsSlice from './slices/PostsSlice'
import UserSlice from './slices/UserSlice'

const store = configureStore({
	reducer: {
		posts: PostsSlice,
		user: UserSlice,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store }
