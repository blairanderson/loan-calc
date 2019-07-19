import React from "react";

function ReadOnlyNumberInput(props) {
  return (
    <div>
      <div>
        <label className="f6 b db mb2">{props.label || "MISSING LABEL"}</label>
      </div>
      <div>
        <span
          type="text"
          className={props.className + " bg-black-20"}
          style={{ cursor: "not-allowed" }}
          readOnly={true}
          disabled={true}
        >
          {props.value}
        </span>
      </div>
    </div>
  );
}

export default ReadOnlyNumberInput;
