import React from "react";
import { NavLink } from "react-router-dom";

const Error = () => {
  return (
    <>
      <h1 className="text-center mt-5 ">Page not found....</h1>
      <div className="mt-4 d-flex justify-content-center">
        <NavLink to="/" className="btn btn-primary" style={{ width: 100 }}>
          Back
        </NavLink>
      </div>
    </>
  );
};

export default Error;
