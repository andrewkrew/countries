import { Dispatch, SetStateAction, useLayoutEffect} from "react";
import { Countries } from "../../components/countries"
import { ScrollToTopBtn } from "../../components/scrollToTopBtn"
import { useListenerY } from "../../shared/hooks/useListenerY";

export const CountriesPage = ({offsetY, setOffsetY}: {offsetY:number, setOffsetY: Dispatch<SetStateAction<number>>}) => {
	
	useListenerY(setOffsetY);

	useLayoutEffect(() => {
		setTimeout(() => {
			window.scrollTo({
				top: offsetY,
			});
		}, 10)
}, [])

	return <>
		<Countries/>
		<ScrollToTopBtn/>
	</>
}