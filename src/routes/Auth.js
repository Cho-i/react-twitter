import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { async } from "@firebase/util";

function Auth() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState('');

	const onChange = (e) => {
		/**
		 * const { name, value } = e.target;
		 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#object_destructuring
		 */
		const { target: { name, value } } = e;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	}

	const onSubmit = async (e) => {
		e.preventDefault();
		/**
		 * https://firebase.google.com/docs/auth/web/password-auth?authuser=1#create_a_password-based_account
		 */
		try {
			let data;
			const auth = getAuth();
			if (newAccount) {
				// create account
				data = await createUserWithEmailAndPassword(auth, email, password);
			} else {
				// log in
				data = await signInWithEmailAndPassword(auth, email, password);
			}
			console.log(data);
		} catch (error) {
			setError(error.message);
		}
	}

	const toggleAccount = () => setNewAccount((prev) => !prev);

	return (
		<>
			<div>
				<form onSubmit={onSubmit}>
					<input type="text" name="email" placeholder="Email" required value={email} onChange={onChange} />
					<input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} />
					<input type="submit" value={newAccount ? "Create Account" : "Log In"} />
				</form>
				{error}
				<div>
					<button>Google</button>
					<button>Github</button>
				</div>
			</div>
		</>
	)
}

export default Auth;