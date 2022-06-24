import { NavLink } from "react-router-dom";
import { Menu, MenuItem} from "semantic-ui-react";

function NavBar() {
    return (
      <Menu fluid widths={5} size="massive">
        <MenuItem as={NavLink} exact to="/" className="button" activeStyle={{color: "red"}}>Log In</MenuItem>
        <MenuItem as={NavLink} exact to="/tasks" className="button" activeStyle={{color: "red"}}>Task Tracker</MenuItem>
      </Menu>
    )
}

export default NavBar;