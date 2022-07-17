import React, { useState, useContext } from "react";
import LoginPage from "./LoginPage";
import { Switch, Route } from "react-router-dom";
import { Header } from "semantic-ui-react";
import NavBar from "./NavBar";
import TaskTracker from "./TaskTracker";
import { UserContext } from "../context/UserContext";
import { createGlobalStyle } from "styled-components";

function App() {
  const { username } = useContext(UserContext);
  const current = new Date();
  const date = `${
    current.getMonth() + 1
  }/${current.getDate()}/${current.getFullYear()}`;
  const [showToDo, setTodo] = useState(false);

  function handleClick() {
    setTodo(!showToDo);
  }

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
