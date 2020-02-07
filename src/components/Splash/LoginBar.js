import React from 'react';
import GoogleBtn from '../../img/btn.png'
import '../../App.css';


function Login() {
	
	return (
		<div className='navbar'>
			<div ><a href='http://localhost:4000/api/auth/google'><img src={GoogleBtn} alt=''/></a></div>
			
		</div>
	);
}

export default Login;
