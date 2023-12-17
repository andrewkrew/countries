export interface CountriesAll {
	flags: {
		png: string,
		svg: string,
		alt: string,
	},
	name: {
		common: string,
		official: string,
		nativeName: {
			fra: {
				official: string,
				common: string,
			}
		}
	},
	capital: string[],
	region: string,
	population: number,
}

type TypeCurrency = {
	name: string,
	symbol: string,
}

export type TypeCurrencies = {
	[key: string]: TypeCurrency;
}

export type TypeLanguage = {
	[key: string] : string;
}

export interface CountriesDetails extends CountriesAll {
	subregion: string,
	currencies: TypeCurrencies,
	languages: TypeLanguage

	maps: {
		googleMaps: string,
	},

	timezones: [string],
}

export interface SuccessResponse<T> {
	success: true,
	data: T
}

export interface ErrorResponse {
	success: false,
	error?: string,
}

export type Response<T = never> = ErrorResponse | SuccessResponse<T>