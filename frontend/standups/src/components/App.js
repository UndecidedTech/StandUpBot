import React, { useState } from "react";
import LoginPage from "./LoginPage";
import { Switch, Route } from "react-router-dom";
import { Header } from "semantic-ui-react";
import NavBar from "./NavBar";
import TaskTracker from "./TaskTracker";
import { UserContext } from "../context/UserContext";

function App() {
  const { username } = UserContext();
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
