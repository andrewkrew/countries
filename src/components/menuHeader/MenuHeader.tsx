import { NavLink, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/useRedux';
import { authSelector } from '../../redux/selectors';
import { logoutThunk} from '../../redux';

export const MenuHeader = () => {

	const {authorization, userName} = useAppSelector(authSelector);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const setActive = ({isActive}: {isActive:boolean}) => {
		return isActive ? `${styles.header__Link} ${styles.header__ActiveLink}` : `${styles.header__Link}`;
	}

	const logOut = () => {
		dispatch(logoutThunk());
		navigate('/', {replace: true});
	}

	return (
		<div className='wrapper__compomemt-hide'>
			<div className={styles.header__nav}>
				<NavLink
					to='/' 
					className={setActive}>
					Home
				</NavLink>
				<NavLink
					to='/countries' 
					className={setActive}>
					Countries
				</NavLink>
				{!authorization ? <NavLink to='/login' className={setActive}>Login</NavLink> 
				: <button 
						className={styles.header__logout}
						onClick={() => logOut()}
					>
					{`Hi ${userName}! Logout`}
					</button>}
			</div>
		</div>

	)
}
