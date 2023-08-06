import React, { useState } from "react";

export const ContextApi = React.createContext();

const StateContext = (props) => {
  const context_object = { loginValidity: false, onLogout: () => {} };

  const items = [];
  const key = Math.random().toString();
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState(items);

  function loginFromContext(user) {
    const newUser = { ...user, id: Math.random().toString() };
    
    setUsers([newUser, ...users]);
    setLogin(true);
    localStorage.setItem("login", key);
    localStorage.setItem("unknown", key);
    
    context_object.loginValidity = true;
  }

  function logoutFromContext() {
    setLogin(false);
    localStorage.removeItem("login");
    localStorage.removeItem("unknown");

    context_object.loginValidity = false;
  }

const ctx= { context_object, loginFromContext, logoutFromContext, login, users, setLogin }


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <ContextApi.Provider
      value={{ctx}}
    >
      {props.children}
    </ContextApi.Provider>
  );
};

export default StateContext;
//Should not use with Buttons..
//Not optimized for Alot changings at once

//Can also Build a custom Whole <ContextApiProvider> for eg..Login handling...
