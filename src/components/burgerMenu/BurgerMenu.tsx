import { MenuHeader } from "../menuHeader"
import { ThemeToggle } from "../themeToggle"
import styles from './styles.module.css'

export const BurgerMenu = ({isActive}: {isActive: boolean}) => {

	return (
		<div 
		className = {!isActive 
		? styles.burgerMenu__wrapper 
		: `${styles.burgerMenu__wrapper} ${styles.burgerMenu__wrapper_hide}`}>
			<div className={styles.burgerMenu}>
				<ThemeToggle/>
				<MenuHeader/>
			</div>
		</div>
		
	)
}