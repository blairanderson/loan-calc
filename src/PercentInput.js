import React from "react";

function PercentInput(props) {
  function onChange(e) {
    props.onChange(
      props.type === "float"
        ? parseFloat(e.target.value)
        : parseInt(e.target.value, 10)
    );
  }
  const step = props.type === "float" ? "0.01" : "1";

  return (
    <div>
      <div>
        <div>
          <label className="f6 b db mb2">
            {props.label || "MISSING LABEL"}
          </label>
        </div>
        <div>
          <input
            type="number"
            step={step}
            value={props.value}
            className={props.className}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default PercentInput;
