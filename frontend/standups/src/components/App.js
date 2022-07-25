import React, { useState, useContext, useEffect } from "react";
import LoginPage from "./LoginPage";
import {
  Switch,
  Route,
  useLocation,
  BrowserRouter as Router,
} from "react-router-dom";
import { Header } from "semantic-ui-react";
import NavBar from "./NavBar";
import TaskTracker from "./TaskTracker";
import {
  UserContext,
  Action,
  UserContextProvider,
} from "../context/UserContext";
import { createGlobalStyle } from "styled-components";
import axios from "axios";

function App() {
  const {
    state: { username },
    dispatch,
  } = useContext(UserContext);
  const location = useLocation();

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  function handleClick() {
    axios.post("http://localhost:5000/api/standups/join", null, {
      withCredentials: true,
    });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    console.log("here??");
    axios
      .get("http://localhost:5000/api/users/current-username", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch({
          type: Action.UPDATE,
          payload: {
            username: response.data.username,
            image: response.data.image,
            banner: response.data.banner,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: Action.RESET,
        });
      });
  }, [dispatch, location.pathname]);

  return (
    <>
      <GlobalStyle />
      <Header className="App-Header">
        {username && username}
        <NavBar />
      </Header>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/tasks">
          <TaskTracker onHandleClick={handleClick} date={date} />
        </Route>
      </Switch>
    </>
  );
}

function AppWrapper() {
  return (
    <UserContextProvider>
      <Router>
        <App />
      </Router>
    </UserContextProvider>
  );
}

export default AppWrapper;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }
`;
