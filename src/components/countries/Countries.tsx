import { SearchInput } from "../searchInput"
import { CountryCard } from "../countryCard"
import { useEffect, useState} from "react"
import styles from './styles.module.css'
import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../shared/hooks/useRedux"
import { countriesSelector } from "../../redux/selectors"
import { fetchCountriesThunk } from "../../redux"

export const Countries = () => {

	const [searchValue, setSearchValue] = useState<string>('');
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const {isLoading, countries, error} = useAppSelector(countriesSelector);
	
	useEffect(() => {
		dispatch(fetchCountriesThunk());
	}, [dispatch])

	const filtredCountryCards = countries.filter(item => {
		return ( item.name.common.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase())
						|| item.region.toLocaleLowerCase().includes(searchValue.trim().toLocaleLowerCase()))
	})

	const navigateToCountry = (country: string) => {
		navigate(`/countries/${country}`);
	}

	return (
		<section className={styles.countries}>
			<div className={`wrapper ${styles.countries__wrapper}`}>
				<div className={styles.countries__inputContainer}>
					<SearchInput setValue={setSearchValue}/>
				</div>
				{error && <p>{error}</p>}
				<div className={styles.countries__container}>
					{
						(!isLoading) ? filtredCountryCards.map((item) => {
							return (
							<div 
								className={styles.countries__item} 
								onClick={() => navigateToCountry(item.name?.common)}
								key={item.name.common} >
									<CountryCard {...item}/>
							</div> 
							)
						}) 
						: <p className={styles.countries__loadMessage}>Loading...</p>
					}
					{
						!isLoading && filtredCountryCards.length === 0 && !error
							? <p className={styles.countries__nothingFound}>Sorry, nothing found by: 
									<span> {searchValue.trim()}</span>
								</p>
							: ''
					}
				</div>
			</div>
		</section>
	)
}