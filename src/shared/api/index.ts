import axios from "axios";

class Api {
	private readonly BASE_URL: string = 'https://restcountries.com/v3.1';
	api;

	constructor() {
		this.api = axios.create({
			baseURL: this.BASE_URL,
		})
	}
}

export default Api;