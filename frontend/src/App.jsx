import Login from "./pages/auth/login/Login";
import SignUp from "./pages/auth/signup/SignUp";
import HomePage from "./pages/home/HomePage";


import { Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className='flex max-w-6xl mx-auto'>
			
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/signup' element={<SignUp/>} />
				<Route path='/login' element={<Login />} />
			</Routes>
		</div>
	);
} 

export default App;