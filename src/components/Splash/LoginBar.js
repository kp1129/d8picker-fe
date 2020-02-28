import React from 'react';
import GoogleBtn from '../../img/btn.png';
import favicon from '../../img/white.png';
import '../../App.css';

function Login({ auth }) {
  return (
    <div className="navbar">
      <img src={favicon} alt="" className="favicon" />
      <div className="googleBtn">
        <button style={{ backgroundImage: GoogleBtn }} onClick={auth.onSignIn}>
          Signin with Google
        </button>
        {/* <a href={`${process.env.REACT_APP_ENDPOINT_URL}/api/auth/login`}>
          <img src={GoogleBtn} alt="" />
        </a> */}
      </div>
    </div>
  );
}

export default Login;
