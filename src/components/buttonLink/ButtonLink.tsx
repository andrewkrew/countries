import { ReactNode } from "react"
import styles from './styles.module.css'

export const ButtonLink = ({children} : {children: ReactNode}) => {

	return (
		<button className={styles.btn }>
			{children}
		</button>
	)
}