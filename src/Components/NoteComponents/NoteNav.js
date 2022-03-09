import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router";

const NoteNav = () => {
  const [name, setName] = useState("");
  useEffect(() => {
    const userFromStorage = localStorage.getItem("user");
    if (userFromStorage === null) {
      setName("");
    } else {
      setName(userFromStorage);
    }
    //console.log(userFromStorage);
  }, [name]);

  const history = useHistory();
  const userLogOut = () => {
    //alert("Are you sure want to Log out?");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <div className="bg-dark d-flex justify-content-around py-2 align-items-center">
      <p className="text-white text-center align-content-center">I-Notes</p>
      <p className="text-white">Hello {name} </p>
      <button
        className="btn btn-danger btn-sm"
        style={{ width: 100 }}
        onClick={userLogOut}
      >
        Log Out
      </button>
    </div>
  );
};

export default NoteNav;
