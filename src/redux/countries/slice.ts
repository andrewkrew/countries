import { AnyAction, createSlice } from "@reduxjs/toolkit";
import { CountriesAll, CountriesDetails } from "../../shared/api/types";
import { fetchCountriesDetails, fetchCountriesThunk } from "./thunk";

interface CountriesState {
	isLoading: boolean,
	countries: CountriesAll[],
	countryDetails: CountriesDetails,
	error: string | undefined,
}

const initialState: CountriesState = {
	isLoading: false,
	countries: [],
	countryDetails: {} as CountriesDetails,
	error: '',
}

export const countriesSlice = createSlice({
	name: 'countries',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addMatcher(fetchCountriesThunk.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchCountriesThunk.fulfilled.match, (state, action) => {
			state.isLoading = false;
			state.countries = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchCountriesThunk.rejected.match, (state, action:AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
      }
		);

		builder.addMatcher(fetchCountriesDetails.pending.match, (state) => {
			state.isLoading = true;
		})

		builder.addMatcher(fetchCountriesDetails.fulfilled.match, (state, action) => {
			state.isLoading = false;
			state.countryDetails = action.payload;
			state.error = '';
		})

		builder.addMatcher(fetchCountriesDetails.rejected.match, (state, action:AnyAction) => {
      state.isLoading = false;
			state.error = action.payload;
		})
	}
})