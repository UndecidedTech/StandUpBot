import React, { useState, useContext, useEffect } from "react";
import LoginPage from "./LoginPage";
import {
  Switch,
  Route,
  useLocation,
  BrowserRouter as Router
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
  const [standupObj, setStandupObj] = useState({});
  const {
    state: { username },
    dispatch,
  } = useContext(UserContext);
  const location = useLocation();

  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;

  useEffect(() => {
    axios.get("/standups").then((res) => {
      setStandupObj(res.data);
      dispatch({
        type: Action.UPDATE,
        payload: {
          standupId: res.data.id,
        },
      });
    })
  }, [dispatch]);

  function handleClick() {
    axios
      .post("/standups/join", null, {
        withCredentials: true,
      })
      .then((res) => {
        setStandupObj(res.data);
      });
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    axios
      .get("/users/current-username", {
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
        <NavBar />
      </Header>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route exact path="/tasks">
          <TaskTracker
            onHandleClick={handleClick}
            date={date}
            standupObj={standupObj}
          />
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
