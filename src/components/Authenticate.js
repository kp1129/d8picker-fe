import React, { useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Authenticate = () => {
  let query = useQuery();

  useEffect(() => {
    localStorage.setItem("code", query.get("code"));
  });
  return <Redirect to="/events" />;
};

export default Authenticate;
