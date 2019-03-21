import React from "react";

function ReadOnlyNumberInput(props) {
  return (
    <div>
      <div>
        <label className="f6 b db mb2">{props.label || "MISSING LABEL"}</label>
      </div>
      <div>
        <input
          type="text"
          className={props.className}
          value={props.value}
          readOnly={true}
          disabled={true}
        />
      </div>
    </div>
  );
}

export default ReadOnlyNumberInput;
