import React, { useEffect, useReducer, useState, useRef } from "react";

import Input from "./ui/Input";
import "./Form.css";

const emailReducer = (state, action) => {
  if (action.type === "EMAIL_INPUT") {
    return { value: action.val, validity: action.val.includes("@") };
  }
  if (action.type === "EMAIL_BLUR") {
    return { value: state.value, validity: state.value.includes("@") };
  }
  return { value: "", validity: false };
};
const passReducer = (state, action) => {
  if (action.type === "PASS_INPUT") {
    return { value: action.val, validity: action.val.trim().length > 5 };
  }
  if (action.type === "PASS_BLUR") {
    return { value: state.value, validity: state.value.trim().length > 5 };
  }
  return { value: "", validity: false };
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Form = (props) => {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    validity: false,
  });
  const [passState, dispatchPass] = useReducer(passReducer, {
    value: "",
    validity: false,
  });

  // const [email, setEmail] = useState("");    //EMAIL AND EMAIL VALIDITY IN USEREDUCER
  // const [pass, setPass] = useState("");      //PASSWORD AND PASSWORD VALIDITY IN USEREDUCER
  const [formValid, setFormValid] = useState(false);

  const inputRefE = useRef();
  const inputRefP = useRef();

  const emailChangeHandler = (e) => {
    dispatchEmail({ type: "EMAIL_INPUT", val: e.target.value });
  };
  const passChangeHandler = (e) => {
    dispatchPass({ type: "PASS_INPUT", val: e.target.value });
  };

  const emailBlurHandler = () => {
    dispatchEmail({ type: "EMAIL_BLUR" });
  };
  const passBlurHandler = () => {
    dispatchPass({ type: "PASS_BLUR" });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formValid) {
      const user = { email: emailState.value, pass: passState.value };
      props.onValue(user);
      dispatchEmail({ type: "SUBMITTED" });
      dispatchPass({ type: "SUBMITTED" });
    } else if (!emailState.validity) {
      inputRefE.current.focus();
    } else {
      inputRefP.current.focus();
    }
  };

  //Giving Alias Name..Can also Do Directly..
  const { validity: emailValidity } = emailState;
  const { validity: passValidity } = passState;

  useEffect(() => {
    setFormValid(emailValidity && passValidity);
  }, [emailValidity, passValidity]);
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <>
      <form className="main-form" onSubmit={submitHandler}>
        <div className="add-main">
          <div
            className={`add-email  ${
              emailState.validity ? "valid" : "invalid"
            }`}
          >
            <Input
              inputRef={inputRefE}
              label="E-mail"
              type="email"
              state={emailState}
              onChange={emailChangeHandler}
              onBlur={emailBlurHandler}
            />
          </div>
          <div
            className={`add-pass  ${passState.validity ? "valid" : "invalid"}`}
          >
            <Input
              inputRef={inputRefP}
              label="Password"
              type="password"
              state={passState}
              onChange={passChangeHandler}
              onBlur={passBlurHandler}
            />
          </div>
        </div>
        <div className="add-button">
          <button>Log In</button>
        </div>
      </form>
    </>
  );
};

export default Form;
