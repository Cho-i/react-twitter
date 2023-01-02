import React from "react";
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function Profile() {
	const navigate = useNavigate();

	const onLogOutClick = () => {
		const auth = getAuth();
		signOut(auth).then(() => {
			// Sign-out successful.
			navigate('/', { replace: true });
		}).catch((error) => {
			// An error happened.
			console.log(error);
		});
	}
	return (
		<>
			<span>Profile</span>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	)
}

export default Profile;