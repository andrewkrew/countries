import { themeSelector } from '../../redux/selectors';
import { useAppSelector } from '../../shared/hooks/useRedux';
import styles from './styles.module.css'


export const ScrollToTopBtn = () => {
	
	const {theme} = useAppSelector(themeSelector)

	const goTop = ():void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}
	
	return (
		<div 
			className={(theme === 'light') ? styles.pageUp : `${styles.pageUp} ${styles.pageUp_dark}`}
			onClick={goTop}
		>
			<span>&#8249;</span>
		</div>
	)
}