import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "./Components/UserComponents/Login";
import Signup from "./Components/UserComponents/Signup";
import NoteList from "./Components/NoteComponents/NoteList";
import Error from "./Components/Error";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/Signup" component={Signup} /> */}
        <Route exact path="/NoteList" component={NoteList} />
        <Route component={Error} />
      </Switch>
    </>
  );
};

export default App;
