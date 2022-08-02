import { NavLink } from "react-router-dom";
import { Menu, MenuItem} from "semantic-ui-react";

// Todo should probably add logout and I'd really like the standup screen not to be navigatable w/out Auth idk

function NavBar() {
    return (
        <Menu inverted fluid widths={5} size="massive">
          <MenuItem as={NavLink} exact to="/" className="button" activeStyle={{color: "red"}}>Log In</MenuItem>
          <MenuItem as={NavLink} exact to="/tasks" className="button" activeStyle={{color: "red"}}>Task Tracker</MenuItem>
        </Menu>
    )
}

export default NavBar;