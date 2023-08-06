import React, { useContext, useEffect, useState } from "react";
import "./App.css";

import Header from "./components/ui/Header";
import Form from "./components/Form";
import WelcomePage from "./components/WelcomePage";
import { ContextApi } from "./context/context-api";

function App() {
  const { ctx } = useContext(ContextApi);
  const [render, setRender] = useState(0);

  const valueHandler = (user) => {
    ctx.loginFromContext(user);
  };
  
  useEffect(() => {
    if (render < 1) {
      setRender(render + 1);
    }
  }, [render]);

  useEffect(() => {
    const storedLogin = localStorage.getItem("login");
    const storedKey = localStorage.getItem("unknown");
    if (
      storedLogin === storedKey &&
      storedLogin !== null &&
      storedKey !== null
    ) {
      ctx.setLogin(true);
    }
  }, [ctx]);

  useEffect(() => {
    //Debalancing of Data..mostly use when input(No need to store every key stroke)
    const loginTimer = setTimeout(() => {
      ctx.setLogin(false);
      localStorage.removeItem("login");
      localStorage.removeItem("unknown");
    }, 10500);
    //CleanUp Function
    return () => {
      clearTimeout(loginTimer);
    };
  }, [ctx]);

  console.log("Test Rendering : ", render);
  console.log("Users: ", ctx.users);
  console.log("login: ", ctx.login);

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="App">
      {/* <ContextApi.Provider value={{loginValidity: login, onLogout: logoutHandler}}> */}
      <Header />
      {ctx.login ? (
        <>
          {" "}
          <div className={`page`}>
            <WelcomePage onLogout={() => ctx.logoutFromContext()} />{" "}
            {/*using props..coz children-1 using it....Better use this..Can use context too*/}
          </div>
        </>
      ) : (
        <>
          <div className={`login`}>
            <Form onValue={valueHandler} />
          </div>
        </>
      )}
      {/* </ContextApi.Provider> */}
    </div>
  );
}

export default App;
