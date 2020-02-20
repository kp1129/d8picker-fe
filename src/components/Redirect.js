import React from 'react';
import { Redirect } from 'react-router-dom';

export default Redirect = () => {
  return (
    <div>
      <div>...redirecting</div>
      <Redirect to="/home" />
    </div>
  );
};
