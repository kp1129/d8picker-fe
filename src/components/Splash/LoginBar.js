import React from 'react';
import GoogleBtn from '../../img/btn.png'
import '../../App.css';



function Login() {
	
	return (
		<div className='navbar'>
			<div ><a href={'https://d8picker.herokuapp.com/api/auth/login'}><img src={GoogleBtn} alt=''/></a></div>
			
		</div>
	);
}

export default Login;
