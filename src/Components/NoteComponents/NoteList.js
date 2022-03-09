import React, { useState, useEffect } from "react";
import NoteNav from "./NoteNav";
import AddNote from "./AddNote";
import DisplayNotes from "./DisplayNotes";
import { NavLink } from "react-router-dom";

const NoteList = () => {
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token === null) {
      setIsAuth(false);
    } else {
      setIsAuth(true);
    }
  }, []);
  return (
    <>
      {isAuth ? (
        <>
          <NoteNav />
          <AddNote />
          <DisplayNotes />
        </>
      ) : (
        <>
          <h1 className="text-center mt-5 ">Please Login to continue....</h1>
          <div className="mt-4 d-flex justify-content-center">
            <NavLink to="/" className="btn btn-primary" style={{ width: 100 }}>
              Login
            </NavLink>
          </div>
        </>
      )}
    </>
  );
};

export default NoteList;
