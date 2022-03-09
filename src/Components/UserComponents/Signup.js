import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="loginStyle">
      <h1 className="headingStyle text-center my-4">Sign Up</h1>
      <form className="formStyle p-5 mx-5 border border-info border-1 rounded">
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            UserName
          </label>
          <input
            type="text"
            id="fname"
            name="username"
            placeholder="Your name.."
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="fname"
            name="email"
            placeholder="Your name.."
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="lname"
            name="pass"
            placeholder="Your last name.."
            className="form-control"
          />
        </div>

        <button className="btn btn-primary my-1">Sign Up</button>

        <p className="mt-2">
          Already have account?{<Link to="/">Click here</Link>}
        </p>
      </form>
    </div>
  );
};

export default Signup;
