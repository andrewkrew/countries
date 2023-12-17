import { CountriesAll } from '../../shared/api/types';
import { themeSelector } from '../../redux/selectors';
import { useAppSelector } from '../../shared/hooks/useRedux';
import styles from './styles.module.css'

export const CountryCard = ({flags: {png, alt}, name:{common}, capital, region, population}: CountriesAll) => {

	const {theme} = useAppSelector(themeSelector)

	const formatPopulation = (value: number) => {
		return new Intl.NumberFormat().format(value);
	}

	return (
		<div className={theme === 'light' ? styles.country : `${styles.country} ${styles.country_dark}`}>
			<img src={png} alt={alt} className={styles.country__flag}/>
			<div className={styles.coutry__info}>
				<h3 className={styles.country__name}>{common}</h3>
				<p><span>Population:</span> {formatPopulation(population)}</p>
				<p><span>Region: </span>{region}</p>
				<p><span>Capital: </span>{capital}</p>
			</div>
		</div>
	)
}