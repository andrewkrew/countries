import { Dispatch, SetStateAction } from "react"
import styles from './styles.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useAppSelector } from "../../shared/hooks/useRedux"
import { themeSelector } from "../../redux/selectors"


export const SearchInput = ({setValue}: {setValue : Dispatch<SetStateAction<string>>}) => {

	const {theme} = useAppSelector(themeSelector);

	return (
		<label htmlFor="searchInput" 	
			className={theme === 'light' 
				? styles.countries__search
				: `${styles.countries__search} ${styles.countries__search_dark}`}
			>
				<FontAwesomeIcon icon={faMagnifyingGlass} className={styles.search__icon} />
				<input 
					id="searchInput"
					type="text" 
					placeholder="input region or country" 
					onChange={(e) => {
						setValue(e.target.value);
					}}
				/>
		</label>

	)
}