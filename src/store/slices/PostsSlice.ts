import { PostInterface } from '@/hooks/Interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface InitialState {
	posts: Array<PostInterface> | undefined
}

export const getPosts = createAsyncThunk(
	'posts/getPosts',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(
				'https://033a62a164f4f491.mokky.dev/posts'
			)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const initialState: InitialState = {
	posts: [],
}

export const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		addPost: (state, action) => {
			state.posts?.push(action.payload)
		},
		removePost: (state, action) => {
			state.posts = state.posts?.filter(post => post.id !== action.payload)
		},
	},
	extraReducers: builder => {
		builder.addCase(getPosts.fulfilled, (state, action) => {
			state.posts = action.payload
		})
		builder.addCase(getPosts.rejected, (state, action) => {
			console.error(action.payload)
			state.posts = undefined
		})
	},
})

export const { addPost, removePost } = postsSlice.actions

export default postsSlice.reducer
