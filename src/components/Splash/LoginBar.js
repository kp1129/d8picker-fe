import React from "react";
import GoogleBtn from "../../img/btn.png";
import "../../App.css";

function Login() {
  return (
    <div className="navbar">
      <div>
        <a href={`${process.env.REACT_APP_ENDPOINT_URL}/api/auth/login`}>
          <img src={GoogleBtn} alt="" />
        </a>
      </div>
    </div>
  );
}

export default Login;
