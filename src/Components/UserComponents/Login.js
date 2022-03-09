import React, { useState, useEffect } from "react";
import { Link, Route } from "react-router-dom";
import { useHistory } from "react-router";
import "./Login.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const History = useHistory();

  useEffect(() => {
    const storageHandler = localStorage.getItem("token");
    if (storageHandler === null) {
      History.push("/");
    } else {
      History.push("/NoteList");
    }
  }, []);
  const formSubmitHandler = async (e) => {
    e.preventDefault();

    if (email && pass) {
      const LoginData = {
        email: email,
        pass: pass,
      };
      let result = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(LoginData),
      });
      let resultData = await result.json();
      // console.log(resultData.msg);
      if (resultData.msg == "success") {
        alert("Login Successful");

        localStorage.setItem("token", resultData.jwtToken);
        localStorage.setItem("user", resultData.user);
        //token is variable name and jwttoken in the varibale come from backend

        History.push("/NoteList");
      } else {
        alert("Wrong Crendential!");
        setEmail("");
        setPass("");
      }
    } else {
      alert("fill data");
    }
  };
  return (
    <div className="loginStyle ">
      <h1 className="headingStyle text-center my-4">Welcome To I-notes</h1>
      <p className="text-center h5 mb-4">Please Login to continue</p>
      <form
        className="formStyle p-5 mx-5 border border-info border-1 rounded"
        onSubmit={formSubmitHandler}
      >
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">
            Email
          </label>
          <input
            type="text"
            id="fname"
            name="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
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
            className="form-control"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>

        <button className="btn btn-primary my-1">Login</button>

        {/* <p className="mt-2">
          Dont have account?{<Link to="/Signup">Click Here</Link>}
        </p> */}
      </form>
    </div>
  );
};

export default Login;
