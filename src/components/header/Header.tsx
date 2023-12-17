import styles from './styles.module.css'
import { BurgerBtn } from '../burgerBtn';
import { useState } from 'react';
import { MenuHeader } from '../menuHeader'
import { ThemeToggle } from '../themeToggle';
import { BurgerMenu } from '../burgerMenu';
import { Link } from 'react-router-dom';

export const Header = () => {
	
	const [isActiveBurger, setIsActiveBurger] = useState<boolean>(false);

	return (
	<header className={styles.header}>
		<div className={styles.header__wrapper}>
			<Link 
				className={styles.header__siteName} to='/'>
				<p>Where is the world?</p>
			</Link>
			<div className={styles.header__componentHide}>
				<MenuHeader/>
			</div>
			<div className={styles.header__componentHide}>
				<ThemeToggle/>
			</div>
			<BurgerBtn isActive={isActiveBurger} setIsActive={setIsActiveBurger}/>
			<BurgerMenu isActive={isActiveBurger}/>
		</div>
	</header>
	)
}