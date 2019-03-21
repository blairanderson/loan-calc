import React from "react";

function ReadOnlyNumberInput(props) {
  return (
    <div>
      <div>{props.label || "MISSING LABEL"}</div>
      <div>
        <input
          type="text"
          value={props.value}
          readOnly={true}
          disabled={true}
        />
      </div>
    </div>
  );
}

export default ReadOnlyNumberInput;
