import { createSlice } from "@reduxjs/toolkit";

type Theme = 'dark' | 'light'; 

interface ThemeState {
	theme: Theme,
}

const initialState: ThemeState = {
	theme: 'light',
}

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
		toggleTheme: (state) => {
			state.theme === 'light' 
				? state.theme = 'dark'
				: state.theme = 'light'
		}
	}
})