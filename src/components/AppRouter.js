import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import Navigation from "./Navigation";

function AppRouter({ isLoggedIn }) {

	return (
		<>
			{
				isLoggedIn && <Navigation />
			}
			<Routes>
				{
					isLoggedIn ?
						<>
							<Route path="/" element={<Home />} />
							<Route path="/profile" element={<Profile />} />
						</>
						:
						<Route path="/" element={<Auth />} />
				}
			</Routes>
		</>
	)
}

export default AppRouter;