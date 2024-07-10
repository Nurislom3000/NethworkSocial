import { UserInterface } from '@/hooks/Interfaces'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface InitialState {
	user: UserInterface | undefined
}

export const getUser = createAsyncThunk(
	'posts/getUser',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get(
				'https://033a62a164f4f491.mokky.dev/users'
			)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

const initialState: InitialState = {
	user: undefined,
}

export const userSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.user = action.payload.filter(
				(i: UserInterface) =>
					i.email === JSON.parse(localStorage.getItem('user')!).email
			)[0]
			localStorage.setItem('user', JSON.stringify(state.user))
		})
	},
})

// export const {} = postsSlice.actions

export default userSlice.reducer
