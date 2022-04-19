import React from "react";

function NumberInput(props) {
  function onChange(e) {
    props.onChange(
      props.type === "float"
        ? parseFloat(e.target.value)
        : parseInt(e.target.value, 10)
    );
  }
  const step = props.type === "float" ? "0.01" : "1";
  const rangeMax = Math.ceil((props.value * 10000) / 100000) * 100000;

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
            className={props.className}
            value={props.value}
            max={rangeMax}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}

export default NumberInput;
