import React, { useState } from "react";

function TextInput(props) {
  const [focus, setFocus] = useState(false);

  return (
    <div>
      <input
        type={props.type}
        name={props.name}
        className="form-control"
        id={props.id}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        minLength={props.minLength}
        maxLength={props.maxLength}
        aria-describedby={props.ariaDescribedBy}
        required
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontSize: "0.95rem",
          padding: "0.3rem 0.6rem",
          borderRadius: "5px",
          border: "none",
          width: "100%",
          border:
            (focus ? "1.6px solid " : "1px solid ") +
            (focus ? props.focusColor : "#ccc"),
        }}
      />
    </div>
  );
}

export default TextInput;
