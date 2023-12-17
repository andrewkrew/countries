import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import styles from './styles.module.css'
import { TypeCurrencies, TypeLanguage } from '../../shared/api/types';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { countriesSelector } from '../../redux/selectors';
import { fetchCountriesDetails } from '../../redux';

export const CountryInfoPage = () => {
	
	const {name} = useParams();
	const navigate = useNavigate();
	const {isLoading, countryDetails, error} = useAppSelector(countriesSelector);
	const dispatch = useAppDispatch();

	const goBack = () => navigate(-1);

	const getCurrencies = (countryDetails: TypeCurrencies):string => {
		const key: string = (Object.keys(countryDetails)[0]);
		return `${key} - ${countryDetails[key].name} (${countryDetails[key].symbol})`;
	}

	const getLanguage = (countryDetails: TypeLanguage):string => {
		const key: string = (Object.keys(countryDetails)[0]);		
		return `${countryDetails[key]}`
	}

	useEffect(() => {
		dispatch(fetchCountriesDetails(name as string));
	}, [dispatch, name])

	return ( 
	<section className={styles.countryInfo}>
		<div className={`wrapper ${styles.wrapper}`}>
			<button
				className={styles.countryInfo__btnBack} 
				onClick={goBack}>
				&larr; Back
			</button>
			{error && <p>{error}</p>}
			{!isLoading 
				? (Object?.keys(countryDetails).length !== 0 
					? <div className={styles.countryInfo__info}>
					<h1 className={styles.info__name}>{countryDetails.name.common}</h1>
					<img 
						src={countryDetails.flags.png} 
						alt={countryDetails.flags.alt} 
						className={styles.info__photo}
					/>
					<div className={styles.info__table}>							
						<p className={styles.info__rowName}>Capital:</p>
						<p>{countryDetails.capital}</p>
						<p className={styles.info__rowName}>Region:</p>
						<p>{countryDetails.region}</p>
						<p className={styles.info__rowName}>Subregion:</p>
						<p>{countryDetails.subregion}</p>
						<p className={styles.info__rowName}>Population:</p>
						<p>{countryDetails.population}</p>
						<p className={styles.info__rowName}>Currency:</p>
						<p>{getCurrencies(countryDetails.currencies)}</p>
						<p className={styles.info__rowName}>Language:</p>
						<p>{getLanguage(countryDetails.languages)}</p>
						<p className={styles.info__rowName}>Maps:</p>
						<a href={`${countryDetails.maps.googleMaps}`} rel="noreferrer" target='_blank'>google Maps</a>
						<p className={styles.info__rowName}>Timezone:</p>
						<p>{countryDetails.timezones[0]}</p>
					</div>
				</div>
					: '') 
				: <p>Loading...</p>}
				{/* <pre>{JSON.stringify(countryDetails, null, 2)}</pre> */}
		</div>
	</section>
	)
}