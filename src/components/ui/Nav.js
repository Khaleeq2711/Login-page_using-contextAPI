import React, { useContext } from "react";
import {ContextApi} from "../../context/context-api";

import classes from "./Nav.module.css";

const Nav = () => {
  const {ctx} = useContext(ContextApi);  //Also Use .Consumer ()=>{return()} ..But  this is Better

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.login && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.login && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.login && (
          <li>
            <button onClick={ctx.logoutFromContext}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
