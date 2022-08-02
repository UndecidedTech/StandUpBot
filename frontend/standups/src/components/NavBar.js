import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, MenuItem} from "semantic-ui-react";
import { UserContext } from "../context/UserContext";

// Todo should probably add logout and I'd really like the standup screen not to be navigatable w/out Auth idk

function NavBar() {
  const {
    state: { username }
  } = useContext(UserContext);
    return (
        <Menu inverted fluid widths={5} size="massive">
          {!username && (
            <MenuItem as={NavLink} exact to="/" className="button" activeStyle={{color: "red"}}>Log In</MenuItem>
          )}
          <MenuItem as={NavLink} exact to="/tasks" className="button" activeStyle={{color: "red"}}>Task Tracker</MenuItem>
        </Menu>
    )
}

export default NavBar;