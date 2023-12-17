import './App.css';
import { Route, Routes} from 'react-router-dom';
import { AuthPage, CountriesPage, CountryInfoPage, HomePage, NotFound } from './pages';
import { Layout } from './components/layout';
import { PrivateRoute } from './hoc/PrivateRoute';
import { useEffect, useLayoutEffect} from 'react';
import { useAppDispatch, useAppSelector } from './shared/hooks/useRedux';
import { checkAuthThunk } from './redux';
import { useOffsetY } from './shared/hooks/useOffsetY';

export const App = () => {

	const {theme} = useAppSelector(state => state.theme);
	const dispatch = useAppDispatch();
	const {offsetY, setOffsetY} = useOffsetY();

	useLayoutEffect(() => {
		const document = window.document.documentElement;
		document.setAttribute('data-theme', theme);
	}, [theme])

	useEffect(() => {
		dispatch(checkAuthThunk())
	}, [dispatch])

  return (	
	<Routes>
		<Route path='/' element={<Layout/>}>
			<Route index element={<HomePage/>}/>
			<Route element={<PrivateRoute/>}>
				<Route path='countries'element={<CountriesPage offsetY={offsetY} setOffsetY={setOffsetY}/>}/>
				<Route path='countries/:name'element={<CountryInfoPage/>}/>
			</Route>
			<Route path='login' element={<AuthPage/>}/>
			<Route path='*' element={<NotFound/>}/>
		</Route>
	</Routes>
)
}
