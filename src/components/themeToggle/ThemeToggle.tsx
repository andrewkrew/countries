import styles from './styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { themeSelector } from '../../redux/selectors';
import { toggleTheme } from '../../redux';

export const ThemeToggle = () => {

	const {theme} = useAppSelector(themeSelector)
	const dispatch = useAppDispatch();

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	}

	return (
		<button className={styles.header__toggleTheme} onClick={handleToggleTheme}>
				{(theme === 'light') 
					? <>
						<FontAwesomeIcon icon={faMoon} className={`${styles.header__icon} ${styles.header__icon_faMoon}`} /> 
						<span>dark mode</span>
					</>
					: <>
						<FontAwesomeIcon icon={faSun} className={`${styles.header__icon} ${styles.header__icon_faSun}`} />
						<span>light mode</span>
					</>
				}
		</button>
	)
}