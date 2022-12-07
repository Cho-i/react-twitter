import React, { useState, useEffect } from "react";
import AppRouter from "./AppRouter";
import { authService } from "../fbase"
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(authService.currentUser);
	/**
	 * https://firebase.google.com/docs/auth/web/manage-users
	 */
	useEffect(() => {
		const auth = getAuth();
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsLoggedIn(true);
				const uid = user.uid;
			} else {
				setIsLoggedIn(false);
			}
			setInit(true);
		})
	}, []);
	return (
		<>
			{
				init ?
					<AppRouter isLoggedIn={isLoggedIn} />
					:
					'Initalizing...'
			}
			<footer>&copy; {new Date().getFullYear()} React Twitter</footer>
		</>
	);
}

export default App;
