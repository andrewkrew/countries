import { createAsyncThunk } from "@reduxjs/toolkit";
import Countries from "../../shared/api/countries";

export const fetchCountriesThunk = createAsyncThunk(
	'countries/fetchCountries',
	async (_ , { rejectWithValue }) => {
		try {
			const data = await (new Countries()).getAll();
			return data;
		}
		catch(error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
      return rejectWithValue('Server error, try again!');
		}
	}
)

export const fetchCountriesDetails = createAsyncThunk(
	'countries/fetchCountriesDetails',
	async (name: string, { rejectWithValue }) => {
		try {
			const data = await (new Countries()).getDetails(name);
			return data[0];
		}
		catch(error: unknown) {
			if (error instanceof Error) {
				return rejectWithValue(error.message);
			}
      return rejectWithValue('Server error, try again!');
		}
	}
)