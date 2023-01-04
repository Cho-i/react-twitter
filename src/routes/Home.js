import React from "react";
import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { dbService } from "../fbase";


function Home() {
	const [tweet, setTweet] = useState('');
	const [tweets, setTweets] = useState([]);

	const getTweets = async () => {
		/**
		 * https://firebase.google.com/docs/firestore/query-data/get-data?authuser=1
		 */
		const dbTweets = await getDocs(collection(dbService, 'tweets'));
		dbTweets.forEach((doc) => {
			/**
			 * https://velog.io/@kingmo/state-prev
			 */
			const tweetObject = {
				...doc.data(),
				id: doc.id
			}
			setTweets((prev) => [tweetObject, ...prev]);
		});
	}

	useEffect(() => {
		getTweets();

	}, [])

	const onSubmit = async (e) => {
		e.preventDefault();
		/**
		 * https://firebase.google.com/docs/firestore/manage-data/add-data?authuser=1#add_a_document
		 */
		await addDoc(collection(dbService, 'tweets'), {
			tweet,
			createdAt: Date.now()
		});
		setTweet('');
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
			<div>
				{
					tweets.map((tweet) => (
						<div key={tweet.id}>
							<h4>{tweet.tweet}</h4>
						</div>
					))
				}
			</div>
		</>
	)
}

export default Home;