import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";
//import { async } from "@firebase/util";

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

	const onSocialClick = async (e) => {
		/**
		 * https://firebase.google.com/docs/auth/web/google-signin?authuser=1
		 * https://firebase.google.com/docs/auth/web/github-auth?authuser=1
		 */
		const { target: { name } } = e;
		const auth = getAuth();
		let provider;

		if (name === "google") {
			provider = new GoogleAuthProvider();
		} else if (name === "github") {
			provider = new GithubAuthProvider();
		}

		await signInWithPopup(auth, provider);
	}

	return (
		<>
			<div>
				<form onSubmit={onSubmit}>
					<input type="text" name="email" placeholder="Email" required value={email} onChange={onChange} />
					<input type="password" name="password" placeholder="Password" required value={password} onChange={onChange} />
					<input type="submit" value={newAccount ? "Create Account" : "Log In"} />
					{error}
				</form>
				<span onClick={toggleAccount}>
					{newAccount ? "Sign in" : "Create Account"}
				</span>
				<div>
					<button name="google" onClick={onSocialClick}>Google</button>
					<button name="github" onClick={onSocialClick}>Github</button>
				</div>
			</div>
		</>
	)
}

export default Auth;