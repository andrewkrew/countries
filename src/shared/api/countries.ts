import Api from ".";
import { CountriesAll, CountriesDetails } from "./types";

class Countries extends Api {
	private readonly endpointAll = '/all?fields=name,capital,flags,population,region';
	private readonly endpointDetails = '/name/';

	async getAll():Promise<CountriesAll[]> {
		const {data} = await this.api.get<CountriesAll[]>(this.endpointAll);
		return data;
	}

		async getDetails(name: string):Promise<CountriesDetails[]> {
		const {data} = await this.api.get<CountriesDetails[]>(`${this.endpointDetails}${name}`);		
		return data;
	}
}

export default Countries;