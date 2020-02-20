import React from 'react';
import { Redirect } from 'react-router-dom';

export default () => {
  return (
    <div>
      <div>...redirecting</div>
      <Redirect to="/home" />
    </div>
  );
};
