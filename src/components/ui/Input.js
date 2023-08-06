import React from "react";

import "./Input.css";

const Input = (props) => {

    

  return (
    <>
      <label>
        {" "}
        {props.label}
        <input
        ref={props.inputRef}
          type={props.type}
          value={props.state.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
        />
      </label>
    </>
  );
};

export default Input;
