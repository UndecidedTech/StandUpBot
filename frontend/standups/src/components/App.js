import React, { useState, useContext, useEffect } from "react";
import LoginPage from "./LoginPage";
import { Switch, Route, useLocation } from "react-router-dom";
import { Header } from "semantic-ui-react";
import NavBar from "./NavBar";
import TaskTracker from "./TaskTracker";
import { UserContext } from "../context/UserContext";
import { createGlobalStyle } from "styled-components";

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
  const [showToDo, setTodo] = useState(false);

  function handleClick() {
    setTodo(!showToDo);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/users/current-username",
        { withCredentials: true }
      );

      dispatch({
        type: Action.UPDATE,
        payload: {
          username: response.data.username,
          image: response.data.image,
          banner: response.data.banner,
        },
      });
    } catch (error) {
      if (error.response.status === 401) {
        dispatch({
          type: Action.RESET,
        });
      }
    }
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
          <TaskTracker
            showToDo={showToDo}
            onHandleClick={handleClick}
            date={date}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Poppins', sans-serif;
  }
`;
