import React from "react";
import { dollarify } from "./Calculator";

function NumberInput(props) {
  function onChange(e) {
    props.onChange(
      props.type === "float"
        ? parseFloat(e.target.value)
        : parseInt(e.target.value)
    );
  }
  const [focus, setFocus] = React.useState(false);

  const step = props.type === "float" ? "0.01" : "1";
  const rangeMax = Math.ceil((props.value * 10000) / 100000) * 100000;

  return (
    <div>
      <div>
        <div>{props.label || "MISSING LABEL"}</div>
        <div>
          {focus ? (
            <input
              type="number"
              step={step}
              value={props.value}
              onChange={onChange}
              onBlur={e => {
                setFocus(false);
              }}
            />
          ) : (
            <input
              type="text"
              value={dollarify(props.value)}
              onFocus={e => {
                setFocus(true);
              }}
            />
          )}
        </div>
      </div>
      <div>
        <input
          type="range"
          style={{
            displa: "block",
            width: "50%",
            marginLeft: "auto",
            marginRight: "auto"
          }}
          value={props.value}
          step={step}
          min={0}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default NumberInput;
