import { createSlice } from '@reduxjs/toolkit'
import { checkAuthThunk, loginThunk, logoutThunk } from './thunk'
interface AuthState {
	"authorization"?: boolean
	"refreshToken"?: string,
	"accessToken"?: string,
	"userName"?: string,
	"error"?: unknown
}

	const initialState: AuthState = {
		"refreshToken": localStorage.getItem("refreshToken") || undefined,
		"accessToken": localStorage.getItem("accessToken") || undefined,
		"userName": localStorage.getItem("userName") || undefined,
	}

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addMatcher(loginThunk.fulfilled.match, (_, action) => {
			if (action.payload.response.success) {
				localStorage.setItem("refreshToken", action.payload.response.data.refreshToken)
				localStorage.setItem("accessToken", action.payload.response.data.accessToken)
				localStorage.setItem("userName", action.payload.login)
				return {
					accessToken: action.payload.response.data.accessToken,
					refreshToken: action.payload.response.data.refreshToken,
					authorization: true,
					userName: action.payload.login,
				}
			} else {
				return {
					error: action.payload.response.error,
					authorization: false
				}
			}
		})
		builder.addMatcher(loginThunk.rejected.match, (_, action) => {
			return {
				error: action.error.message,
				authorization: false
			}
		})
	
		builder.addMatcher(checkAuthThunk.fulfilled.match, (state, action) => {
			state.authorization = action.payload
		})
		builder.addMatcher(checkAuthThunk.rejected.match, (state) => {
			state.authorization = false
		})

		builder.addMatcher(logoutThunk.fulfilled.match, () => {
			localStorage.removeItem("refreshToken");
			localStorage.removeItem("accessToken");
			localStorage.removeItem("userName");
			return {
				userName: '',
				authorization: false,
				refreshToken: undefined,
				accessToken: undefined,
				error: '',
			}
		})
	}
})