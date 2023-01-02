import React from "react";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

function Home() {
	const [tweet, setTweet] = useState('');
	const onSubmit = (e) => {
		e.preventDefault();
		/**
		 * https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=1#add_a_document
		 */
	}
	const onChange = (e) => {
		const { target: { value } } = e;
		setTweet(value);
	}
	return (
		<>
			<span>Home</span>
			<form onSubmit={onSubmit}>
				<input type="text" value={tweet} onChange={onChange} placeholder="What's on your mind?" maxLength={120} />
				<button type="submit">tweet</button>
			</form>
		</>
	)
}

export default Home;