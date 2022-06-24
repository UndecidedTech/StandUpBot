import LoginPage from "./LoginPage";
import { Switch, Route } from "react-router-dom";
import { Header } from "semantic-ui-react";
import NavBar from "./NavBar";

function App() {
  return (
    <>
      <Header className="App-Header">
        <NavBar />
      </Header>
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route exact path="/tasks">
            
          </Route>
        </Switch>
    </>
  );
}

export default App;
